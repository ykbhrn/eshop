const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: Object, required: true }
}, {
  timestamps: true
})

const usedItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  size: { type: String, required: false },
  gender: { type: String, required: true },
  coordinates: [{ type: Number, required: true }],
  placeName: { type: String, required: false },
  phone: { type: Number, required: false },
  email: { type: String, required: false },
  tags: [{ type: String, required: false }],
  user: { type: Object, required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('UsedItem', usedItemSchema)
