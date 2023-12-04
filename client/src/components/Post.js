import React, { useContext } from 'react'
import "../css/post.css"
import UserImg from './UserImg'
import PostLikes from './PostLikes'
import { Context } from "../index";
import { deletePost, patchPost } from '../http/postsAPI';
import EditPost from './EditPost';

const Post = (props) => {
    const { user } = useContext(Context);
    const [edit, setEdit] = React.useState(false)

    let date = new Date(props.post.publish_date)
    let allowToEdit = (date.getTime() + 7200000) > Date.now()
    let strDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
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

    let makeSolved = (event) => {
        event.stopPropagation()
        patchPost(props.post.id, props.post.title, props.post.content, props.post.tags, "solved")
        window.location.reload()
    }

    let makeActive = (event) => {
        event.stopPropagation()
        patchPost(props.post.id, props.post.title, props.post.content, props.post.tags, "active")
        window.location.reload()
    }

    let deleteButton = (event) => {
        event.stopPropagation()
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(props.post.id)
        }
        window.location.href = "/"
    }

    let goToUserPage = (event) => {
        event.stopPropagation()
        if (!window.location.href.includes("/user/")) {
            window.location.href = "/user/" + props.post.user.id
        }
    }

    let goToTagPage = (event, id) => {
        event.stopPropagation()
        window.location.href = "/?tag=" + id
    }

    return (
        <div className="post">
            <PostLikes post={props.post} />
            <div className="post-content" onClick={goToPostPage}>
                <div className="post-header">
                    <div className="post-author-avatar" onClick={e => goToUserPage(e)}>
                        <UserImg pic={props.post.user.profile_picture} width="30" height="30" />
                    </div>
                    <div className="post-author-nickname" onClick={e => goToUserPage(e)}>
                        {props.post.user.login}
                    </div>
                    <div className="post-date">
                        {strDate}
                    </div>
                    <div className="post-status" style={{ color: color }}>
                        {status}
                    </div>
                </div>
                {!edit ?
                    <div>
                        <div className="post-body">
                            <div className="post-title">
                                {props.post.title}
                            </div>
                            <div className="post-text" style={{ whiteSpace: "pre-line" }}>
                                {props.post.content}
                            </div>
                        </div>
                        <div className="post-tags">
                            {props.post.tags.length > 0 ?
                                (
                                    props.post.tags.map((tag) => (
                                        <div className="post-tag" key={tag.id} onClick={e => goToTagPage(e, tag.id)}>
                                            <div className="post-tag-name">
                                                {tag.title}
                                            </div>
                                        </div>
                                    ))
                                )
                                :
                                <div></div>
                            }
                            <div style={{ marginLeft: "auto" }}></div>
                            {(user.user.id === props.post.user.id || user.user.role === "admin") && props.post.status === "active" ?
                                <div className="post-tag now-solved-button" onClick={e => makeSolved(e)}>
                                    <div className="post-tag-name">
                                        Now solved
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                            {(user.user.id === props.post.user.id || user.user.role === "admin") && props.post.status === "solved" ?
                                <div className="post-tag now-solved-button" onClick={e => makeActive(e)}>
                                    <div className="post-tag-name">
                                        Now active
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                            {(user.user.id === props.post.user.id || user.user.role === "admin")
                                && window.location.href.includes("/post/")
                                && (allowToEdit || user.user.role === "admin") ?
                                <div className="post-tag edit-button" onClick={() => setEdit(true)}>
                                    <div className="post-tag-name">
                                        Edit
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                            {user.user.id === props.post.user.id || user.user.role === "admin" ?
                                <div className="post-tag delete-button" onClick={e => deleteButton(e)}>
                                    <div className="post-tag-name">
                                        Delete
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                    :
                    <EditPost post={props.post} />
                }
            </div>
        </div>
    )
}

export default Post