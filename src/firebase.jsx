import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApKnEOV--be1MDXDUvdo3eQh5MWaog2BM",
  authDomain: "money-app-50ffe.firebaseapp.com",
  projectId: "money-app-50ffe",
  storageBucket: "money-app-50ffe.appspot.com",
  messagingSenderId: "992364540044",
  appId: "1:992364540044:web:e5feee718b28376096cba9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

