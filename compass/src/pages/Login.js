import React from 'react'
import {  useNavigate } from 'react-router-dom'
import compasslogo from '../images/compasslogo.jpg';
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
    const [username, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    //navigate to forgot password screen
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("")
        if (username === "") {
            alert("Username can't be empty");
        } else if (password === "") {
            alert("Password can't be empty");
        }
        try{
            await signIn(username,password)
            navigate('/header')
        }catch(e){
            setError(e.message)
            console.log(e.message)
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
            
            <form onSubmit={handleSignIn}>
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
                    onClick={signIn}
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