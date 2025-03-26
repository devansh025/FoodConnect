import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


// Your web app's Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyDxeqzvV-TsIMlNcxYq1xuDj9psP0TjFcM",
  authDomain: "foodconnect-fcdd2.firebaseapp.com",
  databaseURL: "https://foodconnect-fcdd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodconnect-fcdd2",
  storageBucket: "foodconnect-fcdd2.firebasestorage.app",
  messagingSenderId: "427672513959",
  appId: "1:427672513959:web:0cea948866c482012d9a82",
  measurementId: "G-GCDZX8RZCF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize firebase authentication
const auth = getAuth(app);

// 🔹 Initialize Firestore Database
const db = getFirestore(app);

// Authentication functions
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export {db, auth };