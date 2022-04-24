import React, {useContext, useState} from 'react';
import './admin.css'
import {Context} from "../../index";
import {$authHost} from "../../http";

const Admin = () => {
    const {user} = useContext(Context)
    const [posts, setPosts] = useState([])
    const getUsers = async () => {
        try {

            const {data} = await $authHost.get('/api/users')
            setPosts(data)
            console.log(data)
        } catch (e) {
            alert("Потрібни зайти з адмін аккаунту")
        }
    }
    return (
        <div className='container2'>
            <button style={{width:'100%', textAlign: 'center', marginTop: 20, height: '50px'}} onClick={getUsers}>Показати користувачів</button>
            <h1 style={{width:'100%', textAlign: 'center'}}>Список користувачів</h1>
            {posts.map(({_id, username, roles}) =>
                <div className='card'>
                    <h4>ID:{_id}.</h4>
                    <p> Username:<strong>{username}</strong></p>
                    <p>ROLE: <strong>{roles}</strong></p>
                </div>
            )}
        </div>
    );
};

export default Admin;
