import React from 'react'
import CommentLikes from './CommentLikes'
import UserImg from './UserImg'
import "../css/comment.css"

const Comment = (props) => {
    let date = new Date(props.comment.publish_date)
    let strDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
    return (
        <div className="comment">
            <CommentLikes comment={props.comment} />
            <div className="comment-content">
                <div className="comment-header">
                    <div className="comment-author-avatar">
                        <UserImg pic={props.comment.user.profile_picture} width="30" height="30" />
                    </div>
                    <div className="comment-author-nickname">
                        {props.comment.user.login}
                    </div>
                    <div className="comment-date">
                        {strDate}
                    </div>
                </div>
                <div className="comment-body">
                    <div className="comment-text" style={{ whiteSpace: "pre-line" }}>
                        {props.comment.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment