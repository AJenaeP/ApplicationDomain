import { initializeApp } from 'firebase/app';

import {getDatabase} from "firebase/database";

function StartFirebase(){
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



//Initialize Firebase
const app = initializeApp(firebaseConfig);

return getDatabase(app);
}
export default StartFirebase;
//export const app = initializeApp(firebaseConfig);
//accessing authorization and database
//export const auth = getAuth(app);

//export const db = getFirestore(app);
