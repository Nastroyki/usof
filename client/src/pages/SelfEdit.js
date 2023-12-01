import React, { useContext, useState } from 'react'
import { Context } from "../index";
import "../css/selfedit.css"
import UserImg from '../components/UserImg';
import { changeUser, setAvatar } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';




const SelfEdit = () => {
    const { user } = useContext(Context);
    const [edit, setEdit] = useState(false);

    const [login, setLogin] = useState(user.user.login);
    const [fullName, setFullName] = useState(user.user.full_name);
    const [email, setEmail] = useState(user.user.email);

    const nav = useNavigate();

    let avatar = "";
    // export const changeUser = async (login, password, full_name, email, role, id) => {
    //     const { data } = await API.patch(`api/users/${id}`, {
    //         login,
    //         password,
    //         full_name,
    //         email,
    //         role
    //     })
    //     return data
    // }

    const handleFileChange = async (event) => {
        try {
            await setAvatar(avatar);
            await changeUser(login, "", fullName, email, "", user.user.id);
            nav(0);
        }
        catch (e) {
            try {
                document.getElementById('regerror').innerHTML = e.response.data;
            } catch (f) {
                document.getElementById('regerror').innerHTML = "Something went wrong";
                console.log(e);
            }
        }
    };

    return (
        <div class="container p-3 d-flex justify-content-center" id="userbody">
            <div class="card p-4  " id="userbox">
                <div class=" image d-flex flex-column justify-content-center align-items-center">
                    {!edit ?
                        <div class="d-flex flex-column align-items-center">
                            <UserImg pic={user.user.profile_picture} width="150" height="150" id="avatar" />
                            <p id="login">{user.user.login}</p>

                            <p id="fullName">{user.user.full_name}</p>

                            <p id="email">{user.user.email}</p>

                            <p id="rating">Rating: {user.user.rating}</p>

                            <p id="role">Role: {user.user.role}</p>
                            <div id="line"></div>
                            <div type="button" id="edit" onClick={setEdit}>Edit</div>
                        </div>
                        :
                        <div class="d-flex flex-column align-items-center">
                            <form>
                                <label for="avatar">Avatar</label><br></br>
                                <input id="inpAvatar" type="file" name="avatar" onChange={e => (avatar = e.target.files[0])}></input><br></br><br></br>
                                <label for="login">Login  </label>
                                <input type="text" id="login" name="login" placeholder={user.user.login} value={login} onChange={e => setLogin(e.target.value)}></input><br></br>
                                <label for="fullName">Full name  </label>
                                <input type="text" id="fullName" name="fullName" placeholder={user.user.full_name} value={fullName} onChange={e => setFullName(e.target.value)}></input><br></br>
                                <label for="email">Email  </label>
                                <input type="text" id="email" name="email" placeholder={user.user.email} value={email} onChange={e => setEmail(e.target.value)}></input><br></br><br></br>

                                <p id="regerror"></p>
                                <input id="subButton" type="button" value="Submit" onClick={handleFileChange}></input>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SelfEdit
