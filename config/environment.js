require('dotenv').config()

const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/eshop-database2'
'muie'
module.exports = { port, dbURI }
