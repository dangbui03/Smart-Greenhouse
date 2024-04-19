// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIZk3J71TkKPwP3nN6CAp02pPpxZjB_y8",
  authDomain: "smartgreenhouse-985cd.firebaseapp.com",
  projectId: "smartgreenhouse-985cd",
  storageBucket: "smartgreenhouse-985cd.appspot.com",
  messagingSenderId: "419837207176",
  appId: "1:419837207176:web:20d7ab561965c36979753d",
  measurementId: "G-CNN9KVL9KW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
