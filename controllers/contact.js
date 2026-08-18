const API_KEY = process.env.MAILGUN_APIKEY
const DOMAIN = 'nuhippies.com'
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const client = mailgun.client({ username: 'api', key: API_KEY, url: 'https://api.eu.mailgun.net' })


async function sendEmail (req, res) {

  try {

    const messageData = {
      from: req.body.sender,
      to: 'nuhippiesmovement@gmail.com',
      subject: req.body.subject,
      html: `Message from customer ${req.body.sender}</h1>
      <p>${req.body.message}</p>`
    }

    client.messages.create(DOMAIN, messageData)

    res.status(202).json('Message was sent')

  } catch (err) {
    res.status(401).json({ message: 'Sorry, sending message failed' })
  }
}

module.exports = {
  sendEmail
}