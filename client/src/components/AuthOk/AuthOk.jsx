import React from 'react';
import './auth.css'

const AuthOk = () => {
    return (
        <div className='container'>
            <div>
                <button className='knopka'>Create</button>
                <button className='knopka'>Read</button>
            </div>
            <div>
                <button className='knopka'>Update</button>
                <button className='knopka'>Delete</button>
            </div>

        </div>
    );
};

export default AuthOk;
