import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
    TableCell, TableContainer, TableHead,
    TableRow, TableBody, Table,
    Paper, Button, TextField,
    DialogActions, DialogContent, Tooltip,
    Dialog, InputAdornment, IconButton,
    RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import '../css/journal.css'
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteJournal from "./Journal/DeleteJournal";
import AddJournal from "./Journal/AddJournal";
import EditJournal from "./Journal/EditJournal";
import Journal from "./Journal";

//import JournalList from "./Journal/JournalList";

const Ledgers = () => {
    const [ledgerData, setLedgerData] = useState([{}]);
    const [role, setRole] = useState(window.localStorage.getItem('userRole'))
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedLedger, setSelectedLedger] = useState({});
    const [isRowSelected, setIsRowSelected] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [value, setValue] = React.useState('All');
    const [openJournal, setOpenJournal] = useState(false)
    const [journalRef, setJournalRef] = useState()
    
    const searchCriteria = {
        debit: -1,
        credit: -1,
        balance: -1,
        account_name: '',
    }
    function clearSearchField() {
        document.getElementById("search").value = null;
            fetch('/api/ledgers')
            .then(
                response => response.json()
            ).then(
                data => {
                    setLedgerData(data)
                }
            )
    }

    function handleSearchField() {
        let value = document.getElementById("search").value;

        if (isNaN(value)) {
            console.log('is a string')
            searchCriteria.account_name = String(value);
            searchCriteria.debit = -1;
            searchCriteria.credit = -1;
            searchCriteria.balance = -1;
        } else if (!isNaN(value)) {
            console.log('is a number')
            searchCriteria.debit = Number(value);
            searchCriteria.credit = Number(value);
            searchCriteria.balance = Number(value);
            searchCriteria.account_name = '';
            console.log(searchCriteria)
        } else {
            console.log('field is empty')
        }

        fetch('/api/ledger/' + JSON.stringify(searchCriteria), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data[0])
                setLedgerData(data[0])
            }
        )
    }
    const handleDateFilter = () => {
        let Array = ledgerData.slice().sort(function (a, b) {
            var objA = a.date;
            var objB = b.date;
            return (objA < objB) ? -1 : (objA > objB) ? 1 : 0
        })
        setLedgerData(Array)
    } 

    /* function handleRadioFilter(e) {
        console.log(e.target.value)
        let filter = e.target.value;
        setValue(e.target.value);
        if (filter === 'Approved') {
            searchCriteria.journal_status = 'Approved'
            console.log(searchCriteria)
        } else if (filter === 'Pending') {
            searchCriteria.journal_status = 'Pending'
            console.log(searchCriteria)
        } else if (filter === 'Rejected') {
            searchCriteria.journal_status = 'Rejected'
            console.log(searchCriteria)
        }
        fetch('/api/ledger/' + JSON.stringify(searchCriteria), {
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
                setLedgerData(data)
            }
        )
    } */
    useEffect(() => {
        fetch('/api/ledgers')
            .then(
                response => response.json()
            ).then(
                data => {
                    setLedgerData(data)
                }
            )
        
    }, [])

