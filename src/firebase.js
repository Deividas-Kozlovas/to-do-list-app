// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkEZoJOAFWR5sJh7RmwN8q5zCwJRAPluY",
  authDomain: "to-do-list-f25c6.firebaseapp.com",
  projectId: "to-do-list-f25c6",
  storageBucket: "to-do-list-f25c6.firebasestorage.app",
  messagingSenderId: "1023775721769",
  appId: "1:1023775721769:web:1fee38cbf361c40c614f38",
  measurementId: "G-XKCTWMWRSQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
