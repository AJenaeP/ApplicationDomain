//Need Can generate, view, save, email, or print 
//trial balance, income statement, balance sheet, and retained earnings statement for a particular date or a date range

//CREATE buttons for generate, view, save, email, or print

import React, { useState, useEffect } from "react";
import { db } from "../utilities/Firebase";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/Accounts.css";
import {
  TableCell, TableContainer, TableHead,
  TableRow, TableBody, Table,
  Paper, Button, Dialog,
  DialogActions, DialogContent, Tooltip,
  TextField, InputAdornment, IconButton, RadioGroup,
  FormControlLabel, Radio, FormLabel
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddAccount from "./AdminPages/AddAccount";
import ViewAccount from "./ViewAccount";
import EditAccount from "./AdminPages/EditAccount";
import DeactivateAccount from "./AdminPages/DeactivateAccount";
import DeleteAccount from "./AdminPages/DeleteAccount";

const FinStatements = () => {

    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [backendData, setBackendData] = useState([{}]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
    const [openGenerate, setOpenGenerate] = useState(false)
    const [openEdit, setOpenPrint] = useState(false)
    const [openView, setOpenSave] = useState(false)
    const [openDelete, setOpenEmail] = useState(false)
    const [openDeactivate, setOpenView] = useState(false)
    const [statusFilter, setStatusFilter] = React.useState('All');
    const [balanceFilter, setBalanceFilter] = React.useState();
  
    //this is for the search field 
    const data = {
      account_number: 0,
      account_name: '',
      account_category: ''
    }

    const searchCriteria = {
        date: ''
    }
  
    function clearSearchField(){
      document.getElementById("search").value = null;
      fetch('/api/accounts')
        .then(
          response => response.json()
        ).then(
          data => {
            setBackendData(data)
          }
        )
    }
    function handleSearchField(){
      let value = document.getElementById("search").value;
  
      if(isNaN(value)){
        console.log('is a string')
        searchCriteria.date = String(value);
        console.log(data)
      }else if(!isNaN(value)){
        console.log('is a number')
        searchCriteria.date = '';
        console.log(data)
      } else {
        console.log('field is empty')
      }
  
      fetch('/api/account/' + JSON.stringify(data), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
      ).then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data[0])
        }
      )
    }
  
    function handleRadioFilter(e) {
      let filter = e.target.value;
      setStatusFilter(filter);
      if (filter === 'All') {
        fetch('/api/accounts')
          .then(
            response => response.json()
          ).then(
            data => {
              setBackendData(data)
            }
          )
      } else {
        if (filter === 'TBalance') {
          //data.balance = 'balance'
          //closing balances (debits and credits)
        } else if (filter === 'Istate') {
          //revenue, expenses, and profitability (P&L)
        } else if (filter === 'RES') {
          //data.account_category = 'equity'
          //sum of earnings accumulated and kept 
        }
        else if (filter === 'Bsheet') {
         //data.account_category = 'equity'
         //company’s assets, liabilities, and shareholder equity
      }
        fetch('/api/account/' + JSON.stringify(data), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
        ).then(
          response => response.json()
        ).then(
          data => {
            setBackendData(data[0])
          }
        )
      }
    }
  
    function handleBalanceFilter(e){
      let balance = e.target.value
      let Array = [];
      if(balance === 'All'){
        fetch('/api/accounts')
          .then(
            response => response.json()
          ).then(
            data => {
              setBackendData(data)
            }
          )
      } else if(balance === '-1000000'){
        backendData.forEach((item) => {
          if(item.balance <= 1000000){
              Array.push(item)
          }
        })     
        setBackendData(Array)
      }else if (balance === '5000000'){
        backendData.forEach((item) => {
          if(item.balance > 1000000 && item.balance <=5000000){
            Array.push(item)
          }
        })
        setBackendData(Array)
      } else if (balance === '5000000+'){
        backendData.forEach((item) => {
          if (item.balance > 5000000) {
            Array.push(item)
          }
        })
        setBackendData(Array)
      }
    }
    useEffect(() => {
      fetch('/api/accounts')
      .then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    },[])
  
    const openGenerateStatement = () => {
      setOpenGenerate(true);
    };
    const openViewStatement = () => {
      if (isRowSelected) {
        setOpenView(true);
      }
    };
    const openSaveStatement = () => {
      if (isRowSelected) {
        setOpenSave(true);
      }
    };
    const openPrintStatement = () => {
      if (isRowSelected) {
        setOpenPrint(true);
      }
    };
    const openEmailStatement = () => {
      if (isRowSelected) {
        setOpenEmail(true);
      }
    };
    const closeGenerateStatement = () => { setOpenGenerate(false); };
    const closeViewStatement = () => { setOpenView(false); };
    const closeSaveStatement = () => { setOpenSave(false); };
    const closePrintStatement = () => { setOpenPrint(false); };
    const closeEmailStatement = () => { setOpenEmail(false); };
    function handleAccountSelection(account, i) {
      if (selectedRow === i) {
        setIsRowSelected(false);
        setSelectedRow(null);
      } else {
        setSelectedRow(i);
        setSelectedAccount(account);
        setIsRowSelected(true);
        const row = document.getElementById(i);
        row.classList.add("isSelected");
      }
    }
  
    const numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  
    return (
      <div className="App">
        <Header />
        <div className="searchField">
          <TextField 
            id="search" 
            label="Search by Date" 
            //type="search" 
            InputProps={
              {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleSearchField}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      onClick={clearSearchField}
                      //onMouseDown={handleMouseDownPassword}// {showPassword ? <VisibilityOff /> : <Visibility />}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>           
                )
              }
            }
          />
          <div style={{marginLeft: 50}}>
            <FormLabel id="demo-radio-buttons-group-label category">Financial Statement</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label category"
              defaultValue="All"
              value={statusFilter}
              onChange={handleRadioFilter}
            >
                <FormControlLabel value='All' control={<Radio size="small" />} label="All Accounts" />
              <FormControlLabel value='TBalance' control={<Radio size="small" />} label="Trial Balance" />
              <FormControlLabel value='Istate' control={<Radio size="small" />} label="Income Statment" />
              <FormControlLabel value='Bsheet' control={<Radio size="small" />} label="Balance Sheet" />
              <FormControlLabel value='RES' control={<Radio size="small" />} label="Returned Earning Statment" />
            </RadioGroup>
          </div>
         
        </div>
        <Paper
          sx={{
            width: 1000,
            overflow: "hidden",
            display: "flex",
            position: "relative",
            top: 100,
            left: "15%",
          }}
        >
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell> Account Number </TableCell>
                  <TableCell> Account Name </TableCell>
                  <TableCell> Account Description </TableCell>
                  <TableCell> Account Category </TableCell>
                  <TableCell> Account Subcategory </TableCell>
                  <TableCell> Initial Balance </TableCell>
                  <TableCell> Balance </TableCell>
                  <TableCell> UserId </TableCell>
                  <TableCell> Date/Time Added </TableCell>
                  <TableCell> Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="accountRows">
                {backendData.map((account, i) => {
                  return (
                    <>
                      <TableRow
                        id={i}
                        key={i}
                        onClick={() => handleAccountSelection(account, i)}
                        className={(selectedRow === i ? "isSelected" : "") ||
                        (account.account_status === 'Deactivated' ? 'bgred' : '')}
                      >
                        <TableCell>{account.account_number}</TableCell>
                        <TableCell>{account.account_name}</TableCell>
                        <TableCell>{account.account_description}</TableCell>
                        <TableCell>{account.account_category}</TableCell>
                        <TableCell>{account.account_subcategory}</TableCell>
                        <TableCell>{numberFormat(account.initial_balance)}</TableCell>
                        <TableCell>{numberFormat(account.balance)}</TableCell>
                        <TableCell>{account.userId}</TableCell>
                        <TableCell>{account.date_time_account_added}</TableCell>
                        <TableCell>{account.account_status}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        <div
          style={{
            display: "flex",
            marginTop: 150,
            justifyContent: "center",
          }}
        >
      <Tooltip title="Generate">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                  onClick={openGenerateStatement}
                >
                  Generate
                </Button>
              </Tooltip>
          
              <Tooltip title="Save">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                  onClick={openSaveStatement}
                >
                  Save
                </Button>
              </Tooltip>
              <Tooltip title="Print">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                  onClick={openPrintStatement}
                >
                  Print
                </Button>
              </Tooltip>
       
       
           
              <Tooltip title="View">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  onClick={openViewStatement}
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                >
                  View 
                </Button>
              </Tooltip>
        <Tooltip title="Email">
            <Button
              variant="outlined"
              size="large"
              type="submit"
              style={{ width: 100, marginRight: 20 }}
              className="submit"
              href='/email'
              sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            >
              Email
            </Button>
          </Tooltip>
        </div>
      </div> 
  );
        } 
export default FinStatements;

/*<Dialog open={openGenerateStatement} onClose={closeGenerateStatement}>
          <DialogContent>
     
          </DialogContent>
          <DialogActions>
            <Button onClick={closeGenerateStatement}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openViewStatement} onClose={closeViewStatement}>
          <DialogContent>
         
          </DialogContent>
          <DialogActions>
            <Button onClick={closeViewStatement}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openSaveStatement} onClose={closeSaveStatement}>
          <DialogContent>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSaveStatement}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPrintStatement} onClose={closePrintStatement}>
          <DialogContent>
          
          </DialogContent>
          <DialogActions>
            <Button onClick={closePrintStatement}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEmailStatement} onClose={closeEmailStatement}>
          <DialogContent>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEmailStatement}>Close</Button>
          </DialogActions>
        </Dialog>
        */
