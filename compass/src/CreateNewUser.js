import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import UserDataService from "../services/users.services";

const AddUser = ({ id, setUserId }) => {
const [userId, setuserId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [startDate, setstartDate] = useState("");
  const [accountStatus, setaccountStatus] = useState("");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newUser = {
      userId,
      firstName,
      lastName,
      email,
      role,
      startDate,
      accountStatus,
    };
    console.log(newUser);

    try {
      if (id !== undefined && id !== "") {
        await UserDataService.updateUser(id, newUser);
        setUserId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await UserDataService.addUsers(newUser);
        setMessage({ error: false, msg: "New User added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setuserId("");
      setfirstName("");
      setlastName("");
      setemail("");
      setrole("");
      setstartDate("");
      setaccountStatus("");
   
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await UserDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setuserId(docSnap.data().userId);
      setfirstName(docSnap.data().firstName);
      setlastName(docSnap.data().lastName);
      setemail(docSnap.data().email);
      setrole(docSnap.data().role);
      setstartDate(docSnap.data().startDate);
      setaccountStatus(docSnap.data().accountStatus);
    
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formuserId">
            <InputGroup>
              <InputGroup.Text id="formBuserId"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formfirstName">
            <InputGroup>
              <InputGroup.Text id="formfirstName">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="first Name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formlastName">
            <InputGroup>
              <InputGroup.Text id="formlastName"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="last Name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          

          <Form.Group className="mb-3" controlId="formemail">
            <InputGroup>
              <InputGroup.Text id="formemail"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formrole">
            <InputGroup>
              <InputGroup.Text id="formrole"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="role"
                value={role}
                onChange={(e) => setrole(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formstartDate">
            <InputGroup>
              <InputGroup.Text id="formstartDate"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="start Date"
                value={startDate}
                onChange={(e) => setstartDate(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formaccountStatus">
            <InputGroup>
              <InputGroup.Text id="formaccountStatus">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="account Status"
                value={accountStatus}
                onChange={(e) => setaccountStatus(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setaccountStatus("Active");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setaccountStatus("Suspended");
                setFlag(false);
              }}
            >
              Not Available
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

export default AddUser;
