import React, { useContext } from 'react'
import "../css/answer.css"
import { Context } from "../index";
import { deleteAnswer } from '../http/answerAPI';

const Answer = (props) => {
    const { user } = useContext(Context);
    let date = new Date(props.answer.publish_date)
    let strDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()


    let deleteButton = (event) => {
        if (window.confirm("Are you sure you want to delete this answer?")) {
            deleteAnswer(props.answer.id)
        }
        window.location.reload()
    }

    let goToUserPage = (event) => {
        event.stopPropagation()
        if (!window.location.href.includes("/user/")) {
            window.location.href = "/user/" + props.answer.user.id
        }
    }

    return (
        <div className='answer'>
            <div className="answer-content">
                <div className="answer-header">
                    <div className="answer-author-nickname" onClick={e => goToUserPage(e)}>
                        {props.answer.user.login}
                    </div>
                    <div className="answer-date">
                        {strDate}
                    </div>
                    <div style={{ marginLeft: "auto" }}></div>
                    {(user.user.id === props.answer.user.id || user.user.role === "admin") ?
                        <div className="answer-button answer-delete-button" onClick={e => deleteButton(e)}>
                            Delete
                        </div> 
                        :
                        null
                    }
                </div>
                <div className="answer-body">
                    <div className="answer-text" style={{ whiteSpace: "pre-line" }}>
                        {props.answer.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Answer