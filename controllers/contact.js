const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox17ceaf24041f4bbba7e83eb6d7e3bca7.mailgun.org'
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })


async function sendEmail (req, res) {

  try {
    const data = {
      from: req.body.sender,
      to: 'info@nuhippies.com',
      subject: req.body.subject,
      html: `Message from customer ${req.body.sender}</h1>
      <p>${req.body.message}</p>`
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