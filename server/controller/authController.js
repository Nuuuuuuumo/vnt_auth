const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id, username, roles) => {
    const payload = {
        id,
        username,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

//controller
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({message: "Помилка при реєстрації", errors})
            }
            const {username, password, role} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(200).json({message: 'Користувач з таким іменем уже існує'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await User.create({username, password: hashPassword, roles: [role]})
            const token = generateAccessToken(user._id, username, role)
            await user.save()
            return res.json({token})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration error'})

        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Користувач ${username} не існує`})
            }
            const validPass = bcrypt.compareSync(password, user.password)
            if (!validPass) {
                return res.status(400).json({message: "Невірний пароль"})
            }
            const token = generateAccessToken(user._id, username, user.roles)
            return res.status(200).json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'login error'})

        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async check(req, res) {
        const token = generateAccessToken(req.user._id, req.user.username, req.user.role)
        res.json({token})
    }
}

module.exports = new authController()