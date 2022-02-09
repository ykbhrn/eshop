/* eslint-disable object-curly-spacing */
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'muie'
const newUser = require('../emails/newUser')
const resetPasswordEmail = require('../emails/resetPassword')
const _ = require('lodash')
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox17ceaf24041f4bbba7e83eb6d7e3bca7.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN})
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

async function register(req, res) {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
      description: 'My first test customer'
    })

    req.body.stripeId = customer.id

    const user = await User.create(req.body)

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

      const data = {
        from: 'noreply@email.com',
        to: email,
        subject: `Welcome To Nu Hippies Movement ${user.name}`,
        html: newUser.newUser(user)
      }

      mg.messages().send(data, function (error, body) {
        console.log(body)
      })
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
      const data = {
        from: 'noreply@email.com',
        to: email,
        subject: 'Reset Password Link',
        html: resetPasswordEmail.resetPasswordEmail(token, user)
      }

      mg.messages().send(data, function (error, body) {
        console.log(body)
      })
      
      return user.updateOne({resetToken: token}, function(err, success) {
        if (err) {
          return res.status(400).json({error: 'reset password link error'})
        } else {
          mg.messages().send(data, function (error, body) {
            if (error) {
              return res.json({
                error: error.message
              })
            }
            return res.json({message: 'Email has been sent, follow the instructions please'})
          })
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