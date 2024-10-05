// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmlrY8LPBavs2a_fe6yc7_ySpN2jTDWJY",
  authDomain: "movies-hub-a68bd.firebaseapp.com",
  projectId: "movies-hub-a68bd",
  storageBucket: "movies-hub-a68bd.appspot.com",
  messagingSenderId: "1058964072789",
  appId: "1:1058964072789:web:5a6fecf2a56be416afe7dc",
  measurementId: "G-9D0TKDG5YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
// 