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
import DeleteJournal from "./DeleteJournal";
import AddJournal from "./AddJournal";
import EditJournal from "./EditJournal";

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

  const openAddJournal = () => {
    console.log('add journal button clicked ')
    console.log(selectedAccount)
    setOpenAdd(true);
    console.log(openAdd)
  };
  
  const openEditJournal = () => {
    if (isRowSelected) {
      setOpenEdit(true);
    }
  };
  const openDeleteJournal = () => {
    if (isRowSelected) {
      setOpenDelete(true);
    }
  };

  const closeAddJournal = () => {
    setOpenAdd(false);
  };
  
  const closeEditJournal = () => {
    setOpenEdit(false);
  };
  const closeDeleteJournal = () => {
    setOpenDelete(false);
  };

  function handleJournalSelection(account, i) {
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
                
              </TableRow>
            </TableHead>
            <TableBody className="accountRows">
              {backendData.map((account, i) => {
                return (
                  <>
                    <TableRow
                      id={i}
                      key={i}
                      onClick={() => handleJournalSelection(account, i)}
                      className={(selectedRow === i ? "isSelected" : "") 
                    }
                    >
                      <TableCell>{account.account_number}</TableCell>
                      <TableCell>{account.account_name}</TableCell>
                      <TableCell>{numberFormat(account.debit)}</TableCell>
                      <TableCell>{numberFormat(account.credit)}</TableCell>
                   
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openAdd} onClose={closeAddJournal}>
        <DialogContent>
          <AddJournal account={{ selectedAccount }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddJournal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={closeEditJournal}>
        <DialogContent>
          <EditJournal account={{ selectedAccount}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditJournal}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={closeDeleteJournal}>
        <DialogContent>
          <DeleteJournal account={{ selectedAccount}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteJournal}>Close</Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          marginTop: 150,
          marginLeft: 360,
          justifyContent: "center",
        }}
      >
      {
        (role === "Accountant") &&
          <>
            <Tooltip title="Add Journal Entry">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                  onClick={openAddJournal}
                >
                  Add Journal
                </Button>
            </Tooltip>
          
            <Tooltip title="Edit Journal">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                onClick={openEditJournal}
              >
              Edit Journal
              </Button>
            </Tooltip>
            
            <Tooltip title="Delete Journal">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                onClick={openDeleteJournal}
              >
                Delete Journal
              </Button>
            </Tooltip>
          </>
      }
      </div>
    </div> 
);
      }
export default Journal;
