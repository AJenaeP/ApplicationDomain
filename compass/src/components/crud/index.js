import React  from "react";
import StartFirebase from "../FirebaseConfigAdmin";
import{ ref, set, get, update, remove, child} from "firebase/database";
import './index.css';

export class Crud extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            db: '',
            address: '',
            dateofbirth: '',
            role: '',
            first_name: '',
            last_name: '',
            email: '',
             gender: '',
             startDate: '', 
             password: '',
             userId: ''          
        }
        this.interface = this.interface.bind(this);
    }

componentDidMount(){
    this.setState({
        db: StartFirebase()
    });
}
render(){
    return(
        <>


        <label>Enter Role</label>
        <input type= 'text' id= "rolebox" value={this.state.role} 
        onChange={e =>{this.setState({role: e.target.value});}}/>
        <br/><br/>

        <label>Enter First Name</label>
        <input type= 'text' id= "first_namebox" value={this.state.first_name} 
        onChange={e =>{this.setState({first_name: e.target.value});}}/>
        <br/><br/>

        <label>Enter Last Name</label>
        <input type= 'text' id= "last_namebox" value={this.state.last_name} 
        onChange={e =>{this.setState({last_name: e.target.value});}}/>
        <br/><br/>

        <label>Enter Email</label>
        <input type= 'text' id= "emailbox" value={this.state.email} 
        onChange={e =>{this.setState({email: e.target.value});}}/>
        <br/><br/>

        <label>Enter Gender</label>
        <input type= 'text' id= "genderbox" value={this.state.gender} 
        onChange={e =>{this.setState({gender: e.target.value});}}/>
        <br/><br/>

        <label>Enter Address</label>
        <input type= 'text' id= "addressbox" value={this.state.address} 
        onChange={e =>{this.setState({address: e.target.value});}}/>
        <br/><br/>

        <label>Enter DOB</label>
        <input type= 'date' id= "DOBbox" value={this.state.dateofbirth} 
        onChange={e =>{this.setState({dateofbirth: e.target.value});}}/>
        <br/><br/>

        <label>Enter Start Date</label>
        <input type= 'date' id= "startDatebox" value={this.state.startDate} 
        onChange={e =>{this.setState({startDate: e.target.value});}}/>
        <br/><br/>

        <label>Enter password</label>
        <input type= 'text' id= "passwordbox" value={this.state.password} 
        onChange={e =>{this.setState({password: e.target.value});}}/>
        <br/><br/>

        
        <label>Enter UserId</label>
        <input type= 'text' id= "userbox" value={this.state.userId} 
        onChange={e =>{this.setState({userId: e.target.value});}}/>
        <br/><br/>

<button id= "addBtn" onClick={this.interface}>Add Data</button>
<button id= "updateBtn" onClick={this.interface}>Update Data</button>
<button id= "deleteBtn" onClick={this.interface}>Delete Data</button>
<button id= "selectBtn" onClick={this.interface}>Get Data from DB</button>

        </>
    )
}

interface(event){
    const id = event.target.id;

    if(id=='addBtn'){
        this.insertData();
    }
    else if(id=='updateBtn'){
        //thi.updateData();
    }

    else if(id=='deleteBtn'){
        //this.deleteData();
    }

    else if(id=='selectBtn'){
        //this.selectData();
    }
}

getAllInputs(){
    return{
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        gender: this.state.gender,
        address: this.state.address,
        dateofbirth: this.state.dateofbirth,
        startDate: this.state.startDate,
        password: this.state.password,
        role: this.state.role,
        userId: this.state.userId
    }
}

insertData(){
const db = this.state.db;
const data = this. getAllInputs();

set(ref(db,'users/'+data.role),
{
first_name: data.first_name, 
last_name: data.last_name,
email: data.email,
gender: data.gender,
address: data.address,
dateofbirth: data.dateofbirth,
startDate: data.startDate,
password: data.password,
userId: data.userId
})
.then(() =>{alert('Data was added successfully')})
.catch((error)=>{alert("there was an error, details: "+error)});
}

updateData(){
    const db = this.state.db;
    const data = this. getAllInputs();
    
    set(ref(db,'users/'+data.role),
    {
    first_name: data.first_name, 
    last_name: data.last_name,
    email: data.email,
    gender: data.gender,
    address: data.address,
    dateofbirth: data.dateofbirth,
    startDate: data.startDate,
    password: data.password,
    userId: data.userId
    })
    .then(() =>{alert('Data was updated successfully')})
    .catch((error)=>{alert("there was an error, details: "+error)});
    
    }


deleteData(){
    const db = this.state.db;
    const data = this. getAllInputs();
    
    remove(ref(db,'users/'+data.userId))
    
   
    .then(() =>{alert('Data was deleted successfully')})
    .catch((error)=>{alert("there was an error, details: "+error)});
    
}

selectData(){
    const dbref= ref(this.state.db);
    const userId = this.getAllInputs().userId;
    
    get(child(dbref, 'users/' +userId)).then((snapshot) =>{
        if(snapshot.exists()){
    this.setState({

             role: snapshot.val().role,
            first_name: snapshot.val().first_name,
            last_name: snapshot.val().last_name,
            email: snapshot.val().email,
             gender: snapshot.val().gender,
             address: snapshot.val().address,
             dateofbirth: snapshot.val().dateofbirth,
             startDate: snapshot.val().startDate, 
             password: snapshot.val().password,
             userId: snapshot.val().userId 

    })
}
else{
    alert("No Data Found")
}

})
.catch((error)=>{alert("there was an error, details: " +error)});
}
}


