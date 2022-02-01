const Product = require('../models/product')
const User = require('../models/user')
const stripe = require('stripe')(
  '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'
)

async function allProducts(req, res) {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.json(err)
  }
}

async function productCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const product = await stripe.products.create({ 
      name: req.body.name,
      type: 'good',
      images: [req.body.images[0].images[0]]
    })
    req.body.stripeId = product.id
    const createProduct = await Product.create(req.body)
    const price = await stripe.prices.create({
      product: 'prod_L3WD17zb3R4skK',
      unit_amount: createProduct.price,
      currency: 'gbp'
    })
    res.status(201).json(createProduct)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function productShow(req, res) {
  const productId = req.params.id 
  try {
    const product = await Product.findById(productId)
    if (!product) throw new Error('notFound')
    res.status(200).json(product)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function productUpdate(req, res) {
  const productId = req.params.id
  try {
    const product = await Product.findByIdAndUpdate(productId)
    if (!product) throw new Error('Not Found')
    if (!product.user.equals(req.currentUser._id)) throw new Error('Not Found')
    Object.assign(product, req.body)
    await product.save()
    res.status(202).json(product)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function productDelete(req, res) {
  const productId = req.params.id
  try {
    const productToDelete = await Product.findById(productId)
    if (!productToDelete) throw new Error('Not Found')
    if (!productToDelete.user._id.equals(req.currentUser._id)) throw new Error('Not Found')
    await productToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  allProducts,
  create: productCreate,
  show: productShow,
  update: productUpdate,
  delete: productDelete
}