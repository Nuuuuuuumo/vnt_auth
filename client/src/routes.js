import {ADMIN_ROUTE, AUTH_OK, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./components/Login/Auth";
import Admin from "./components/Admin/Admin";
import AuthOk from "./components/AuthOk/AuthOk";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: AUTH_OK,
        component: <AuthOk/>
    }


]