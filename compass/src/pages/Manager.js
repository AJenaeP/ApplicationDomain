

import { useState, useEffect } from "react";

import Header from "./Header";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";

import ViewAccount from "./ViewAccount";
import Accounts from "./Accounts";


//CREATE varaibles for each section in Database
function Manager() {

  const [backendData, setBackendData] = useState([{}]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  //CREATE use effect
  useEffect(() => {
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);


 
const openAddAccount = () => {
  setOpenAdd(true);
};
const openViewAccount = () => {
  if (isRowSelected) {
    setOpenView(true);
  }
};
const openEditAccount = () => {
  if (isRowSelected) {
    setOpenEdit(true);
  }
};
const openDeleteAccount = () => {
  if (isRowSelected) {
    setOpenDelete(true);
  }
};
const closeAddAccount = () => {
  setOpenAdd(false);
};
const closeViewAccount = () => {
  setOpenView(false);
};
const closeEditAccount = () => {
  setOpenEdit(false);
};
const closeDeleteAccount = () => {
  setOpenDelete(false);
};
function handleAccountSelection(account, i) {
  if (selectedRow === i) {
    setIsRowSelected(false);
    setSelectedRow(null);
  } else {
    setSelectedRow(i);
    setSelectedAccount(account);
    setIsRowSelected(true);
    const row = document.getElementById(i);
    row.classList.add("isSelected");
  }
}

const numberFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

//NEED return method that promised information
return (
  <div className="App">
    <Header />
    <Paper
      sx={{
        width: 1000,
        overflow: "hidden",
        display: "flex",
        position: "relative",
        top: 100,
        left: "20%",
      }}
    >
    
         <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
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
                <TableCell> Status </TableCell>
              </TableRow>
            </TableHead>
          <TableBody className="accountRows">
            {backendData.map((account, i) => {
              return (
                <>
                  <TableRow
                    id={i}
                    key={i}
                    onClick={() => handleAccountSelection(account, i)}
                    className={selectedRow === i ? "isSelected" : ""}
                  >
                    <TableCell>{account.account_number}</TableCell>
                    <TableCell>{account.account_name}</TableCell>
                    <TableCell>{account.account_description}</TableCell>
                    <TableCell>{account.account_category}</TableCell>
                    <TableCell>{account.account_subcategory}</TableCell>
                    <TableCell>{account.normal_side}</TableCell>
                    <TableCell>{numberFormat(account.initial_balance)}</TableCell>
                    <TableCell>{numberFormat(account.debit)}</TableCell>
                    <TableCell>{numberFormat(account.credit)}</TableCell>
                    <TableCell>{numberFormat(account.balance)}</TableCell>
                    <TableCell>{account.userId}</TableCell>
                    <TableCell>{account.date_time_account_added}</TableCell>
                    <TableCell>{account.order_num}</TableCell>
                    <TableCell>{account.statement}</TableCell>
                    <TableCell>{account.comment}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
   
    <div
      style={{
        display: "flex",
        marginTop: 150,
        marginLeft: 450,
        justifyContent: "center",
      }}
    >
     
   
     </div>
     </div>
  
);
}

export default Manager;
