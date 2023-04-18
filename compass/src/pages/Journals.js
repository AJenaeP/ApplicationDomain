
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  TableCell, TableContainer,  TableHead,
  TableRow, TableBody, Table, Paper,
  Button, TextField, DialogActions,
  DialogContent, Tooltip, Dialog,
  InputAdornment, IconButton,
  RadioGroup, FormControlLabel,
  Radio, FormLabel
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../css/journal.css'
//import { MultiInputDateRangeField, DateRangePicker } from '@mui/x-date-pickers-pro';
//import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteJournal from "./Journal/DeleteJournal";
import AddJournal from "./Journal/AddJournal";
import EditJournal from "./Journal/EditJournal";
import ViewJournal from "./Journal/ViewJournals";
import AdjustJournal from "./Journal/AdjustJournal";
//import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";

//import JournalList from "./Journal/JournalList";

const Journals = () => {
  const [journalData, setJournalData] = useState([{}]);
  const [role, setRole] = useState(window.localStorage.getItem('userRole'))
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState({});
  const [isRowSelected, setIsRowSelected] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openAdjust,setOpenAdjust] = useState(false)
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [dateFilter, setDateFilter] = React.useState([null,null])
 
  const data = {
    ref: '',
    account_number: '',
    journal_status: 'Approved'
  }

  const searchCriteria = {
    ref: '',
    account_name: '',
    date: '',
    debit: -1,
    credit: -1,
    journal_status: ''
  }
  function clearSearchField() {
    document.getElementById("search").value = null;
    fetch('/api/journals')
      .then(
        response => response.json()
      ).then(
        data => {
          setJournalData(data)
        }
      )
  }

  function handleSearchField() {
    let value = document.getElementById("search").value;

    if (isNaN(value)) {
      console.log('is a string')
      searchCriteria.account_name = String(value);
      searchCriteria.date = String(value);
      searchCriteria.debit = -1;
      searchCriteria.credit = -1;
      console.log(searchCriteria)
    } else if (!isNaN(value)) {
      console.log('is a number')
      searchCriteria.debit = Number(value);
      searchCriteria.credit = Number(value);
      searchCriteria.account_name = '';
      searchCriteria.date = '';
      console.log(searchCriteria)
    } else {
      console.log('field is empty')
    } 
    if(role === 'Accountant'){
      searchCriteria.journal_status = 'Approved'
      fetch('/api/journal/' + JSON.stringify(searchCriteria), {
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
        }
      )
    } else {
      fetch('/api/journal/' + JSON.stringify(searchCriteria), {
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
        }
      )
    }
    
  }

  function handleRadioFilter(e){
    console.log(e.target.value)
    let filter = e.target.value;
    setStatusFilter(e.target.value);
    if(filter === 'All'){
      fetch('/api/journals')
        .then(
          response => response.json()
        ).then(
          data => {
            setJournalData(data)
          }
        )
    } else {
      if (filter === 'Approved') {
        searchCriteria.journal_status = 'Approved'
        console.log(searchCriteria)
      } else if (filter === 'Pending') {
        searchCriteria.journal_status = 'Pending'
        console.log(searchCriteria)
      } else if (filter === 'Rejected') {
        searchCriteria.journal_status = 'Rejected'
        console.log(searchCriteria)
      }
      fetch('/api/journal/' + JSON.stringify(searchCriteria), {
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
        }
      )
    } 
  }

  const handleDateFilter = () => {
    let Array = journalData.slice().sort(function(a,b){
      var objA = a.date;
      var objB = b.date;
      return (objA < objB) ? -1 : (objA > objB) ? 1 : 0
    })
    setJournalData(Array)
  }

  useEffect(() => {
      fetch('/api/journals')
        .then(
          response => response.json()
        ).then(
          data => {
            setJournalData(data)
          }
        )
  
  }, [])

  const openAddJournal = () => {
    console.log('add journal button clicked ')
    console.log(selectedJournal)
    setOpenAdd(true);
    console.log(openAdd)
  };
  const openViewJournal = () => {
    if (isRowSelected) {
      setOpenView(true);
    }
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

  const openAdjustJournal = () =>
{
  if (isRowSelected){
    setOpenAdjust(true);
  }
}

const closeAdjustJournal = () => {
  setOpenAdjust(false);
};

  const closeViewJournal = () => { setOpenView(false); };
  
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
        <div className="filter">
          <TextField
            id="search"
            label="Search by Account Name, Amount or Date"
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
          <div style={{ marginLeft: 50 }}>
            <FormLabel id="demo-radio-buttons-group-label">Journal Status</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              row
              value={statusFilter}
              onChange={handleRadioFilter}
            >
              <FormControlLabel value='All' control={<Radio size="small" />} label="All" />
              <FormControlLabel value='Approved' control={<Radio size="small" />} label="Approved" />
              <FormControlLabel value='Pending' control={<Radio size="small" />} label="Pending" />
              <FormControlLabel value='Rejected' control={<Radio size="small" />} label="Rejected" />
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
          <TableContainer sx={{height: 500}}>
            <Table
            sx={{ minWidth: 650}}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
              <TableHead >
                <TableRow key={'row'}>
                  <TableCell key={'date'}> Date <IconButton onClick={handleDateFilter}><FilterListIcon /></IconButton></TableCell>
                  <TableCell key={'name'}> Account Titles</TableCell>
                  <TableCell key={'ref'}> Ref </TableCell>
                  <TableCell key={'debit'}> Debit </TableCell>
                  <TableCell key={'adjusted_debit'}> Adjusted Debit</TableCell>
                  <TableCell key={'credit'}> Credit </TableCell>
                  <TableCell key={'adjusted_credit'}> Adjusted Credit</TableCell>
                  <TableCell key= {'explanation'}>Explanation</TableCell>
                  <TableCell key={'status'}> Journal Status </TableCell>
               
                </TableRow>
              </TableHead>
              <TableBody className="JournalRows" id='JournalRows'>
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
                        <TableCell key={i + 'date'}>{journal.date}</TableCell>
                        <TableCell key={i + 'name'}>{journal.account_name}</TableCell>
                        <TableCell key={i + 'ref'}>{journal.ref}</TableCell>
                        <TableCell key={i + 'debit'}>{numberFormat(journal.debit)}</TableCell>
                        <TableCell key={i + 'adjusted_debit'}className={'adjusted_debit'}>{numberFormat(journal.adjusted_debit)}</TableCell>
                        <TableCell key={i + 'credit'}>{numberFormat(journal.credit)}</TableCell>
                        <TableCell key={i + 'adjusted_credit'}className={'adjusted_credit'}>{numberFormat(journal.adjusted_credit)}</TableCell>
                        <TableCell key={i + 'explanation'}className={'explanation'}>{journal.explanation}</TableCell>
                        <TableCell
                          key={i + 'status'}
                          className={
                            (journal.journal_status === 'Approved' ? 'approved' : "") ||
                            (journal.journal_status === 'Pending' ? 'pending' : "") ||
                            (journal.journal_status === 'Rejected' ? 'rejected' : "")
                          }
                        >{journal.journal_status}</TableCell>
                    
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
        <AddJournal  />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddJournal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openView} onClose={closeViewJournal}>
        <DialogContent>
          <ViewJournal journal={{ selectedJournal }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewJournal}>Close</Button>
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
      <Dialog open={openAdjust} onClose={closeAdjustJournal}>
        <DialogContent>
          <AdjustJournal journal={{ selectedJournal}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdjustJournal}>Close</Button>
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
      { (role!=="Accountant") &&
        
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
         
           <Tooltip title="Adjust Journal">
           <Button
             variant="outlined"
             size="large"
             type="submit"
             style={{ width: 100, marginRight: 20 }}
             className="submit"
             sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
             onClick={openAdjustJournal}
           >
             Adjust Journal
           </Button>
         </Tooltip>
       </>
      }
      { (role === "Accountant") &&
        
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

        <Tooltip title="ViewJournal">
          <Button
            variant="outlined"
            size="large"
            type="submit"
            style={{ width: 100, marginRight: 20 }}
            className="submit"
            sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            onClick={openViewJournal}
          >
          View Comments
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

        <Tooltip title="Adjust Journal">
          <Button
            variant="outlined"
            size="large"
            type="submit"
            style={{ width: 100, marginRight: 20 }}
            className="submit"
            sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            onClick={openAdjustJournal}
          >
            Adjust Journal
          </Button>
        </Tooltip>
      </>
  }
     
      </div>
    </div> 
   
        
          
    );
}

export default Journals;
