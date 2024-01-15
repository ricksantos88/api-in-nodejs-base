import { Router } from 'express'

import SessionController from '../app/controllers/LoginController.js'

const sessionRoutes = new Router()

sessionRoutes.post('/sessions', SessionController.store)

export default sessionRoutes
