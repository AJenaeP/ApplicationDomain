import { 
    TableBody, 
    TableContainer, 
    TableRow ,
    TableCell,
    Paper,
    TableHead
} from '@mui/material';
import React, { useState } from 'react'
import { db }  from '../../utilities/Firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from '../Header';
import '../../css/Users.css'


const Users = () => {
    const [users, setUsers] = useState([]);
    
    const ref = collection(db, 'users')
    const q = query(ref)

    //retrieving list of users from firebase database
    onSnapshot(q, (snapshot) => {
        let usersList = []
        snapshot.docs.forEach((doc) => {
            usersList.push({ ...doc.data() })
        })
        setUsers(usersList)
    })
//RETURN function to create table to hold information
    return (
        <div className='Users'>
            <Header/>
            <Paper
                sx={{
                    width: 1000,
                    overflow: "hidden",
                    display: "flex",
                    position: "relative",
                    top: 100,
                    left: "10%",
                }}
            >
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>UserId</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Start Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user, i) => {
                                return (
                                    <>
                                        <TableRow
                                            id={i}
                                            key={i}
                                        >
                                            <TableCell> {user.userId}</TableCell>
                                            <TableCell> {user.firstName}</TableCell>
                                            <TableCell> {user.lastName}</TableCell>
                                            <TableCell> {user.email}</TableCell>
                                            <TableCell> {user.dateOfBirth}</TableCell>
                                            <TableCell> {user.role}</TableCell>
                                            <TableCell> {user.startDate}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
                    </TableBody>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default Users