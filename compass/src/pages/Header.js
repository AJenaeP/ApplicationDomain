import React from 'react'
import compasslogo from '../images/compassLogo.png';
import { UserAuth } from '../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';

//import { auth } from '../index'
const Header = () => {
  const { userData, logout } = UserAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    try {
      logout()
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }

  
  return (
  
          <div className="header"> 
              <img src={compasslogo} alt="compass" width="90px"/>
              <span>Compass </span>
              <span>{userData.firstName} {userData.lastName}</span>
              <button type="button" id="logout" onClick={handleLogout}>Logout</button>
          </div>
  );
} //TO DO:: get user data from login and display name line 19
export default Header;