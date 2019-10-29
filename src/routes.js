const express = require('express')
const routes = express.Router()
const controllers = require('../src/app/controllers')
const authMiddleware = require('../src/app/middleware/auth')

routes.post('/users', controllers.UserController.store)
routes.get('/session', controllers.SessionController.store)

routes.use(authMiddleware)

/*
 *Ad
 */
routes.get('/ads/', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/*
 *Purchases
 */
routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
