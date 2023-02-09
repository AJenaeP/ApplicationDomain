import React from "react";
import PasswordChecklist from "react-password-checklist"
import Select from 'react-select';
import { auth, db } from "../index"
import { getFirestore, collection, getDoc, addDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//secret question 1
const options1 = [
    {value: 'favColor', label: 'What is your favorite color?'},
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
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'accountant', label: 'Accountant' },
]

function register(){
    //getting date for userId
    var date = new Date(Date.now() + 3)
    const dateSliced = '0' + String(date.getMonth() + 1).slice(-2) + String(date.getFullYear()).slice(-2)
    //setting date for password expiration
    
    //getting data from form
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value
    var address = document.getElementById('address').value
    var dateOfBirth = document.getElementById('dateOfBirth').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    //var passwordExpire = passExpire;
    var userId = 'firstName.charAt(0)+lastName' + dateSliced
    var role = document.getElementById('role').value
    //sending data
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Adding user to database
            const user_data = {
                //userId: userId,
                firstName: firstName,
                lastName: lastName,
                address: address,
                dateOfBirth: dateOfBirth,
                email: email,
                //passwordExpiration: passwordExpire,
                //startDate: Date.prototype.getMonth,
                //accountStatus: 'deactive',
                role: role,
            }
            setDoc(doc(db, "users", user.uid), user_data);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorCode);
            console.log(errorMessage);
            alert(errorMessage);
        });
    //send email to admin account with userId, firstName, LastName and email
}


const NewUser = () => {
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")
    const [selectedOption, setSelectedOption] = React.useState(null);

    return(
        <div className="NewUser">
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName"></input>
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName"></input>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email"></input>
            </div>
            <div>
                <label for="address">Address:</label>
                <input type="text" id="address"></input>
            </div>
            <div>
                <label for="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth"></input>
            </div>
            <div>
            <label for="role">Role:</label>
                <Select
                    id="role"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options3}
                />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}></input>
            </div>
            <div>
                <label for="passwordAgain">Confirm Password:</label>
                <input type="passwordAgain" id="passwordAgain" onChange={e => setPasswordAgain(e.target.value)}></input>
                </div>
            <div>
                <PasswordChecklist
                    rules={['minLength', 'specialChar', 'number', 'letter', "match", "firstLetter"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => { }}
                    messages={{
                        firstLetter: "First character must be a letter"
                    }}
                />

                <label for="secretQ1">Choose a secret quesion:</label>
                <Select
                    id="secretQ1"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options1}
                />
                <input type="text" id="secretQA1"></input>
            </div>
            <div>
                <label for="SecretQ2">Choose a secret question:</label>
                <Select
                    id="secretQ2"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options2}
                />
                <input type="text" id="secretQA2"></input>
            </div > 
            <div>
                <input type="submit" value="Submit"></input>
            </div>
        </div>
    );
}

export default NewUser;