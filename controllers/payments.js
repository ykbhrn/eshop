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
  const { totalPrice, customerId, username, userEmail } = req.body
  try {
    const product = await stripe.products.create({ name: 'Shirt Muie' })

    const price = await stripe.prices.create({
      product: 'prod_L3WD17zb3R4skK',
      unit_amount: totalPrice,
      currency: 'gbp'
    })

    const customer = await stripe.customers.update(
      customerId,
      { name: username,
        email: userEmail
      }
    )

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      price: price.id
    })
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // Auto-finalize this draft after ~1 hour
      collection_method: 'send_invoice',
      days_until_due: 30
    })

    const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)

    console.log('2 tu sa pozeraj teraz +++++++++++++++++', finalInvoice.hosted_invoice_url)

    res.json({
      message: finalInvoice.hosted_invoice_url,
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

module.exports = {
  paymentSession,
  sendInvoice
}



