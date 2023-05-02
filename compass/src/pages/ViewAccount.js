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
  SelectChangeEvent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "../css/ViewAccount.css";
import Ledger from "../images/Ledger.png";
import Journal from "./Journal";

//Call account to view Accounts created
const ViewAccount = ({ account }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [handleClose, setHandleClose] = useState(false);
  const [ledgerData, setLedgerData] = useState([{}]);
  const [openJournal, setOpenJournal] = useState(false);
  const [journalRef, setJournalRef] = useState();

  const data = {
    account_number: account.selectedAccount.account_number,
    ref: "",
  };

  //Use Fetch method with API to get data
  useEffect(() => {
    fetch("/api/ledger/" + JSON.stringify(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLedgerData(data[0]);
      });
  }, []);

  const closeJournalAccount = () => {
    setOpenJournal(false);
  };

  //CREATE return to display table with required information
  return (
    <>
      <Paper className="ledgerPaper">
        <DialogTitle> Account Ledger </DialogTitle>
        <div className="ledgerHeader1">
          <span>{account.selectedAccount.account_name}</span>
          <span>{account.selectedAccount.account_number}</span>
        </div>
        <TableContainer>
          <Table>
            <TableHead className="ledgerTableHead">
              <TableRow className="ledgerHeader2">
                <TableCell> Date </TableCell>
                <TableCell> Explanation </TableCell>
                <TableCell> Ref </TableCell>
                <TableCell> Debit </TableCell>
                <TableCell> Credit </TableCell>
                <TableCell> Balance </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="ledgerTableBody">
              {ledgerData.map((ledger, i) => {
                return (
                  <>
                    <TableRow id={i} key={i} className="ledgerTableRow">
                      <TableCell className="ledgerDate">
                        {ledger.date}
                      </TableCell>
                      <TableCell className="ledgerExplain">
                        {ledger.explanation}
                      </TableCell>
                      <TableCell className="ledgerRef">
                        <Button
                          variant="text"
                          sx={{
                            width: "fit-content",
                            padding: 0,
                            margin: 0,
                            justifyContent: "left",
                          }}
                          value={ledger.ref}
                          onClick={(e) => {
                            setJournalRef(e.target.value);
                            setOpenJournal(true);
                          }}
                        >
                          {ledger.ref}
                        </Button>
                      </TableCell>
                      <TableCell className="ledgerDebit">
                        {ledger.debit}
                      </TableCell>
                      <TableCell className="ledgerCredit">
                        {ledger.credit}
                      </TableCell>
                      <TableCell className="ledgerBalance">
                        {ledger.balance}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openJournal} onClose={closeJournalAccount}>
        <DialogContent>
          <Journal props={journalRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJournalAccount}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewAccount;
