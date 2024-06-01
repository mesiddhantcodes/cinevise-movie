// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJj1Ept_mUDtn9Tjjb85nPh9yMDAmJqN0",
  authDomain: "netflix-gpt-67e24.firebaseapp.com",
  projectId: "netflix-gpt-67e24",
  storageBucket: "netflix-gpt-67e24.appspot.com",
  messagingSenderId: "152702669805",
  appId: "1:152702669805:web:0a4871586a2b7772d84de4",
  measurementId: "G-BDDXLD57HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);