import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material'
import React, { useState, useEffect } from "react";
//import '../../css/AddAccount.css';
import Ledger from '../images/Ledger.jpg';

const ViewAccount = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [handleClose, setHandleClose] = useState(false)

    const handleAdd = () => {

    }
    const closeAddAccount = () => {
        setIsOpen(false);
    };

    return (
        <>
            <DialogTitle> Account Ledger </DialogTitle>
            <img src={Ledger} alt="Ledger" width="550px"  />
            
        </>
    )
}


export default ViewAccount
