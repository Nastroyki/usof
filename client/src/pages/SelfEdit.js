import React, { useContext, useState } from 'react'
import { Context } from "../index";
import "../css/selfedit.css"
import UserImg from '../components/UserImg';
import { changeUser, deleteUser, setAvatar } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';




const SelfEdit = (props) => {
    const { user } = useContext(Context);
    let userToEdit = user.user;

    if (props.user) {
        userToEdit = props.user;
    }


    const [edit, setEdit] = useState(false);

    const [login, setLogin] = useState(userToEdit.login);
    const [fullName, setFullName] = useState(userToEdit.full_name);
    const [email, setEmail] = useState(userToEdit.email);

    const nav = useNavigate();

    let avatar = "";

    const handleFileChange = async (event) => {
        try {
            await setAvatar(avatar);
            await changeUser(login, "", fullName, email, "", userToEdit.id);
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

    let selfDelete = async () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(userToEdit.id)
            localStorage.removeItem('token');
            window.location.href = "/";
        }
    }

    return (
        <div class="container p-3 d-flex justify-content-center" id="userbody">
            <div class="card p-4  " id="userbox">
                <div class=" image d-flex flex-column justify-content-center align-items-center">
                    {!edit ?
                        <div class="d-flex flex-column align-items-center">
                            <UserImg pic={userToEdit.profile_picture} width="150" height="150" id="avatar" />
                            <p id="login">{userToEdit.login}</p>

                            <p id="fullName">{userToEdit.full_name}</p>

                            <p id="email">{userToEdit.email}</p>

                            <p id="rating">Rating: {userToEdit.rating}</p>

                            <p id="role">Role: {userToEdit.role}</p>
                            <div id="line"></div>
                            <div id="edit" onClick={setEdit}>Edit</div>
                            <div id="delete" onClick={selfDelete}>Delete</div>
                        </div>
                        :
                        <div class="d-flex flex-column align-items-center">
                            <form>
                                <label for="avatar">Avatar</label><br></br>
                                <input id="inpAvatar" type="file" name="avatar" onChange={e => (avatar = e.target.files[0])}></input><br></br><br></br>
                                <label for="login">Login  </label>
                                <input type="text" id="login" name="login" placeholder={userToEdit.login} value={login} onChange={e => setLogin(e.target.value)}></input><br></br>
                                <label for="fullName">Full name  </label>
                                <input type="text" id="fullName" name="fullName" placeholder={userToEdit.full_name} value={fullName} onChange={e => setFullName(e.target.value)}></input><br></br>
                                <label for="email">Email  </label>
                                <input type="text" id="email" name="email" placeholder={userToEdit.email} value={email} onChange={e => setEmail(e.target.value)}></input><br></br><br></br>

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
