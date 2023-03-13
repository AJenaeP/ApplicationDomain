import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddAccount from "./components/AddAccount";
import AccountsList from "./components/AccountsList";
import "./App.css";

function App() {
  //CLICK On edit to get id component
  const [AccountId, setAccountId] = useState("");

  //CREATE handler to get id and console log to see proper id 
  const getAccountIdHandler = (id) => {
    console.log("The ID of the account to be edited: ", id);
    setAccountId(id);
  };
  
  //PASS id to add and edit Accounts 
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Compass Credit Union</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
          
            <AddAccount id={AccountId} setAccountId={setAccountId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <AccountsList getAccountId={getAccountIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
