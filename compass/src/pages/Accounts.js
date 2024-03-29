import React, { useState, useEffect } from "react";
import { db } from "../utilities/Firebase";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/Accounts.css";
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
  TextField,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import AddAccount from "./AdminPages/AddAccount";
import ViewAccount from "./ViewAccount";
import EditAccount from "./AdminPages/EditAccount";
import DeactivateAccount from "./AdminPages/DeactivateAccount";
import DeleteAccount from "./AdminPages/DeleteAccount";

const Accounts = () => {
  const [role, setRole] = useState(window.localStorage.getItem("userRole"));
  const [backendData, setBackendData] = useState([{}]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [balanceFilter, setBalanceFilter] = React.useState();

  //CREATE data for search field 
  const data = {
    account_number: 0,
    account_name: "",
    account_category: "",
    statement: "",
  };

  function clearSearchField() {
    document.getElementById("search").value = null;
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }
  function handleSearchField() {
    let value = document.getElementById("search").value;

    if (isNaN(value)) {
      console.log("is a string");
      data.account_name = String(value);
      data.account_number = 0;
      console.log(data);
    } else if (!isNaN(value)) {
      console.log("is a number");
      data.account_number = Number(value);
      data.account_name = "";
      console.log(data);
    } else {
      console.log("field is empty");
    }

    fetch("/api/account/" + JSON.stringify(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data[0]);
      });
  }
//CREATE filter options for accounts based on category
  function handleRadioFilter(e) {
    let filter = e.target.value;
    setStatusFilter(filter);
    if (filter === "All") {
      fetch("/api/accounts")
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        });
    } else {
      if (filter === "Assets") {
        data.account_category = "assets";
      } else if (filter === "Liability") {
        data.account_category = "liability";
      } else if (filter === "Equity") {
        data.account_category = "equity";
      }
      fetch("/api/account/" + JSON.stringify(data), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data[0]);
        });
    }
  }
//CREATE filter options based on balance
  function handleBalanceFilter(e) {
    let balance = e.target.value;
    let Array = [];
    if (balance === "All") {
      fetch("/api/accounts")
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        });
    } else if (balance === "-1000000") {
      backendData.forEach((item) => {
        if (item.balance <= 1000000) {
          Array.push(item);
        }
      });
      setBackendData(Array);
    } else if (balance === "5000000") {
      backendData.forEach((item) => {
        if (item.balance > 1000000 && item.balance <= 5000000) {
          Array.push(item);
        }
      });
      setBackendData(Array);
    } else if (balance === "5000000+") {
      backendData.forEach((item) => {
        if (item.balance > 5000000) {
          Array.push(item);
        }
      });
      setBackendData(Array);
    }
  }
  //CREATE use effect method to fetch accounts 
  useEffect(() => {
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  //CREATE boolean functions to handle Adding the Account
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
  const openDeactivateAccount = () => {
    if (isRowSelected) {
      setOpenDeactivate(true);
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
  const closeDeactivateAccount = () => {
    setOpenDeactivate(false);
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
//CREATE function to update numbers into currency form 
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

//CREATE sticky table to return the information 
//INCLUDED role based with if selection statements to access to display appropriate information 
  return (
    <div className="App">
      <Header />
      <div className="searchField">
        <TextField
          id="search"
          label="Search by Account Number or Name"
          //type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearchField}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={clearSearchField}
                 
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div style={{ marginLeft: 50 }}>
          <FormLabel id="demo-radio-buttons-group-label category">
            Category
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label category"
            defaultValue="All"
            value={statusFilter}
            onChange={handleRadioFilter}
          >
            <FormControlLabel
              value="All"
              control={<Radio size="small" />}
              label="All"
            />
            <FormControlLabel
              value="Assets"
              control={<Radio size="small" />}
              label="Assets"
            />
            <FormControlLabel
              value="Liability"
              control={<Radio size="small" />}
              label="Liability"
            />
            <FormControlLabel
              value="Equity"
              control={<Radio size="small" />}
              label="Equity"
            />
          </RadioGroup>
        </div>
        <div style={{ marginLeft: 50, width: 400 }}>
          <FormLabel id="demo-radio-buttons-group-label balance">
            Balance
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label balance"
            defaultValue="All"
            value={balanceFilter}
            onChange={handleBalanceFilter}
          >
            <FormControlLabel
              value="All"
              control={<Radio size="small" />}
              label="$0 - $5,000,000+"
            />
            <FormControlLabel
              value="-1000000"
              control={<Radio size="small" />}
              label="$0 - $1,000,000"
            />
            <FormControlLabel
              value="5000000"
              control={<Radio size="small" />}
              label="$1,000,000 - $5,000,000"
            />
            <FormControlLabel
              value="5000000+"
              control={<Radio size="small" />}
              label="$5,000,000+"
            />
          </RadioGroup>
        </div>
      </div>
      <Paper
        sx={{
          width: 1000,
          overflow: "hidden",
          display: "flex",
          position: "relative",
          top: 100,
          left: "15%",
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
                <TableCell> Initial Balance </TableCell>
                <TableCell> Balance </TableCell>
                <TableCell> UserId </TableCell>
                <TableCell> Date/Time Added </TableCell>
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
                      className={
                        (selectedRow === i ? "isSelected" : "") ||
                        (account.account_status === "Deactivated"
                          ? "bgred"
                          : "")
                      }
                    >
                      <TableCell>{account.account_number}</TableCell>
                      <TableCell>{account.account_name}</TableCell>
                      <TableCell>{account.account_description}</TableCell>
                      <TableCell>{account.account_category}</TableCell>
                      <TableCell>{account.account_subcategory}</TableCell>
                      <TableCell>
                        {numberFormat(account.initial_balance)}
                      </TableCell>
                      <TableCell>{numberFormat(account.balance)}</TableCell>
                      <TableCell>{account.userId}</TableCell>
                      <TableCell>{account.date_time_account_added}</TableCell>
                      <TableCell>{account.account_status}</TableCell>
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
          <AddAccount account={{ selectedAccount }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddAccount}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openView} onClose={closeViewAccount}>
        <DialogContent>
          <ViewAccount account={{ selectedAccount }} />
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
      <Dialog open={openDeactivate} onClose={closeDeactivateAccount}>
        <DialogContent>
          <DeactivateAccount account={{ selectedAccount }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeactivateAccount}>Close</Button>
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
          marginBottom: 50,
          justifyContent: "center",
        }}
      >
        {role === "Administrator" && (
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
            <Tooltip title="Activate/Deactivate Account">
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 200, marginRight: 20 }}
                className="submit"
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                onClick={openDeactivateAccount}
              >
                Activate/Deactivate Account
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
        )}
        {role !== "Administrator" && (
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
        )}
        <Tooltip title="Email">
          <Button
            variant="outlined"
            size="large"
            type="submit"
            style={{ width: 100, marginRight: 20 }}
            className="submit"
            href="/email"
            sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
          >
            Email
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
export default Accounts;
