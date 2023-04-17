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

//CREATE THIS PAGE TO ADD TO LEDGER IN RED 

const AdjustJournal = ({ journal }) => {
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [adjustJournal, setAdjustJournal] = useState({
       date: journal.selectedJournal.date,
       journalName: journal.selectedJournal.account_name,
       ref: journal.selectedJournal.ref,
       debit: journal.selectedJournal.debit,
       credit: journal.selectedJournal.credit,
       journalexplanation: journal.selectedJournal.explanation,
      
//Need to add comment for reject 
    })


    function handleJournalAccountNameChange(e) { adjustJournal.account_name= e.target.value; }
    function handleJournalRefAdjust(e) { adjustJournal.ref= e.target.value; }
    function handleJournalDebitAdjust(e) { adjustJournal.debit = Number(e.target.value); } 
    function handleJournalCreditAdjust(e) { adjustJournal.credit = Number(e.target.value); }
    function handleJournalExplanationAdjust(e) { adjustJournal.explanation = (e.target.value); }
   
    function handleAdjust(e) {
        e.preventDefault();
        console.log(journal.selectedJournal)
        console.log(AdjustJournal)
        console.log('trying to adjust...')
        fetch('/api/journals/adjust', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(AdjustJournal)
        })
        .then(
            response => {
                if (response.statusText === "Created") {
                    alert('Journal Adjusted')
                    
                } else {
                    alert(response.statusText)
                }
            },
        )
    }

        return (
        

            <>
    
                <DialogTitle> Adjust Entry</DialogTitle>
    
               
                 <TextField
                    required
                    id="outlined-required"
                    label="Journal Ref"
                    style={{ color: 'red' }} 
                    defaultValue={journal.selectedJournal.ref}
                    onChange={handleJournalRefAdjust}
                />
        
                <TextField
                    id="outlined-required"
                    label="Debit"
                    style={{ color: 'red' }} 
                    defaultValue={journal.selectedJournal.debit}
                    onChange={handleJournalDebitAdjust}
                />
                <TextField
                    id="outlined-required"
                    label="Credit"
                    style={{ color: 'red' }} 
                    defaultValue={journal.selectedJournal.credit}
                    onChange={handleJournalCreditAdjust}
                />
               
               <TextField
                    required
                    id="outlined-required"
                    label="Journal Explanation"
                    style={{ color: 'red' }} 
                    defaultValue={journal.selectedJournal.explanation}
                    onChange={handleJournalExplanationAdjust}
                />
    
                <DialogActions>
                    <Button onClick={handleAdjust}>Add Adjustment</Button>
                </DialogActions> 
    
               
            </>
     
        )
    
}


export default AdjustJournal