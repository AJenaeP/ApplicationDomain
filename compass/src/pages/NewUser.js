import { getAdditionalUserInfo } from "firebase/auth";
import React from "react";
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { UserAuth } from '../AuthContext'
import compasslogo from '../images/compasslogo.png';
import '../css/NewUser.css'

//secret question 1
const options1 = [
    { value: 'favColor', label: 'What is your favorite color?'},
    { value: 'favAnimal', label: 'What is your favorite Animal?' },
    { value: 'favMusician', label: 'Who is your favorite Musician?' },
    { value: 'favShow', label: 'What is your favorite tv show?' },
];
//secret question 2
const options2 = [
    { value: 'mothersMaidenName', label: 'What is your mothers maiden name?' },
    { value: 'birthState', label: 'What state were you born in?' },
    { value: 'favMovie', label: 'What is your favorite movie?' },
    { value: 'bestfriendName', label: 'What is your bestfriends first name?' },
];
//roles
const options3 = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Manage', label: 'Manager' },
    { value: 'Accountant', label: 'Accountant' },
]

const NewUser = () => {
    const navigate = useNavigate();
    var date = new Date(Date.now() + 3)
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
    const [SelectedQ1, setSelectedQ1] = React.useState(null);
    const [SelectedQ1A, setSelectedQ1A] = React.useState("");
    const [SelectedQ2, setSelectedQ2] = React.useState(null);
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
        secretQ1: SelectedQ1,
        secretQ1A: SelectedQ1A,
        secretQ2: SelectedQ2,
        secretQ2A: SelectedQ2A,
    }
    
    const handleSumbit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await createUser(Email, Password, userInfo);
            navigate('/login')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return(
        <div className="NewUser">
            <header>
                <h1 class="company-name">Compass Credit Union</h1>
                <p class="slogan">
                    Helping navigate the way for financial freedom yesterday, today, and
                    tomorrow
                </p>
                <div class="imgcontainer">
                    <img src={compasslogo} alt="Avatar" class="picture" />
                </div>
            </header>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <form onSubmit={handleSumbit}>
                <div>
                    <label htmlfor="firstName">First Name:</label>
                    <input type="text" name="first-name" id="firstName" onChange={(e) => setFirstName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="lastName">Last Name:</label>
                    <input type="text" name="last-name" id="lastName" onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="email">Email:</label>
                    <input type="email" name="email" placeholder="Enter Email" id="email" onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="address">Address:</label>
                    <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="dateOfBirth">Date of Birth:</label>
                    <input type="date" name="Birthdate" id="dateOfBirth" onChange={(e) => setDateOfBirth(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="role">Role:</label>
                    <Select
                        id="role"
                        value={SelectedRole}
                        onChange={setSelectedRole}
                        options={options3}
                    />
                </div>
                <div>
                    <label htmlfor="password">Password:</label>
                    <input type="password" required placeholder="Enter Password" id="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="passwordAgain">Confirm Password:</label>
                    <input type="password" required placeholder="Confirm Password" id="passwordAgain" onChange={e => setPasswordAgain(e.target.value)}></input>
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

                    <label htmlfor="secretQ1">Choose a secret quesion:</label>
                    <Select
                        id="secretQ1"
                        value={SelectedQ1}
                        onChange={setSelectedQ1}
                        options={options1}
                    />
                    <input type="text" id="secretQA1" onChange={(e) => setSelectedQ1A(e.target.value)}></input>
                </div>
                <div>
                    <label htmlfor="SecretQ2">Choose a secret question:</label>
                    <Select
                        id="secretQ2"
                        value={SelectedQ2}
                        onChange={setSelectedQ2}
                        options={options2}
                    />
                    <input type="text" id="secretQA2" onChange={(e) => setSelectedQ2A(e.target.value)}></input>
                </div>
                <button class="sign-up-btn" type="submit">Sign Up</button>
                <button class="cancel-btn" type="submit">Cancel</button>
            </form> 
        </div>
    );
}

export default NewUser;