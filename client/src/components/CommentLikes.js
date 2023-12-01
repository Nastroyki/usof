import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../index";
import { getCommentLikes, getUserCommentLike, setCommentLike } from '../http/commentAPI';

const CommentLikes = (props) => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState([])
    const [mylike, setMyLike] = useState("")

    try {
        useEffect(() => {
            getCommentLikes(props.comment.id).then(data => {
                setLikes(data.likes - data.dislikes)
                if (user.isAuth) {
                    getUserCommentLike(props.comment.id, user.user.id).then(data => {
                        setMyLike(data.type)
                        setLoading(false)
                    })

                } else {
                    setLoading(false)
                }
            })
        }, [])
    }
    catch (e) {
        setLoading(false)
    }

    let like = () => {
        if(!user.isAuth){
            return
        }
        if (mylike == "like") {
            setLikes(likes - 1)
            setMyLike("")
            setCommentLike(props.comment.id, "")
        }
        else if (mylike == "dislike") {
            setLikes(likes + 2)
            setMyLike("like")
            setCommentLike(props.comment.id, "like")
        }
        else {
            setLikes(likes + 1)
            setMyLike("like")
            setCommentLike(props.comment.id, "like")
        }
    }

    let dislike = () => {
        if(!user.isAuth){
            return
        }
        if (mylike == "dislike") {
            setLikes(likes + 1)
            setMyLike("")
            setCommentLike(props.comment.id, "")
        }
        else if (mylike == "like") {
            setLikes(likes - 2)
            setMyLike("dislike")
            setCommentLike(props.comment.id, "dislike")
        }
        else {
            setLikes(likes - 1)
            setMyLike("dislike")
            setCommentLike(props.comment.id, "dislike")
        }
    }

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div className="comment-likes">
            {mylike == "like" ?
                <div className="comment-like" style={{ color: "green", userSelect: "none"}} onClick={like}>
                    🡅
                </div>
                :
                <div className="comment-like" style={{userSelect: "none"}} onClick={like}>
                    🡅
                </div>}
            <div className="comment-like-count">
                {likes}
            </div>
            {mylike == "dislike" ?
                <div className="comment-dislike" style={{ color: "red", userSelect: "none"}} onClick={dislike}>
                    🡇
                </div>
                :
                <div className="comment-dislike" style={{userSelect: "none"}} onClick={dislike}>
                    🡇
                </div>}

        </div>
    );
}

export default CommentLikes