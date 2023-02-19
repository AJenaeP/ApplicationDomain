import React from 'react'
import {  useNavigate, Link, useLocation } from 'react-router-dom'
import compasslogo from '../../images/compassLogo.png';
import { UserAuth } from '../../utilities/AuthContext'; 
import { FormControl, Container, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done';
import '../../css/Login.css'
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { green, red } from '@mui/material/colors';

export class user {
    firstName;
    lastName;
}

const Login = () => {
    const navigate = useNavigate();
    //values pulled from authcontext
    const { signIn, user, isLoggedIn } = UserAuth();
    
    //navigate to forgot password
    const [goToForgotPassword, setgoToForgotPassword] = React.useState(false);
    if (goToForgotPassword) {
        navigate('/forgotpassword')
    };
    //navigate to new user screen
    const [goToNewUser, setgoToNewUser] = React.useState(false);
    if (goToNewUser) {
        navigate('/newuser')
    };
    //navigate to home screen
    const [goToHome, setgoToHome] = React.useState(false);
    if (goToHome) {
        navigate('/home')
    };
    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    //navigate to forgot password screen

    //this calls signin function from authcontext
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
                <div className="title">
                    <h1 className="company-name">Compass Credit Union</h1>
                    <p className="slogan">
                        Helping navigate the way for financial freedom yesterday, today, and
                        tomorrow
                    </p>
                </div>
                <div className="imgcontainer">
                    <img src={compasslogo} alt="Avatar" className="picture" />
                </div>
            </header>
            <Container className="form" style={{ width: 400, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div id='formHeader'>
                    <h1>Login</h1>
                    <p>Please fill in this form to login to your account.</p>
                </div>
                <FormControl id="formcontrol" onSubmit={handleSignIn}>
                        <TextField
                            id="outlined-password-input Username"
                            label="Username"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            style={{marginBottom: 10, marginTop: 20}}
                        />
                        <TextField
                            id="outlined-password-input password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            style={{ marginBottom: 60 }}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            variant='outlined'
                            size='large'
                            type='submit'
                            style={{ width: 225, marginBottom:10 }}
                            startIcon={<DoneIcon />}
                            className='submit'
                            onClick={() => { setgoToHome(true) }}
                            sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)'}}}
                        >
                            Login
                        </Button>
                        <Button
                            variant='outlined'
                            size='large'
                            style={{ width: 225, marginBottom:10 }}
                            startIcon={<QuestionMarkIcon fontSize='14px' sx={{marginLeft: -2}}/>}
                            className='forgot'
                            onClick={() => { setgoToForgotPassword(true) }}
                            sx={{ ':hover': { bgcolor: 'rgb(252, 229, 83,0.2)' } }}
                        >
                            Forgot Password
                        </Button>
                        <Button
                            variant='outlined'
                            size='large'
                            style={{ width: 225, }}
                            startIcon={<ClearIcon />}
                            className='cancel'
                            onClick={() => { setgoToHome(true) }}
                            sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                        >
                            Cancel
                        </Button>
                        
                </FormControl>
            </Container>
        </div>
        
        /*<div className="login">
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
        </div>*/
    );
}

//export { userData };
//export { userObj };
export default Login;