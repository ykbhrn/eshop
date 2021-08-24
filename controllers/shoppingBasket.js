const Product = require('../models/product')
const User = require('../models/user')

async function addToBasket (req, res) {
  try { 
    const userId = req.currentUser._id
    const user = await User.findById(userId)
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (!product) throw new Error({ message: 'notFound' })
    product.chosenSize = req.body.size
    product.chosenColor = req.body.color
    product.chosenQuantity = req.body.quantity
    user.basket.push(product)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  addToBasket
}