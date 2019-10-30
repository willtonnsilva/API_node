const express = require('express')
const routes = express.Router()
const controllers = require('../src/app/controllers')
const authMiddleware = require('../src/app/middleware/auth')
const validate = require('express-validation')
const validators = require('../src/app/validators')

routes.post('/users', validate(validators.User), controllers.UserController.store)
routes.get('/session', validate(validators.Session), controllers.SessionController.store)

routes.use(authMiddleware)

/*
 *Ad
 */
routes.get('/ads/', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/*
 *Purchases
 */
routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store)

module.exports = routes
