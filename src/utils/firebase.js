// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU_6d24OpPG48dpXXGbgKhuYONNatTaOI",
  authDomain: "netflixgpt-aead3.firebaseapp.com",
  projectId: "netflixgpt-aead3",
  storageBucket: "netflixgpt-aead3.appspot.com",
  messagingSenderId: "740325451290",
  appId: "1:740325451290:web:a8cb2abfed389b962593a3",
  measurementId: "G-S73SGJ81TC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
