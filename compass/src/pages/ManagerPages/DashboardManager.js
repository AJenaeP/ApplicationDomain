
import compassLogo from '../../images/compassLogo.png';
import { Typography, Container } from '@mui/material';
import { bubble as Menu } from 'react-burger-menu';
import Sidebar from '../Sidebar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
//Logo import:
import '../../css/DashboardAdmin.css'
import React from 'react'
import Header from '../Header';
import Accounts from '../Accounts';

const DashboardManager = () => {
return (
  <>
  <div className="DashboardManager" id="outer-container">
    <div>
        <Header/>
    </div>
    <div className='calender'>
        <Calendar/>
    </div>
  </div>
  </>
   );
  }
  
export default DashboardManager

