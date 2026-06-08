import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmkl6WOBxUxyP_dFMi-D--H09b6HJruDc",
  authDomain: "thali-efdac.firebaseapp.com",
  projectId: "thali-efdac",
  storageBucket: "thali-efdac.firebasestorage.app",
  messagingSenderId: "464521959648",
  appId: "1:464521959648:web:2f0c51c91451170c5b9885"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
