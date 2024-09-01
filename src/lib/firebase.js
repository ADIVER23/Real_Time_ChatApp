// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-nota.firebaseapp.com",
  projectId: "react-chat-nota",
  storageBucket: "react-chat-nota.appspot.com",
  messagingSenderId: "264380030420",
  appId: "1:264380030420:web:69ff84555a02a93ac8ca41",
  measurementId: "G-QSEVF0JTM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()