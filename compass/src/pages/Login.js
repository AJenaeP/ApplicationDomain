import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from "firebase/auth";
//import { auth, db }  from "../index"
//import { auth } from '../AuthContext'
import { collection, query, where, getDocs } from "firebase/firestore"
import compasslogo from '../images/compasslogo.png';
import { UserAuth } from '../AuthContext';
import Header from './Header';
import '../css/Login.css'

export class user {
    firstName;
    lastName;
}



const Login = () => {
    const navigate = useNavigate();
    const [goToForgotPassword, setgoToForgotPassword] = React.useState(false);
    if (goToForgotPassword) {
        navigate('/forgotpassword')
    };
    //navigate to new user screen
    const [goToNewUser, setgoToNewUser] = React.useState(false);
    if (goToNewUser) {
        navigate('/newuser')
    };
    const [error, setError] = React.useState('')
    const { signIn } = UserAuth();
    const [UserName, setUserName] = React.useState("")
    const [Password, setPassword] = React.useState("")
    //navigate to forgot password screen
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("")
        if (UserName === "") {
            alert("Username can't be empty");
        } else if (Password === "") {
            alert("Password can't be empty");
        }
        try{
            signIn(UserName,Password)
            //useNavigate('/header')
        }catch(e){
            setError(e.message)
            console.log(e.message)
        }
    }
    
    return(
        <div className="login">
        <header>
                <p class="slogan">
                    Helping navigate the way for financial freedom yesterday, today, and
                    tomorrow
                </p>
                <img src={compasslogo} class="picture" alt="compass" width="90px" />
        </header>
            
            <form onSubmit={handleSignIn}>
                <div>
                    <label htmlfor="username">UserName: </label>
                    <input type="text" id="username" onChange={(e) => setUserName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="password">Password: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" class="login-btn" id="login" onClick={signIn}>Submit</button>
            </form>
            <div>
                <button type="button" class="forgotbtn" onClick={() => {setgoToForgotPassword(true)}}>Forgot Password?</button>
            </div>
            <div>
                <button type="button" class="new-user-btn" onClick={() => {setgoToNewUser(true)}}>New User?</button>
            </div>
        </div>
    );
}

//export { userData };
//export { userObj };
export default Login;