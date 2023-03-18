import React, { Component, useEffect } from "react";
import { Navigate,useNavigate, useLocation, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "./AuthContext";
import { auth } from "./Firebase";


type ProtectedRouteType = {
    roleRequired: 'Administrator' | 'Manager' | 'Accountant'
}

const ProtectedRoute = (props: ProtectedRouteType) => {
    const { user, userData } = UserAuth();
    const [goToDenied, setGoToDenied] = React.useState(false)
    const [goToLogin, setGoToLogin] = React.useState(false)
    const [currentUserData, setCurrentUserData] = React.useState({})
    const [persistUser, setPersistUser] = React.useState({});
    let userRole = "";
    
    useEffect(() => {
        const CurrentUser = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setPersistUser(currentUser)
            console.log(persistUser)
            console.log(userData)
        })
        /*const currentUser = auth.onAuthStateChanged(user => {
            setUser(user)
            console.log(user)
        })*/
        return () => {
            CurrentUser()
        }
    })
    //if a user is logged in and authorized set role value
    if (user) {
        if(userData == null){
            userRole = currentUserData.role;
        } else {
            userRole = userData.role
        }
        console.log(userData);
        console.log(userRole);
    } else if (persistUser){
        if (userData == null) {
            userRole = currentUserData.role;
        } else {
            userRole = userData.role
        }
        console.log(userData);
        console.log(userRole);
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