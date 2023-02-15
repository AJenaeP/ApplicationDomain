import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword';
import React from 'react'
import Header from './pages/Header';
import NewUser from './pages/NewUser';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <> 
    <AuthProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route 
              path='/header' 
              element={<ProtectedRoute><Header /></ProtectedRoute>}>
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/newuser' element={<NewUser />} />
          </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
