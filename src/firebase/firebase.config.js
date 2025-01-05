// Import the functions you need from the SDKs you need
import {getApp,getApps, initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBa0idE9zkKl5t9sqhsYveEI8-D4RNmvWE",
  authDomain: "news-f6185.firebaseapp.com",
  projectId: "news-f6185",
  storageBucket: "news-f6185.firebasestorage.app",
  messagingSenderId: "623893073465",
  appId: "1:623893073465:web:04c11b0d5de6efef2047e8",
  measurementId: "G-23B3SKLWXW"
};

// Initialize Firebase
const app= getApps.length>0? getApp(): initializeApp(firebaseConfig);
  const storage=getStorage(app);
const analytics = getAnalytics(app);
export{app,storage}