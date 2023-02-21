import React from 'react'
import compasslogo from '../images/compassLogo.png';
import { UserAuth } from '../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//import { auth } from '../index'
const Header = () => {
  const { userData, logout } = UserAuth();
  const navigate = useNavigate();
  
  //this calls the logout function from authcontext
  const handleLogout = () => {
    try {
      logout()
      navigate('/home')
    } catch (e) {
      console.log(e.message)
    }
  }
  
  return (
          <div className="header"> 
              <img src={compasslogo} alt="compass" width="90px"/>
              <span>Compass </span>
              <AccountCircleIcon/>
              <span >{userData.userId}</span>
              <button type="button" id="logout" onClick={handleLogout}>Logout</button>
          </div>
  );
} //TO DO:: get user data from login and display name line 19
export default Header;