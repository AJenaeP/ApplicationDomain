import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material'
import React, { useState, useEffect } from 'react'



const EditJournal = ({ journal }) => {
    const [updatedJournal, setUpdatedJournal] = useState({
       date: journal.selectedJournal.date,
       journalName: journal.selectedJournal.account_name,
       ref: journal.selectedJournal.ref,
        debit: journal.selectedJournal.debit,
        credit: journal.selectedJournal.credit,
       
    })


    function handleJournalDateChange(e) { updatedJournal.date = e.target.value; }
    function handleJournalAccountNameChange(e) { updatedJournal.account_name= e.target.value; }
    function handleJournalRefChange(e) { updatedJournal.ref= e.target.value; }
    function handleJournalDebitChange(e) { updatedJournal.debit = Number(e.target.value); } 
    function handleJournalCreditChange(e) { updatedJournal.credit = Number(e.target.value); } 
    
    function handleUpdate(e) {
        e.preventDefault();
        console.log(journal.selectedJournal)
        console.log(updatedJournal)
        console.log('trying to update...')
        fetch('/api/journal/update', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedJournal)
        })
        .then(
            response => {
                if (response.statusText === "Created") {
                    alert('Journal Updated')
                    
                } else {
                    alert(response.statusText)
                }
            },
        )
    }

  

    return (
        <>
            <DialogTitle> Edit An Entry</DialogTitle>

            <TextField
                required
                id="outlined-required"
                label="Journal Date"
                defaultValue={journal.selectedJournal.date}
                onChange={handleJournalDateChange}
            />
           
          
            <TextField
                required
                id="outlined-required"
                label="Journal Name "
                defaultValue={journal.selectedJournal.journalName}
                onChange={handleJournalAccountNameChange}
            />
             <TextField
                required
                id="outlined-required"
                label="Journal Ref"
                defaultValue={journal.selectedJournal.ref}
                onChange={handleJournalRefChange}
            />
    
            <TextField
                id="outlined-required"
                label="Debit"
                defaultValue={journal.selectedjournal.debit}
                onChange={handleJournalDebitChange}
            />
            <TextField
                id="outlined-required"
                label="Credit"
                defaultValue={journal.selectedJournal.credit}
                onChange={handleJournalCreditChange}
            />
           
            <DialogActions>
                <Button onClick={handleUpdate}>Update Entry</Button>
            </DialogActions>
        </>
    )
}


export default EditJournal
