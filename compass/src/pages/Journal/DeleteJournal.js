import {
    DialogTitle,
    TextField,
    DialogActions,
    Button
} from '@mui/material'
import React from 'react'


const DeleteJournal = ({journal}) => {

    //this function handles the deletino of a journal
    function handleDelete(e) {
        e.preventDefault();
        fetch('/api/journals/delete', {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(journal.selectedJournal)
        }).then(
            response => { 
                if(response.statusText === "Created"){
                    alert('Account Deleted')
                } else {
                    alert(response.statusText)
                } 
            },
        )
    }

    return (
        <>
            <DialogTitle> Delete An Entry</DialogTitle>
            <TextField
                disabled
                id="outlined-disabled"
                label="Journal Name"
                defaultValue={journal.selectedJournal.account_name}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Debit"
                defaultValue={journal.selectedJournal.debit}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Credit"
                defaultValue={journal.selectedJournal.credit}
            />            
            <DialogActions>
                <Button onClick={handleDelete}>Delete Entry</Button>
            </DialogActions>
        </>
    )
}

export default DeleteJournal