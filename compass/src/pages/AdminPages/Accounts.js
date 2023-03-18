import React, { useState, useEffect } from "react";
import { db } from '../../utilities/Firebase';
import Sidebar from '../../utilities/Sidebar';
import Header from "../Header";
import '../../css/Accounts.css';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { TableCell, TableContainer, TableHead, TableRow, TableBody, Table, Paper, Button } from "@mui/material";

//Display logo
//<img id={compass logo} src="images/compassLogo.png"></img>

//LAYOUT:

//Title:
//<h2>Compass Credit Union</h2>

//CREATE varaibles for each section in Database
function Accounts() {
  /*const [newName, setNewName] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newAccountNumber, setAccountNumber] = useState(0);
  
//CREATE collection assigned to Accounts in Firestore
  const [Accounts, setAccounts] = useState([]);
  const AccountsCollectionRef = collection(db, "Accounts");


  //ASSIGN to each section
  const createAccounts = async () => {
    await addDoc(AccountsCollectionRef, { Name: newName, Description: newDescription, AccountNumber: Number(newAccountNumber) });
  };

  //CREATE update method
  const updateAccounts = async (id, Name, Description, AccountNumber) => {
    const AccountsDoc = doc(db, "Accounts", id);
    const newFields = { AccountNumber: AccountNumber + 1 };
    await updateDoc(AccountsDoc, newFields);
  };

  //CREATE delete method
  const deleteAccounts = async (id) => {
    const AccountsDoc = doc(db, "Accounts", id);
    await deleteDoc(AccountsDoc);
  };
*/
    const [backendData, setBackendData] = useState([{}]);
    const [selectedRow, setSelectedRow] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)

    //console.log(selectedRow)
    useEffect(() => {
      fetch('/api/accounts').then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    },[])

   function handleAccountSelection(account) {
      if(isRowSelected){
        const currentRow = document.getElementsByClassName('isSelected')
        console.log(currentRow)
        //currentRow.classList.remove('isSelected')
        //setIsRowSelected(false)
      }

        setSelectedRow(account)
        setIsRowSelected(true)
        const row = document.getElementById(account.account_number)
        row.classList.add('isSelected')  
    }


  //NEED return method that promised information 
  return (
    <div className="App">
      <Header/>
      <Paper sx={{ width: 1000, overflow: 'hidden', display: 'flex',position: 'relative', top: 100, left: '20%' }}>
      <TableContainer>
          <Table sx={{ minWidth: 650}} size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell> Account Number </TableCell>
            <TableCell> Account Name </TableCell>
            <TableCell> Account Description </TableCell>
            <TableCell> Account Category </TableCell>
            <TableCell> Account Subcategory </TableCell>
            <TableCell> Normal Side </TableCell>
            <TableCell> Initial Balance </TableCell>
            <TableCell> Debit </TableCell>
            <TableCell> Credit </TableCell>
            <TableCell> Balance </TableCell>
            <TableCell> UserId </TableCell>
            <TableCell> Date/Time Added </TableCell>
            <TableCell> Order Number </TableCell>
            <TableCell> Statement </TableCell>
            <TableCell> Comment </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="accountRows">
            {backendData.map(account => {
              return (
                <>
                  <TableRow
                    id={account.account_number} 
                    key={account.account_number} 
                    onClick={() => handleAccountSelection(account)}
                  >
                    <TableCell>{account.account_number}</TableCell>
                    <TableCell>{account.account_name}</TableCell>
                    <TableCell>{account.account_description}</TableCell>
                    <TableCell>{account.account_category}</TableCell>
                    <TableCell>{account.account_subcategory}</TableCell>
                    <TableCell>{account.normal_side}</TableCell>
                    <TableCell>{account.initial_balance}</TableCell>
                    <TableCell>{account.debit}</TableCell>
                    <TableCell>{account.credit}</TableCell>
                    <TableCell>{account.balance}</TableCell>
                    <TableCell>{account.userId}</TableCell>
                    <TableCell>{account.date_time_account_added}</TableCell>
                    <TableCell>{account.order_num}</TableCell>
                    <TableCell>{account.statement}</TableCell>
                    <TableCell>{account.comment}</TableCell>
                </TableRow>
                </>
              )})}     
        </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      <div style={{ display: 'flex', marginTop: 150, marginLeft: 450, justifyContent: 'center'}}>
        <Button
          variant='outlined'
          size='large'
          type='submit'
          style={{ width: 100, marginRight: 20 }}
          className='submit'
          sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
        >
          Add Account
        </Button>
        <Button
          variant='outlined'
          size='large'
          type='submit'
          style={{ width: 100, marginRight: 20 }}
          className='submit'
          sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
        >
          Edit Account
        </Button>
        <Button
          variant='outlined'
          size='large'
          type='submit'
          style={{ width: 100, marginRight: 20 }}
          className='submit'
          sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
        >
          Delete Account
        </Button>
      </div> 
    </div>
  );
}

export default Accounts;




//Need to create components in Firebase to add the info from document
//ADD
//VIEW
//DEACTIVATE 

//You can ask the administrator to select which service he wants before displaying the appropriate user interface where he can perform the functionality.  
//When an account is added:
//you must store in the database at least the following required information using a user interface designed to allow entering or modifying the information:

//Account name
//Account number (must have correct starting values as discussed in class)
//Account description
//Normal side
//Account category (e.g. asset)
//Account subcategory (e.g. current assets)
//Initial balance
//Debit
//Credit
//Balance
//Date/time account added
//User id
//Order (e.g cash can be 01)
//Statement (e.g. IS (income statement), BS (balance sheet), RE (Retained Earnings statement)
//Comment

/*<input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />


       <input
        placeholder="Account Description..."
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        />

      <input
        type="number"
        placeholder="Account Number..."
        onChange={(event) => {
          setAccountNumber(event.target.value);
        }}
      />
      
   

      <button onClick={createAccounts}> Create Account</button>
      {Accounts.map((Accounts) => {
        return (
          <div>
            {" "}
            <h1>AccountNumber: {Accounts.AccountNumber}</h1>
            <h1>Description: {Accounts.Description}</h1>
            <h1>Name: {Accounts.name}</h1>
           
            
            <button
              onClick={() => {
                updateAccounts(Accounts.id, Accounts.age);
              }}
            >
           
           
            
              {" "}
              Delete Account
            </button>
          </div>
        );
      })}*/

/*<TableRow
          key={account.account_number}
        >
          <TableCell>{account.account_number}</TableCell>
          <TableCell>{account.account_name}</TableCell>
          <TableCell>{account.account_description}</TableCell>
          <TableCell>{account.account_category}</TableCell>
          <TableCell>{account.account_subcategory}</TableCell>
          <TableCell>{account.normal_side}</TableCell>
          <TableCell>{account.initial_balance}</TableCell>
          <TableCell>{account.debit}</TableCell>
          <TableCell>{account.credit}</TableCell>
          <TableCell>{account.balance}</TableCell>
          <TableCell>{account.userId}</TableCell>
          <TableCell>{account.date_time_account_added}</TableCell>
          <TableCell>{account.order_num}</TableCell>
          <TableCell>{account.statement}</TableCell>
          <TableCell>{account.comment}</TableCell>
        </TableRow>
    })}*/