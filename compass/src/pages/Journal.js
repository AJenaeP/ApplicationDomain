
import { useState, useEffect } from "react";

import Header from "./Header";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";
import {
    Dialog,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material'

import ViewAccount from "./ViewAccount";
import Accounts from "./Accounts";



function Journal() {
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [backendData, setBackendData] = useState([{}]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
   
    const [openDelete, setOpenDelete] = useState(false)
 
    //const [newAccount, setNewAccount] = useState(AddAccount.account)

    //console.log(selectedRow)
    useEffect(() => {
      fetch('/api/accounts')
      .then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    },[backendData])
    //we can use this when searching
    /*useEffect(() => {
      fetch('/api/accounts/:accountNumber').then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])*/

  const openAddAccount = () => {
    console.log('add account button clicked ')
    console.log(selectedAccount)
    setOpenAdd(true);
    console.log(openAdd)
  };
  
  const openEditAccount = () => {
    if (isRowSelected) {
      setOpenEdit(true);
    }
  };
  const openDeleteAccount = () => {
    if (isRowSelected) {
      setOpenDelete(true);
    }
  };

  const closeAddAccount = () => {
    setOpenAdd(false);
  };
  
  const closeEditAccount = () => {
    setOpenEdit(false);
  };
  const closeDeleteAccount = () => {
    setOpenDelete(false);
  };

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
                <TableCell> Debit </TableCell>
                <TableCell> Credit </TableCell>
                <TableCell> Balance </TableCell>
                <TableCell> Date/Time Added </TableCell>
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
                      <TableCell>{numberFormat(account.debit)}</TableCell>
                      <TableCell>{numberFormat(account.credit)}</TableCell>
                      <TableCell>{numberFormat(account.balance)}</TableCell>

                      <TableCell>{account.date_time_account_added}</TableCell>
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
          marginLeft: 360,
          justifyContent: "center",
        }}
      >
     
      </div>
    </div> 
);
      }
export default Journal;
