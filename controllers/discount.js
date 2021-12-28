const Discount = require('../models/popupDiscount')
const User = require('../models/user')
const cron = require('node-cron')
const calculate = require('./shoppingBasket')

async function createDiscount (req, res) {
  try {
    const now = new Date()
    const randomNumber = Math.floor(Math.random() * 60)
    if (req.currentUser.name !== 'admin') throw new Error('Not Found')
    const createdDiscount = await Discount.create({ time: randomNumber })
    res.status(201).json(createdDiscount)
  } catch (err) {
    res.status(422).json(err)
  }
}

cron.schedule('*/30 * * * *', async function(req, res) {
  try {
    const now = new Date()
    const discounts = await Discount.find()
    if (now.getMinutes() === 0) {
      const randomNumber = Math.floor(Math.random() * 30)
      discounts[0].time = randomNumber
    } else if (now.getMinutes() === 30) {
      const randomNumber = Math.floor(Math.random() * 30) + 30
      discounts[0].time = randomNumber
    }
    await discounts[0].save()
    res.status(201).json(discounts[0])
  } catch (err) {
    res.status(422).json(err)
  } 
})

async function allDiscounts (req, res) {
  try {
    const discounts = await Discount.find()
    res.status(200).json(discounts)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function changeUserDiscount (req, res) {
  try {
    const user = req.currentUser
    if (user.discount < req.body.discount) {
      user.discount = req.body.discount
    }
    if (req.body.discount >= 40) {
      user.discount = 40
    }
    await user.save()
    calculate.calculatePrice(user)
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  createDiscount,
  allDiscounts,
  changeUserDiscount
}