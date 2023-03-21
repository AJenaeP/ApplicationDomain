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

const UserCollectionRef = collection(db, "users");
class UserDataService {
  addUsers = (newUser) => {
    return addDoc(UserCollectionRef, newUser);
  };

  updateUser = (id, updatedUser) => {
    const UserDoc = doc(db, "users", id);
    return updateDoc(UserDoc, updatedUser);
  };

  deleteUser = (id) => {
    const UserDoc = doc(db, "users", id);
    return deleteDoc(UserDoc);
  };

  getAllUsers = () => {
    return getDocs(UserCollectionRef);
  };

  getUser = (id) => {
    const UserDoc = doc(db, "users", id);
    return getDoc(UserDoc);
  };
}

export default new UserDataService();
