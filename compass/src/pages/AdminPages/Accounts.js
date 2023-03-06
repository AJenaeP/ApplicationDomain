import { useState, useEffect } from "react";
import { db } from '../../utilities/Firebase';
import Sidebar from '../../utilities/Sidebar';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


//Display logo
//<img id={compass logo} src="images/compassLogo.png"></img>

//LAYOUT:

//Title:
//<h2>Compass Credit Union</h2>

//CREATE varaibles for each section in Database
function Accounts() {
  const [newName, setNewName] = useState("");
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

  //CREATE use effect
  useEffect(() => {
    const getAccounts = async () => {
      const data = await getDocs(AccountsCollectionRef);
      setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAccounts();
  }, []);


  //NEED return method that promised information 
  return (
    <div className="App">
      <input
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
      })}
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
