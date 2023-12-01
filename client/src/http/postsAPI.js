import { API } from './api';

export const getPosts = async (page, tag, status, sort, order) => {
    const { data } = await API.get(`api/posts?page=${page}&tag=${tag}&status=${status}&sort=${sort}&order=${order}`)
    return data
}

export const getPost = async (id) => {
    const { data } = await API.get(`api/posts/${id}`)
    return data
}

export const getLikes = async (id) => {
    const { data } = await API.get(`api/posts/${id}/like`)
    return data
}

export const getUserLike = async (id, user_id) => {
    const { data } = await API.get(`api/posts/${id}/like/${user_id}`)
    return data
}

export const setLike = async (id, type) => {
    const { data } = await API.post(`api/posts/${id}/like`, { type })
    return data
}

export const newPost = async (title, content, tags) => {
    const { data } = await API.post(`api/posts`, { title, content, tags })
    return data
}

export const getPostTags = async (post_id) => {
    const { data } = await API.get(`api/posts/${post_id}/tags`)
    return data
}

export const getPostComments = async (post_id) => {
    const { data } = await API.get(`api/posts/${post_id}/comments`)
    return data
}