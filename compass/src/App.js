import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword';
import React from 'react'
import Header from './pages/Header';
import NewUser from './pages/NewUser';

function App() {
  return (
    <> 
    <div>
      <Header/>
    </div>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/newuser' element={<NewUser/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
