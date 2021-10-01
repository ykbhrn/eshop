const router = require('express').Router()
const user = require('../controllers/users')
const auth = require('../controllers/auth')
const product = require('../controllers/products')
const basket = require('../controllers/shoppingBasket')
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

router.route('/products')
  .get(product.allProducts)
  .post(secureRoute, product.create)

router.route('/products/:id')
  .get(product.show)
  .delete(secureRoute, product.delete)

router.route('/basket/:id')
  .post(secureRoute, basket.addToBasket)
  .put(secureRoute, basket.updateBasket)

router.route('/order')
  .post(secureRoute, basket.pendingOrder)
  
router.route('/shipping')
  .put(secureRoute, basket.addShipping)

module.exports = router