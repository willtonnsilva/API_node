const express = require('express')
const routes = express.Router()
const controllers = require('../src/app/controllers')
const authMiddleware = require('../src/app/middleware/auth')

routes.post('/users', controllers.UserController.store)
routes.get('/session', controllers.SessionController.store)
routes.get('/teste', authMiddleware, (req, res) => {
  res.json({ ok: true })
})

module.exports = routes
