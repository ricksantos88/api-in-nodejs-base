import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authconfig from '../../config/auth'

export default async (req, res, next) => {
    console.log(req.headers)
    console.log(req.body)
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided.' })
    }

    const [ , token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, authconfig.secret)
        console.log('decoded', decoded)
        req.userId = decoded.id
        req.role = decoded.role.name
        return next()
    } catch (err) {
        res.status(401).json({ error: 'Token invalid.' })
    }

}
