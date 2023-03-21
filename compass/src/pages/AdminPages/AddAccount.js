import { 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent
 } from '@mui/material'
import React, { useState, useEffect } from "react";
import '../../css/AddAccount.css';

const AddAccount = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [handleClose, setHandleClose] = useState(false)
  const [addAccount, setAddAccount] = useState(false)
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [statement, setStatement] = useState('')
  const[status, setStatus] = useState('Active')
  const [account, setAccount] = useState({
    accountNumber: 0,
    accountName: '',
    accountDescription: '',
    accountCategory: '',
    accountSubcategory: '',
    normalSide: '',
    initialBalance: 0.00,
    debit: 0.00,
    credit: 0.00,
    userId: '',
    dateTime: '',
    orderNumber: '',
    statement: '',
    comment: '',
    status:'',
    
  })
  function handleAccountNumberChange(e) { account.accountNumber = Number(e.target.value);}
  function handleAccountNameChange(e) { account.accountName = e.target.value; }
  function handleAccountDescChange(e) { account.accountDescription = e.target.value;}
  function handleAccountCatChange(e) { setCategory(e.target.value); account.accountCategory = e.target.value;}
  function handleAccountSubCatChange(e) { setSubcategory(e.target.value); account.accountSubcategory = e.target.value;}
  function handleAccountNormChange(e) { account.normalSide = Number(e.target.value);}
  function handleAccountInitialChange(e) { account.initialBalance = Number(e.target.value);}
  function handleAccountDebitChange(e) { account.debit = Number(e.target.value);}
  function handleAccountCreditChange(e) { account.credit = Number(e.target.value);}
  //function handleAccountUserChange(e) { account.accountName = e.target.value; console.log(account) }
  //function handleAccountDateChange(e) { account.accountName = e.target.value; console.log(account) }
  function handleAccountOrderChange(e) { account.orderNumber = Number(e.target.value);}
  function handleAccountStatementChange(e) { setStatement(e.target.value); account.statement = e.target.value;}
  function handleAccountCommentChange(e) { account.comment = e.target.value;}
  function handleAccountStatusChange(e) { setStatus(e.target.value); account.accountStatus = e.target.value;}

  function handleAdd(e){
    e.preventDefault();
    console.log(account)
    console.log('trying to add...')
    fetch('/api/accounts/add', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(account)
    })
    .then( 
      response => {alert(response.statusText)}
    )
  }

  const closeAddAccount = () => {
    setIsOpen(false);
  };

    return (
      <>
          <DialogTitle> Add An Account</DialogTitle>
            <TextField
              required
              id="outlined-required"
              label= "Account Number -- Required"
              defaultValue=""
              onChange = {handleAccountNumberChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Account Name -- Required"
              defaultValue=""
              onChange={handleAccountNameChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Account Description -- Required"
              defaultValue=""
              onChange={handleAccountDescChange}
            />
            <InputLabel id="demo-simple-select-label category">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label category"
              id="demo-simple-select"
              value={category}
              label="Category"
              sx={{ width: 'auto' }}
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
              value={subcategory}
              label="Subcategory"
              sx={{ width: 'auto' }}
              onChange={handleAccountSubCatChange}
            >
              <MenuItem value='current assets'>Assets</MenuItem>
              <MenuItem value='non-current assets'>Non-Current Assets</MenuItem>
              <MenuItem value='current liabilities'>Current Liabilities</MenuItem>
              <MenuItem value='non-current liabilities'>Non-Current Liabilities</MenuItem>
              <MenuItem value="shareholder\'s equity">Shareholder's Equity'</MenuItem>
              <MenuItem value='expenses'>Expenses</MenuItem>
            </Select>
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Initial Balance</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Initial Balance"
                onChange={handleAccountInitialChange}
              />
            </div>
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Debit</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Debit"
                onChange={handleAccountDebitChange}
              />
            </div>
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Credit</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Credit"
                onChange={handleAccountCreditChange}
              />
            </div>
            <TextField
                disabled
                id="outlined-disabled"
                label="User Id"
                defaultValue="userId"
            />
            <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                defaultValue="DateTime"
            />
            <InputLabel id="demo-simple-select-label statement">Statement</InputLabel>
            <Select
              labelId="demo-simple-select-label statement"
              id="demo-simple-select"
              value={statement}
              label="Statement"
              sx={{ width: 'auto' }}
              onChange={handleAccountStatementChange}
            >
              <MenuItem value='balance sheet'>Balance Sheet</MenuItem>
            //TODO: add another statement type here
            </Select>

            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows={4}
              defaultValue="Type Here"
              onChange={handleAccountCommentChange}
            />
            <InputLabel id="demo-simple-select-label status">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label status"
              id="demo-simple-select"
              value={status}
              label="Status"
              sx={{ width: 'auto' }}
              onChange={handleAccountStatusChange}
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='deactive'>Deactivate</MenuItem>
              
            </Select>
        
        <DialogActions>
          <Button 
            onClick={handleAdd}
          >Add</Button>
        </DialogActions>
      </>
    )
  }


export default AddAccount

export default AddAccount
