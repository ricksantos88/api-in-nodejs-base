import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import authconfig from '../../config/auth'

import User from '../models/User'
import Role from '../models/Role'


class LoginController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        })

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: 'Validation fails' })
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } })
        if(!user) {
            return res.status(401).json({ error: 'Password does not match.' })
        }

        if(!await user.checkPassword(password)) {
            return res.status(401).json({ error: 'Password does not match.' })
        }

        const role = await Role.findByPk(user.role_id, {attributes: ['name'] })

        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
                role
            }, token: jwt.sign({ id, email, role, name }, authconfig.secret, { expiresIn: authconfig.expiresIn }, { algorithm: 'RS512' }),
        });
    }
}

export default new LoginController
