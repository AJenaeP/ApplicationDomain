import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@mui/material'
import React from 'react'
import Accounts from '../Accounts'

const DeleteAccount = ({account}) => {

    function handleDelete(e) {
        //e.preventDefault();
        console.log(account.selectedAccount.account_number)
        console.log(account.selectedAccount)
        console.log('trying to delete...')
        fetch('/api/accounts/delete', {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(account.selectedAccount)
        })
            .then(
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
            <DialogTitle> Delete An Account</DialogTitle>
            <TextField
                disabled
                id="outlined-disabled"
                label="Account Number"
                defaultValue={account.selectedAccount.account_number}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Account Name"
                defaultValue={account.selectedAccount.account_name}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Account Description"
                defaultValue={account.selectedAccount.account_description}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Category"
                defaultValue={account.selectedAccount.account_category}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Subcategory"
                defaultValue={account.selectedAccount.account_subcategory}               
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Initial Balance"
                defaultValue={account.selectedAccount.initial_balance}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Balance"
                defaultValue={account.selectedAccount.balance}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="User Id"
                defaultValue={account.selectedAccount.userId}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Date/Time Account Added"
                defaultValue={account.selectedAccount.date_time_account_added}
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Status"
                defaultValue={account.selectedAccount.account_status}
            />
            <DialogActions>
                <Button onClick={handleDelete}>Delete Account</Button>
            </DialogActions>
        </>
    )
}


export default DeleteAccount