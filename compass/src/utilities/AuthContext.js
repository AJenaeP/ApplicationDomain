import React, { useContext, useState, useEffect } from "react";
import Header from '../pages/Header';
import { auth, db } from './Firebase';
import { useNavigate, Navigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword
} 
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
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const createUser = async (email,password, userInfo) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), userInfo);
        //send email to admin account with userId, firstName, LastName and email
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setIsLoggedIn(false)
        }).catch((error) => {
            // An error happened.
            alert(error)
        });
    }

    const signIn = async (username,password) => {
        const userName = username
        //console.log(userName)
        const q = query(collection(db, "users"), where("userId", "==", userName));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            signInWithEmailAndPassword(auth, doc.data().email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    setUserData(doc.data());
                    setIsLoggedIn(true)
                    console.log('are we here?')
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode);
                    alert(errorMessage);
                });
            });
    }
    const forgotPassword = async (email, username, secretQ1A, secretQ2A ) => {
        const q = query(collection(db, "users"), where("userId", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().email !== email || doc.data().userId !== username) {
                alert("No account was found with that email and password combination")
            } else if (doc.data().secretQ1A !== secretQ1A || doc.data().secretQ2A !== secretQ2A)  {
                alert("one or both of your secret answer questions are invalid")
            } else {
                alert(" you've been verified, create a new password")
                setIsVerified(true)
            }
        });
    }
    const newPassword = async (email, username, password) => {
        const userName = username
        //console.log(userName)
        const q = query(collection(db, "users"), where("userId", "==", userName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc)
        }
        /*updatePassword(user, password).then(() => {
            alert('passwordUpdated')
        }).catch((error) => {
            console.log(error)
        }))*/
    )}


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    
    const value = {
        createUser,
        user,
        userData,
        isLoggedIn,
        isVerified,
        logout,
        signIn,
        forgotPassword,
        newPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
