// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, getStream } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAma2I_opJPY2VT7IhasLuYvFGDn1zYzIA",
  authDomain: "bvm-hrms.firebaseapp.com",
  projectId: "bvm-hrms",
  storageBucket: "bvm-hrms.appspot.com",
  messagingSenderId: "884420554474",
  appId: "1:884420554474:web:251e9e0da4c342b0ce7193",
  measurementId: "G-3RM1F8RVSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);