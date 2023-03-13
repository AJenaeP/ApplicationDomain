import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AccountsDataService from "../services/accounts.services";


//NEED to Fetch all Accounts by calling the Get method
const AccountList = ({ getAccountId }) => {
  //STORE accounts data in Array 
  const [Account, setAccount] = useState([]);
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const data = await AccountsDataService.getAllAccounts();
    console.log(data.docs);
    setAccount(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

 /* const deactivateHandler = async (id) => {
    await AccountsDataService.deactivateAccount(id);
    getAccount();
  };*/


  //CREATE a dynamic table to display information
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getAccount}>
          Refresh List
        </Button>
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
          {Account.map((doc, index) => {
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

                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getAccountId(doc.id)}
                  >
                    Edit
                  </Button>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AccountList;
