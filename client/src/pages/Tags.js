import React, { useContext, useEffect, useState } from 'react'
import { deleteTag, getTagsBeginWith, newTag } from '../http/tagsAPI';
import "../css/tags.css"
import { Context } from "../index";

const Tags = () => {
    const { user } = useContext(Context);
    const [tagsChoice, setTagsChoice] = useState([]);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        checkTags(tagInput);
    }, [tagInput]);

    let checkTags = async (str) => {
        str = str.toLowerCase();
        try {
            let tags = await getTagsBeginWith(str);
            setTagsChoice(tags);
        } catch (err) {
            setTagsChoice([]);
        }
    }

    let showNewTag = () => {
        document.getElementById("new-tag-wrap").style.display = "block";
        document.getElementsByName("newTagTitle")[0].value = tagInput;
        window.scrollTo(0, document.body.scrollHeight);
    }

    let auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    let saveNewTag = async () => {
        document.getElementsByClassName("new-tag-error")[0].innerHTML = "";
        let tagTitle = document.getElementsByName("newTagTitle")[0].value.toLowerCase();
        let tagDescription = document.getElementsByName("newTagDescription")[0].value;
        if (tagTitle === "" || tagDescription === "") {
            document.getElementsByClassName("new-tag-error")[0].innerHTML = "All input is required";
            return;
        }
        try {
            await newTag(tagTitle, tagDescription);
        } catch (err) {
            document.getElementsByClassName("new-tag-error")[0].innerHTML = "Such tag already exists";
            return;
        }
        document.getElementById("new-tag-wrap").style.display = "none";
        document.getElementsByName("newTagTitle")[0].value = "";
        document.getElementsByName("newTagDescription")[0].value = "";
        window.location.reload();
    }

    let delTag = (event, id) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this tag?")) {
            deleteTag(id);
            window.location.reload();
        }
    }


    return (
        <div className='tags-page'>
            <input
                className="move-input tags-input"
                type="text"
                name="tags"
                placeholder="Enter tags"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
            />
            <div className="tags-choice">
                {tagsChoice.map((tag) => (
                    <div className="tag" onClick={() => window.location.href = "/?tag=" + tag.id}>
                        <div className="tag-title">
                            {tag.title}
                        </div>
                        <div className="tag-description">
                            {tag.description}
                        </div>
                        {user.user.role === "admin" ?
                            <div>
                                <div className="tag-space"></div>
                                <button className='delete-tag-button' onClick={e => delTag(e, tag.id)}>Delete</button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                ))}
                <div className="tag add-tag" onClick={showNewTag}>
                    <div className="add-tag-title tag-title">
                        Add tag
                    </div>
                    <div className="add-tag-description">
                        If you don't find the tag you need, you can click here to add it.
                    </div>
                </div>
            </div>
            <div className='new-tag-wrap' id='new-tag-wrap'>
                <h4>New tag</h4>
                <input
                    className="post-input"
                    required
                    type="text"
                    name="newTagTitle"
                    placeholder="Enter title"
                    maxLength={20}
                    style={{ fontSize: "medium" }}
                />
                <h5>Description</h5>
                <textarea
                    className="post-input post-textarea"
                    style={{ minHeight: "90px" }}
                    required
                    type="text"
                    name="newTagDescription"
                    placeholder="Enter description"
                    maxLength={250}
                    onInput={e => auto_grow(e.target)}
                />
                <p className="new-tag-error"></p>
                <button className="np-button add-tag-button" type='button' onClick={saveNewTag}>Add tag</button>
                <button className="np-button cancel-tag-button" type='button'
                    onClick={() => document.getElementById("new-tag-wrap").style.display = "none"}>
                    Cancel</button>
            </div>
        </div>
    )
}

export default Tags