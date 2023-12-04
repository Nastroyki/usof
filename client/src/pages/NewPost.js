import React, { useEffect, useState } from 'react'
import { getTagsBeginWith, newTag } from '../http/tagsAPI';
import "../css/newpost.css"
import { newPost } from '../http/postsAPI';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagsChoice, setTagsChoice] = useState([]);
    const [tagInput, setTagInput] = useState('');


    useEffect(() => {
        checkTags(tagInput);
    }, [tagInput]);

    let checkTags = async (str) => {
        str = str.toLowerCase();
        if (str === "") {
            setTagsChoice([]);
            return;
        }
        try {
            let tags = await getTagsBeginWith(str);
            setTagsChoice(tags);
        } catch (err) {
            setTagsChoice([]);
        }
    }

    let addTag = (tag) => {
        let arr = tags;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === tag.id) {
                return;
            }
        }
        arr.push(tag);
        setTags(arr);
        setTagInput("");
        setTagsChoice([]);
    }

    let delTag = (tag) => {
        let arr = tags;
        arr.splice(arr.indexOf(tag), 1);
        setTags(arr);
        setTagInput("");
        setTagsChoice([]);
    }

    let auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    let showNewTag = () => {
        document.getElementById("new-tag-wrap").style.display = "block";
        document.getElementsByName("newTagTitle")[0].value = tagInput;
        setTagInput("");
        setTagsChoice([]);
        window.scrollTo(0, document.body.scrollHeight);
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
        let tags = await getTagsBeginWith(tagTitle);
        console.log(tags);
        console.log(tags[0]);
        addTag(tags[0]);
    }

    let cancel = () => {
        if(window.confirm("Are you sure you want to cancel?")){
            window.location.href = "/";
        }
    }

    let saveNewPost = async () => {
        let postTitle = document.getElementsByName("postTitle")[0].value;
        let postContent = document.getElementsByName("postContent")[0].value;
        if (postTitle === "" || postContent === "") {
            document.getElementsByClassName("new-post-error")[0].innerHTML = "All input is required";
            return;
        }
        if (postTitle.length < 4) {
            document.getElementsByClassName("new-post-error")[0].innerHTML = "Title must be at least 4 characters long";
            return;
        }
        if (postContent.length < 20) {
            document.getElementsByClassName("new-post-error")[0].innerHTML = "Content must be at least 20 characters long";
            return;
        }
        try {
            await newPost(postTitle, postContent, tags);
        } catch (err) {
            document.getElementsByClassName("new-post-error")[0].innerHTML = "Something went wrong";
            return;
        }
        window.location.href = "/";
    }


    return (
        <form name="form" className="new-post-form">
            <h1>New Post</h1>
            <h3>Title</h3>
            <div className="form-post-section">
                <input
                    className="post-input"
                    required
                    type="text"
                    name="postTitle"
                    placeholder="Enter title"
                    maxLength={100}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <h3>Content</h3>
            <div className="form-post-section">
                <textarea
                    className="post-input post-textarea"
                    required
                    type="text"
                    name="postContent"
                    placeholder="Enter content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onInput={e => auto_grow(e.target)}
                />
            </div>
            <h3>Tags</h3>
            <div className="form-post-section">
                <div className="tags-input-wrap post-input">
                    {tags.length === 0 ? <div></div> :
                        <div className='choisen-tags'>
                            {tags.map((tag) => (
                                <div className='choisen-tag' onClick={() => delTag(tag)} key={tag.id}>
                                    {tag.title}
                                    <span> ✕</span>
                                </div>
                            ))}
                        </div>
                    }
                    <input
                        className="move-input"
                        type="text"
                        name="tags"
                        placeholder="Enter tags"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                    />
                </div>
                {tagInput === "" ? <div></div> :
                    <div className="tags-choice">
                        {tagsChoice.map((tag) => (
                            <div className="tag" onClick={() => addTag(tag)} key={tag.id}>
                                <div className="tag-title">
                                    {tag.title}
                                </div>
                                <div className="tag-description">
                                    {tag.description}
                                </div>
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
                }
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
            <p className="new-post-error"></p>
            <div className="form-new-post-section">
                <button className="np-button" type='submit' onClick={saveNewPost}>Create</button>
                <button className="np-button cancel-post-button" type='button' onClick={cancel}
                >Cancel</button>
            </div>
        </form>
    )
}

export default NewPost