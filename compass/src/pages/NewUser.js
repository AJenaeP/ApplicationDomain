import { getAdditionalUserInfo } from "firebase/auth";
import React from "react";
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { UserAuth } from '../AuthContext'
import compasslogo from '../images/compasslogo.jpg';
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
    const [goToLogin, setgoToLogin] = React.useState(false);
    if (goToLogin) {
        navigate('/login')
    };
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
                        onChange={(e)=> setEmail(e.target.value)}
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

                    <label htmlFor="secretQ1">Choose a secret quesion:</label>
                    <Select
                        id="secretQ1"
                        value={SelectedQ1}
                        onChange={setSelectedQ1}
                        options={options1}
                    />
                    <input 
                        type="text" 
                        id="secretQA1" 
                        placeholder="Secret Question 1 Answer"
                        onChange={(e) => setSelectedQ1A(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="SecretQ2">Choose a secret question:</label>
                    <Select
                        id="secretQ2"
                        value={SelectedQ2}
                        onChange={setSelectedQ2}
                        options={options2}
                    />
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
        </div>
    );
}

export default NewUser;