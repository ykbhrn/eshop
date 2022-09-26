const mongoose = require('mongoose')

const textSchema = new mongoose.Schema({
  textContent: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true
})

const chatSchema = new mongoose.Schema({
  firstUserId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  secondUserId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  textsArray: [ textSchema ]
}, {
  timestamps: true
})

module.exports = ( mongoose.model('Chat', chatSchema))
