import axios from "axios";
import {LOGIN_ROUTE} from "../utils/consts";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL

})

const authInterceptor = response => {
    response.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return response
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}