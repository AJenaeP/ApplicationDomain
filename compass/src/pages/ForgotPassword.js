import React from 'react'
//import { auth, db }  from "../index"
import { collection, query, where, getDocs } from "firebase/firestore"
import compasslogo from '../images/compasslogo.png';
import '../css/ForgotPassword.css'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [goToLogin, setgoToLogin] = React.useState(false);
    if (goToLogin) {
        navigate('/login')
    };
    async function submit(){
        let email = document.getElementById('email').value;
        let userId = document.getElementById('userId').value;

        if(email === ""){
            alert("Email can't be empty");
        } else if(userId === ""){
            alert("UserId can't be empty");
        } else {
            /*const q = query(collection(db, "users"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().email !== email){
                    alert("No account was found with this info")
                } else {
                    //ask security questions
                }
            });*/
        }
    }
    return(
        <div className="forgotpassword">
            <header>
                <h1 class="company-name">Compass Credit Union</h1>
                <p class="slogan">
                    Helping navigate the way for financial freedom yesterday, today, and
                    tomorrow
                </p>
                <div class="imgcontainer">
                    <img src={compasslogo} alt="Avatar" class="picture" />
                </div>
            </header>
            <h2>Please enter your username and email to reset your password:</h2>
            <form>
                <label htmlfor="email">Email:</label>
                <input type="email" id="email"></input>

                <label htmlfor="username">User Id:</label>
                <input type="text" name="uname" id="username"></input>

                <button class="continue-btn" type="submit" onClick={() => { setgoToLogin(true) }}>Continue</button>
                <button class="cancel-btn" type="submit" onClick={() => { setgoToLogin(true) }}>Cancel</button>
            </form>
        </div>
    );
}

export default ForgotPassword;