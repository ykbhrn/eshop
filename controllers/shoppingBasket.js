const Product = require('../models/product')
const User = require('../models/user')

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
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function pendingOrder (req, res) {
  try {
    const user = req.currentUser
    user.pendingOrder = req.body
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
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  addToBasket,
  updateBasket,
  addShipping,
  pendingOrder
}