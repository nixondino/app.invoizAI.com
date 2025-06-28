// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG4ep_6riwbuSXSJ01MGiwKPHNMyP2nz4",
  authDomain: "invoice-ai-bf090.firebaseapp.com",
  projectId: "invoice-ai-bf090",
  storageBucket: "invoice-ai-bf090.firebasestorage.app",
  messagingSenderId: "626168765962",
  appId: "1:626168765962:web:d4d6881a63aba060a209f3",
  measurementId: "G-V86EB6H9DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);