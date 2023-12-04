import React, { useContext } from 'react'
import { Context } from "../index";
import UserImg from './UserImg';
import "../css/user.css"
import { deleteUser } from '../http/userAPI';

const User = (props) => {
    const { user } = useContext(Context);
    let deleteButton = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(props.user.id)
        }
        window.location.reload()
    }
    return (
        <div className='up-user'>
            <div className="up-avatar">
                <UserImg pic={props.user.profile_picture} width="100" height="100" />
            </div>
            <div className='up-info'>
                <div className='up-login'>
                    {"Login: "}
                    {props.user.login}
                </div>
                {props.user.full_name !== null ?
                    <div className='up-name'>
                        {"Name: "}
                        {props.user.full_name}
                    </div>
                    :
                    null
                }
                <div className='up-role'>
                    {"Role: "}
                    {props.user.role}
                </div>
                <div className='up-rating'>
                    {"Rating: "}
                    {props.user.rating}
                </div>
            </div>
            {(user.user.role === "admin") ?
                <div className="up-buttons">
                    <div className="up-button up-delete-button" onClick={deleteButton}>
                        Delete
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default User