import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const styleObj={
  display:"block",
  margin:"40vh auto"
}
const firebaseConfig = {
    apiKey: "AIzaSyCVYOY5Mqc6W7LqKF206AVDBGKgKNzjZFM",
    authDomain: "aptitudeprep-ac201.firebaseapp.com",
    projectId: "aptitudeprep-ac201",
    storageBucket: "aptitudeprep-ac201.appspot.com",
    messagingSenderId: "640929947370",
    appId: "1:640929947370:web:6d61ced7713cd58fff8193"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);