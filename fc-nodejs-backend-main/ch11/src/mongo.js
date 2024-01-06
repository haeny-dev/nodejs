// @ts-check

const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://dbHaeny:${process.env.MONGO_DB_PASSWORD}@cluster0.djxf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = client
