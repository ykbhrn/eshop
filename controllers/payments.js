const User = require('../models/user')
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

const CLASSIC_SHIPPING_PRICE_ID = 'price_1U5tQvKAzVkc5rRlBaaXUXlm'
const EXPRESS_SHIPPING_PRICE_ID = 'price_1U5tRpKAzVkc5rRlB78xxND0'

/*
 * Builds the Stripe invoice and returns its hosted payment URL.
 *
 * This deliberately does not touch `res`: it either returns a URL or throws,
 * so sendInvoice below has exactly one place that answers the request. The
 * previous version sent the response from in here and was called without
 * `await`, so any rejection skipped the try/catch entirely - the client was
 * never answered and the rejection became an unhandled promise rejection.
 */
async function buildInvoice(order, customerId, userToUpdate) {
  await Promise.all(
    order.items.map(item => stripe.invoiceItems.create({
      customer: customerId,
      price: item.stripePriceId,
      quantity: item.chosenQuantity
    }))
  )

  const classicShipping = await stripe.prices.retrieve(CLASSIC_SHIPPING_PRICE_ID)
  const expressShipping = await stripe.prices.retrieve(EXPRESS_SHIPPING_PRICE_ID)

  if (order.shipping === classicShipping.unit_amount) {
    await stripe.invoiceItems.create({
      customer: customerId,
      price: CLASSIC_SHIPPING_PRICE_ID,
      discountable: false
    })
  } else if (order.shipping === expressShipping.unit_amount) {
    await stripe.invoiceItems.create({
      customer: customerId,
      price: EXPRESS_SHIPPING_PRICE_ID,
      discountable: false
    })
  }

  await stripe.customers.update(
    customerId,
    {
      name: order.name,
      email: order.email
    }
  )

  // Coerced, so a missing or string discount cannot fall between the branches
  // and leave the request hanging with no response, as it could before.
  const discount = Number(order.discount) || 0

  const invoiceOptions = {
    customer: customerId,
    auto_advance: true, // Auto-finalize this draft after ~1 hour
    collection_method: 'send_invoice',
    days_until_due: 30
  }

  if (discount > 0) {
    const coupon = await stripe.coupons.create({
      duration: 'once',
      id: order.orderId,
      percent_off: discount
    })

    invoiceOptions.discounts = [{ coupon: coupon.id }]
  }

  const invoice = await stripe.invoices.create(invoiceOptions)

  const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)

  // Unchanged from before: only undiscounted invoices get emailed out.
  if (discount === 0) {
    await stripe.invoices.sendInvoice(finalInvoice.id)
  }

  if (finalInvoice.payment_intent) {
    await stripe.paymentIntents.update(
      finalInvoice.payment_intent,
      { receipt_email: order.email }
    )
  }

  if (userToUpdate && userToUpdate.finishedOrder) {
    userToUpdate.finishedOrder.stripePaymentUrl = finalInvoice.hosted_invoice_url
    await userToUpdate.save()
  }

  if (!finalInvoice.hosted_invoice_url) {
    throw new Error('Stripe did not return a hosted invoice URL')
  }

  return finalInvoice.hosted_invoice_url
}

async function sendInvoice(req, res) {
  const { order, customerId } = req.body

  try {
    if (!order || !customerId) {
      return res.status(422).json({
        message: 'Missing order or customer details',
        success: false
      })
    }

    const userToUpdate = await User.findById(req.currentUser._id)

    const paymentUrl = await buildInvoice(order, customerId, userToUpdate)

    res.json({
      message: paymentUrl,
      success: true
    })
  } catch (error) {
    console.error('Invoice creation failed:', error.message)

    res.status(502).json({
      message: 'Payment failed',
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  sendInvoice
}
