import React, { useContext } from 'react'
import "../css/navbar.css"
import Logo from './Logo'
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { logout, getMe } from '../http/authAPI';
import UserImg from './UserImg';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        logout()
    }
    const login = user.user.login
    return (
        <ul id='navbar'>
            <li className='logo'><Logo /></li>
            <li className='logo'><span style={{ fontFamily: "Oswald", color: "#04AA6D", fontSize: 29, fontWeight: 500 }}>edium<span id='mediumWell'>Code</span></span></li>
            <li><a href="/">Main page</a></li>
            {user.isAuth ?
                    <div>
                    <li style={{ float: "right" }}><a href="/" onClick={() => logOut()}>Logout</a></li>
                    <li style={{ float: "right" }}><a href="/selfedit"><UserImg pic={user.user.profile_picture} width="30" height="30" id="avatar" /><span> {login}</span></a></li>
                    <li style={{ float: "right" }} className='user-role'>{user.user.role}</li>
                    </div>
                :
                <div>
                    <li style={{ float: "right" }}><a className="active" href="/login">Login</a></li>
                    <li style={{ float: "right" }}><a href="/registration">Register</a></li>
                </div>

            }
        </ul>
    )
})

export default NavBar