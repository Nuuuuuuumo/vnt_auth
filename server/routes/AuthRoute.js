const Router = require('express')
const controller = require('../controller/authController')
const {check} = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/registration', [
    check('username', "Таке ім'я користувача не може бути пустим.").notEmpty(),
    check('password', "Пароль повинен складатись не менше 4 символів").isLength({min: 4, max: 20})
], controller.registration)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, controller.check)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router