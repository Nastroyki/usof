import React from 'react'
import "../css/post.css"
import UserImg from './UserImg'
import PostLikes from './PostLikes'

const Post = (props) => {
    let date = new Date(props.post.publish_date)
    let strDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
    let status = props.post.status
    let color = "#04AA6D"
    if (status == "active") {
        status = "Active"
    }
    if (status == "solved") {
        status = "Solved"
        color = "#777777"
    }

    let goToPostPage = () => {
        if (!window.location.href.includes("/post/")) {
            window.location.href = "/post/" + props.post.id
        }
    }

    return (
        <div className="post">
            <PostLikes post={props.post} />
            <div className="post-content" onClick={goToPostPage}>
                <div className="post-header">
                    <div className="post-author-avatar">
                        <UserImg pic={props.post.user.profile_picture} width="30" height="30" />
                    </div>
                    <div className="post-author-nickname">
                        {props.post.user.login}
                    </div>
                    <div className="post-date">
                        {strDate}
                    </div>
                    <div className="post-status" style={{ color: color }}>
                        {status}
                    </div>
                </div>
                <div className="post-body">
                    <div className="post-title">
                        {props.post.title}
                    </div>
                    <div className="post-text" style={{ whiteSpace: "pre-line" }}>
                        {props.post.content}
                    </div>
                </div>
                {props.post.tags.length > 0 ?
                    <div className="post-tags">
                        {props.post.tags.map((tag) => (
                            <div className="post-tag">
                                <div className="post-tag-name">
                                    {tag.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Post