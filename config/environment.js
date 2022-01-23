const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://ykbhrn:gBY4o2ZcDrnt2dd5@nuhippiescluster.w5aks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = { port, dbURI }
