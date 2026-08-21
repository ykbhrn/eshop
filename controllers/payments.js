const User = require('../models/user')
const Order = require('../models/order')
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

const CLASSIC_SHIPPING_PRICE_ID = 'price_1U5tQvKAzVkc5rRlBaaXUXlm'
const EXPRESS_SHIPPING_PRICE_ID = 'price_1U5tRpKAzVkc5rRlB78xxND0'

/*
 * A stored stripeId can outlive the key that made it: customers created with a
 * live key do not exist under a test key (and vice versa), and Stripe reports
 * that as resource_missing. Rather than failing the checkout, mint a fresh
 * customer for this user and persist it.
 */
async function resolveCustomer(customerId, user) {
  if (customerId) {
    try {
      const existing = await stripe.customers.retrieve(customerId)
      if (existing && !existing.deleted) {
        return existing.id
      }
      console.warn(`Stripe customer ${customerId} is deleted; creating a replacement.`)
    } catch (error) {
      if (error.code !== 'resource_missing') {
        throw error
      }
      console.warn(`Stripe customer ${customerId} not found for the current key; creating a replacement.`)
    }
  }

  const created = await stripe.customers.create({
    name: user && user.name,
    email: user && user.email
  })

  if (user) {
    user.stripeId = created.id
    await user.save()
  }

  return created.id
}

/*
 * Builds the Stripe invoice and returns its hosted payment URL. Never touches
 * `res`: it returns a URL or throws, so sendInvoice has exactly one place that
 * answers the request.
 *
 * Anything before finalizeInvoice is allowed to throw and roll the order back.
 * Once the invoice is finalized the customer has a real payable invoice, so the
 * remaining steps are best-effort and must not fail the checkout.
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
  // and leave the request hanging with no response.
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

  if (!finalInvoice.hosted_invoice_url) {
    throw new Error('Stripe did not return a hosted invoice URL')
  }

  // ---- past this point the invoice exists; do not fail the checkout ----

  try {
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
  } catch (error) {
    console.error('Post-finalisation step failed (invoice is still valid):', error.message)
  }

  return finalInvoice.hosted_invoice_url
}

/*
 * completingOrder empties the basket and moves everything onto finishedOrder
 * before payment is attempted, and orderCreate writes an Order document. If the
 * invoice then fails, that leaves a paid-looking order behind and the customer
 * with an empty basket. Undo both so they can simply try again.
 */
async function rollbackOrder(order, userId) {
  if (!order || !order._id) {
    return
  }

  try {
    await Order.findByIdAndDelete(order._id)

    const user = await User.findById(userId)

    if (!user || !user.finishedOrder) {
      return
    }

    // Only restore if the basket was emptied for *this* order.
    if (String(user.finishedOrder.orderId) !== String(order.orderId)) {
      return
    }

    const finished = user.finishedOrder.toObject ? user.finishedOrder.toObject() : user.finishedOrder
    delete finished._id

    user.basket = finished.items || []
    user.discount = finished.discount || 0
    user.discountAmount = finished.discountAmount || 0
    user.sumPrice = finished.sumPrice || 0
    user.totalPrice = finished.totalPrice || 0
    user.pendingOrder = finished
    user.finishedOrder = null

    await user.save()

    console.log(`Rolled back order ${order.orderId} and restored the basket.`)
  } catch (error) {
    console.error('Order rollback failed:', error.message)
  }
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

    const user = await User.findById(req.currentUser._id)

    const activeCustomerId = await resolveCustomer(customerId, user)

    const paymentUrl = await buildInvoice(order, activeCustomerId, user)

    res.json({
      message: paymentUrl,
      success: true
    })
  } catch (error) {
    console.error('Invoice creation failed:', error.message)

    await rollbackOrder(order, req.currentUser._id)

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
