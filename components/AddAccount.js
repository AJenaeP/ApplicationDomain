import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import AccountsDataService from "../services/accounts.services";

//CREATE state variables that bind with our form control 
const AddAccount = ({ id, setAccountId }) => {
  const [Name, setName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [normalSide, setnormalSide] = useState("");
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [InitialBalance, setInitialBalance] = useState("");
  const [Debit, setDebit] = useState("");
  const [Credit, setCredit] = useState("");
  const [Balance, setBalance] = useState("");
  const [AccountAdded, setAccountAdded] = useState("");
  const [UserID, setUserID] = useState("");
  const [Order, setOrder] = useState("");
  const [Statement, setStatement] = useState("");
  const [Comment, setComment] = useState("");
  const [status, setStatus] = useState("Active");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

//CREATE Error message for monetary values not having two decimal place
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  if (Name === "" || AccountNumber === "") {
    setMessage({ error: true, msg: "All fields are mandatory!" });
  return;
}
/*else if (InitialBalance === "" || Debit === "" || Credit === "" || Balance === "") {
    setMessage({ error: true, msg: "All monetary values should have two decimal spaces!" });
    return;
  }*/
 

  //CREATE new record for Account 
    const newAccount = {
      Name,
      AccountNumber,
      Description,
      normalSide,
      Category,
      SubCategory,
      InitialBalance,
      Debit,
      Credit,
      Balance,
      AccountAdded,
      UserID,
      Order,
      Statement,
      Comment,
      status,
    };
    console.log(newAccount);
 //CREATE TRY CATCh statement to add Accounts and Update accounts 
 //CAN add error messages here 
    try {
   
      if (id !== undefined && id !== "") {
        await AccountsDataService.updateAccount(id, newAccount);
           //CLEAR information after each edit 
        setAccountId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await AccountsDataService.addAccount(newAccount);
        setMessage({ error: false, msg: "New Account added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
//CREATE "empty variables" to be added or updated
    setName("");
      setAccountNumber("");
      setDescription("");
      setnormalSide("");
      setCategory("");
      setSubCategory("");
      setInitialBalance("");
      setDebit("");
      setCredit("");
      setBalance("");
      setAccountAdded("");
      setUserID("");
      setOrder("");
      setStatement("");
      setComment("");
      setStatus("");
    
  };

  //CREATE function to fetch all the data from Accounts
  const editHandler = async () => {
    setMessage("");
    try {
      //USE id as a parameter to get that specific Account
      const docSnap = await AccountsDataService.getAccount(id);
      //populate the values of Accounts
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().Name);
      setAccountNumber(docSnap.data().AccountNumber);
      setDescription(docSnap.data().Description);
      setnormalSide(docSnap.data().normalSide);
      setCategory(docSnap.data().Category);
      setSubCategory(docSnap.data().SubCategory);
      setInitialBalance(docSnap.data().InitialBalance);
      setDebit(docSnap.data().Debit);
      setCredit(docSnap.data().Credit);
      setBalance(docSnap.data().Balance);
      setAccountAdded(docSnap.data().AccountAdded);
      setUserID(docSnap.data().UserID);
      setOrder(docSnap.data().Order);
      setStatement(docSnap.data().Statement);
      setComment(docSnap.data().Comment);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };


  //IF id is not equal to undefined or empthy THEN edit/update the record 

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

    //CREATE form control from React Bootstrap 
  //FORM CONTROL will contain an on submit to update ACCOUNT information
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
          //CREATE close option for error message
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formAccountName">
            <InputGroup>
              <InputGroup.Text id="formAccountName"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Account Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAccountNumber">
            <InputGroup>
              <InputGroup.Text id="formAccountNumber"></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Account Number"
                value={AccountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <InputGroup>
              <InputGroup.Text id="formDescription"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Account Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formNormalSide">
            <InputGroup>
              <InputGroup.Text id="formNormalSide"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Normal Side"
                value={normalSide}
                onChange={(e) => setnormalSide(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formCategory">
            <InputGroup>
              <InputGroup.Text id="formCategory"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Category"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formSubCategory">
            <InputGroup>
              <InputGroup.Text id="formSubCategory"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="SubCategory"
                value={SubCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formInitialBalance">
            <InputGroup>
              <InputGroup.Text id="formInititalBalance"></InputGroup.Text>
              <Form.Control aria-label="Dollar amount (with dot and two decimal places)" 
                type="number"
                placeholder="Initial Balance"
                value={InitialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formDebit">
            <InputGroup>
              <InputGroup.Text id="formDebit"></InputGroup.Text>
              <Form.Control aria-label="Dollar amount (with dot and two decimal places)" 
                type="number"
                placeholder="Debit"
                value={Debit}
                onChange={(e) => setDebit(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formCredit">
            <InputGroup>
              <InputGroup.Text id="formCredit"></InputGroup.Text>
              <Form.Control aria-label="Dollar amount (with dot and two decimal places)" 
                type="number"
                placeholder="Credit"
                value={Credit}
                onChange={(e) => setCredit(e.target.value)}
              />
            </InputGroup>
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBalance">
            <InputGroup>
              <InputGroup.Text id="formBalance"></InputGroup.Text>
              <Form.Control aria-label="Dollar amount (with dot and two decimal places)" 
                type="number"
                placeholder="Balance"
                value={Balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formAccountAdded">
            <InputGroup>
              <InputGroup.Text id="formAccountAdded"></InputGroup.Text>
              <Form.Control  
                type="date"
                placeholder="Account Added"
                value={AccountAdded}
                onChange={(e) => setAccountAdded(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formUserID">
            <InputGroup>
              <InputGroup.Text id="formUserID"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="User ID"
                value={UserID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formOrder">
            <InputGroup>
              <InputGroup.Text id="formOrder"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Order"
                value={Order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formStatement">
            <InputGroup>
              <InputGroup.Text id="formStatement"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Statement"
                value={Statement}
                onChange={(e) => setStatement(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formComment">
            <InputGroup>
              <InputGroup.Text id="formComment"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Comment"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </InputGroup>
          </Form.Group>



          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Active");
                setFlag(true);
              }}
            >
              Active
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Deactivate");
                setFlag(false);
              }}
            >
              Deactivate
            </Button>
          </ButtonGroup>
        
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddAccount;
