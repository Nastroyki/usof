import React, { useState } from 'react'
import { patchComment } from '../http/commentAPI';

const EditComment = (props) => {
    const [content, setContent] = useState(props.comment.content);

    let auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    let cancel = () => {
        window.location.reload();
    }

    let saveNewComment = async () => {
        let commentContent = document.getElementsByName("commentContent")[0].value;
        if (commentContent.length < 5) {
            document.getElementsByClassName("new-comment-error")[0].innerHTML = "Content must be at least 5 characters long";
            return;
        }
        try {
            await patchComment(props.comment.id, commentContent);
        } catch (err) {
            document.getElementsByClassName("new-comment-error")[0].innerHTML = "Something went wrong";
            return;
        }
        window.location.reload();
    }

    return (
        <form name="form" className="new-comment-form">
            <div className="form-comment-section">
                <textarea
                    className="comment-input comment-textarea"
                    required
                    type="text"
                    name="commentContent"
                    placeholder="Enter content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onInput={e => auto_grow(e.target)}
                />
            </div>
            <p className="new-comment-error"></p>
            <div className="form-new-comment-section">
                <button className="nc-button" type='button' onClick={saveNewComment}>Save</button>
                <button className="nc-button cancel-comment-button" type='button' onClick={cancel}
                >Cancel</button>
            </div>
        </form>
    )
}

export default EditComment