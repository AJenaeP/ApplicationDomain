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
import Journal from "./Journal";


const EditJournal = ({ journal }) => {


    const [updatedJournal, setUpdatedJournal] = useState({
       
       journalName: journal.selectedJournal.account_name,
        debit: journal.selectedJournal.debit,
        credit: journal.selectedJournal.credit,
       
    })

    function handleJournalNameChange(e) { updatedJournal.accountName = e.target.value; }
    function handleJournaltDebitChange(e) { updatedJournal.debit = Number(e.target.value); }
    function handleJournalCreditChange(e) { updatedJournal.credit = Number(e.target.value); }
    
    function handleEdit(e) {
        e.preventDefault();
        console.log(journal.selectedJournal)
        console.log(updatedJournal)
        console.log('trying to update...')
        fetch('/api/accounts/update', {
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
                label="Journal Name -- Required"
                defaultValue={journal.selectedJournal.journal_name}
                onChange={handleJournalNameChange}
            />
          
           
            <TextField
                id="outlined-required"
                label="Debit"
                defaultValue={journal.selectedjournal.debit}
            />
            <TextField
                id="outlined-required"
                label="Credit"
                defaultValue={journal.selectedJournal.credit}
            />
           
            <DialogActions>
                <Button onClick={handleEdit}>Update Entry</Button>
            </DialogActions>
        </>
    )
}


export default EditJournal
