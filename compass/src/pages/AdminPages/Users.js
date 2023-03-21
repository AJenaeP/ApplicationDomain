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
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from '../Header';


const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => { 
         getUsers()      
    }, [])

    const getUsers = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            var data = doc.data()
            console.log(data)
            setUsers(arr => [...arr, data])
            console.log(users)
        });
    }

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