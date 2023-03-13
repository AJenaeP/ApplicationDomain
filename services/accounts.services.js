import { db } from "../firebase-config";
//import Form from 'react-bootstrap/Form';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
 
  doc,
} from "firebase/firestore";


//CREATE collection of the reference and add the Accounts Database as parameters
const AccountCollectionRef = collection(db, "Accounts");
class AccountsDataService {
  //Add a new account that will pass to collection
  addAccount = (newAccount) => {
    return addDoc(AccountCollectionRef, newAccount);
  };

  //CREATE method to update account
  updateAccount = (id, updatedAccount) => {
    const AccountDoc = doc(db, "Accounts", id);
    return updateDoc(AccountDoc, updatedAccount);
  };



  //CREATE method to get all accounts
  getAllAccounts = () => {
    return getDocs(AccountCollectionRef);
  };

  //CREATE a method for a specific account retreival 
  getAccount = (id) => {
    const AccountDoc = doc(db, "Accounts", id);
    return getDoc(AccountDoc);
  };
}

export default new AccountsDataService();
