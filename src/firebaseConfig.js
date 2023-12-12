// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6DI_xhytvvbmV8osFa8UR-B48eDdd_rk",
  authDomain: "spillit-ca787.firebaseapp.com",
  projectId: "spillit-ca787",
  storageBucket: "spillit-ca787.appspot.com",
  messagingSenderId: "128582222019",
  appId: "1:128582222019:web:442791278624d51fd9a276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);