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
  TextField,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";
import {
    Dialog,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material'

import ViewAccount from "./ViewAccount";
import Accounts from "./Accounts";


//CREATE varaibles for each section in Database
function Journal() {
//When account is selected: 
const Addjournal = ({ journalt }) => {
  const [updatedjournal, setUpdatedjournal] = useState({
   date:'',
    name: '', 
    debit:'', 
    credit: '',  
  })

  //function handleJournalNameChange(e) { updatedJournal.jouranlName = e.target.value; }
  //CREATE for date, debit, and credit 

  return (
    <div className="Journal">
      <table>
        <tr>
        <th>Date</th>
          <th>Name</th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
        {journal.map((val, key) => {
          return (
            <tr key={key}>
               <td>{val.date}</td>
              <td>{val.name}</td>
              <td>{val.debit}</td>
              <td>{val.credit}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
  const [backendData, setBackendData] = useState([{}]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

 /* const AddJournal = ({journal})=>{
    const [updatedjournal, setUpdatedjournal] = useState({
        accountNumber: 0,
        accountName: '',
        debit: 0.00,
        credit: 0.00,
    })*/

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
                <TableCell> Debit </TableCell>
                <TableCell> Credit </TableCell>
                <TableCell> Balance </TableCell>
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
                    <TableCell>{numberFormat(account.debit)}</TableCell>
                    <TableCell>{numberFormat(account.credit)}</TableCell>
                    <TableCell>{numberFormat(account.balance)}</TableCell>
                    
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




export default Journal;

/*return (
        <>
            <DialogTitle> Add A Journal</DialogTitle>
      <TextField
                id="outlined-required"
                label="Debit"
                defaultValue={account.selectedAccount.debit}
            />
            <TextField
                id="outlined-required"
                label="Credit"
                defaultValue={account.selectedAccount.credit}
             
            />
                <DialogActions>
                <Button onClick={handleEdit}>Update Journal</Button>
            </DialogActions>
            </>
      )*/
