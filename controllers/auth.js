/* eslint-disable object-curly-spacing */
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const basket = require('./shoppingBasket')
const secret = 'muie'
const newUser = require('../emails/newUser')
const resetPasswordEmail = require('../emails/resetPassword')
const _ = require('lodash')
const API_KEY = process.env.MAILGUN_APIKEY
const DOMAIN = 'nuhippies.com'
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const client = mailgun.client({username: 'api', key: API_KEY, url: 'https://api.eu.mailgun.net'})
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

function validateEmail(email){
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

async function register(req, res) {
  try {
    if (validateEmail(req.body.email) === null) {
      return res.status(422).json({ errors: {
        email: {
          wrongFormat: 'Enter valid email adress'
        }
      } })
    }

    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
      description: 'My first test customer'
    })

    req.body.stripeId = customer.id

    const user = await User.create(req.body)

    basket.calculatePrice(user)

    newUserEmail(user)
    res.status(201).json({message: `${user.email} has been registered`})
  } catch (err) {
    res.status(422).json(err)
  }
}

async function newUserEmail (user, req, res) {
  const { email } = { email: user.email }

  try {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'User with this email does not exists' })
      }

      const messageData = {
        from: 'Nu Hippies <noreply@nuhippies.com>',
        to: email,
        subject: `Welcome To Nu Hippies Movement ${user.name}`,
        html: newUser.newUser(user)
      }

      client.messages.create(DOMAIN, messageData)

    })
  } catch (err) {
    res.status(401).json({ message: 'User with this email does not exists' })
  }
}

async function login(req, res) {
  try {
    console.log('user wanted: ', req.body)
    const user = await User.findOne({email: req.body.email})
    console.log('user found: ', user)

    if (req.body.discount > user.discount) {
      user.discount = req.body.discount
      await user.save()
      basket.calculatePrice(user)
    }

    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error()
    }
    const token = jwt.sign({sub: user._id}, secret, {expiresIn: '7 days'})
    res.status(202).json({
      message: `Welcome back ${user.name}`,
      token
    })
  } catch (err) {
    res.status(401).json({message: 'Unauthorized'})
  }
}

async function forgotPassword (req, res) {
  const {email} = req.body

  try {
    User.findOne({email}, (err, user) => {
      if (err || !user) {
        return res.status(400).json({error: 'User with this email does not exists'})
      }

      const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'})

      const messageData = {
        from: 'Nu Hippies <noreply@nuhippies.com>',
        to: email,
        subject: 'Reset Password Link',
        html: resetPasswordEmail.resetPasswordEmail(token, user)
      }

      client.messages.create(DOMAIN, messageData)
      
      return user.updateOne({resetToken: token}, function(err, success) {
        if (err) {
          return res.status(400).json({error: 'reset password link error'})
        } else {
          return res.json({message: 'Email has been sent, follow the instructions please'})
        }
      })
    })                                                                                                                                   
  } catch (err) {
    res.status(401).json({message: 'User with this email does not exists'})
  }
}

async function resetPassword (req,res) {
  const {resetToken, password, passwordConfirmation} = req.body
  try {
    if (resetToken) {
      jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY, function(error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: 'Incorrect token or it is expired.'
          })
        }
        User.findOne({resetToken}, (err, user) => {
          if (err || !user) {
            return res.status(400).json({error: 'Reset Link is Expired or Incorrect'})
          }
          const formData = {
            password: password,
            passwordConfirmation: passwordConfirmation,
            resetToken: ''
          }

          user = _.extend(user, formData)
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({error: 'Password must have at least 6 characters and password confirmation must match'})
            } else {
              return res.status(200).json({message: 'Your password has been changed.'})
            }
          })
        })
      })
    } else {
      return res.status(401).json({error: 'Authentication error!'})
    }
  } catch (err) {
    res.status(400).json({message: 'mm'})
  }
}

module.exports = {
  register, login,
  forgotPassword, resetPassword
}