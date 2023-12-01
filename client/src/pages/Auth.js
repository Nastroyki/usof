import React, { useContext, useState } from 'react'
import "../css/auth.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { CONFIRM_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { confirm, getMe, login, registration } from '../http/authAPI'
import { observer } from 'mobx-react-lite'
import { Context } from "../index";
import { getUser } from '../http/userAPI'

const Auth = observer(() => {
    const { user } = useContext(Context)
    const nav = useNavigate()

    const location = useLocation()
    const path = location.pathname;

    const [regLogin, setRegLogin] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regConfPass, setRegConfPass] = useState('')
    const [regEmail, setRegEmail] = useState('')

    const [logLogin, setLogLogin] = useState('')
    const [logPassword, setLogPassword] = useState('')

    const [confLogin, setConfLogin] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [confCode, setConfCode] = useState('')

    const [error, setError] = useState('')


    const signUp = async () => {
        try {
            const response = await registration(regLogin, regPassword, regConfPass, regEmail);
            console.log(response);
            nav(CONFIRM_ROUTE)
            nav(0)
        } catch (e) {
            try {
                document.getElementById('regerror').innerHTML = e.response.data;
            } catch (f) {
                document.getElementById('regerror').innerHTML = "Something went wrong";
                console.log(e);
            }
        }
    }

    const conf = async () => {
        try {
            const data = await confirm(confLogin, confPassword, confCode);
            console.log(data);
            const userData = await getMe();
            nav(POSTS_ROUTE)
            user.setUser(userData);
            user.setIsAuth(true);
        } catch (e) {
            document.getElementById('conferror').innerHTML = e.response.data;
        }
    }


    const logIn = async () => {
        try {
            const data = await login(logLogin, logPassword);
            console.log(data);
            const userData = await getMe();
            user.setUser(userData);
            nav(POSTS_ROUTE)
            user.setIsAuth(true);
        } catch (e) {
            document.getElementById('logerror').innerHTML = e.response.data;
        }
    }


    return (
        <div className="container">
            <div className="login-container">

                {(path == REGISTRATION_ROUTE) ?
                    <form name="form" className="form">
                        <h1>Registration</h1>
                        <div className="form-section">
                            <input
                                className="input"
                                required
                                type="text"
                                name="login"
                                placeholder="Login"
                                size="20"
                                value={regLogin}
                                onChange={e => setRegLogin(e.target.value)}
                            />
                        </div>
                        <div className="form-section">
                            <input
                                className="input"
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                                size="20"
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-section">
                            <input
                                className="input"
                                required
                                type="password"
                                name="confPass"
                                placeholder="Confirm password"
                                size="20"
                                value={regConfPass}
                                onChange={e => setRegConfPass(e.target.value)}
                            />
                        </div>
                        <div className="form-section">
                            <input
                                className="input"
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                size="20"
                                value={regEmail}
                                onChange={e => setRegEmail(e.target.value)}
                            />
                        </div>
                        <input
                            id="regButton"
                            type="button"
                            value="Sign Up"
                            onClick={signUp}
                            className="button"
                        />
                        <p id="regerror" value={error}></p>
                        <span className="reminder">Already have an account? <a href="/login">Login</a></span>
                        <span className="reminder" >Want to confirm email? <a href="/confirm" style={{ fontSize: "1.2rem" }}>Confirm</a></span>
                    </form>
                    : (path == CONFIRM_ROUTE) ?
                        <form name="form" className="form">
                            <h1>Confirm</h1>
                            <div className="form-section">
                                <input
                                    className="input"
                                    required
                                    type="text"
                                    name="login"
                                    placeholder="Login"
                                    size="20"
                                    value={confLogin}
                                    onChange={e => setConfLogin(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <input
                                    className="input"
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    size="20"
                                    value={confPassword}
                                    onChange={e => setConfPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <input
                                    className="input"
                                    required
                                    type="text"
                                    name="email_code"
                                    placeholder="Code"
                                    size="20"
                                    value={confCode}
                                    onChange={e => setConfCode(e.target.value)}
                                />
                            </div>
                            <input
                                id="regButton"
                                type="button"
                                value="Confirm"
                                onClick={conf}
                                className="button"
                            />
                            <p id="conferror" value={error}></p>
                            <span className="reminder">Already have an account? <a href="/login">Login</a></span>
                            <span className="reminder" >Want to register? <a href="/registration" style={{ fontSize: "1.2rem" }}>Register</a></span>
                        </form>
                        :
                        <form name="form" className="form">
                            <h1>Login</h1>
                            <div className="form-section">
                                <input
                                    className="input"
                                    required
                                    type="text"
                                    name="login"
                                    placeholder="Login"
                                    size="20"
                                    value={logLogin}
                                    onChange={e => setLogLogin(e.target.value)}
                                />
                            </div>
                            <div className="form-section">
                                <input
                                    className="input"
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    size="20"
                                    value={logPassword}
                                    onChange={e => setLogPassword(e.target.value)}
                                />
                            </div>
                            <input
                                id="regButton"
                                type="button"
                                value="Sign In"
                                onClick={logIn}
                                className="button"
                            />
                            <p id="logerror"></p>
                            <span className="reminder">Don't have an account? <a href="/registration">Sign Up</a></span>
                        </form>
                }
            </div>
        </div>
    )
})

export default Auth