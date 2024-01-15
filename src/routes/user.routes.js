import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth.js'

import UserController from '../app/controllers/UserController.js'

const userRoutes = new Router()

userRoutes.post('/user', UserController.store)

userRoutes.use(authMiddleware)
userRoutes.get('/user', UserController.index)

export default userRoutes
