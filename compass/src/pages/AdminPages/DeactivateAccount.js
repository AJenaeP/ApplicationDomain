import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import Accounts from '../Accounts'

const DeactivateAccount = ({account}) => {
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [updatedStatus, setUpdatedStatus] = useState('')
    function handleAccountStatusChange(e) { setUpdatedStatus(e.target.value); updatedAccount.accountStatus = e.target.value; }
    const [updatedAccount, setUpdatedAccount] = useState({
        accountNumber: account.selectedAccount.account_number,
        accountName: account.selectedAccount.account_name,
        accountDescription: account.selectedAccount.account_description,
        accountCategory: account.selectedAccount.account_category,
        accountSubcategory: account.selectedAccount.account_subcategory,
        initialBalance: account.selectedAccount.initialBalance,
        balance: account.selectedAccount.balance,
        userId: account.selectedAccount.userId,
        dateTime: account.selectedAccount.dateTime,
        accountStatus: account.selectedAccount.account_status,
    })
    function handleAccountStatusChange(e) { setUpdatedStatus(e.target.value); updatedAccount.accountStatus = e.target.value; }

    function handleDelete(e) {
        //e.preventDefault();
        console.log(account.selectedAccount.account_number)
        console.log(account.selectedAccount)
        console.log('trying to delete...')
       /*fetch('/api/accounts/delete', {
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
            )*/
        fetch('/api/accounts/update', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedAccount)
        })
            .then(
                response => {
                    if (response.statusText === "Created") {
                        alert('Account Updated')
                        if (account.selectedAccount.balance < 0) {
                            setMessage({ error: true, msg: "Account cannot be deactivated" });
                        }
                    } else {
                        alert(response.statusText)
                    }
                },
            )
    }

    return (
        <>
            <DialogTitle> Deactivate/Activate An Account</DialogTitle>
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
            <InputLabel id="demo-simple-select-label status">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label status"
                id="demo-simple-select"
                value={updatedStatus}
                label="Status"
                sx={{ width: 'fit-content' }}
                defaultValue={account.selectedAccount.account_status}
                onChange={handleAccountStatusChange}
            >
                <MenuItem value='Active'>Activate</MenuItem>
                <MenuItem value='Deactivated'>Deactivate</MenuItem>
            </Select>
            <DialogActions>
                <Button onClick={handleDelete}>Deactivate/Activate Account</Button>
            </DialogActions>
        </>
    )
}


export default DeactivateAccount