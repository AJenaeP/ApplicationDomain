
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';

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
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";

import '../../css/journal.css'

const ViewJournal = ({ Journal }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [handleClose, setHandleClose] = useState(false)
 
    const [openJournal, setOpenJournal] = useState(false)
    const [journalRef, setJournalRef] = useState()
    const [journalData, setJournalData] = useState([{}]);
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedJournal, setSelectedJournal] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
  
   
  

    
      
      useEffect(() => {
          fetch('/api/journals')
            .then(
              response => response.json()
            ).then(
              data => {
                setJournalData(data)
              }
            )
      
      }, [])
    
      return (
        <div className="App">  
         
         <Paper>

          
            <TableContainer sx={{height: 500}}>
              <Table
              sx={{ minWidth: 650}}
              size="small"
              stickyHeader
              aria-label="sticky table"
            >
                <TableHead >
                  <TableRow key={'row'}>
                    
                    <TableCell key={'name'}> Account Titles</TableCell>
                    <TableCell key={'comment'}> Comment </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="JournalRows" id='JournalRows'>
                  {journalData.map((journal, i) => {
                    return (
                      <>
                        <TableRow
                          id={i}
                          key={i}
                         
                          className={(selectedRow === i ? "isSelected" : "") 
                      }
                        >
                        
                          <TableCell key={i + 'name'}>{journal.account_name}</TableCell>
                           <TableCell key={i + 'comment'}>{journal.comment}</TableCell>
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
    }
export default ViewJournal
