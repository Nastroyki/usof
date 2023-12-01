import React, { useContext, useEffect, useState } from 'react'
import { getLikes, getUserLike, setLike } from '../http/postsAPI'
import { Context } from "../index";

const PostLikes = (props) => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState([])
    const [mylike, setMyLike] = useState("")

    try {
        useEffect(() => {
            getLikes(props.post.id).then(data => {
                setLikes(data.likes - data.dislikes)
                if (user.isAuth) {
                    getUserLike(props.post.id, user.user.id).then(data => {
                        setMyLike(data.type)
                        setLoading(false)
                    })

                } else {
                    setLoading(false)
                }
            })
        }, [])
    }
    catch (e) {
        setLoading(false)
    }

    let like = () => {
        if(!user.isAuth){
            return
        }
        if (mylike == "like") {
            setLikes(likes - 1)
            setMyLike("")
            setLike(props.post.id, "")
        }
        else if (mylike == "dislike") {
            setLikes(likes + 2)
            setMyLike("like")
            setLike(props.post.id, "like")
        }
        else {
            setLikes(likes + 1)
            setMyLike("like")
            setLike(props.post.id, "like")
        }
    }

    let dislike = () => {
        if(!user.isAuth){
            return
        }
        if (mylike == "dislike") {
            setLikes(likes + 1)
            setMyLike("")
            setLike(props.post.id, "")
        }
        else if (mylike == "like") {
            setLikes(likes - 2)
            setMyLike("dislike")
            setLike(props.post.id, "dislike")
        }
        else {
            setLikes(likes - 1)
            setMyLike("dislike")
            setLike(props.post.id, "dislike")
        }
    }

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div className="post-likes">
            {mylike == "like" ?
                <div className="post-like" style={{ color: "green", userSelect: "none"}} onClick={like}>
                    🡅
                </div>
                :
                <div className="post-like" style={{userSelect: "none"}} onClick={like}>
                    🡅
                </div>}
            <div className="post-like-count">
                {likes}
            </div>
            {mylike == "dislike" ?
                <div className="post-dislike" style={{ color: "red", userSelect: "none"}} onClick={dislike}>
                    🡇
                </div>
                :
                <div className="post-dislike" style={{userSelect: "none"}} onClick={dislike}>
                    🡇
                </div>}

        </div>
    );
}

// const [loading, setLoading] = useState(true)

//     try {
//         useEffect(() => {
//             check().then(data => {
//                 if (data) {
//                     console.log(data);
//                     getMe().then(data => {
//                         user.setUser(data)
//                         user.setIsAuth(true)
//                     }).finally(() => setLoading(false))
//                 }
//                 else {
//                     user.setUser({})
//                     user.setIsAuth(false)
//                     setLoading(false)
//                 }
//             })
//         }, [])
//     } catch (e) {
//         setLoading(false)
//     }

//     if (loading) {
//         return <div>Loading</div>
//     }

//     return (
//         <BrowserRouter>
//             <NavBar />
//             <AppRouter />
//         </BrowserRouter>
//     );

export default PostLikes