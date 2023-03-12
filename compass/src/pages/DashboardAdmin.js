
import compassLogo from '../images/compassLogo.png';
import { Typography, Container } from '@mui/material';
import { bubble as Menu } from 'react-burger-menu';
import Sidebar from '../utilities/Sidebar';
//Logo import:

import React from 'react'
import Header from './Header';
//need to create if statement (if user is admin)
/*const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [goToLogin, setgoToLogin] = useState(false);
  if (goToLogin) {
      navigate('/login')
  };
  //navigate to new user screen
  const [goToSignUp, setgoToSignUp] = useState(false);
  if (goToSignUp) {
      navigate('/newuser')
  };
  */



  //create code for image
const DashboardAdmin = () => {
return (
  <div className="DashboardAdmin" id="outer-container">
    <Header/>
  </div>
      /*<>

<div className="DashboardAdmin" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id="page-wrap">
      </div>
    </div>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
          Compass Credit Union 
          </Typography>
  
          <img src={compassLogo} alt="Avatar" className="picture" />
       
     </Container>

     
      </>

      //LAYOUT:

//login username, picture, should be displayed clearly on the top right corner of the login page



//<p>Welcome Admin: [insert name from login].</p>
//could use window.open()
//An alert box is often used if you want to make sure information comes through to the user.
//window.alert("sometext")

//create menu bar - buttons with onClick link to page
// 1. Users
// 2. Expired Password
// 3. Accounts
// 4. Email


   */);
  }
  
export default DashboardAdmin

