import React, { useState, useEffect } from "react";
import { db } from "../../utilities/Firebase";
import Sidebar from "../../utilities/Sidebar";
import Header from "../Header";
import "../../css/Accounts.css";

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
import AddAccount from "./AddAccount";
import ViewAccount from "../ViewAccount";
import EditAccount from "./EditAccount";
import DeleteAccount from "./DeleteAccount";

function Accounts() {
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [backendData, setBackendData] = useState([{}]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [newAccount, setNewAccount] = useState(AddAccount.account)

    //console.log(selectedRow)
    useEffect(() => {
      fetch('/api/accounts')
      .then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    },[backendData])
    //we can use this when searching
    /*useEffect(() => {
      fetch('/api/accounts/:accountNumber').then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])*/

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
                      <TableCell>{account.status}</TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openAdd} onClose={closeAddAccount}>
        <DialogContent>
          <AddAccount />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddAccount}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openView} onClose={closeViewAccount}>
        <DialogContent>
          <ViewAccount />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewAccount}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={closeEditAccount}>
        <DialogContent>
          <EditAccount account={{ selectedAccount }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditAccount}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={closeDeleteAccount}>
        <DialogContent>
          <DeleteAccount account={{ selectedAccount }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAccount}>Close</Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          marginTop: 150,
          marginLeft: 450,
          justifyContent: "center",
        }}
      >
      {
        (role === "Administrator") &&
          <>
            <Tooltip title="Add Chart of Account Entry">
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: 100, marginRight: 20 }}
                  className="submit"
                  sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                  onClick={openAddAccount}
                >
                  Add Account
                </Button>
            </Tooltip>
            <Tooltip title="View Chart of Account">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                onClick={openViewAccount}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                  View Account
              </Button>
            </Tooltip>
            <Tooltip title="Edit Chart of Account">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                onClick={openEditAccount}
              >
              Edit Account
              </Button>
            </Tooltip>
            <Tooltip title="Delete Account">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                onClick={openDeleteAccount}
              >
                Delete Account
              </Button>
              </Tooltip>
          </>
      }
      {
        (role !== "Administrator") &&
          <>
            <Tooltip title="View Chart of Account">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 100, marginRight: 20 }}
                className="submit"
                onClick={openViewAccount}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                View Account
              </Button>
            </Tooltip>
          </>
        }
      </div>
    </div> 
);
}
export default Accounts;