/*     const openAddJournal = () => {
        console.log('add journal button clicked ')
        console.log(selectedLedger)
        setOpenAdd(true);
        console.log(openAdd)
    };

    const openEditJournal = () => {
        if (isRowSelected) {
            setOpenEdit(true);
        }
    };
    const openDeleteJournal = () => {
        if (isRowSelected) {
            setOpenDelete(true);
        }
    };

    const closeAddJournal = () => {
        setOpenAdd(false);
    };

    const closeEditJournal = () => {
        setOpenEdit(false);
    };
    const closeDeleteJournal = () => {
        setOpenDelete(false);
    }; */

    function handleLedgerSelection(ledger, i) {
        if (selectedRow === i) {
            setIsRowSelected(false);
            setSelectedRow(null);
        } else {
            setSelectedRow(i);
            setSelectedLedger(ledger);
            setIsRowSelected(true);
            const row = document.getElementById(i);
            row.classList.add("isSelected");
        }
    }

    const closeJournalAccount = () => { setOpenJournal(false); };

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);

    return (
        <div className="App">
            <Header />
            <div className="filter">
                <TextField
                    id="search"
                    label="Search by Account Name or Amount"
                    //type="search" 
                    InputProps={
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={handleSearchField}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={clearSearchField}
                                        //onMouseDown={handleMouseDownPassword}// {showPassword ? <VisibilityOff /> : <Visibility />}
                                        edge="end"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }
                />
                {/* <RadioGroup row value={value} onChange={handleRadioFilter} sx={{ marginLeft: 30 }}>
                    <FormControlLabel value='All' control={<Radio size="small" />} label="All" />
                    <FormControlLabel value='Approved' control={<Radio size="small" />} label="Approved" />
                    <FormControlLabel value='Pending' control={<Radio size="small" />} label="Pending" />
                    <FormControlLabel value='Rejected' control={<Radio size="small" />} label="Rejected" />
                </RadioGroup> */}
            </div>
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
                <TableContainer sx={{ height: 500 }}>
                    <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead >
                            <TableRow >
                                <TableCell> Date <IconButton onClick={handleDateFilter}><FilterListIcon /></IconButton></TableCell>
                                <TableCell> Account Name</TableCell>
                                <TableCell> Account Number</TableCell>
                                <TableCell> Ref </TableCell>
                                <TableCell> Debit </TableCell>
                                <TableCell> Credit </TableCell>
                                <TableCell> Balance </TableCell>
                                <TableCell> Explanation </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="JournalRows">
                            {ledgerData.map((ledger, i) => {
                                return (
                                    <>
                                        <TableRow
                                            id={i}
                                            key={i}
                                            onClick={() => handleLedgerSelection(ledger, i)}
                                            className={(selectedRow === i ? "isSelected" : "")
                                            }
                                        >
                                            <TableCell>{ledger.date}</TableCell>
                                            <TableCell>{ledger.account_name}</TableCell>
                                            <TableCell>{ledger.account_number}</TableCell>
                                            <TableCell><Button
                                                variant="text"
                                                sx={{ width: 'fit-content', padding: 0, margin: 0, justifyContent: 'left' }}
                                                value={ledger.ref}
                                                onClick={(e) => { setJournalRef(e.target.value); setOpenJournal(true) }}
                                            >
                                                {ledger.ref}
                                            </Button>    </TableCell>
                                            <TableCell>{numberFormat(ledger.debit)}</TableCell>
                                            <TableCell>{numberFormat(ledger.credit)}</TableCell>
                                            <TableCell>{numberFormat(ledger.balance)}</TableCell>
                                            <TableCell>{ledger.explanation}</TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog open={openJournal} onClose={closeJournalAccount}>
                <DialogContent>
                    <Journal props={journalRef} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeJournalAccount}>Close</Button>
                </DialogActions>
            </Dialog>
            {/* <Dialog open={openAdd} onClose={closeAddJournal}>
                <DialogContent>
                    <AddJournal journal={{ selectedJournal }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddJournal}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEdit} onClose={closeEditJournal}>
                <DialogContent>
                    <EditJournal journal={{ selectedJournal }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditJournal}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={closeDeleteJournal}>
                <DialogContent>
                    <DeleteJournal journal={{ selectedJournal }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteJournal}>Close</Button>
                </DialogActions>
            </Dialog>
            <div
                style={{
                    display: "flex",
                    marginTop: 150,
                    marginLeft: 360,
                    justifyContent: "center",
                }}
            >
                {

                    <>
                        <Tooltip title="Add Journal Entry">
                            <Button
                                variant="outlined"
                                size="large"
                                type="submit"
                                style={{ width: 100, marginRight: 20 }}
                                className="submit"
                                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                                onClick={openAddJournal}
                            >
                                Add Journal
                            </Button>
                        </Tooltip>

                        <Tooltip title="Edit Journal">
                            <Button
                                variant="outlined"
                                size="large"
                                type="submit"
                                style={{ width: 100, marginRight: 20 }}
                                className="submit"
                                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                                onClick={openEditJournal}
                            >
                                Edit Journal
                            </Button>
                        </Tooltip>

                        <Tooltip title="Delete Journal">
                            <Button
                                variant="outlined"
                                size="large"
                                type="submit"
                                style={{ width: 100, marginRight: 20 }}
                                className="submit"
                                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
                                onClick={openDeleteJournal}
                            >
                                Delete Journal
                            </Button>
                        </Tooltip> 
                }

                    </>
            </div> */}
        </div>
    );
}

export default Ledgers;

