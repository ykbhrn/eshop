const Product = require('../models/product')
const User = require('../models/user')
const Order = require('../models/order')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const order = require('../emails/orderConfirmation')
const paymentInstructions = require('../emails/paymentInstructions')
const mailgun = require('mailgun-js')
const DOMAIN = 'https://api.eu.mailgun.net/nuhippies.com'
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })

async function allCompletedOrders (req, res) {
  try {
    if (req.currentUser.name !== 'admin') throw new Error('Not Found')
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (err) {
    console.log(err)
  }
}

async function orderCreate(req, res) {
  try {
    delete req.body._id
    const createOrder = await Order.create(req.body)
    res.status(201).json(createOrder)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function addToBasket (req, res) {
  try { 
    const userId = req.currentUser._id
    const user = await User.findById(userId)
    const productId = req.params.id
    const product = await Product.findById(productId)

    let totalQuantity

    if (product.quantities.length > 0) {

      const newArray = product.quantities.filter(item => {
        return (item[0] == req.body.color || req.body.color === 'default') && (item[1] == req.body.size || req.body.size == 'default')
      })
      totalQuantity = newArray[0][2]
    } else {
      totalQuantity = product.quantity
    }

    if (!product) throw new Error({ message: 'notFound' })

    if (user.basket.filter(item => item.id === productId && item.chosenSize === req.body.size && item.chosenColor === req.body.color).length > 0) {
      
      user.basket.map(item => {

        if (item.id === productId && item.chosenSize === req.body.size && item.chosenColor === req.body.color) {
          item.chosenQuantity = item.chosenQuantity + req.body.quantity
          if (item.chosenQuantity > totalQuantity) {
            item.chosenQuantity = totalQuantity
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
    calculatePrice(user)
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
    calculatePrice(user)
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function calculatePrice (user, req, res) {
  try {
    let price = 0
    
    user.basket.map(item => {
      price = price + (item.chosenQuantity * item.price)
    })
    
    user.sumPrice = price

    user.discountAmount = Math.round(((user.discount / 100) * user.sumPrice))
    
    user.totalPrice = Math.round(user.sumPrice - user.discountAmount)


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
    calculatePrice(user)
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

async function minusProductQuantity (order, req, res) {
  try {
    console.log('co ti jebe')
    const idArray = []
    order.items.map(item => {
      idArray.push(item._id)
    })
    for (let i = 0; i < order.items.length; i++) {
      if (!idArray.includes(order.items[0])) {
        idArray.push(order.items[i]._id)
      }
    }
    // const newArray = []
    // order.items.map((orderedProduct) => {
    //   const filteredArray = order.items
    // })
    // const idArray = [] 
    // const sameValuesArray = []
    // const same = []
    // let sameValues = []
    // let finalNumber = 0
    // order.items.map((orderedProduct) => {
    //   idArray.push(orderedProduct._id)
    // })

    // order.items.map((orderedProduct) => {

    //   sameValues = idArray.filter(item => {
    //     return item._id == orderedProduct._id
    //   })

    //   same.push(sameValues[0])

    //   let counter = 0
    //   finalNumber = finalNumber + orderedProduct.chosenQuantity

    //   orderedProduct.quantities.map(async (item) => { 
        
    //     if (item[0] == orderedProduct.chosenColor && item[1] == orderedProduct.chosenSize) {  

    //       orderedProduct.quantities[counter][2] = item[2] - item.chosenQuantity

    //       saveProduct(orderedProduct, counter, sameValuesArray)

    //     }
    //     counter++
    //   })
    // })

    // if (same.length > 1) {
    //   sameValuesArray.push(sameValues[0])
    // }

    // if (sameValuesArray.length > 0) {
      
    // }
  
  } catch (err) {
    res.json(err)
  }
}

// async function saveProduct (item, counter, sameOrders, req, res) {
//   try {
//     const product = await Product.findById(item._id)
//     product.quantities = item.quantities
//     await product.save()
//   } catch (err) {
//     res.json(err)
//   }
// }

async function completingOrder (req, res) {
  try {
    const paymentType = req.params.type
    const num = Math.floor(Math.random() * 1000000)
    const user = req.currentUser
    user.finishedOrder = user.pendingOrder
    user.finishedOrder.items = user.basket
    user.finishedOrder.discount = user.discount
    user.finishedOrder.discountAmount = user.discountAmount
    user.finishedOrder.sumPrice = user.sumPrice
    user.finishedOrder.totalPrice = user.totalPrice
    user.finishedOrder.pricePlusShipping = (user.totalPrice + user.pendingOrder.shipping)
    user.finishedOrder.orderId = num

    user.pendingOrder = null
    user.discount = 0
    user.sumPrice = 0
    user.totalPrice = 0
    user.basket = []

    await user.save()

    orderConfirmationFunction(user)

    if (req.body.paymentType === 'bank-transfer') {
      setTimeout(() => {
        paymentInstructionFunction(user)
      }, 15000)
    }

    // minusProductQuantity(user.finishedOrder)

    res.status(201).json(user.finishedOrder)
  } catch (err) {
    res.json(err)
  }
}

async function paymentInstructionFunction (user, req, res) {
  const { email } = { email: user.email }

  try {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'User with this email does not exists' })
      }

      const data = {
        from: 'noreply@email.com',
        to: email,
        subject: 'Payment Instructions',
        html: paymentInstructions.paymentInstructionsEmail(user)
      }

      mg.messages().send(data, function (error, body) {
        console.log(body)
      })
    })
  } catch (err) {
    res.status(401).json({ message: 'User with this email does not exists' })
  }
}

async function orderConfirmationFunction (user, req, res) {
  const { email } = { email: user.email }

  try {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'User with this email does not exists' })
      }

      const data = {
        from: 'noreply@email.com',
        to: email,
        subject: 'Order Confirmation',
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
    calculatePrice(user)
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
  completingOrder,
  calculatePrice,
  allCompletedOrders,
  orderCreate
}