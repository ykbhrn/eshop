const Chat = require('../models/chat')
const User = require('../models/user')

async function chatCreate(req, res) {
  try {
    const firstUser = req.currentUser._id
    const secondUser = req.body.secondUserId

    req.body.firstUserId = firstUser

    const chats = await Chat.find()

    const filteredArray = chats.filter(chat => {

      if ((chat.firstUserId.toString() === firstUser.toString() || chat.firstUserId.toString() === secondUser.toString()) 
      && (chat.secondUserId.toString() === firstUser.toString() || chat.secondUserId.toString() === secondUser.toString())) {
        return chat
      }
    })

    if (filteredArray.length > 0) {
      res.status(200).json(filteredArray[0])
    } else {
      const createChat = await Chat.create(req.body)
      res.status(201).json(createChat)
    }

  } catch (err) {
    res.status(422).json(err)
  }
}

async function newMessage(req, res) {
  const chatId = req.params.id
  req.body.userId = req.currentUser._id
  try {
    const chat = await Chat.findByIdAndUpdate(chatId)
    if (!chat) throw new Error('Not Found')

    chat.textsArray.push(req.body)

    await chat.save()
    res.status(202).json(chat)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function chatShow(req, res) {
  const chatId = req.params.id 
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) throw new Error('notFound')

    res.status(200).json(chat)
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  chatCreate,
  newMessage,
  chatShow
}