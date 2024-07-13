// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIK_KEY,
  authDomain: "mern-estate-a156d.firebaseapp.com",
  projectId: "mern-estate-a156d",
  storageBucket: "mern-estate-a156d.appspot.com",
  messagingSenderId: "711212250190",
  appId: "1:711212250190:web:3332d5025ea66407bc3f1f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
