const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox17ceaf24041f4bbba7e83eb6d7e3bca7.mailgun.org'
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })


async function sendEmail (req, res) {

  try {
    const data = {
      from: req.body.sender,
      to: 'jakub.horun@mail.com',
      subject: req.body.subject,
      html: `<h1>No co chuju ${req.body.message}</h1>`
    }

    mg.messages().send(data, function (error, body) {
      console.log(body)
    })

    res.status(202).json('Message was sent')

  } catch (err) {
    res.status(401).json({ message: 'Sorry, sending message failed' })
  }
}

module.exports = {
  sendEmail
}