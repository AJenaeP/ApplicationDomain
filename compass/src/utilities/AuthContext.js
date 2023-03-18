import React, { useContext, useState, useEffect } from "react";
import Header from '../pages/Header';
import { auth, db } from './Firebase';
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useAuthState}from 'react-firebase-hooks/auth'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    getAuth,
    reauthenticateWithCredential,
    signInWithCredential,
    EmailAuthProvider,
    setPersistence,
    browserLocalPersistence,
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

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [loginAttempts, setLoginAttempts] = useState(3)
    const decrementCounter = () => setLoginAttempts(loginAttempts - 1)
    //checks if a user is logged after refresh
    /*useEffect(() => {
        const loggedInUser = JSON.parse(window.localStorage.getItem('user'));
        const loggedInData = JSON.parse(window.localStorage.getItem('userData'));
        //setUser(JSON.parse(loggedInUser))
        //setUserData(JSON.parse(loggedInData))
        if (loggedInUser) {
            console.log(user)
            console.log(userData)
            console.log(loggedInUser)
            //console.log(loggedInData)
            setUser(loggedInUser)
            setUserData(loggedInData)
            //const foundUser = JSON.parse(loggedInUser);
            //const foundUserData = JSON.parse(loggedInData);
            localStorage.setItem('we are', 'here')
            //setUser(foundUser);
            //setUserData(foundUserData);
            //console.log(foundUser);
            //console.log(foundUserData);
            console.log(user);
            //console.log(userData);
        }
    }, []);*/
    //auth().setPersistence(auth.Auth.Persistance.LOCAL)
    //console.log(user)
    /*onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })*/
    useEffect(() => {
        const CurrentUser = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            console.log(user)
        })
        /*const currentUser = auth.onAuthStateChanged(user => {
            setUser(user)
            console.log(user)
        })*/
        return () => {
            CurrentUser()
        }
    })

    const createUser = async (email, password, userInfo) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), userInfo);
        //send email to admin account with userId, firstName, LastName and email
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setIsLoggedIn(false)
            localStorage.clear()
        }).catch((error) => {
            // An error happened.
            alert(error)
        });
    }

    const signIn = async (username, password) => {
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
                    //console.log(user)
                    //console.log(auth)
                    //window.localStorage.setItem('userData', JSON.stringify(doc.data())) 
                    //window.localStorage.setItem('user', JSON.stringify(user))
                    //console.log(user)
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode);
                    if(errorCode === 'auth/wrong-password') {
                       decrementCounter()
                       if(loginAttempts == 0) {
                        isDisabled(true)
                       }
                    }
                });
        });
    }

    const forgotPassword = async (email, username, secretQ1A, secretQ2A) => {
        const q = query(collection(db, "users"), where("userId", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().email !== email || doc.data().userId !== username) {
                alert("No account was found with that email and password combination")
            } else if (doc.data().secretQ1A !== secretQ1A || doc.data().secretQ2A !== secretQ2A) {
                alert("one or both of your secret answer questions are invalid")
            } else {
                alert(" you've been verified, create a new password")
                setIsVerified(true)
            }
        });

    }



    const newPassword = async (email, username, password) => {
        console.log(auth.currentUser)
        /*reauthenticate = (email) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(user.email, email);
            return user.reauthenticateWithCredential(cred);

        }*/

            /*const user = auth.getUser;
            updatePassword(user, password)
            .then(()=> {
                console.log('update successful')
            })
            .catch((error) => {
                console.log(error)
            })*/
        /*const userName = username
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
       // )*/

    }

    const CurrentUser = (() => {
        const [user, loading, error] = useAuthState(auth);
        if (loading) {
            return (
                <div><p>Loading...</p></div>
            )
        }
        if (error) {
            return (
                <div><p>Error: {error}</p></div>
            )
        }
        if (user) {
            console.log(user)
            setUser(user)
            console.log(user)
        }
    })

    const value = {
        createUser,
        user,
        userData,
        isLoggedIn,
        isVerified,
        isDisabled,
        logout,
        signIn,
        forgotPassword,
        newPassword,
        auth
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