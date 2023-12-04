import { API } from './api';

export const getTags = async () => {
    const { data } = await API.get(`api/tags`)
    return data
}

export const getTagsBeginWith = async (search) => {
    const { data } = await API.get(`api/tags?search=${search}`)
    return data
}

export const newTag= async (title, description) => {
    const { data } = await API.post(`api/tags`, {title, description})
    return data
}

export const getTag = async (id) => {
    const { data } = await API.get(`api/tags/${id}`)
    return data
}
