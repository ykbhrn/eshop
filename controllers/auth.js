/* eslint-disable object-curly-spacing */
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'muie'
const _ = require('lodash')
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox17ceaf24041f4bbba7e83eb6d7e3bca7.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN})

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({message: `${user.email} has been registered`})
  } catch (err) {
    res.status(422).json(err)
  }
}

async function login(req, res) {
  try {
    console.log('user wanted: ', req.body)
    const user = await User.findOne({email: req.body.email})
    console.log('user found: ', user)
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
        html: `
            <h2>Please click on given link to reset your password   </h2>
            <p>${process.env.CLIENT_URL}/reset-password/${token}</p>  `
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
  const {resetToken, newPass} = req.body
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
            return res.status(400).json({error: 'User with this token does not exist.'})
          }
          const formData = {
            password: newPass,
            passwordConfirmation: newPass,
            resetToken: ''
          }

          user = _.extend(user, formData)
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({error: 'reset password error'})
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