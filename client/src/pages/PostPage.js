import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../index";
import { getPost, getPostComments, getPostTags, newComment } from '../http/postsAPI';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import { getUser } from '../http/userAPI';
import Comment from '../components/Comment';
import { getCommentAnswers, getCommentLikes } from '../http/commentAPI';

const PostPage = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState(false)

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
                    comments[i].answers = await getCommentAnswers(comments[i].id);
                    for (let j = 0; j < comments[i].answers.length; j++) {
                        comments[i].answers[j].user = await getUser(comments[i].answers[j].user_id);
                    }
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

    let saveNewComment = async () => {
        let commentContent = document.getElementsByClassName("comment-textarea")[0].value;
        if (commentContent === "") {
            document.getElementsByClassName("comment-error")[0].innerHTML = "All input is required";
            return;
        }
        if (commentContent.length < 5) {
            document.getElementsByClassName("comment-error")[0].innerHTML = "Comment must be at least 5 characters long";
            return;
        }
        try {
            await newComment(post.id, commentContent);
        } catch (err) {
            document.getElementsByClassName("comment-error")[0].innerHTML = "Something went wrong";
            return;
        }
        window.location.href = "/post/" + post.id;

    }

    // let saveNewAnswer = async () => {
    //     let answerContent = document.getElementsByClassName("answer-textarea")[0].value;
    //     if (answerContent === "") {
    //         document.getElementsByClassName("answer-error")[0].innerHTML = "All input is required";
    //         return;
    //     }
    //     if (answerContent.length < 5) {
    //         document.getElementsByClassName("answer-error")[0].innerHTML = "Comment must be at least 5 characters long";
    //         return;
    //     }
    //     try {
    //         await newAnswer(props.comment.id, answerContent);
    //     } catch (err) {
    //         document.getElementsByClassName("answer-error")[0].innerHTML = "Something went wrong";
    //         return;
    //     }
    //     window.location.href = "/post/" + props.comment.post_id;
    // }

    let auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }


    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div>
            <Post post={post} />
            {user.isAuth ? <div>
                {addComment ?
                    <div className="comment-form">
                        <textarea className="comment-textarea" placeholder="Your comment" onInput={e => auto_grow(e.target)} />
                        <p className="comment-error"></p>
                        <div className="comment-buttons">
                            <button className="nc-button" type='submit' onClick={saveNewComment}>Add</button>
                            <button className="nc-button cancel-comment-button" type='button' onClick={() => setAddComment(false)}
                            >Cancel</button>
                        </div>
                    </div>
                    :
                    <button className="add-comment" type='button' onClick={() => setAddComment(true)}>
                        Add comment
                    </button>
                }
            </div> : <div></div>}
            <div className="comments-container">
                {comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </div>

    )
}

export default PostPage