import { useState, useEffect } from "react";
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

  
 
const AddJournal = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [handleClose, setHandleClose] = useState(false)
    const [addJournal, setAddJournal] = useState(false)
    const [journal, setJournal] = useState({
        date:'',
        account_name:'',
        ref:'',
        debit:'',
        credit:'',
        journal_status: 'Pending'
  })

function handleJournalDateChange(e) { journal.date = e.target.value; }
function handleJournalAccountNameChange(e) { journal.account_name= e.target.value; }
function handleJournalRefChange(e) { journal.ref= e.target.value; }
function handleJournalDebitChange(e) { journal.debit = Number(e.target.value); } 
function handleJournalCreditChange(e) { journal.credit = Number(e.target.value); } 



function handleAdd(e) {
        e.preventDefault();
        console.log(journal)
        console.log('trying to add...')
        fetch('/api/journals/add', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(journal)
        })
        .then(
            response => { alert(response.statusText) }
        )
    }

  
const numberFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

//NEED return method that promised information
return (
    <>
    <DialogTitle> Create a Journal Entry </DialogTitle>
 
    <TextField
                required
                id="outlined-required"
                label="Date"
                defaultValue=""
                onChange={handleJournalDateChange}
            />
            <TextField
                required
                id="outlined-required"
                label="Account Name"
                defaultValue=""
                onChange={handleJournalAccountNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label="Ref"
                defaultValue=""
                onChange={handleJournalRefChange}
            />
             <TextField
                required
                id="outlined-required"
                label="Debit"
                defaultValue=""
                onChange={handleJournalDebitChange}
            />
             <TextField
                required
                id="outlined-required"
                label="Credit"
                defaultValue=""
                onChange={handleJournalCreditChange}
            />
           

            <DialogActions>
                <Button
                    onClick={handleAdd}
                >Create</Button>
            </DialogActions>
        </>
    )
}


export default AddJournal
