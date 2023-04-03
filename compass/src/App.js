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
import Sidebar from "./pages/Sidebar";
import DashboardAdmin from "./pages/AdminPages/DashboardAdmin";
/*import CreateNewUser from './pages/AdminPages/CreateNewUser';
import ExpiredPasswords from './pages/AdminPages/ExpiredPasswords';*/
import Manager from "./pages/Manager";
import Accountant from "./pages/Accountant";
import Accounts from "./pages/Accounts";
import HelpPage from "./pages/helppage";
import DashboardManager from "./pages/ManagerPages/DashboardManager";
import DashboardAccountant from "./pages/AccountantPages/DashboardAccountant";
import Users from "./pages/AdminPages/Users";
import Journal from "./pages/Journal";
import Email from "./utilities/Email";
import Journals from "./pages/Journals";
import EventLog from "./pages/EventLog";
/* add to admin protected route after creation
  <Route path='/ExpiredPasswords' element={<ExpiredPasswords />}></Route>
*/
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
            <Route path="/journal" element={<Journal />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/events"element={<EventLog/>}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

//<Route path='/managerdashboard' element={<Manager/>}></Route>
//<Route path='/accountantdashboard' element={<Accountant/>}></Route>
