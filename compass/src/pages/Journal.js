import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogTitle,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import "../css/journal.css";
const JournalListing = (journalRef) => {
  const [journalData, setJournalData] = useState({});

  const data = {
    ref: journalRef.props,
    account_number: "",
    journal_status: "",
  };

  useEffect(() => {
    fetch("/api/journal/" + JSON.stringify(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJournalData(data[0]);
      });
  }, []);

  return (
    <>
      <Paper className="JournalPaper">
        <DialogTitle>Account Journal</DialogTitle>
        <div className="journalHeader1">
          <span>{journalData.ref}</span>
          <span
            id={journalData.journal_status}
            className={
              (journalData.journal_status === "Approved" ? "approved" : "") ||
              (journalData.journal_status === "Pending" ? "pending" : "") ||
              (journalData.journal_status === "Rejected" ? "rejected" : "")
            }
          >
            {journalData.journal_status}
          </span>
        </div>
        <TableContainer>
          <Table>
            <TableHead className="journalTableHead">
              <TableRow className="journalHeader2">
                <TableCell> Date </TableCell>
                <TableCell> Account Titles</TableCell>
                <TableCell> Ref </TableCell>
                <TableCell> Debit </TableCell>
                <TableCell> Credit </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="journalTableBody">
              <TableCell>{journalData.date}</TableCell>
              <TableCell>{journalData.account_name}</TableCell>
              <TableCell>{journalData.ref}</TableCell>
              <TableCell>{journalData.debit}</TableCell>
              <TableCell>{journalData.credit}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default JournalListing;
