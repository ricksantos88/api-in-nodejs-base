import * as Yup from 'yup'

import User from '../models/User'
import Role from '../models/Role'

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if (!await schema.isValid(req.body)) {
            return res.status(400).json({ error: 'Validation fails' })
        }

        const userExists = await User.findOne({ where: { email: req.body.email } })
        if(userExists){
            return res.status(400).json({ error: 'User already exists.' });
        }
        const { id, name, email } = await User.create(req.body)
        const role = await Role.findByPk(req.body.role_id, {attributes: ['name'] })
        const response = {
            id,
            name,
            email,
            role
        }
        console.log(response)
        return res.status(201).json(response);
    }

    async index(req, res) {
        const usersList = await User.findAll({
            attributes: ['id', 'name', 'email'],
            include:
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['name']
                }

        });
        res.json(usersList);
    }

    // async index(req, res) {
    //     const usersList = await User.findAll( {
    //         attributes: ['id', 'name', 'email', 'avatar_id', 'provider'],
    //         attributes: ['id', 'name', 'email', 'provider'],
    //         include: [
    //             {
    //                 model: File,
    //                 as: 'avatar',
    //                 attributes: ['name', 'path', 'url']
    //             }
    //         ]
    //     });
    //     const users = usersList.map(user => {
    //         return { id: user.id, name: user.name, provider: user.provider }
    //     })

    //     res.json(usersList);
    // }

}

export default new UserController
