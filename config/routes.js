const router = require('express').Router()
const user = require('../controllers/users')
const auth = require('../controllers/auth')
const product = require('../controllers/products')
const basket = require('../controllers/shoppingBasket')
const discount = require('../controllers/discount')
const payment = require('../controllers/payments')
const secureRoute = require('../lib/secureRoute')

router.route('/users')
  .get(user.allUsers)

router.route('/profile')
  .get(secureRoute, user.profile)

router.route('/profile/:id')
  .get(user.otherUsersProfile)

router.route('/user-update')
  .put(secureRoute, user.update)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/forgot-password')
  .put(auth.forgotPassword)

router.route('/reset-password')
  .put(auth.resetPassword)

router.route('/products')
  .get(product.allProducts)
  .post(secureRoute, product.create)

router.route('/products/:id')
  .get(product.show)
  .delete(secureRoute, product.delete)

router.route('/basket/:id')
  .post(secureRoute, basket.addToBasket)
  .put(secureRoute, basket.updateBasket)

router.route('/basket/remove/:id')
  .put(secureRoute, basket.remove)

router.route('/complete/:type')
  .put(secureRoute, basket.completingOrder)

router.route('/order')
  .post(secureRoute, basket.pendingOrder)
  
router.route('/shipping')
  .put(secureRoute, basket.addShipping)

router.route('/orders/all')
  .get(basket.allCompletedOrders)

router.route('/orders/create')
  .post(basket.orderCreate)

router.route('/discount')
  .post(secureRoute, discount.createDiscount)
  .get(discount.allDiscounts)
  .put(secureRoute, discount.changeUserDiscount)

router.route('/payment')
  .post(payment.paymentSession)

router.route('/invoice')
  .post(payment.sendInvoice)

module.exports = router