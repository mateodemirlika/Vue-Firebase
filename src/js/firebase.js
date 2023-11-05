import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVO6HtBfIPwayEXQMHN3WyNsiN3exGBXg",
  authDomain: "noteballs-62862.firebaseapp.com",
  projectId: "noteballs-62862",
  storageBucket: "noteballs-62862.appspot.com",
  messagingSenderId: "312383572686",
  appId: "1:312383572686:web:8986c7e24df76a2309de9f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
