import { API } from './api';

export const getUser = async (id) => {
    const { data } = await API.get(`api/users/${id}`)
    return data
}

export const setAvatar = async (file) => {
    console.log("file");
    try {
        const formData = new FormData()
        formData.append('profile_picture', file)
        const { data } = await API.patch(`api/users/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (e) {
        console.log(e);
        return null
    }
}

export const changeUser = async (login, password, full_name, email, role, id) => {
    const { data } = await API.patch(`api/users/${id}`, {
        login,
        password,
        full_name,
        email,
        role
    })
    return data
}

export const deleteUser = async (id) => {
    const { data } = await API.delete(`api/users/${id}`)
    return data
}