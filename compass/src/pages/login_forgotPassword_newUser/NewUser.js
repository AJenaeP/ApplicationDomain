import React from "react";
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { UserAuth } from '../../utilities/AuthContext'
import compasslogo from '../../images/compassLogo.png';
import '../../css/NewUser.css'
import { FormControl, Container, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


//roles
const options3 = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Manage', label: 'Manager' },
    { value: 'Accountant', label: 'Accountant' },
]

const NewUser = () => {
    const style = {
        width: 500,
    }
    const navigate = useNavigate();

    const [value, setValue] = React.useState(null);
    const handleChange = (newValue) => {
        setValue(newValue);
        setDateOfBirth(newValue);
    };

    //navigates user to home screen
    const [goToHome, setgoToHome] = React.useState(false);
    if (goToHome) {
        navigate('/home')
    };
    //gets current date and add 3 months(for password expiration)
    var date = new Date(Date.now() + 3)
    //turns date into 0212 for example
    const dateSliced = '0' + String(date.getMonth() + 1).slice(-2) + String(date.getFullYear()).slice(-2)

    const [FirstName, setFirstName] = React.useState("")
    const [LastName, setLastName] = React.useState("")
    const [Address, setAddress] = React.useState("")
    const [DateOfBirth, setDateOfBirth] = React.useState("")
    const UserId = FirstName.charAt(0) + LastName + dateSliced;
    const [Email, setEmail] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")
    const [SelectedRole, setSelectedRole] = React.useState(null);
    const [secretQ1] = "What is your favorite Color?"
    const [SelectedQ1A, setSelectedQ1A] = React.useState("");
    const [secretQ2] = "What is your bestfriends FIRST name?"
    const [SelectedQ2A, setSelectedQ2A] = React.useState("");
   
    const { createUser } = UserAuth();

    const userInfo = {
        firstName: FirstName,
        lastName: LastName,
        address: Address,
        dateOfBirth: DateOfBirth,
        userId: UserId,
        email: Email,
        role: SelectedRole,
        secretQ1,
        secretQ1A: SelectedQ1A,
        secretQ2,
        secretQ2A: SelectedQ2A,
    }
    
    function handlePasswordSet(e) {
        let temp = e.target.value;
        if(isLetter(temp.charAt(0))){
            setPassword(e.target.value)
        } else {
            alert('password must start with a letter')
        }
    }
    function isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }
    //this calls the create user funtion from authcontext
    const handleSumbit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await createUser(Email, Password, userInfo);
            navigate('/home')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return(
        <div className="NewUser">
            <header>
                <div className="title">
                    <h1 className="company-name">Compass Credit Union</h1>
                    <p className="slogan">
                        Helping navigate the way for financial freedom yesterday, today, and
                        tomorrow
                    </p>
                </div>
                <div className="imgcontainer">
                    <img src={compasslogo} alt="Avatar" className="picture" />
                </div>
            </header>
            <Container className="form" style={{width: 800}}>
                    <div id='formHeader'>
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to request an account.</p>
                    </div>
                    <FormControl id="formcontrol" onSubmit={handleSumbit}>
                    <div id="personalInfo">
                        <TextField
                            id="outlined-password-input firstName"
                            label="First Name"
                            type="text"
                            style={{ marginRight: 10,}}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            id="outlined-password-input LastName"
                            label="Last Name"
                            type="text"
                            style={{ marginRight: 10, }}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            id="outlined-password-input Email"
                            label="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        /> 
                    </div>
                    <div id="dateofbirth">
                        <span id="date">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    label="Date of Birth"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                        setDateOfBirth(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </span>
                        <span id="address">
                            <TextField
                                id="outlined-password-input address"
                                label="Address"
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </span>
                        <span>
                            <Select
                                className="select role"
                                id="role"
                                value={SelectedRole}
                                onChange={setSelectedRole}
                                options={options3}
                                styles={{width: 225, height: 56}}
                            />
                        </span>
                    </div>
                        <div id="secretquestions" style={{ marginBottom: 10 }} >
                        <span id="sq1">
                            <TextField
                                id="outlined-helperText SQ"
                                label="What is your favorite Color?"
                                helperText="Secret Question 1"
                                style={{width: 300,}}
                                onChange={(e) => setSelectedQ1A(e.target.value)}
                            />
                        </span>
                        <span id="sq2">
                            <TextField
                                id="outlined-helperText SQ2"
                                label="What is your best friends first name?"
                                helperText="Secret Question 2"
                                style={{ width: 300 }}
                                onChange={(e) => setSelectedQ2A(e.target.value)}
                            />
                        </span>
                    </div>
                    <div id="passwords">
                        <TextField
                            id="outlined-password-input password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            style={{marginRight: 10}}
                            onChange={handlePasswordSet}
                        />
                        <TextField
                            id="outlined-password-input password"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            style={{ marginRight: 10 }}
                            onChange={e => setPasswordAgain(e.target.value)}
                        />
                        <span id="passwordCheck">
                            <PasswordChecklist
                                rules={['minLength', 'specialChar', 'number', 'letter', "match", "firstLetter"]}
                                minLength={8}
                                value={Password}
                                valueAgain={passwordAgain}
                                onChange={(isValid) => { }}
                                style={{ marginBottom: 10 }}    
                            />
                        </span>
                    </div>
                    
                    
                    <div id="buttons" style={{ marginTop: -10 }} >
                            <Button
                                variant='outlined'
                                size='large'
                                type='submit'
                                style={{width: 225, marginRight: 10}}
                                startIcon={<DoneIcon />}
                                className='submit'
                                onClick={() => { setgoToHome(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                            >
                                Sumbit Request
                            </Button>
                            <Button
                                variant='outlined'
                                size='large'
                                style={{ width: 225, hover: {backgroundColor: 'red'} }} 
                                startIcon={<ClearIcon />}
                                className='cancel'
                                onClick={() => { setgoToHome(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                            >
                                Cancel
                            </Button>
                    </div>
                </FormControl>
            </Container>
            
            
          
        </div>
    );
}

export default NewUser;
/*<div className="NewUser">
    <header>
        <h1 className="company-name">Compass Credit Union</h1>
        <p className="slogan">
            Helping navigate the way for financial freedom yesterday, today, and
            tomorrow
        </p>
        <div className="imgcontainer">
            <img src={compasslogo} alt="Avatar" className="picture" />
        </div>
    </header>
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <form onSubmit={handleSumbit}>
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                name="first-name"
                placeholder="First Name"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                name="last-name"
                placeholder="Last Name"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                name="address"
                placeholder="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
                type="date"
                name="Birthdate"
                id="dateOfBirth"
                onChange={(e) => setDateOfBirth(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="role">Role:</label>
            <Select
                className="select"
                id="role"
                value={SelectedRole}
                onChange={setSelectedRole}
                options={options3}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                required placeholder="Enter Password"
                id="password"
                onChange={e => setPassword(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="passwordAgain">Confirm Password:</label>
            <input
                type="password"
                required placeholder="Confirm Password"
                id="passwordAgain"
                onChange={e => setPasswordAgain(e.target.value)}
            ></input>
        </div>
        <div>
            <PasswordChecklist
                rules={['minLength', 'specialChar', 'number', 'letter', "match", "firstLetter"]}
                minLength={8}
                value={Password}
                valueAgain={passwordAgain}
                onChange={(isValid) => { }}
                messages={{
                    firstLetter: "First character must be a letter"
                }}
            />
        </div>
        <div>
            <label htmlFor="secretQ1"> Secret Question 1: What is your favorite Color?</label>
            <input
                type="text"
                id="secretQA1"
                placeholder="Secret Question 1 Answer"
                onChange={(e) => setSelectedQ1A(e.target.value)}
            ></input>
        </div>
        <div>
            <label htmlFor="SecretQ2">Secret Question 2: What is your bestfriends first name?</label>
            <input
                type="text"
                id="secretQA2"
                placeholder="Secret Question 2 Answer"
                onChange={(e) => setSelectedQ2A(e.target.value)}
            ></input>
        </div>
        <button
            className="sign-up-btn"
            type="submit"
            onClick={() => { setgoToLogin(true) }}
        >Sign Up</button>
        <button
            className="cancel-btn"
            type="submit"
            onClick={() => { setgoToLogin(true) }}
        >Cancel</button>
    </form>
</div>*/