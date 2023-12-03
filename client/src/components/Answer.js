import React from 'react'
import "../css/answer.css"

const Answer = (props) => {
    let date = new Date(props.answer.publish_date)
    let strDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    return (
        <div className='answer'>
            <div className="answer-content">
                <div className="answer-header">
                    <div className="answer-author-nickname">
                        {props.answer.user.login}
                    </div>
                    <div className="answer-date">
                        {strDate}
                    </div>
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