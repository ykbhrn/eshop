const express = require('express')
require('dotenv').config()
const router = require('./config/routes')
const bodyParser = require('body-parser')
const logger = require('./lib/logger')
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

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)



app.listen(port, () => console.log(`Up and running on port ${port}`))

