import React, { useContext, useState, useEffect } from "react";
import Header from './pages/Header';
import { auth, db } from './Firebase';
import { useNavigate} from "react-router-dom";
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
    getDocs, 
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

    const createUser = async (email,password, userInfo) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), userInfo);
        //send email to admin account with userId, firstName, LastName and email
    }
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    const signIn = async (username,password) => {
        const q = query(collection(db, "users"), where("userId", "==", username));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            signInWithEmailAndPassword(auth, doc.data().email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log(doc.data())
                    const user = userCredential.user;
                    
                    setUser(doc.data());
                })
            });
        
    }

    /*useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            //console.log(user)
        })
        return () => {
            unsubscribe()
        }
    }, [])*/
    
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
