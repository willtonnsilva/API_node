const express = require('express')
const mongoose = require('mongoose')
const validate = require('express-validation')
const databseConfig = require('./app/config/database')
const Sentry = require('@sentry/node')
const sentryConfig = require('./app/config/sentry')

class App {
  constructor () {
    this.express = express()
    // eslint-disable-next-line semi
    this.isDev = process.env.NODE_ENV !== 'production';

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
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
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    // if (process.env.NODE_ENV === 'production') {
    this.express.use(Sentry.Handlers.errorHandler())
    // }

    this.express.use((err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }
      return res.status(err.status || 500).json({
        error: 'Internal server error'
      })
    })
  }
}

module.exports = new App().express
