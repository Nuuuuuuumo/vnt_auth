import React, {useContext} from 'react';
import './navbar.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE} from "../../utils/consts";

const Navbar = observer(() => {
    const navigate = useNavigate()
    const login = () => {
        navigate('/login')
    }
    const admin = () => {
        navigate(ADMIN_ROUTE)
    }
    const {user} = useContext(Context)
    const logOut = () => {
        navigate('/login')
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }


    return (
        <div className='navbar'>
            <button className='logo'>LOGO</button>
            {user.isAuth
                ?
                <ul className='link'>
                    <button onClick={admin}>ADMIN</button>
                    <button onClick={() => logOut()}>LOG OUT</button>
                </ul>
                :
                <ul className='link2'>
                    <button onClick={login}>LOGIN</button>
                </ul>
            }
        </div>
    );

})
export default Navbar;
