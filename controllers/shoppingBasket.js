const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
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
    if (req.body.isBillingAdress === 'no') {
      req.body.billingAdress = null
    }
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

async function completingOrder (req, res) {
  try {
    const user = req.currentUser
    user.paidOrders.push(user.pendingOrder)
    user.pendingOrder = null
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
        html: `
        <h2>Thank you for your purchase ${user.name}</h2>
        <style type="text/css">
  body,
  html, 
  .body {
    background: #f3f3f3 !important;
  }
</style>
<!-- move the above styles into your custom stylesheet -->

<spacer size="16"></spacer>

<container>

  <spacer size="16"></spacer>

  <row>
    <columns>
      <p>Thanks for shopping with us! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad earum ducimus, non, eveniet neque dolores voluptas architecto sed, voluptatibus aut dolorem odio. Cupiditate a recusandae, illum cum voluptatum modi nostrum.</p>

      <spacer size="16"></spacer>

      <callout class="secondary">
        <row>
          <columns large="6">
            <p>
              <strong>Payment Method</strong><br/>
              Dubloons
            </p>
            <p>
              <strong>Email Address</strong><br/>
              thecapn@pirates.org
            </p>
            <p>
              <strong>Order ID</strong><br/>
              239235983749636
            </p>
          </columns>
          <columns large="6">
            <p>
              <strong>Shipping Method</strong><br/>
              Boat (1&ndash;2 weeks)<br/>
              <strong>Shipping Address</strong><br/>
              Captain Price<br/>
              123 Maple Rd<br/>
              Campbell, CA 95112
            </p>
          </columns>
        </row>
      </callout>

      <h4>Order Details</h4>

      <table>
        <tr><th>Item</th><th>#</th><th>Price</th></tr>
        <tr><td>Ship's Cannon</td><td>2</td><td>$100</td></tr>
        <tr><td>Ship's Cannon</td><td>2</td><td>$100</td></tr>
        <tr><td>Ship's Cannon</td><td>2</td><td>$100</td></tr>
        <tr>
          <td colspan="2"><b>Subtotal:</b></td>
          <td>$600</td>
        </tr>
      </table>

      <hr/>

      <h4>What's Next?</h4>

      <p>Our carrier raven will prepare your order for delivery. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi necessitatibus itaque debitis laudantium doloribus quasi nostrum distinctio suscipit, magni soluta eius animi voluptatem qui velit eligendi quam praesentium provident culpa?</p>
    </columns>
  </row>
  <row class="footer text-center">
    <columns large="3">
      <img src="http://placehold.it/170x30" alt="">
    </columns>
    <columns large="3">
      <p>
        Call us at 800.555.1923<br/>
        Email us at support@discount.boat
      </p>
    </columns>
    <columns large="3">
      <p>
        123 Maple Rd<br/>
        Campbell, CA 95112
      </p>
    </columns>
  </row>
</container>
            `
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