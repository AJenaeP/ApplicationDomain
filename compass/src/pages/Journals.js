import React, { useEffect, useState } from "react";
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


import DeleteJournal from "./Journal/DeleteJournal";
import AddJournal from "./Journal/AddJournal";
import EditJournal from "./Journal/EditJournal";
//import JournalList from "./Journal/JournalList";

const Journals = () => {
  const [journalData, setJournalData] = useState([{}])
  const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [backendData, setBackendData] = useState([{}]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedJournal, setSelectedJournal] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

  const data = {
    ref: '',
    account_number: '',
    journal_status: 'Approved'
  }

  useEffect(() => {
    fetch('/api/journal/' + JSON.stringify(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setJournalData(data)
        console.log(journalData)
      }
    )
  }, [])

  const openAddJournal = () => {
    console.log('add journal button clicked ')
    console.log(selectedJournal)
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

  function handleJournalSelection(journal, i) {
    if (selectedRow === i) {
      setIsRowSelected(false);
      setSelectedRow(null);
    } else {
      setSelectedRow(i);
      setSelectedJournal(journal);
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
              <TableHead >
                <TableRow >
                  <TableCell> Date </TableCell>
                  <TableCell> Account Titles</TableCell>
                  <TableCell> Ref </TableCell>
                  <TableCell> Debit </TableCell>
                  <TableCell> Credit </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="JournalRows">
                {journalData.map((journal, i) => {
                  return (
                    <>
                      <TableRow
                        id={i}
                        key={i}
                        onClick={() => handleJournalSelection(journal, i)}
                      className={(selectedRow === i ? "isSelected" : "") 
                    }
                      >
                        <TableCell>{journal.date}</TableCell>
                        <TableCell>{journal.account_name}</TableCell>
                        <TableCell>{journal.ref}</TableCell>
                        <TableCell>{journal.debit}</TableCell>
                        <TableCell>{journal.credit}</TableCell>
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
       
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddJournal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={closeEditJournal}>
        <DialogContent>
          <EditJournal journal={{ selectedJournal}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditJournal}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={closeDeleteJournal}>
        <DialogContent>
          <DeleteJournal journal={{ selectedJournal}} />
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
       (role === "Accountant" || "Manager") && 
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

export default Journals;
