const User = require('../models/user')
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

async function checkoutSession(req, res) {
  const { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
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




module.exports = {
  checkoutSession
}