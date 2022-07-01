const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: Object, required: true }
}, {
  timestamps: true
})

const categorySchema = new mongoose.Schema({
  gender: { type: String, required: false },
  categories: [{ type: String, required: true }]
})

const usedItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categories: categorySchema,
  tags: [{ type: String, required: false }],
  user: { type: Object, required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('UsedItem', usedItemSchema)
