import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnXv83Aw2hzAfSNIwstptVbJpMIzOcx6A",
  authDomain: "compass-cu-data.firebaseapp.com",
  projectId: "compass-cu-data",
  storageBucket: "compass-cu-data.appspot.com",
  messagingSenderId: "873673658381",
  appId: "1:873673658381:web:81ddb8a8243b1e22ff8544",
  measurementId: "G-78SW6MWTH9",
  databaseURL: "https://compass-cu-data-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
    //accessing authorization and database
export const auth = getAuth(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
