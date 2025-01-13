// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdQdIpnh5fa0ywmMLJwvPX8b7XnQF8K9g",
  authDomain: "tour-nest-329ae.firebaseapp.com",
  projectId: "tour-nest-329ae",
  storageBucket: "tour-nest-329ae.firebasestorage.app",
  messagingSenderId: "973753994756",
  appId: "1:973753994756:web:4abd82c7d8a5b2eb83af51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the ser
export const auth = getAuth(app);