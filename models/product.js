/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  user: {type: Object, required: true}
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mainImage: {type: String, required: true},
  otherImages: [{type: String, required: false}],
  description: {type: String, required: true},
  user: {type: Object, required: true},
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = (mongoose.model('Product', productSchema))