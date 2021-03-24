require('dotenv').config()
const mongoose = require('mongoose')

module.exports = {
  init: (client) => {
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
      useUnifiedTopology: true,
      useFindAndModify: true
    }
  mongoose.connect(process.env.MONGODBURL, dbOptions)
  mongoose.promise = global.Promise
  mongoose.connection.on('connected', () => {
    client.logger.info('mongoose successfully connected!')
  })
  mongoose.connection.on('err', (err) => {
    client.logger.error(`Mongoose error: ${err}`)
  })
  mongoose.connection.on('disconnected', () => {
    client.logger.info('Mongoose disconnected.')
  })
  }
}