import React from 'react'
import compasslogo from '../images/compassLogo.png';
import { UserAuth } from '../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import '../css/Header.css'
import Sidebar from './Sidebar';
import Iconify from '../iconify'
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';


//TODO: user info is logged out / gone after page refresh 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

//import { auth } from '../index'
const Header = () => {
  const [count, setCount] = useState(window.localStorage.getItem('setCount'))
  const [role, setRole] = useState(window.localStorage.getItem('userRole'))
  const theme = useTheme();
  const { userData, logout } = UserAuth();
  const navigate = useNavigate();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  
  return (
    <div className='header'>
      <div>
        <AppBar style={{ position: 'fixed' }} open={open}>
          <Toolbar>
            <span id='menu'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon/>
              </IconButton>
            </span>
            <span id='companylogo'>
              <img src={compasslogo} alt="compass" width="90px" />
              <span>Compass Credit Union</span>
            </span>
            <span id='userInfo'>
              <span style={{color: 'white'}}>{userData.userId}</span>
              <AccountCircleIcon
                style={{ display: 'flex' }}
              />
            </span>
            {
              ((count < 1) && (role === 'Manager')) &&
              <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
                <Iconify icon="eva:bell-outline" color="black" />
                <Typography variant="body2" sx={{ color: 'white' }}>
                  new pending journal entry
                </Typography>
              </IconButton>
            }
        </Toolbar>
        </AppBar>
        <Drawer 
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
          variant="persistent"
          anchor="left"
          open={open}
           >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Sidebar/>
        </Drawer>
      </div>    
    </div>
  );
} 

export default Header;