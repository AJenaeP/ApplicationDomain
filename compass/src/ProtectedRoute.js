import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const {user} = UserAuth();
    const navigate = useNavigate();

    if(!user) {
        navigate('/')
    }
    return children
}
export default ProtectedRoute