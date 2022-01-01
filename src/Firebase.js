import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIgc6KpNQdb_l3aYqr5xmkJHmqcy8-i18",
  authDomain: "newyearnewtoken.firebaseapp.com",
  projectId: "newyearnewtoken",
  storageBucket: "newyearnewtoken.appspot.com",
  messagingSenderId: "822577343832",
  appId: "1:822577343832:web:fa61d51e260ad92876892d",
  measurementId: "G-FTKFM8Q1XY",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
