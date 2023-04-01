import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../pages/Header';
import { 
    FormControl, 
    Select,
    InputLabel, 
    MenuItem,
    TextField,
    SelectChangeEvent,
    Button 
} from '@mui/material';
import { db } from './Firebase';
import { 
    collection, 
    query,
    where, 
    getDocs, 
    QuerySnapshot, 
    onSnapshot } from "firebase/firestore";
import '../css/Email.css'

const Email = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('userData')))
    const [users, setUsers] = useState([]);
    const [toName, setToName] = useState('');
    const [message, setMessage] = useState()
   
    const ref = collection(db, 'users')
    const q = query(ref, where("firstName", "!=", currentUser.firstName))

    onSnapshot(q, (snapshot) => {
        let usersList = []
        snapshot.docs.forEach((doc) => {
            usersList.push({...doc.data()})
        })
        setUsers(usersList)
    })

    let emailData = {
        from_name: currentUser.firstName + " " + currentUser.lastName,
        to_name: toName,
        message: message,
    }

    function handleToNameChange(e) { 
        setToName(e.target.value); 
    }
    function handleMessageChange(e) { 
        setMessage(e.target.value)
    }
    const sendEmail = (e) => {
        e.preventDefault();
        console.log('trying')
        emailjs.send('service_c8tacpn', 'template_ffv1pme', emailData, 'c6klXwV5ElhrARBuw')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        resetForm()
    };

   function resetForm(){
        setToName('');
        setMessage('')
   }
    return (
        <div className='Email'>
            <Header />
            <div id='form'>
                <h1> Email </h1>
                <FormControl className='emailForm' sx={{ marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">To</InputLabel>
                    <Select
                        className='toSelect'
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={toName}
                        onChange={handleToNameChange}
                        autoWidth
                        label="To"
                    >
                        {
                            users.map((user, i) => {
                                return (

                                    <MenuItem
                                        value={user.firstName + ' ' + user.lastName}
                                    >
                                        {user.firstName} {user.lastName}
                                    </MenuItem>

                                )
                            })
                        }
                    </Select>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        className='fromField'
                        defaultValue={'From: ' + currentUser.firstName + " " + currentUser.lastName}
                    />
                    <TextField
                        className='messageField'
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <Button 
                        variant="outlined"
                        onClick={sendEmail}
                    >
                        Send Email
                    </Button>
                </FormControl>
            </div>       
        </div>


    )
}

export default Email