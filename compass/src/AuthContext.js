import React, { useContext, useState, useEffect } from "react";
import Header from './pages/Header';
import { auth, db } from './Firebase';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged} 
from 'firebase/auth'
import { 
    getFirestore, 
    collection, 
    getDoc, 
    addDoc, 
    deleteDoc, 
    setDoc, 
    doc,
    query, 
    where,
} 
from "firebase/firestore";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser ] = useState({});

    const createUser = (email,password, userInfo) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), userInfo);
        })
        //send email to admin account with userId, firstName, LastName and email
    }
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    const signIn = async (userName,password) => {
        const q = query(collection(db, "users"), where("userId", "==", userName));

        const querySnapshot = await getDoc(q);
        querySnapshot.forEach(async (doc) => {
            const userCredential = await signInWithEmailAndPassword(auth, doc.data().email, password);
            const user = userCredential.user;
            //console.log(doc.data().firstName);
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            console.log(user)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    
    const value = {
        createUser,
        user,
        logout,
        signIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return React.useContext(AuthContext)
}
