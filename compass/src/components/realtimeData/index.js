import StartFirebase from "../FirebaseConfigAdmin";
import React from "react";
import {ref, onValue} from 'firebase/database';
import { Table } from "react-bootstrap";

const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state ={
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef = ref(db, 'users');

        onValue(dbRef, (snapshot)=>{
        let records = [];
        snapshot.forEach(childSnapshot=>{
    let keyName = childSnapshot.key;
    let data = childSnapshot.val();
    records.push({"key": keyName, "data":data});
});
this.setState({tableData: records});
        
    });

    }

    render(){
        return(
            <Table className ='container w-75' bordered striped variant ='dark'>
                <thead>
                    <tr>
                        <th>#</th>
                       
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Date of Birth</th>
                        <th>Start Date</th>
                        <th>Password Expiration</th>
                        <th>Role</th>
                        <th>User ID</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.tableDate.map((row,index)=>{
                    return(
                    <tr key={index}>
                    
                        <td>{index+1}</td>
                        <td>{row.key}</td>
                        <td>{row.data.accountStatus}</td>
                        <td>{row.data.firstName}</td>
                        <td>{row.data.lastName}</td>
                        <td>{row.data.email}</td>
                        <td>{row.data.gender}</td>
                        <td>{row.data.address}</td>
                        <td>{row.data.datOfBirth}</td>
                        <td>{row.data.startDate}</td>
                        <td>{row.data.passwordExpiration}</td>
                        <td>{row.data.role}</td>
                        <td>{row.data.userId}</td>

                    </tr>
                    ) 
                    })}
                </tbody>
            </Table>
        )
    }
}
