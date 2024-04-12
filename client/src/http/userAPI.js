import {$authHost, $host} from "./index";
import { jwtDecode } from 'jwt-decode';

export const Registration = async (Login, Password) => {
    const {data} = await $host.post('api/user/registration', {Login, Password, role: 'Пользователь'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const Login = async (Login, Password) => {
    const {data} = await $host.post('api/user/login', {Login, Password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const Check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}