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
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [updatedJournal, setUpdatedJournal] = useState({
       date: journal.selectedJournal.date,
       journalName: journal.selectedJournal.account_name,
       ref: journal.selectedJournal.ref,
       debit: journal.selectedJournal.debit,
       credit: journal.selectedJournal.credit,
       journalStatus: journal.selectedJournal.journal_status,
       comment: journal.selectedJournal.journal_comment
//Need to add comment for reject 
    })


    function handleJournalDateChange(e) { updatedJournal.date = e.target.value; }
    function handleJournalAccountNameChange(e) { updatedJournal.account_name= e.target.value; }
    function handleJournalRefChange(e) { updatedJournal.ref= e.target.value; }
    function handleJournalDebitChange(e) { updatedJournal.debit = Number(e.target.value); } 
    function handleJournalCreditChange(e) { updatedJournal.credit = Number(e.target.value); }
    function handleJournalStatusChange(e){updatedJournal.journal_status =e.target.value;} 
    function handleJournalCommentChange(e){updatedJournal.journal_comment =e.target.value;} 
    
    function handleUpdate(e) {
        e.preventDefault();
        console.log(journal.selectedJournal)
        console.log(updatedJournal)
        console.log('trying to update...')
        fetch('/api/journals/update', {
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
if (role !== "Accountant")
    
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
                defaultValue={journal.selectedJournal.account_name}
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
                defaultValue={journal.selectedJournal.debit}
                onChange={handleJournalDebitChange}
            />
            <TextField
                id="outlined-required"
                label="Credit"
                defaultValue={journal.selectedJournal.credit}
                onChange={handleJournalCreditChange}
            />
           
            <InputLabel id="demo-simple-select-label status">Status</InputLabel>
            <Select
           
                labelId="demo-simple-select-label status"
                id="demo-simple-select"
                label="Status"
                sx={{ width: 'fit-content' }}
                defaultValue={journal.selectedJournal.journal_status}
                onChange={handleJournalStatusChange}
            >
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-label status">Rejection Comment</InputLabel>
            <Select
           
                labelId="demo-simple-select-label status"
                id="demo-simple-select"
                label="Comment"
                sx={{ width: 'fit-content' }}
                defaultValue={journal.selectedJournal.journal_comment}
                onChange={handleJournalCommentChange}
            >
                <MenuItem value='UnbalancedEntry'>Unbalanced Entry</MenuItem>
                <MenuItem value='FailedPayment'>Failed Payment</MenuItem>
                <MenuItem value='Other'>Other - see email</MenuItem>
            </Select>

            
            <DialogActions>
                <Button onClick={handleUpdate}>Update Entry</Button>
            </DialogActions> 

           
        </>
 
    )
    else
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
                    defaultValue={journal.selectedJournal.account_name}
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
                    defaultValue={journal.selectedJournal.debit}
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
