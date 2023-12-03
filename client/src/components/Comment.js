import React, { useContext, useState } from 'react'
import CommentLikes from './CommentLikes'
import UserImg from './UserImg'
import "../css/comment.css"
import Answer from './Answer'
import { Context } from "../index";
import { newAnswer } from '../http/commentAPI'

const Comment = (props) => {
    const { user } = useContext(Context);

    const [addAnswer, setAddAnswer] = useState(false)

    let date = new Date(props.comment.publish_date)
    let strDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()

    let saveNewAnswer = async () => {
        let answerContent = document.getElementsByClassName("answer-textarea")[0].value;
        if (answerContent === "") {
            document.getElementsByClassName("answer-error")[0].innerHTML = "All input is required";
            return;
        }
        if (answerContent.length < 5) {
            document.getElementsByClassName("answer-error")[0].innerHTML = "Comment must be at least 5 characters long";
            return;
        }
        try {
            await newAnswer(props.comment.id, answerContent);
        } catch (err) {
            document.getElementsByClassName("answer-error")[0].innerHTML = "Something went wrong";
            return;
        }
        window.location.href = "/post/" + props.comment.post_id;
    }

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
                <div className="answers-container">
                    {props.comment.answers.map(answer => (
                        <Answer answer={answer} key={answer.id} />
                    ))}
                    {user.isAuth ? <div>
                        {addAnswer ?
                            <div className="answer-form">
                                <textarea className="answer-textarea" placeholder="Your answer" />
                                <p className="answer-error"></p>
                                <div className="answer-buttons">
                                    <button className="na-button" type='submit' onClick={saveNewAnswer}>Add</button>
                                    <button className="na-button cancel-answer-button" type='button' onClick={() => setAddAnswer(false)}
                                    >Cancel</button>
                                </div>
                            </div>
                            :
                            <div className="add-answer" onClick={() => setAddAnswer(true)}>
                                Add answer
                            </div>
                        }
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Comment