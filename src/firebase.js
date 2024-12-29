// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Pridėtas importas

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhYjblKQl1TrwyyZtpmOwaH8Dq2VBrV1Y",
  authDomain: "c-team-17c00.firebaseapp.com",
  projectId: "c-team-17c00",
  storageBucket: "c-team-17c00.firebasestorage.app",
  messagingSenderId: "914238747049",
  appId: "1:914238747049:web:d29637e35942b8e3e9d4b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);