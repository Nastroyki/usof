import { API } from './api';

export const deleteAnswer = async (id) => {
    const { data } = await API.delete(`api/comment-answers/${id}`)
    return data
}