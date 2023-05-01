import {
    DialogTitle,
    DialogActions,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import '../css/AddAccount.css';
import db from '../utilities/Firebase'
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import Header from "./Header";

import {
    TableCell, TableContainer, TableHead,
    TableRow, TableBody, Table,
    Paper, Dialog, DialogContent, Tooltip,
} from "@mui/material";

const EventLog = () => {
    const [autoId, setautoId] = useState('')
    const [events, setEvents] = useState([]);
  
    const [addEvent, setEvent] = useState('')
    const [userId, setuserId] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [record, setRecord] = useState('')
    const [updateAddEvent, setUpdateAddEvent] = useState('')
    const [updateUserId, setUpdateSetuserId] = useState('')
    const [updateTime, setUpdateSetTime] = useState('')
    const [updateDate, setUpdateSetDate] = useState('')
    const [updateRecord, setUpdateSetRecord] = useState('')
    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState('')
  
    const ref = collection(db, "events");
    const q = query(ref);


//retrieving list of events from firebase database
useEffect(() => {
    const q = query(collection(db, "events"))
    const setEvent = onSnapshot(q, (querySnapshot) => {
      console.log("events", querySnapshot.docs.map(d => doc.data()));
    });
  }, [])



    //handles adding event to database (firestore)

    const handleAdd = (e) => {
        e.preventDefault();
        db.collection("events").add({

            addEvent: addEvent,
            userId: userId,
            time: time,
            date: date,
            record: record,
        });

        setEvent("");
        setuserId("");
        setTime("");
        setDate("");
        setRecord("");
    };

    const updateData = (e) => {
        e.preventDefault();
        db.collection("events").doc(dataIdToBeUpdated).update({
            addEvent: updateAddEvent,
            userId: updateUserId,
            time: updateTime,
            date: updateDate,
            record: updateRecord,

        });

        setUpdateAddEvent("");
        setUpdateSetuserId("");
        setUpdateSetTime("");
        setUpdateSetDate("");
        setUpdateSetRecord("");
        setDataIdToBeUpdated("");

    };



    //All buttons calling functions to add account
    return (

        <div className="App">
   <Header />
            {!dataIdToBeUpdated ? (
                <div className="App__form">
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Add Event"
                        defaultValue=""
                        onChange={(e) => setEvent(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="User ID"
                        defaultValue=""
                        onChange={(e) => setuserId(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Time"
                        defaultValue=""
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        defaultValue=""
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <InputLabel id="demo-simple-select-label record">Record</InputLabel>
                    <Select
                        labelId="demo-simple-select-label record"
                        id="demo-simple-select"
                        value={record}
                        label="Record"
                        sx={{ width: 'auto' }}
                        onChange={(e) => setRecord(e.target.value)}
                    >
                        <MenuItem value='added'>Added</MenuItem>
                        <MenuItem value='modified'>Modified</MenuItem>
                        <MenuItem value='Deactivated'>Deactivated</MenuItem>
                    </Select>

                    <DialogActions>
                        <Button
                            onClick={handleAdd}
                        >Add</Button>
                    </DialogActions>

                </div>
            ) : (
                <div className="App__Updatedform">

                    <TextField
                        required
                        id="outlined-required"
                        label="Add Event"
                        defaultValue=""
                        onChange={(e) => setUpdateAddEvent(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="User ID"
                        defaultValue=""
                        onChange={(e) => setUpdateSetuserId(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Time"
                        defaultValue=""
                        onChange={(e) => setUpdateSetTime(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        defaultValue=""
                        onChange={(e) => setUpdateSetDate(e.target.value)}
                    />

                    <InputLabel id="demo-simple-select-label record">Record</InputLabel>
                    <Select
                        labelId="demo-simple-select-label record"
                        id="demo-simple-select"
                        value={record}
                        label="Record"
                        sx={{ width: 'auto' }}
                        onChange={(e) => setUpdateSetRecord(e.target.value)}
                    >
                        <MenuItem value='added'>Added</MenuItem>
                        <MenuItem value='modified'>Modified</MenuItem>
                        <MenuItem value='Deactivated'>Deactivated</MenuItem>
                    </Select>

                    <DialogActions>
                        <Button
                            onClick={updateData}
                        >Update</Button>
                    </DialogActions>
                </div>
            )}

            <div className="App">

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
                                    <TableCell> ID Number</TableCell>
                                    <TableCell> Event </TableCell>
                                    <TableCell> User ID </TableCell>
                                    <TableCell> Time </TableCell>
                                    <TableCell> Date </TableCell>
                                    <TableCell> Record</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="EventRows">
                                {events?.map(({ id, data }) => (


                                    <TableRow key={id}>
                                        <TableCell>{data.autoId}</TableCell>
                                        <TableCell>{data.addEvent}</TableCell>
                                        <TableCell>{data.userId}</TableCell>
                                        <TableCell>{data.time}</TableCell>
                                        <TableCell>{data.date}</TableCell>
                                        <TableCell>{data.record}</TableCell>
                                  
                     
                
                                <DialogActions>
                                    <Button
                                        onClick={() => {
                                            setDataIdToBeUpdated(id);
                                            setUpdateAddEvent(data.addEvent);
                                            setUpdateSetuserId(data.userId);
                                            setUpdateSetTime(data.time);
                                            setUpdateSetDate(data.date);
                                            setUpdateSetRecord(data.record);
                                        }
                                        }
                                    >Update</Button>
                                </DialogActions>
                                </TableRow>
  ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                              
            </div>

        </div>

    );
}

export default EventLog;




