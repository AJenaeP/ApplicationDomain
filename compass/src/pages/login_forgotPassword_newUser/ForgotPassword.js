import React from "react";
import compasslogo from "../../images/compassLogo.png";
import PasswordChecklist from "react-password-checklist";
import "../../css/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../utilities/AuthContext";
import { query, where, collection, getDocs } from "firebase/firestore";
import { FormControl, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secretQ1A, setSecretQ1A] = React.useState("");
  const [secretQ2A, setSecretQ2A] = React.useState("");
  const { forgotPassword, isVerified, newPassword } = UserAuth();
  const [password, setPassword] = React.useState("");
  const [passwordAgain, setPasswordAgain] = React.useState("");

  //navigates user to home screen
  const [goToHome, setgoToHome] = React.useState(false);
  if (goToHome) {
    navigate("/home");
  }

  //navigates user to login screen
  const [goToLogin, setgoToLogin] = React.useState(false);
  if (goToLogin) {
    navigate("/login");
  }

  //this calls forgot password function from authcontext
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError("");
    if (username === "") {
      alert("Username can't be empty");
    } else if (email === "") {
      alert("Email can't be empty");
    }
    try {
      forgotPassword(email, username, secretQ1A, secretQ2A);
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };
  //this calls the new password function from auth context
  const handleNewPassword = (e) => {
    e.preventDefault();
    setError("");
    try {
      newPassword(email, username, password);
      //navigate('/login')
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="forgotpassword">
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
      <Container
        className="form"
        style={{
          width: 600,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div id="formHeader">
          <h1>Forgot Password</h1>
          <p>
            Please fill in this form to authenticate your account and change
            your password.
          </p>
        </div>
        {!isVerified && (
          <FormControl id="formcontrol" style={{ marginTop: 10 }}>
            <div id="emailuser" style={{ marginBottom: 10 }}>
              <TextField
                id="outlined-password-input email"
                label="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 230, marginRight: 20 }}
              />
              <TextField
                id="outlined-password-input Username"
                label="Username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                style={{}}
              />
            </div>
            <div style={{ marginBottom: 50 }}>
              <TextField
                id="outlined-helperText SQ"
                label="What is your favorite Color?"
                helperText="Secret Question 1"
                style={{ width: 230, marginRight: 20 }}
                onChange={(e) => setSecretQ1A(e.target.value)}
              />
              <TextField
                id="outlined-helperText SQ2"
                label="What is your best friends first name?"
                helperText="Secret Question 2"
                style={{ width: 300 }}
                onChange={(e) => setSecretQ2A(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 225, marginRight: 20 }}
                startIcon={<DoneIcon />}
                className="submit"
                onClick={handleForgotPassword}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                size="large"
                style={{ width: 225 }}
                startIcon={<ClearIcon />}
                className="cancel"
                onClick={() => {
                  setgoToHome(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
              >
                Cancel
              </Button>
            </div>
          </FormControl>
        )}
        {isVerified && (
          <FormControl id="formcontrol" style={{ marginTop: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-password-input password"
                label="Password"
                type="password"
                autoComplete="current-password"
                style={{ marginBottom: 10 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="outlined-password-input password"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                style={{ marginBottom: 10 }}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "letter",
                  "match",
                  "firstLetter",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
                style={{ marginBottom: 10 }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ width: 225, marginRight: 20 }}
                startIcon={<DoneIcon />}
                className="submit"
                onClick={handleNewPassword}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                size="large"
                style={{ width: 225 }}
                startIcon={<ClearIcon />}
                className="cancel"
                onClick={() => {
                  setgoToHome(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
              >
                Cancel
              </Button>
            </div>
          </FormControl>
        )}
      </Container>
    </div>
    /*<div className="forgotpassword">
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
            {!isVerified &&
                <div>
                    <h2>Please enter your username and email to reset your password:</h2>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="username">User Id:</label>
                        <input
                            type="text"
                            className="uname"
                            id="username"
                            onChange={(e) => setUserName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="secretQ1"> Secret Question 1: What is your favorite Color?</label>
                        <input
                            type="text"
                            id="secretQA1"
                            placeholder="Secret Question 1 Answer"
                            onChange={(e) => setSecretQ1A(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="SecretQ2">Secret Question 2: What is your bestfriends first name?</label>
                        <input
                            type="text"
                            id="secretQA2"
                            placeholder="Secret Question 2 Answer"
                            onChange={(e) => setSecretQ2A(e.target.value)}
                        ></input>
                    </div>
                    <button
                        className="continue-btn"
                        type="submit"
                        onClick={handleForgotPassword}
                    >Submit</button>
                    <button
                        className="cancel-btn"
                        type="submit"
                        onClick={() => { setgoToLogin(true); } }
                    >Cancel</button>
                </div>
            }
            {isVerified &&
                <div>
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
                            value={password}
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { }}
                            messages={{
                                firstLetter: "First character must be a letter"
                            }}
                        />
                    </div>
                    <button
                        className="continue-btn"
                        type="submit"
                        onClick={handleNewPassword}
                    >Submit</button>
                    <button
                        className="cancel-btn"
                        type="submit"
                        onClick={() => { setgoToLogin(true); }}
                    >Cancel</button>
                </div>
            }
            </div>*/
  );
};

export default ForgotPassword;
