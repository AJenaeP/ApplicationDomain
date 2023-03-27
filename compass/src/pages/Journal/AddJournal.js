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

import Journal from "./Journal";
import Accounts from "./Accounts";

const AddJournal = ({journal}) => {

  const [updatedjournal, setUpdatedjournal] = useState({

     name: '',
     debit:'',
     credit: '',
   })
 


   
   function handleJournalNameChange(e) { updatedjournal.journallname = e.target.value; }
   function handleJournalDebitChange(e) { updatedjournal.debit = Number(e.target.value); } 
   function handleJournalCreditChange(e) { updatedjournal.credit = Number(e.target.value); } 
     //CREATE for date, debit, and credit 

     function handleEdit(e) {
      e.preventDefault();
      console.log(journal.selectedJournal)
      console.log(updatedjournal)
      console.log('trying to update...')
      fetch('/api/accounts/update', {
          method: "PUT",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedjournal)
      })
      .then(
          response => {
         
              if (response.statusText === "Created") {
                  alert('Journal Updated')
              }
                 
              else {
                  alert(response.statusText)
              }
          },
      )
  }




return (
  <>
<DialogTitle> Add A Journal</DialogTitle>
<TextField
          id="outlined-required"
          label="Debit"
          defaultValue={journal.selectedAccount.debit}
      />
      <TextField
          id="outlined-required"
          label="Credit"
          defaultValue={journal.selectedAccount.credit}
       
      />
          <DialogActions>
          <Button onClick={handleEdit}>Update Journal</Button>
      </DialogActions>

      </>
)

}

export default AddJournal
