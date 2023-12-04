import React, { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'
import { getPostTags, getPosts } from '../http/postsAPI'
import { getUser } from '../http/userAPI'
import { useSearchParams } from 'react-router-dom'
import { Context } from "../index";
import FloatingAddButton from '../components/FloatingAddButton'
import { getTag } from '../http/tagsAPI'

const Posts = (props) => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])
    let len;
    let limit;
    const [pagesCount, setPagesCount] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(searchParams.get("page"))

    const [tagName, setTagName] = useState(null)

    let pageDelay = 1;

    useEffect(() => {
        pageDelay = page
    }, [page])


    let tag = searchParams.get("tag")
    let status = searchParams.get("status")
    let sort = searchParams.get("sort")
    let order = searchParams.get("order")
    let user_id = searchParams.get("userid")

    if (props.user_id) {
        user_id = props.user_id
    }

    if (!page) {
        setPage(1)
    }

    let uncheck = () => {
        document.getElementById("active").checked = false;
        document.getElementById("solved").checked = false;
        document.getElementById("new").checked = false;
        document.getElementById("old").checked = false;
        check()
    }

    let check = (reset = true) => {
        if (document.getElementById("active").checked) {
            status = "active"
        }
        else if (document.getElementById("solved").checked) {
            status = "solved"
        } else {
            status = "null"
        }
        if (document.getElementById("new").checked) {
            order = "DESC"
        }
        else if (document.getElementById("old").checked) {
            order = "ASC"
        } else {
            order = "null"
        }
        if (reset) {
            setPage(1)
        }
        update().then(data => {
            setPosts(data.posts)
            len = data.len
            limit = data.limit
            setPagesCount(Math.ceil(len / limit) || 1);
            console.log(pagesCount);
            setLoading(false)
        })
    }

    let pagePlus = () => {
        pageDelay = page + 1
        setPage(page + 1)
        console.log(`page: ${page}`);
        check(false)
    }

    let pageMinus = () => {
        pageDelay = page - 1
        setPage(page - 1)
        console.log(`page: ${page}`);
        check(false)
    }

    let update = async () => {
        tagUpdate()
        let posts = await getPosts(pageDelay, tag, status, sort, order, user_id)
        for (let i = 0; i < posts.posts.length; i++) {
            let user = await getUser(posts.posts[i].user_id)
            let tags = await getPostTags(posts.posts[i].id)
            console.log(tags);
            posts.posts[i].user = user
            posts.posts[i].tags = tags
        }
        return posts
    }

    let tagUpdate = async () => {
        if (tag) {
            let tagData = await getTag(tag)
            setTagName(tagData.title)
        }
    }

    try {
        useEffect(() => {
            update().then(data => {
                setPosts(data.posts)
                len = data.len
                limit = data.limit
                setPagesCount(Math.ceil(len / limit) || 1);
                setLoading(false)
            })
        }, [])
    } catch (e) {
        setLoading(false)
    }

    if (loading) {
        return <div>Loading</div>
    }

    console.log(posts);

    return (
        <div>
            <form>
                <ul id='sortbar'>
                    <li><div className='wrapper'>
                        {tagName ? <div>
                            <input type="button" id="tag" name="sort" value="tag" onClick={() => {window.location.href = "/"}}></input><label htmlFor="tag">{tagName}</label>
                        </div> : null}
                        <input type="button" id="all" name="status" value="all" onClick={uncheck}></input><label htmlFor="all">All</label>
                        <input type="radio" id="active" name="status" value="active" onClick={check}></input><label htmlFor="active">Active</label>
                        <input type="radio" id="solved" name="status" value="solved" onClick={check}></input><label htmlFor="solved">Solved</label>
                        <input type="radio" id="new" name="date" value="new" onClick={check}></input><label htmlFor="new">New</label>
                        <input type="radio" id="old" name="date" value="old" onClick={check}></input><label htmlFor="old">Old</label>

                    </div></li>
                </ul>
            </form>
            <form>
                <ul className='pagesbar'>
                    <li><div className='wrapper'>
                        {page != 1 ? <div><input type="button" id="page1" name="page1" value="page1" onClick={pageMinus}></input><label htmlFor="page1">🡐</label></div> : <div style={{ width: "54px" }}></div>}
                        <input type="button" id="page2" name="page2" value="page2"></input><label htmlFor="page2"><span id="labelpage">{page}</span>/{pagesCount}</label>
                        {page != pagesCount ? <div><input type="button" id="page3" name="page3" value="page3" onClick={pagePlus}></input><label htmlFor="page3">🡒</label></div> : <div style={{ width: "54px" }}></div>}

                    </div></li>
                </ul>
            </form>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {user.isAuth ?
                <FloatingAddButton />
                :
                <div></div>
            }
        </div>
    )
}

export default Posts