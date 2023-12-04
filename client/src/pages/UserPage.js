import React, { useEffect, useState } from 'react'
import { getUser } from '../http/userAPI'
import { set } from 'mobx'
import User from '../components/User'
import Posts from './Posts'

const UserPage = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const id = window.location.href.split("/")[4]

    try {
        useEffect(() => {
            async function fetchData() {
                try {
                    let data = await getUser(id);
                    setUser(data)
                    console.log(user)
                } catch (err) {
                    window.location.href = "/"
                }
                setLoading(false)
            }
            fetchData();
        }, [])
    }
    catch (e) {
        setLoading(false)
    }

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div>
            <User user={user} />
            <Posts user_id={id} />
        </div>
    )
}

export default UserPage