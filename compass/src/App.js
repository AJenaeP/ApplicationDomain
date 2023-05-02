import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login_forgotPassword_newUser/Login";
import ForgotPassword from "./pages/login_forgotPassword_newUser/ForgotPassword";
import React from "react";
import Header from "./pages/Header";
import NewUser from "./pages/login_forgotPassword_newUser/NewUser";
import { AuthProvider } from "./utilities/AuthContext";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Home from "./pages/Home";
import PermissionDenied from "./pages/PermissionDenied";
import DashboardAdmin from "./pages/AdminPages/DashboardAdmin";
import ExpiredPasswords from "./pages/AdminPages/ExpiredPasswords";
import Accounts from "./pages/Accounts";
import HelpPage from "./pages/helppage";
import DashboardManager from "./pages/ManagerPages/DashboardManager";
import DashboardAccountant from "./pages/AccountantPages/DashboardAccountant";
import Users from "./pages/AdminPages/Users";
import Journal from "./pages/Journal";
import Email from "./utilities/Email";
import Journals from "./pages/Journals";
import Events from "./pages/AdminPages/Events";
import Ledgers from "./pages/Ledgers";
import FinStatements from "./pages/FinStatements";

//CREATE all routes from pages to communicate with local host
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/header" element={<Header />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/newuser" element={<NewUser />}></Route>
            <Route
              path="/"
              element={<ProtectedRoute roleRequired="Administrator" />}
            >
              <Route
                path="/admindashboard"
                element={<DashboardAdmin />}
              ></Route>
              <Route path="/users" element={<Users/>}></Route>
              <Route path="/ExpiredPasswords" element={<ExpiredPasswords/>}></Route>
            </Route>
            <Route 
                path="/" 
                element={<ProtectedRoute roleRequired="Manager" />}>
                <Route 
                path="/managerdashboard" 
                element={<DashboardManager />}>
                 

                </Route>
            </Route>
            <Route
              path="/"
              element={<ProtectedRoute roleRequired="Accountant" />}
            >
              <Route
                path="/accountantdashboard"
                element={<DashboardAccountant />}
              ></Route>
            </Route>
            <Route path="/denied" element={<PermissionDenied />}></Route>
            <Route path="/accounts" element={<Accounts />}></Route>
            <Route path="/helppage" element={<HelpPage />}></Route>
            <Route path="/journals" element={<Journals />}></Route>
            <Route path="/ledgers" element={<Ledgers />}></Route>
            <Route path="/journal" element={<Journal />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/events"element={<Events/>}></Route>
            <Route path="/finstate" element={<FinStatements />}></Route>

          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;