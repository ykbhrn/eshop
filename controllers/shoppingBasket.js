const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const order = require('../emails/orderConfirmation')
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox17ceaf24041f4bbba7e83eb6d7e3bca7.mailgun.org'
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })

async function addToBasket (req, res) {
  try { 
    const userId = req.currentUser._id
    const user = await User.findById(userId)
    const productId = req.params.id
    const product = await Product.findById(productId)

    if (!product) throw new Error({ message: 'notFound' })

    if (user.basket.filter(item => item.id === productId && item.chosenSize === req.body.size && item.chosenColor === req.body.color).length > 0) {
      
      user.basket.map(item => {

        if (item.id === productId && item.chosenSize === req.body.size && item.chosenColor === req.body.color) {
          item.chosenQuantity = item.chosenQuantity + req.body.quantity
          if (item.chosenQuantity > product.quantity) {
            item.chosenQuantity = product.quantity
          }
        } 
      })
    } else {
      product.chosenSize = req.body.size
      product.chosenColor = req.body.color
      product.chosenQuantity = req.body.quantity
      user.basket.push(product)
    }

    await user.save()
    calculatePrice()
    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function updateBasket (req, res) {
  try {
    const user = req.currentUser
    const productId = req.params.id
    const product = await Product.findById(productId)

    user.basket.map(item => {

      if (item.id === productId && item.chosenSize === req.body.size && item.chosenColor === req.body.color) {
        item.chosenQuantity = req.body.quantity
        if (item.chosenQuantity > product.quantity) {
          item.chosenQuantity = product.quantity
        }
      } 
    })

    await user.save()
    calculatePrice()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function calculatePrice (req, res) {
  try {
    const user = req.currentUser
    let price = 0
    
    await user.basket.map(item => {
      price = price + (item.chosenQuantity * item.price)
    })

    user.sumPrice = price
    user.totalPrice = user.sumPrice - (user.sumPrice * user.discount)

    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function pendingOrder (req, res) {
  try {
    const user = req.currentUser
    if (req.body.isBillingAdress === 'no') {
      req.body.billingAdress = null
    }
    user.pendingOrder = req.body
    user.pendingOrder.items = user.basket
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function addShipping (req, res) {
  try {
    const user = req.currentUser
    user.pendingOrder.shipping = req.body.shipping
    user.totalPrice = user.sumPrice - (user.sumPrice * user.discount) + req.body.shipping
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function completingOrder (req, res) {
  try {
    const user = req.currentUser
    user.finishedOrder = user.pendingOrder
    user.finishedOrder.items = user.basket
    user.finishedOrder.discount = user.discount
    user.finishedOrder.sumPrice = user.sumPrice
    user.finishedOrder.totalPrice = user.totalPrice

    user.pendingOrder = null
    user.discount = 0
    user.sumPrice = 0
    user.totalPrice = 0
    user.basket = []
    await user.save()
    orderConfirmationEmail(user)
    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function orderConfirmationEmail (user, req, res) {
  const { email } = { email: user.email }

  try {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'User with this email does not exists' })
      }

      const data = {
        from: 'noreply@email.com',
        to: email,
        subject: 'Order Confirmation Link',
        html: order.emailOrderConfirmation(user)
      }

      mg.messages().send(data, function (error, body) {
        console.log(body)
      })
    })
  } catch (err) {
    res.status(401).json({ message: 'User with this email does not exists' })
  }
}

async function removeFromBasket (req, res) {
  try {
    const user = req.currentUser
    const productId = req.params.id

    const newBasket = user.basket.filter(item => {
      return item.id !== productId || item.chosenSize !== req.body.size || item.chosenColor !== req.body.color
    })
    user.basket = newBasket
    await user.save()
    res.status(204).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  addToBasket,
  updateBasket,
  addShipping,
  pendingOrder,
  remove: removeFromBasket,
  completingOrder
}