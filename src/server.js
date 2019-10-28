const express = require('express')
const mongoose = require('mongoose')
const databseConfig = require('./app/config/database')
class App {
  constructor () {
    this.express = express()
    // eslint-disable-next-line semi
    this.isDev = process.env.NODE_ENV !== 'production';

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    // url mongo mongodb://usuario:senha@localhost:27017/nomedatabase
    mongoose.connect(databseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
