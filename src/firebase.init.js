// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKwevKgHn3pKVDUjUsO4epVhBwodmQIuI",
  authDomain: "genius-car-service-ca6ab.firebaseapp.com",
  projectId: "genius-car-service-ca6ab",
  storageBucket: "genius-car-service-ca6ab.appspot.com",
  messagingSenderId: "78062488216",
  appId: "1:78062488216:web:288cda3b03c3d3ff9e9eed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;