import { API } from './api';
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password, confirm, email) => {
    const response = await API.post('api/auth/register', {
        login,
        password,
        confirm,
        email
    })
    return response.data
}

export const login = async (login, password) => {
    const {data} = await API.post('api/auth/login', {
        login,
        password
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const confirm = async (login, password, code) => {
    const {data} = await API.post('api/auth/verify-email', {
        login,
        password,
        code
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logout = async () => {
    const {data} = await API.post('api/auth/logout')
    return data
}

export const check = async () => {
    try {
        const {data} = await API.post('api/auth/refresh')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        return null
    }
}

export const getMe = async () => {
    const { data } = await API.get(`api/auth/me`)
    return data
}