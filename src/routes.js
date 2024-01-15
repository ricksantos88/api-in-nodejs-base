
import { Router } from 'express'

import authMiddleware from './app/middlewares/auth.js'

import UserController from './app/controllers/UserController.js'
import LoginController from './app/controllers/LoginController.js'

const routes = new Router()

routes.post('/user', UserController.store)
routes.post('/login', LoginController.store)

// routes that need authentication
routes.use(authMiddleware)
routes.get('/user', UserController.index)

export default routes


