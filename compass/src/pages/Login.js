import React from 'react'
import { Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth, db }  from "../index"
import { collection, query, where, getDocs } from "firebase/firestore"



const Login = () => {
    //navigate to forgot password screen
    const [goToForgotPassword, setgoToForgotPassword] = React.useState(false);
    if(goToForgotPassword){
        return <Navigate to="/forgotpassword"/>;
    }
    //navigate to new user screen
    const [goToNewUser, setgoToNewUser] = React.useState(false);
    if(goToNewUser){
        return <Navigate to="/newuser"/>;
    }

    let userObj = {
        accountStatus: "",
        address: "",
        dateOfBirth: "",
        email: "",
        firstName: "",
        lastName: "",
        passwordExpiration: "",
        role: "",
        startDate: "",
        userId: ""
    }

    async function signIn(){
        let userName = document.getElementById('username').value;
        let passWord = document.getElementById('password').value;

        if(userName === ""){
            alert("Username can't be empty");
        } else if(passWord === ""){
            alert("Password can't be empty");
        } else {
            console.log(userName);
            const q = query(collection(db, "users"), where("userId", "==", userName));
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              signInWithEmailAndPassword(auth, doc.data().email, passWord)
                .then((userCredential) => {
                    // Signed in 
                    alert("signed in!");
                    const user = userCredential.user;
                    console.log(user);
                    document.getElementById('username').value = "";
                    document.getElementById('password').value = "";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode);
                    alert(errorMessage);
                });
               const userData = {
                    userId: doc.data().userId,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    address: doc.data().address,
                    dateOfBirth: doc.data().dateOfBirth,
                    email: doc.data().email,
                    passwordExpiration: doc.data().passwordExpire,
                    startDate: doc.data().startDate,
                    accountStatus: doc.data().accountStatus,
                    role: doc.data().role,
                }
                userObj = userData;
            });
        };   
        
    }
    
    return(
        <div className="login">
            <div>
                <label for="username">UserName: </label>
                <input type="text" id="username"></input>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" id="password"></input>
            </div>
                <button type="submit" id="login" onClick={signIn}>Submit</button>
            <div>
                <button type="button" onClick={() => {setgoToForgotPassword(true)}}>Forgot Password?</button>
                <button type="button" onClick={() => {setgoToNewUser(true)}}>New User?</button>
            </div>
        </div>
    );
}
//export { userObj }
export default Login;