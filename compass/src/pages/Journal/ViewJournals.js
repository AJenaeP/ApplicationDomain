import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
} from "@mui/material";

import "../../css/journal.css";
//CREATE View Journal Page to show comments from rejected
const ViewJournal = ({ journal }) => {
  const [journalData, setJournalData] = useState(journal.selectedJournal);
//CREATE sticky table to return that informaiton 
  return (
    <div className="App">
      <Paper>
        <TableContainer sx={{ height: 300 }}>
          <Table
            sx={{ minWidth: 450 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow key={"row"}>
                <TableCell key={"name"}> Account Title</TableCell>
                <TableCell key={"ref"}> Ref</TableCell>
                <TableCell key={"comment"}> Comment </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="JournalRows" id="JournalRows">
              <TableRow>
                <TableCell key={"name"}>{journalData.account_name}</TableCell>
                <TableCell key={"ref"}>{journalData.ref}</TableCell>
                <TableCell key={"comment"}>{journalData.comment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
export default ViewJournal;
