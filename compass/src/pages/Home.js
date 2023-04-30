import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import compasslogo from "../images/compassLogo.png";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";

const Home = () => {
  const navigate = useNavigate();
  const [goToLogin, setgoToLogin] = useState(false);
  const [goToSignUp, setgoToSignUp] = useState(false);

  useEffect(() => {
    if (goToLogin) {
      navigate("/login");
    }

    if (goToSignUp) {
      navigate("/newuser");
    }
  });

  return (
    <div className="Home">
      <div className="title">
        <h1 className="welcome">Welcome to </h1>
        <h1 className="compass">Compass Credit Union</h1>
      </div>
      <img src={compasslogo} className="picture" alt="compass" width="90px" />
      <h3 className="subtitle">
        Helping navigate the way for financial freedom yesterday, today, and
        tomorrow
      </h3>
      <div className="buttons">
        <Button
          variant="outlined"
          size="large"
          style={{ borderRadius: 20, marginRight: 10 }}
          startIcon={<LoginIcon />}
          className="loginB"
          onClick={() => {
            setgoToLogin(true);
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ borderRadius: 20 }}
          startIcon={<CreateIcon />}
          className="signupB"
          onClick={() => {
            setgoToSignUp(true);
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
export default Home;
