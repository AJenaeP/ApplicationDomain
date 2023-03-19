import React, { Component, useEffect } from "react";
import { Navigate,useNavigate, useLocation, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "./AuthContext";
import { auth } from "./Firebase";


type ProtectedRouteType = {
    roleRequired: 'Administrator' | 'Manager' | 'Accountant'
}

const ProtectedRoute = (props: ProtectedRouteType) => {
    const { user} = UserAuth();
    const [goToDenied, setGoToDenied] = React.useState(false)
    const [goToLogin, setGoToLogin] = React.useState(false)
    const [userRole, setUserRole] = React.useState('')
    const [persistUser, setPersistUser] = React.useState({});
    //let userRole = "";
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log('user logged in')
                const data = JSON.parse(window.localStorage.getItem('userData'));
                console.log(data.userRole)
                setUserRole(String(data.userRole))
                console.log(userRole)
            } else {
                console.log('user logged out')
            }
        })
    }, [user, userRole])
    if (props.roleRequired) {    //if role required is there or not
        return user ? (//if there is a user move on , if not go to login
            props.roleRequired === userRole ? //if role required is the same as user role go to outlet
                (<Outlet />) : (console.log('denied'), <Navigate to="/denied" />)) :
            (<Navigate to="/login" />)
    } else {
        return user ? <Outlet /> : <Navigate to="/login" />
    }
    //if a user is logged in and authorized set role value
    /*if (user) {
        if(userData == null){
            userRole = currentUserData.role;
        } else {
            userRole = userData.role
        }
        //console.log(userData);
        //console.log(userRole);
    } else if (persistUser){
        if (userData == null) {
            userRole = currentUserData.role;
        } else {
            userRole = userData.role
        }
        //console.log(userData);
        //console.log(userRole);
    } else {
        userRole = ""
    }*/
  
    
    
}
export default ProtectedRoute