import axios from "axios"

class authController {
    async registration(username, password) {
        try {
            const response = await axios.post(`http://localhost:3000/registration`, {
                username,
                password
            })
            alert(response.data.message)
        } catch (e) {
            console.log(e)
            alert('Помилка при реєстрації')
        }
    }

    async login(username, password) {
        try {
            const response = await axios.post(`http://localhost:3000/login`, {
                username,
                password
            })
            console.log(response.data.message)
        } catch (e) {
            console.log(e)
            alert('Помилка при авторизації. Провірте чи ви правильно ввели дані')
        }
    }
}

export default new authController()
