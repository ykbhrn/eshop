const { create } = require('../models/product')
const Product = require('../models/product')
const User = require('../models/user')
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

async function allProducts(req, res) {
  try {
    const products = await Product.find()
    console.log([products])
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
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: req.body.price,
      currency: 'gbp'
    })

    req.body.stripePriceId = price.id

    const createProduct = await Product.create(req.body)

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
    Object.assign(product, req.body)
    await product.save()
    res.status(202).json(product)
  } catch (err) {
    res.status(422).json(err)
  }
}

// async function updateAllTheProducts(req, res) {

//   async function promises() {

//     const products = await Product.find()

//     const unresolved = products.map(async(product) => {

//       product.isFavorite = false
//       await product.save()
  
//     })

//     const resolved = await Promise.all(unresolved)

//     res.status(202).json(products)
//   }
//   try {
//     promises()
//   } catch (err) {
//     res.status(422).json(err)
//   }
// }

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