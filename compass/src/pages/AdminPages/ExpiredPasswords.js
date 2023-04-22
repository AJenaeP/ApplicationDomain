import { 
    TableBody, 
    TableContainer, 
    TableRow ,
    TableCell,
    Paper,
    TableHead
} from '@mui/material';
import React, { useState, useEffect } from 'react'
import { db }  from '../../utilities/Firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Header from '../Header';

//CREATE snapshot to pull users from Firebase
const Users = () => {
    const [users, setUsers] = useState([]);
    
    const ref = collection(db, 'users')
    const q = query(ref)

    onSnapshot(q, (snapshot) => {
        let usersList = []
        snapshot.docs.forEach((doc) => {
            usersList.push({ ...doc.data() })
        })
        setUsers(usersList)
    })
//RETURN statement  to create table to hold information
    return (
        <div className='Users'>
            <Header/>
            <Paper
                sx={{
                    width: 'fit-content',
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
                            <TableCell>Password Expiration Date</TableCell>
                            <TableCell>Passwords</TableCell>
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
                                            <TableCell> {user.passwordExpiration}</TableCell>
                                            <TableCell> {user.passwords}</TableCell>
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
