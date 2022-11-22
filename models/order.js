const mongoose = require('mongoose')

const billingAdressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: false },
  adressOne: { type: String, required: true },
  adressTwo: { type: String, required: false },
  town: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: false }
})

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: false },
  adressOne: { type: String, required: true },
  adressTwo: { type: String, required: false },
  town: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: false },
  shipping: { type: Number, default: 300 },
  isBillingAdress: { type: String, default: 'no' },
  billingAdress: billingAdressSchema,
  items: [],
  sumPrice: { type: Number },
  discount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  pricePlusShipping: { type: Number, default: 0 },
  orderId: { type: Number },
  paymentType: { type: String },
  stripePaymentUrl: { type: String }
})

module.exports = (mongoose.model('Order', orderSchema))
module.exports.orderSchema = orderSchema