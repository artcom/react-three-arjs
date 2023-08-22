// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4gsG-7I4KDrw_wTYC_KzbkuFB6knF3aA",
  authDomain: "gdsc-ar-hunt.firebaseapp.com",
  databaseURL: "https://gdsc-ar-hunt-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gdsc-ar-hunt",
  storageBucket: "gdsc-ar-hunt.appspot.com",
  messagingSenderId: "596515515464",
  appId: "1:596515515464:web:35dbf261da5b150fb9bc7d",
  measurementId: "G-2EVL4289KF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {app, auth, provider, db}