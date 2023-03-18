import React, { useEffect } from 'react';
import { elastic as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockResetIcon from '@mui/icons-material/LockReset';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import EmailIcon from '@mui/icons-material/Email';
import { UserAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const { userData, logout, auth } = UserAuth();
  const [goToHome, setGoToHome] = React.useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout()
      navigate('/home')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='sidebar'>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item"href='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/CreateNewUsers'>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/ExpiredPasswords'>
            <ListItemIcon>
              <LockResetIcon />
            </ListItemIcon>
            <ListItemText primary="Expired Passwords" />
          </ListItemButton>
        </ListItem>
      </List>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/accounts'>
            <ListItemIcon>
              <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton>
        </ListItem>
      </List>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/Email'>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton className="menu-item" onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
    /*<div className='sidebar'>
      <Menu>
        <a className="menu-item" href="/">
          Home
        </a>
        <a className="menu-item" href="/CreateNewUsers">
          Users
        </a>
        <a className="menu-item" href="/ExpiredPasswords">
          Expired Passwords
        </a>
        <a className="menu-item" href="/Accounts">
          Accounts
        </a>
        <a className="menu-item" href="/Email">
          Email
        </a>
      </Menu>
    </div>*/
  );
}

export default Sidebar
