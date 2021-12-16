const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { productSchema } = require('./product')

const notificationSchema = new mongoose.Schema({ 
  notificationType: String,
  username: String,
  profileImage: String,
  userId: String,
  portfolioId: String,
  url: String
})

const billingAdressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: false },
  adressOne: { type: String, required: true },
  adressTwo: { type: String, required: false },
  town: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: false }
})

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: false },
  adressOne: { type: String, required: true },
  adressTwo: { type: String, required: false },
  town: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: false },
  shipping: { type: Number, default: 0 },
  isBillingAdress: { type: String, default: 'no' },
  billingAdress: billingAdressSchema,
  items: [],
  sumPrice: { type: Number },
  discount: { type: Number },
  totalPrice: { type: Number }
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  bio: { type: String, required: false, maxlength: 300 },
  profileImage: { type: String, required: false },
  phone: { type: Number, required: false },
  basket: [productSchema],
  sumPrice: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  pendingOrder: orderSchema,
  finishedOrder: orderSchema,
  paidOrders: [orderSchema],
  notifications: [notificationSchema],
  newNotification: { type: Boolean, default: false },
  newChat: { type: Boolean, default: false },
  userChats: [],
  userType: { type: Number, required: true },
  resetToken: { data: String, default: '' }
})

userSchema.virtual('userProducts', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'user'
})

userSchema
  .set('toJSON', {
    virtuals: true, 
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)

