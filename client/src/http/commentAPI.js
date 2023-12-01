import { API } from './api';

export const getCommentLikes = async (id) => {
    const { data } = await API.get(`api/comments/${id}/likes`)
    return data
}

export const getUserCommentLike = async (id, user_id) => {
    const { data } = await API.get(`api/comments/${id}/likes/${user_id}`)
    return data
}

export const setCommentLike = async (id, type) => {
    const { data } = await API.post(`api/comments/${id}/likes`, { type })
    return data
}
