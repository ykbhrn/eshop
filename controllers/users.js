const User = require('../models/user')

async function allUsers(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.json(err)
  }
}

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('userProducts')
    if (!user) throw new Error({ message: 'Not Found' })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function otherUsersProfile(req, res, next) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId).populate('userProducts')
    if (!user) throw new Error({ message: 'Not Found' })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userUpdate(req, res) {
  const userId = req.currentUser._id
  try {
    const user = await User.findByIdAndUpdate(userId)
    if (!user) throw new Error('Not Found')
    Object.assign(user, req.body)
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.status(422).json(err)
  }
}


module.exports = {
  profile: userProfile,
  otherUsersProfile,
  allUsers,
  update: userUpdate
}