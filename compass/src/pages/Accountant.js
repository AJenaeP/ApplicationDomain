//Can view accounts but can’t add, edit, or
//deactivate accounts, but can perform the rest
//of the services the administrator can perform
/*import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { db } from "./firebase-config";


import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";



//Display logo
//<img id={compass logo} src="images/compassLogo.png"></img>

//LAYOUT:

//Title:
//<h2>Compass Credit Union</h2>


//CREATE varaibles for each section in Database
function Accountant() {
 
    const [newName] = useState("");
    const [newAccountNumber] = useState("");
    const [newDescription] = useState("");
    const [newnormalSide] = useState("");
    const [newCategory] = useState("");
    const [newSubCategory] = useState("");
    const [newInitialBalance] = useState("");
    const [newDebit] = useState("");
    const [newCredit] = useState("");
    const [newBalance] = useState("");
    const [newAccountAdded] = useState("");
    const [newUserID] = useState("");
    const [newOrder] = useState("");
    const [newStatement] = useState("");
    const [newComment] = useState("");
    const [newstatus] = useState("Active");

  
//CREATE collection assigned to Accounts in Firestore
  const [Accounts, setAccounts] = useState([]);
  const AccountsCollectionRef = collection(db, "Accounts");

  //ASSIGN to each section
  const createAccounts = async () => {
    await addDoc(AccountsCollectionRef, { Name: newName, AccountNumber: Number(newAccountNumber), Description: newDescription, normalSide: newnormalSide,  Category: newCategory, SubCategory: newSubCategory, InitialBalance: newInitialBalance, Debit: newDebit, Credit: newCredit, Balance: newBalance, AccountAdded: newAccountAdded, UserID: newUserID, Order: newOrder, Statement: newStatement, Comment: newComment, status: newstatus});
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
  
//CREATE a dynamic table to display information
return (
  <>
    <div className="mb-2">
    </div>

    {}
    <Table className ='container w-75'>
      <thead>
        <tr>
          <th>#</th>
          <th>Account Name</th>
          <th>Account Number</th>
          <th>Account Description</th>
          <th>Normal side</th>
          <th>Account Category</th>
          <th>Account Subcategory</th>
          <th>Initial Balance</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Balance</th>
          <th>Account Added</th>
          <th>User Id</th>
          <th>Order</th>
          <th>Statement</th>
          <th>Comment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Accounts.map((doc, index) => {
          return (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.Name}</td>
              <td>{doc.AccountNumber}</td>
              <td>{doc.Description}</td>
              <td>{doc.normalSide}</td>
              <td>{doc.Category}</td>
              <td>{doc.SubCategory}</td>
              <td>{doc.InitialBalance}</td>
              <td>{doc.Debit}</td>
              <td>{doc.Credit}</td>
              <td>{doc.Balance}</td>
              <td>{doc.AccountAdded}</td>
              <td>{doc.UserID}</td>
              <td>{doc.Order}</td>
              <td>{doc.Statement}</td>
              <td>{doc.Comment}</td>
              <td>{doc.status}</td>

              
            </tr>
          );
        })}
      </tbody>
    </Table>
  </>
);
};

export default Accountant;*/
