/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  user: {type: Object, required: true}
}, {
  timestamps: true
})

const categorySchema = new mongoose.Schema({
  gender: {type: String, required: false},
  types: [{type: String, required: true}],
  subCategory: {type: String, required: true}
})

const colorSchema = new mongoose.Schema({
  color: {type: String, required: false},
  images: [{type: String, required: true}]
})

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  images: [colorSchema],
  description: {type: String, required: true},
  descriptionImages: [{type: String}],
  ingredientsText: {type: String},
  ingredientsImages: [{type: String}],
  usage: {type: String},
  price: {type: Number, required: true},
  discount: {type: Number, required: false},
  sizes: [{type: String, required: false}],
  chosenSize: {type: String, required: false},
  colors: [{type: String, required: false}],
  chosenColor: {type: String, required: false},
  quantities: [[{type: String}, {type: String}, {type: Number, required: false}]],
  quantity: {type: Number, required: false},
  chosenQuantity: {type: Number},
  categories: categorySchema,
  tags: [{type: String, required: false}],
  isFavorite: [{type: Boolean, required: false}],
  user: {type: Object, required: true},
  comments: [commentSchema],
  stripeId: {type: String, required: true},
  stripePriceId: {type: String, required: true}
}, {
  timestamps: true
})

module.exports = (mongoose.model('Product', productSchema))
module.exports.productSchema = productSchema