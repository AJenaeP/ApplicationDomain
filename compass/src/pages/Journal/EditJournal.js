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


    function handleJournalDateChange(e) { journal.date = e.target.value; }
    function handleJournalAccountNameChange(e) { journal.account_name= e.target.value; }
    function handleJournalRefChange(e) { journal.ref= e.target.value; }
    function handleJournalDebitChange(e) { journal.debit = Number(e.target.value); } 
    function handleJournalCreditChange(e) { journal.credit = Number(e.target.value); } 
    
    function handleEdit(e) {
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
                label="Journal Date -- Required"
                defaultValue={journal.selectedJournal.date}
                onChange={handleJournalDateChange}
            />
          
            <TextField
                required
                id="outlined-required"
                label="Journal Name -- Required"
                defaultValue={journal.selectedJournal.journalName}
                onChange={handleJournalAccountNameChange}
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
                <Button onClick={handleEdit}>Update Entry</Button>
            </DialogActions>
        </>
    )
}


export default EditJournal
