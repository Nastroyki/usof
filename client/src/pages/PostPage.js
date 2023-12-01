import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../index";
import { getPost, getPostComments, getPostTags } from '../http/postsAPI';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import { getUser } from '../http/userAPI';
import Comment from '../components/Comment';
import { getCommentLikes } from '../http/commentAPI';

const PostPage = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    try {
        useEffect(() => {
            async function fetchData() {
                let post = await getPost(id);
                post.user = await getUser(post.user_id);
                post.tags = await getPostTags(post.id);
                let comments = await getPostComments(post.id);
                for (let i = 0; i < comments.length; i++) {
                    comments[i].user = await getUser(comments[i].user_id);
                    let likes = await getCommentLikes(comments[i].id);
                    comments[i].likes = likes.likes - likes.dislikes;
                    console.log(comments[i].likes)
                }
                comments.sort((a, b) => b.likes - a.likes);
                setComments(comments)
                setPost(post)
                setLoading(false)
            }
            fetchData();
        }, [])
    }
    catch (e) {
        setLoading(false)
    }


    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div>
            <Post post={post} />
            <div class="comments-container">
                {comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </div>

    )
}

export default PostPage