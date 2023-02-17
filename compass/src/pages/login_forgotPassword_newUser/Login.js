import React from 'react'
import {  useNavigate, Link, useLocation } from 'react-router-dom'
import compasslogo from '../../images/compassLogo.png';
import { UserAuth } from '../../utilities/AuthContext';
import '../../css/Login.css'

export class user {
    firstName;
    lastName;
}

const Login = () => {
    const navigate = useNavigate();
    const { signIn, user, isLoggedIn } = UserAuth();
    //const from = location.state?.from?.pathname || "/";
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
    const [username, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    //navigate to forgot password screen

    const handleSignIn = (e) => {
        e.preventDefault();
        setError("")
        if (username === "") {
            alert("Username can't be empty");
        } else if (password === "") {
            alert("Password can't be empty");
        }
        try{
            signIn(username,password)
            navigate('/header')
            //navigate('/dashboard')
        }catch(e){
            setError(e.message)
            console.log(error)
        }
    }

    
    return(
        <div className="login">
        <header>
                <p className="slogan">
                    Helping navigate the way for financial freedom yesterday, today, and
                    tomorrow
                </p>
                <img src={compasslogo} className="picture" alt="compass" width="90px" />
                <p>Hi, Welcome Back to Compass Credit Union</p>
        </header>
            
            <form>
                <div>
                    <label htmlFor="username">UserName: </label>
                    <input 
                        type="text" 
                        id="username" 
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <button 
                    type="submit" 
                    className="login-btn" 
                    id="login"
                    onClick={handleSignIn} 
                >Submit</button>
            </form>
            <div>
                <button 
                    type="button" 
                    className="forgotbtn" 
                    onClick={() => {setgoToForgotPassword(true)}}
                >Forgot Password?</button>
            </div>
            <div>
                <button 
                    type="button" 
                    className="new-user-btn" 
                    onClick={() => {setgoToNewUser(true)}}
                >New User?</button>
            </div>
        </div>
    );
}

//export { userData };
//export { userObj };
export default Login;