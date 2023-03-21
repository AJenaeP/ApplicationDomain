
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

//create code for image
const DashboardAccountant = () => {
    return (
        <>
            <div className="DashboardAccountant" id="outer-container">
                <div>
                    <Header />
                </div>
                <div className='calender'>
                    <Calendar />
                </div>
            </div>


        </>
    );
}

export default DashboardAccountant