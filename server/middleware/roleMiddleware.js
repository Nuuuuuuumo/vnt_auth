const jwt = require("jsonwebtoken");
const { secret } = require('../config')

module.exports = function (roless) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Користувач не авторизований"})
            }
            const { roles: userRoles } = jwt.verify(token, secret)
            console.log(userRoles)
            let hasRoles = false
            userRoles.forEach(role => {
                if (roless.includes(role)) {
                    hasRoles = true
                }
            })
            if (!hasRoles) {
                return res.status(403).json({message: "У вас немає доступу до цих данних"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({ message: 'Помилка'})
        }
    }
}