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
import Accounts from '../Accounts'
import '../../css/EditAccount.css'

const EditAccount = ({ account }) => {
    const [updatedCategory, setUpdatedCategory] = useState('')
    const [updatedSubcategory, setUpdatedSubcategory] = useState('')
    const [updatedStatement, setUpdatedStatement] = useState('')
    const [updatedStatus, setUpdatedStatus] = useState('')
    const [message, setMessage] = useState({ error: false, msg: "" });
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

    function handleAccountNameChange(e) { updatedAccount.accountName = e.target.value; }
    function handleAccountDescChange(e) { updatedAccount.accountDescription = e.target.value; }
    function handleAccountCatChange(e) { setUpdatedCategory(e.target.value); updatedAccount.accountCategory = e.target.value; }
    function handleAccountSubCatChange(e) { setUpdatedSubcategory(e.target.value); updatedAccount.accountSubcategory = e.target.value; }
    function handleAccountInitialChange(e) { updatedAccount.initialBalance = Number(e.target.value); }
    function handleAccountBalanceChange(e) { updatedAccount.balance = Number(e.target.value); }
    //function handleAccountUserChange(e) { updatedAccount.accountName = e.target.value; console.log(account) }
    //function handleAccountDateChange(e) { updatedAccountt.accountName = e.target.value; console.log(account) }
    function handleAccountStatusChange(e){setUpdatedStatus(e.target.value); updatedAccount.accountStatus = e.target.value;}

    function handleEdit(e) {
        e.preventDefault();
        console.log(account.selectedAccount)
        console.log(updatedAccount)
        console.log('trying to update...')
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
            <DialogTitle> Edit An Account</DialogTitle>
            <TextField
                disabled
                id="outlined-disabled"
                label="Account Number -- Required"
                defaultValue={account.selectedAccount.account_number}
            />
            <TextField
                required
                id="outlined-required"
                label="Account Name -- Required"
                defaultValue={account.selectedAccount.account_name}
                onChange={handleAccountNameChange}
            />
            <TextField
                required
                id="outlined-required"
                label="Account Description -- Required"
                defaultValue={account.selectedAccount.account_description}
                onChange={handleAccountDescChange}
            />
            <InputLabel id="demo-simple-select-label category">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label category"
                id="demo-simple-select"
                value={updatedCategory}
                label="Category"
                sx={{ width: 'fit-content' }}
                defaultValue={account.selectedAccount.account_category}
                onChange={handleAccountCatChange}
            >
                <MenuItem value='assets'>Assets</MenuItem>
                <MenuItem value='liability'>Liability</MenuItem>
                <MenuItem value='equity'>Equity</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label subcategory">Subcategory</InputLabel>
            <Select
                labelId="demo-simple-select-label subcategory"
                id="demo-simple-select"
                value={updatedSubcategory}
                label="Subcategory"
                sx={{ width: 'fit-content' }}
                defaultValue={account.selectedAccount.account_subcategory}
                onChange={handleAccountSubCatChange}
            >
                <MenuItem value='current assets'>Assets</MenuItem>
                <MenuItem value='non-current assets'>Non-Current Assets</MenuItem>
                <MenuItem value='current liabilities'>Current Liabilities</MenuItem>
                <MenuItem value='non-current liabilities'>Non-Current Liabilities</MenuItem>
                <MenuItem value="shareholder\'s equity">Shareholder's Equity'</MenuItem>
                <MenuItem value='expenses'>Expenses</MenuItem>
            </Select>
            <TextField
                id="outlined-required"
                label="Initial Balance"
                defaultValue={account.selectedAccount.initial_balance}
            />
            <TextField
                id="outlined-required"
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
            <InputLabel id="demo-simple-select-label statement">Status</InputLabel>
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
                <Button onClick={handleEdit}>Update Account</Button>
            </DialogActions>
        </>
    )
}


export default EditAccount
