import React, { useEffect, useState } from "react";
import Header from "./Header";
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
} from '@mui/material'

const Journals = () => {
  const [journalData, setJournalData] = useState([{}])

  const data = {
    ref: '',
    account_number: '',
    journal_status: 'Approved'
  }

  useEffect(() => {
    fetch('/api/journal/' + JSON.stringify(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setJournalData(data)
        console.log(journalData)
      }
    )
  }, [])
    return (
      <>
        <Header />
        <div className="App">   
        <Paper>    
          <TableContainer>
            <Table>
              <TableHead className='journalTableHead'>
                <TableRow className='journalHeader2'>
                  <TableCell> Date </TableCell>
                  <TableCell> Account Titles</TableCell>
                  <TableCell> Ref </TableCell>
                  <TableCell> Debit </TableCell>
                  <TableCell> Credit </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='journalTableBody'>
                {journalData.map((journal, i) => {
                  return (
                    <>
                      <TableRow
                        id={i}
                        key={i}
                      >
                        <TableCell>{journal.date}</TableCell>
                        <TableCell>{journal.account_name}</TableCell>
                        <TableCell>{journal.ref}</TableCell>
                        <TableCell>{journal.debit}</TableCell>
                        <TableCell>{journal.credit}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>  
        </div>
        
      </>
    )
}

export default Journals

/*   < TableCell > { journalData.date }</TableCell >
                <TableCell>{journalData.account_name}</TableCell>
                <TableCell>{journalData.ref}</TableCell>
                <TableCell>{journalData.debit}</TableCell>
                <TableCell>{journalData.credit}</TableCell> */