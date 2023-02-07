import React from 'react'
import { auth, db }  from "../index"
import { collection, query, where, getDocs } from "firebase/firestore"

const ForgotPassword = () => {
    async function submit(){
        let email = document.getElementById('email').value;
        let userId = document.getElementById('userId').value;

        if(email === ""){
            alert("Email can't be empty");
        } else if(userId === ""){
            alert("UserId can't be empty");
        } else {
            const q = query(collection(db, "users"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().email != email){
                    alert("No account was found with this info")
                } else {
                    //ask security questions
                }
            });
        }
    }
    return(
        <div className="forgotPassword">
           <label for="email">Email:</label>
           <input type="email" id="email"></input>

           <label for="username">User Id:</label>
           <input type="text" id="username"></input>
        </div>
    );
}

export default ForgotPassword;