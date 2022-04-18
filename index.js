const express = require('express')
require('dotenv').config()
const router = require('./config/routes')
const bodyParser = require('body-parser')
const logger = require('./lib/logger')
const forceSecure = require('force-secure-express')
const app = express()
const mongoose = require('mongoose')
const { port, dbURI } = require('./config/environment')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected')
  }
)

app.use(forceSecure([
  'nuhippies.com',
  'www.nuppies.com'
]))

app.use(express.static(`${__dirname}/frontend/build`))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(logger)

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.listen(process.env.PORT, () => console.log(`Up and running on port ${process.env.PORT}`))

