const User = require('../models/user')
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

async function paymentSession(req, res) {
  const { amount, id, quantity } = req.body
  try {
    
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: 'gbp',
    //           product_data: {
    //             name: 'T-shirt'
    //           },
    //           unit_amount: amount
    //         },
    //         quantity: quantity
    //       }
    //     ],
    //     mode: 'payment',
    //     success_url: 'http://localhost:3000/done',
    //     cancel_url: 'http://localhost:3000/products'
    //   })

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'GBP',
      description: 'Nu Hippies',
      payment_method: id,
      confirm: true
    })

    console.log('Payment', payment)
    res.json({
      message: 'Payment successful',
      success: true
    })
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false
    })
  }
}

async function sendInvoice(req, res) {

  const { order, customerId } = req.body

  const userToUpdate = await User.findByIdAndUpdate(req.currentUser._id)

  async function promises() {

    const unresolved = order.items.map(async(item) => {

      const invoiceItem = await stripe.invoiceItems.create({
        customer: customerId,
        price: item.stripePriceId,
        quantity: item.chosenQuantity
      })
    })
  
    const resolved = await Promise.all(unresolved)

    const classicShipping = await stripe.prices.retrieve(
      'price_1KONUvKAzVkc5rRl8eGG1B3T'
    )

    const expressShipping = await stripe.prices.retrieve(
      'price_1KONVmKAzVkc5rRlxhR8sZ6i'
    )

    if (order.shipping === classicShipping.unit_amount) {
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customerId,
        price: 'price_1KONUvKAzVkc5rRl8eGG1B3T',
        discountable: false
      })
    } else if (order.shipping === expressShipping.unit_amount) {
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customerId,
        price: 'price_1KONVmKAzVkc5rRlxhR8sZ6i',
        discountable: false
      })
    }

    const customer = await stripe.customers.update(
      customerId,
      { name: order.name,
        email: order.email
      }
    )

    if (order.discount > 0) {

      const coupon = await stripe.coupons.create({
        duration: 'once',
        id: order.orderId,
        percent_off: order.discount
      })

      const invoice = await stripe.invoices.create({
        customer: customerId,
        auto_advance: true, // Auto-finalize this draft after ~1 hour
        collection_method: 'send_invoice',
        days_until_due: 30,
        discounts: [{
          coupon: coupon.id
        }]
      })

      const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)

      userToUpdate.finishedOrder.stripePaymentUrl = finalInvoice.hosted_invoice_url

      await userToUpdate.save()

      res.json({
        message: finalInvoice.hosted_invoice_url,
        success: true
      })
    } else if (order.discount === 0) {

      const invoice = await stripe.invoices.create({
        customer: customerId,
        auto_advance: true, // Auto-finalize this draft after ~1 hour
        collection_method: 'send_invoice',
        days_until_due: 30
      })

      const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)

      userToUpdate.finishedOrder.stripePaymentUrl = finalInvoice.hosted_invoice_url

      await userToUpdate.save()

      res.json({
        message: finalInvoice.hosted_invoice_url,
        success: true
      })
    }
  
  }

  try {
    promises()
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false
    })
  }
}

module.exports = {
  paymentSession,
  sendInvoice
}



