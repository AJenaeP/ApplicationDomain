import React, { Component, useEffect } from "react";
import { Navigate,useNavigate, useLocation, Outlet } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { auth } from "./Firebase";


type ProtectedRouteType = {
    roleRequired: 'Administrator' | 'Manager' | 'Accountant'
}
const ProtectedRoute = (props: ProtectedRouteType) => {
    const { user, userData } = UserAuth();
    const [role, setRole] = React.useState("");
    const [goToDenied, setGoToDenied] = React.useState(false)
    const [goToLogin, setGoToLogin] = React.useState(false)
    let userRole = "";
    
    //if a user is logged in and authorized set role value
    if (user) {
        userRole = userData.role
    } else {
        userRole = ""
    } 
  
    if (props.roleRequired) {    //if role required is there or not
        return user ? (//if there is a user move on , if not go to login
            props.roleRequired=== userRole ? //if role required is the same as user role go to outlet
                (<Outlet />) : (console.log('denied'), <Navigate to="/denied"/>)) :
            (<Navigate to="/login" />)
    } else {
        return user ? <Outlet /> : <Navigate to="/login"/>
    }
    
}
export default ProtectedRoute