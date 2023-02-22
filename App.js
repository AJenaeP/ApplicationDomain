import './App.css';
import Sidebar from './utilities/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login_forgotPassword_newUser/Login"
import ForgotPassword from './pages/login_forgotPassword_newUser/ForgotPassword';
import React from 'react'
import Header from './pages/Header';
import NewUser from './pages/login_forgotPassword_newUser/NewUser';
import DashboardAdmin from './pages/DashboardAdmin';
import { AuthProvider } from './utilities/AuthContext';
import ProtectedRoute from './utilities/ProtectedRoute';

import Home from './pages/Home';

function App() {
  return (
    <> 
   
 
    <AuthProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/header' element={<Header/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
            <Route path='/admindashboard' element={<DashboardAdmin/>}></Route>
            <Route path='/newuser' element={<NewUser/>}></Route>
            
          </Routes>
        </Router>
      </AuthProvider>
    </>

  );
}



export default App;
