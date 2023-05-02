import React, { useState, useEffect } from "react";

import Sidebar from "../Sidebar";
import Header from "../Header";
//import "../css/Accounts.css";
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


const Events = ({accounts}) => {
 
  const [backendData, setBackendData] = useState([{}]);
  const [selectedRow, setSelectedRow] = useState(null);
 

//CREATE use effect method to fetch accounts 
useEffect(() => {
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);



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
                <TableCell> UserId </TableCell>
                <TableCell> Date/Time Added </TableCell>
                <TableCell> Status </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="accountRows">
              {backendData.map((account, index) => {
                return (
                  <>
                    <TableRow
                      id={index}
                      key={index}
                    >
                      <TableCell>{account.account_number}</TableCell>
                      <TableCell>{account.account_name}</TableCell>
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
    </div>
  );
 
            };         

export default Events;
