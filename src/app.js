import express from 'express'

import routes from './routes.js'

import './database/index.js';

const allRoutes = [
    routes
]

class App {
    constructor() {
        this.server = express()

        this.middleware()
        this.routes()
    }

    middleware(){
        this.server.use(express.json())
    }

    routes(){
        this.server.use(allRoutes.map(route => route))
    }
}

export default new App().server;
