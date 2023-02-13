import React from 'react'
import compasslogo from '../images/compasslogo.png';
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

//import { auth } from '../index'
const Header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }
  return(
          <div className="header"> 
              <img src={compasslogo} alt="compass" width="90px"/>
              <span>Compass</span>
              <span>{user && user.firstName}</span>
              <button type="button" id="logout" onClick={handleLogout}>Logout</button>
          </div>
  );
} //TO DO:: get user data from login and display name line 19
export default Header;