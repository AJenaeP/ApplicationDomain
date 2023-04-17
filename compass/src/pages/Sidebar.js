



import React, { useEffect, useState } from 'react';
import { elastic as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockResetIcon from '@mui/icons-material/LockReset';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import EmailIcon from '@mui/icons-material/Email';
import { UserAuth } from '../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Sidebar = () => {
  const { userData, logout, auth } = UserAuth();
  const [role, setRole] = useState(window.localStorage.getItem('userRole'))
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
        {(role === 'Administrator') && 
          <ListItem disablePadding>
            <ListItemButton className="menu-item" href='/admindashboard'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        }
        {(role === 'Manager') &&
          <ListItem disablePadding>
            <ListItemButton className="menu-item" href='/managerdashboard'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        }
        {(role === 'Accountant') &&
          <ListItem disablePadding>
            <ListItemButton className="menu-item" href='/accountantdashboard'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        }
      </List>
      {
        (role === 'Administrator') && 
          <>
            <List>
              <ListItem disablePadding>
                <ListItemButton className="menu-item" href='/Users'>
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
        </>
      }
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
          <ListItemButton className="menu-item" href='/email'>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/journals'>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Journals" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/ledgers'>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Ledgers" />
          </ListItemButton>
        </ListItem>
      </List>
      <List> 
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/finstate'>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Financial Statements" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton className="menu-item" href='/events'>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Event Log" />
          </ListItemButton>
        </ListItem>
      </List>
      <ListItem disablePadding>
          <ListItemButton className="menu-item" href="/helppage">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help Page" />
          </ListItemButton>
        </ListItem>
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
   
  );
}

export default Sidebar

