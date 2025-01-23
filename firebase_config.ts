import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHhgnDoR3_2-sDJnAq1lsQEE1JYtMA6xE",
  authDomain: "desafio-03-pb-compass-uol.firebaseapp.com",
  projectId: "desafio-03-pb-compass-uol",
  storageBucket: "desafio-03-pb-compass-uol.firebasestorage.app",
  messagingSenderId: "648132582794",
  appId: "1:648132582794:web:c03b47307a736393fc3c73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
