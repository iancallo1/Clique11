// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1-3Q_j36lbd5K0L6Cmt_Jkzr-mj8JUCA",
  authDomain: "clique-login.firebaseapp.com",
  projectId: "clique-login",
  storageBucket: "clique-login.appspot.com",
  messagingSenderId: "719510005979",
  appId: "1:719510005979:web:deb2dca1c05f07217a44fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);