import React, {useContext, useState} from 'react';
import './Auth.css'
import {useLocation, useNavigate} from "react-router-dom";
import {AUTH_OK, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {registration, login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const navigateRegistration = () => {
        navigate(REGISTRATION_ROUTE)
    }
    const navigateLogin = () => {
        navigate(LOGIN_ROUTE)
    }

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const sign = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(userName, password)

            } else {
                data = await registration(userName, password)
            }
            if (data.roles.includes("ADMIN")) {
                user.setIsAdmin(true)
            } else user.setIsAdmin(false)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(AUTH_OK)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <div className='container'
             style={{height: window.innerHeight - 65}}
        >
            <div className='wrapper'>
                <h1>{isLogin ? "Авторизація" : "Реєстрація"}</h1>
                <form className='form'>
                    <input onChange={(e => setUserName(e.target.value))} type='text'
                           placeholder="Введіть ваше ім'я користувача..."></input>
                    <input onChange={(e => setPassword(e.target.value))} type='password'
                           placeholder='Введіть пароль...'></input>
                </form>
                <div className='button_wrapper'>
                    {isLogin ?
                        <div className='register'>
                            <p>Немає аккаунту?</p>
                            <p className='link' onClick={navigateRegistration}>Зареєструйся</p>
                        </div>
                        :
                        <div className='register'>
                            <p>Є аккаун?</p>
                            <p className='link' onClick={navigateLogin}>Увійди</p>
                        </div>
                    }

                    <button onClick={sign} className='button'>{isLogin ? "УВІЙТИ" : "ЗАРЕЄСТРУВАТИСЯ"}</button>
                </div>

            </div>
        </div>
    )
})

export default Auth;
