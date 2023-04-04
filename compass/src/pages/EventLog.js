import {
    TableCell, TableContainer, TableHead,
    TableRow, TableBody, Table,
    Paper, Button, Dialog,
    DialogActions, DialogContent, Tooltip,
    TextField, InputAdornment, IconButton
  } from "@mui/material";
  import Header from './Header';
  import React, { useState, useEffect } from 'react'
import { db }  from '../utilities/Firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";

  const EventLog =()=> {

    const [users, setUsers] = useState([]);
    const [eVents, seteVents] = useState([{}]);

    const ref = collection(db, 'users')
    const q = query(ref)


    onSnapshot(q, (snapshot) => {
        let usersList = []
        snapshot.docs.forEach((doc) => {
            usersList.push({ ...doc.data() })
        })
        setUsers(usersList)
    })

return (
    <>
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
                <TableCell>ID </TableCell>
                <TableCell>User ID </TableCell>
                <TableCell>Account Added </TableCell>
                <TableCell>Account  Modified</TableCell>
                <TableCell>Account Deactivated</TableCell>
                <TableCell> Date/Time Added </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="eventrows">
        <tr>
          <td>1002</td>
          <td>fothen1118  </td>
          <td>CCU Loan Debt</td>
          <td> </td>
          <td> </td>
          <td>2022-01-01 08:00:00 </td>

        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td> 1003</td>
          <td>jlegier0107</td>
          <td> </td>
          <td> Company Property and Equipment</td>
          <td> </td>
          <td> 2022-01-01 08:00:00</td>
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>1004</td>
          <td>fothen1118</td>
          <td> </td>
          <td> </td>
          <td> Green Green Lawn</td>
          <td> 1900-01-01 00:00:00</td>

        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td>  </td>   
        </tr>
        <tr>
          <td> 1005</td>
          <td>fothen1118</td>
          <td> </td>
          <td>CCU Employee Wages </td>
          <td> </td>
          <td>2022-01-01 00:00:00 </td>
        </tr>
        
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </div> 
      </>
      );
      }
      export default EventLog

      /* {eVents.map((eVent, i) => {
                return (
                  <>
                    <TableRow
                      id={i}
                      key={i}
                      
                    >
                      <TableCell>{eVent.id}</TableCell>
                      <TableCell>{eVent.userId}</TableCell>
                      <TableCell>{eVent.accountAdded}</TableCell>
                      <TableCell>{eVent.accountModified}</TableCell>
                      <TableCell>{eVent.accountDeactivated}</TableCell>
                      <TableCell>{eVent.date_time_eVent_added}</TableCell>
                    </TableRow>
                  </>
                );
              })}*/
