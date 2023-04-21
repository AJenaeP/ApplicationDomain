import compassLogo from '../../images/compassLogo.png';
import { Typography, Container, Box } from '@mui/material';
import { bubble as Menu } from 'react-burger-menu';
import Sidebar from '../Sidebar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
//Logo import:
import '../../css/DashboardAdmin.css'
import React, {useEffect, useState} from 'react'
import Header from '../Header';
import Accounts from '../Accounts';
import Ratios from '../Ratios';


const DashboardManager = () => {
  const [assetsSum, setAssetsSum] = useState(0)
  const [liabilitiesSum, setLiabilitiesSum] = useState(0)
  const [equitySum, setEquitySum] = useState(0)

  const currentRatio = { //data for current ratio gauge
        label: 'Current Ratio',
        highPoint: 3,
        value: (assetsSum)/(liabilitiesSum)
  }


  useEffect(() => {
    fetch('/api/accounts')
      .then(
        response => response.json()
      ).then(
        data => {
          console.log(data)
          data.forEach(element => {
            console.log(element.balance)
             if (element.account_category === "assets") {
              setAssetsSum(assetsSum + element.balance)
            } else if (element.account_category === "liability") {
              setLiabilitiesSum(liabilitiesSum + element.balance)
            } else if (element.account_category === "equity") {
              setEquitySum(equitySum + element.balance)
            } 
          });
          
        }
      )
  }, [])

return (
  <>
  <div className="DashboardManager" id="outer-container">
    <div>
        <Header/>
    </div>
    <div className='calender'>
        <Calendar/>
    </div>
    <div>
        <Ratios props={currentRatio}/>
    </div>
  </div>
  </>
   );
  }
  
export default DashboardManager

