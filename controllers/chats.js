const { Error } = require('mongoose')
const Chat = require('../models/chat')
const User = require('../models/user')

async function chatCreate(req, res) {
  try {
    const firstUser = req.currentUser._id
    const secondUser = req.body.secondUserId

    const firstUserToUpdate = await User.findByIdAndUpdate(firstUser)
      
    const secondUserToUpdate = await User.findByIdAndUpdate(secondUser)

    req.body.firstUserId = firstUserToUpdate._id
    req.body.firstUserName = firstUserToUpdate.name
    req.body.firstUserProfileImage = firstUserToUpdate.profileImage

    req.body.secondUserName = secondUserToUpdate.name
    req.body.secondUserProfileImage = secondUserToUpdate.profileImage

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

      firstUserToUpdate.userChats.push(createChat._id)
      secondUserToUpdate.userChats.push(createChat._id)

      await firstUserToUpdate.save()
      await secondUserToUpdate.save()
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

    if (chat.firstUserId.toString() !== req.currentUser._id.toString() &&
    chat.secondUserId.toString() !== req.currentUser._id.toString()) throw new Error('Not Found')

    chat.textsArray.push(req.body)

    await chat.save()
    res.status(202).json(chat)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function allUserChat(req, res) {
  try {
    const user = await (User.findById(req.currentUser._id))

    const allChats = []

    const unresolved = user.userChats.map(async(chatId) => {

      const chat = await Chat.findById(chatId)

      if (chat.firstUserId.toString() === req.currentUser._id.toString()) {
        chat.isFirst = true
      } else {
        chat.isFirst = false
      }

      allChats.push(chat)

    })
  
    const resolved = await Promise.all(unresolved)

    res.status(200).json(allChats)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function chatShow(req, res) {
  const chatId = req.params.id 
  try {
    const chat = await Chat.findById(chatId)

    if (!chat) throw new Error('notFound')

    if (chat.firstUserId.toString() !== req.currentUser._id.toString() &&
      chat.secondUserId.toString() !== req.currentUser._id.toString()) throw new Error('Not Found')

    res.status(200).json(chat)
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  chatCreate,
  newMessage,
  allUserChat,
  chatShow
}