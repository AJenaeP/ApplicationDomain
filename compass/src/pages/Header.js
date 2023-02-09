import React from 'react'
import compasslogo from '../images/compasslogo.png';
import { signOut } from "firebase/auth";

import { auth } from '../index'
const Header = () => {

function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}
return(
        <div className="header"> 
            <img src={compasslogo} alt="compass" width="90px"/>
            <span>Compass</span>
            <span></span>
            <button type="button" id="logout" onClick={logout}>Logout</button>
        </div>
    );
} //TO DO:: get user data from login and display name line 19
export default Header;