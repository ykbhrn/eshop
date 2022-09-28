const mongoose = require('mongoose')

const textSchema = new mongoose.Schema({
  textContent: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true
})

const chatSchema = new mongoose.Schema({
  firstUserId: { type: String, required: true },
  firstUserName: { type: String, required: true },
  firstUserProfileImage: { type: String, required: false },
  secondUserId: { type: String, required: true },
  secondUserName: { type: String, required: true },
  secondUserProfileImage: { type: String, required: false },
  textsArray: [ textSchema ],
  isFirst: { type: Boolean, required: false }
}, {
  timestamps: true
})

module.exports = ( mongoose.model('Chat', chatSchema))
