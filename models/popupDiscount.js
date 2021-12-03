const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
  time: { type: Number, required: true }
})

module.exports = mongoose.model('Discount', discountSchema)