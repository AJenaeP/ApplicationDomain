import React from 'react'
import compasslogo from '../images/compasslogo.jpg';
import PasswordChecklist from "react-password-checklist"
import '../css/ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../AuthContext';
import { query, where, collection, getDocs } from 'firebase/firestore';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [goToLogin, setgoToLogin] = React.useState(false);
    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [secretQ1A, setSecretQ1A] = React.useState("")
    const [secretQ2A, setSecretQ2A] = React.useState("")
    const { forgotPassword,isVerified, newPassword} = UserAuth();
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")
    
    if (goToLogin) {
        navigate('/login')
    };
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setError("")
        if (username === "") {
            alert("Username can't be empty");
        } else if (email === "") {
            alert("Email can't be empty");
        }
        try {
            forgotPassword(email,username,secretQ1A,secretQ2A)
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }
    const handleNewPassword = (e) => {
        e.preventDefault();
        setError("")
        try {
            newPassword(email, username, password)
            //navigate('/login')
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }
    
           /*const q = query(collection(db, "users"), where("userId", "==", username));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().email !== email){
                    alert("No account was found with this info")
                } else {
                    //ask security questions
                }
            });*/
        
    
    return(
        <><div className="forgotpassword">
            <header>
                <h1 className="company-name">Compass Credit Union</h1>
                <p className="slogan">
                    Helping navigate the way for financial freedom yesterday, today, and
                    tomorrow
                </p>
                <div className="imgcontainer">
                    <img src={compasslogo} alt="Avatar" className="picture" />
                </div>
            </header>
            {!isVerified &&
                <div>
                    <h2>Please enter your username and email to reset your password:</h2>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="username">User Id:</label>
                        <input
                            type="text"
                            className="uname"
                            id="username"
                            onChange={(e) => setUserName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="secretQ1"> Secret Question 1: What is your favorite Color?</label>
                        <input
                            type="text"
                            id="secretQA1"
                            placeholder="Secret Question 1 Answer"
                            onChange={(e) => setSecretQ1A(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="SecretQ2">Secret Question 2: What is your bestfriends first name?</label>
                        <input
                            type="text"
                            id="secretQA2"
                            placeholder="Secret Question 2 Answer"
                            onChange={(e) => setSecretQ2A(e.target.value)}
                        ></input>
                    </div>
                    <button
                        className="continue-btn"
                        type="submit"
                        onClick={handleForgotPassword}
                    >Submit</button>
                    <button
                        className="cancel-btn"
                        type="submit"
                        onClick={() => { setgoToLogin(true); } }
                    >Cancel</button>
                </div>
            }
            {isVerified &&
                <div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required placeholder="Enter Password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passwordAgain">Confirm Password:</label>
                        <input
                            type="password"
                            required placeholder="Confirm Password"
                            id="passwordAgain"
                            onChange={e => setPasswordAgain(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <PasswordChecklist
                            rules={['minLength', 'specialChar', 'number', 'letter', "match", "firstLetter"]}
                            minLength={8}
                            value={password}
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { }}
                            messages={{
                                firstLetter: "First character must be a letter"
                            }}
                        />
                    </div>
                    <button
                        className="continue-btn"
                        type="submit"
                        onClick={handleNewPassword}
                    >Submit</button>
                    <button
                        className="cancel-btn"
                        type="submit"
                        onClick={() => { setgoToLogin(true); }}
                    >Cancel</button>
                </div>
            }
            </div></>
    );
}

export default ForgotPassword;