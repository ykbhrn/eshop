const router = require('express').Router()
const user = require('../controllers/users')
const auth = require('../controllers/auth')
const product = require('../controllers/products')
const usedItem = require('../controllers/usedItems')
const basket = require('../controllers/shoppingBasket')
const discount = require('../controllers/discount')
const payment = require('../controllers/payments')
const chat = require('../controllers/chats')
const contact = require('../controllers/contact')
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
  .put(secureRoute, product.updateAllTheProducts)

router.route('/products/:id')
  .get(product.show)
  .put(secureRoute, product.update)
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
  .get(secureRoute, basket.allCompletedOrders)

router.route('/orders/create')
  .post(basket.orderCreate)

router.route('/discount')
  .post(secureRoute, discount.createDiscount)
  .get(discount.allDiscounts)
  .put(secureRoute, discount.changeUserDiscount)

router.route('/invoice')
  .post(secureRoute, payment.sendInvoice)

router.route('/send-email')
  .post(contact.sendEmail)

router.route('/used-items')
  .get(usedItem.allUsedItems)
  .post(secureRoute, usedItem.usedItemCreate)

router.route('/used-item/:id')
  .get(usedItem.usedItemShow)
  .put(secureRoute, usedItem.usedItemUpdate)
  .delete(secureRoute, usedItem.usedItemDelete)

router.route('/used-item/update/:id')
  .get(secureRoute, usedItem.usedItemShowToUpdate)

router.route('/chats')
  .get(secureRoute, chat.allUserChat)
  .post(secureRoute, chat.chatCreate)

router.route('/chats/:id')
  .get(secureRoute, chat.chatShow)
  .put(secureRoute, chat.newMessage)

module.exports = router