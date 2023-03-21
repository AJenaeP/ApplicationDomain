import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const passwordCollectionRef = collection(db, "users");
class PasswordDataService {
  addPasswords = (newPassword) => {
    return addDoc(passwordCollectionRef, newPassword);
  };

  updatePassword = (id, updatedPassword) => {
    const passwordDoc = doc(db, "users", id);
    return updateDoc(passwordDoc, updatedPassword);
  };

  deletePassword = (id) => {
    const passwordDoc = doc(db, "users", id);
    return deleteDoc(passwordDoc);
  };

  getAllPasswords = () => {
    return getDocs(passwordCollectionRef);
  };

  getPasswords = (id) => {
    const passwordDoc = doc(db, "users", id);
    return getDoc(passwordDoc);
  };
}

export default new PasswordDataService();
