import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../index";
import { getUser } from '../http/userAPI';
import SelfEdit from './SelfEdit';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const [userToEdit, setUserToEdit] = useState(null)

    if (user.user.role !== "admin") {
        window.location.href = "/"
    }

    const { id } = useParams()

    try {
        useEffect(() => {
            async function fetchData() {
                let user = await getUser(id);
                setUserToEdit(user)
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
            {userToEdit ? <SelfEdit user={userToEdit} /> : null}
        </div>
    )
}

export default EditUser