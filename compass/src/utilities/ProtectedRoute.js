import React, { Component, useEffect } from "react";
import { Navigate,useNavigate, useLocation, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "./AuthContext";
import { auth } from "./Firebase";


type ProtectedRouteType = {
    roleRequired: 'Administrator' | 'Manager' | 'Accountant'
}

const ProtectedRoute = (props: ProtectedRouteType) => {
    const { user } = UserAuth();
    const [goToDenied, setGoToDenied] = React.useState(false)
    const [goToLogin, setGoToLogin] = React.useState(false)
    const [userRole, setUserRole] = React.useState(window.localStorage.getItem('userRole'))
    const [verifiedUser, setVerifiedUser] = React.useState(false)
    
    //constantly checks is user is logged in
    useEffect(() => {
        const data = async () => {
            auth.onAuthStateChanged(user => {
                if (user) {  
                } else {   
                }
            })
        }
        data()
    })
    //checks if user role has changed
    useEffect(() => {
        console.log('user role changed')
    }, userRole)
   

    if (props.roleRequired) {    //if role required is there or not
        return user ? (//if there is a user move on , if not go to login
            props.roleRequired === userRole ? //if role required is the same as user role go to outlet
                (<Outlet />) : (console.log('denied'), <Navigate to="/denied" />)) :
            (<Navigate to="/login" />)
    } else {
        return user ? <Outlet /> : <Navigate to="/login" />
    }    
}
export default ProtectedRoute