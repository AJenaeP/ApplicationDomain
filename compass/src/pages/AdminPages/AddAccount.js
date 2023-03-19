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
  const [accountNumber, setAccountNumber] = useState(0)
  const [accountName, setAccountName] = useState('')
  const [accountDescription, setAccountDescription] = useState('')
  const [accountCategory, setAccountCategory] = useState('')
  const [accountSubcategory, setAccountSubcategory] = useState('')
  const [normalSide, setNormalSide] = useState(0)
  const [initialBalance, setInitialBalance] = useState(0.00)
  const [debit, setDebit] = useState(0.00)
  const [credit, setCredit] = useState(0.00)
  const [userId, setUserId] = ('')
  const [datetime, setDateTime] = ('')
  const [orderNumber, setOrderNumber] = ('')
  const [comment, setComment] = ('')
  const [statement, setStatement] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [account, setAccount] = useState({})

  const handleAdd = () => {
    const account = {
        account_number: accountNumber,
        account_name: accountName,
        account_description: accountDescription,
        account_category: accountCategory,
        account_subcategory: accountSubcategory,
        normal_side: normalSide,
        intial_balance: initialBalance,
        debit: debit,
        credit: credit,
        userId: userId,
        date_time_account_added: datetime,
        order_num: orderNumber,
        statement: statement,
        comment: comment
    }
    setAccount(account)
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
              label="Required"
              defaultValue="Account Number"
              //onChange = {(e) => setAccountNumber(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Account Name"
              onChange={(e) => setAccountName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Account Description"
              onChange={(e) => setAccountDescription(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label category">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label category"
              id="demo-simple-select"
              value={category}
              label="Categpry"
              sx={{ width: 'auto' }}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <MenuItem value='current assets'>Assets</MenuItem>
              <MenuItem value='non-current assets'>Non-Current Assets</MenuItem>
              <MenuItem value='current liabilities'>Current Liabilities</MenuItem>
              <MenuItem value='non-current liabilities'>Non-Current Liabilities</MenuItem>
              <MenuItem value="shareholder\'s equity">Shareholder's Equity'</MenuItem>
              <MenuItem value='expenses'>Expenses</MenuItem>
            </Select>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows={4}
              defaultValue="Type Here"
              onChange= {(e) => setComment(e.target.value)}
            />
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Initial Balance</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Initial Balance"
                //onChange={(e) => setInitialBalance(e.target.value)}
              />
            </div>
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Debit</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Debit"
                //onChange={(e) => setDebit(e.target.value)}
              />
            </div>
            <div style={{ 'width': 250 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Credit</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Credit"
                //onChange={(e) => setCredit(e.target.value)}
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
              onChange={(e) => setStatement(e.target.value)}
            >
              <MenuItem value='balance sheet'>Balance Sheet</MenuItem>
            //TODO: add another statement type here
            </Select>
      </>
    )
  }


export default AddAccount
