import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import Admin from "./Admin/Admin";

const AppRoute = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>
            )}
            {publicRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>
            )}
            <Route path='/*'  element={<Admin />} />
        </Routes>
    );
};

export default AppRoute;
