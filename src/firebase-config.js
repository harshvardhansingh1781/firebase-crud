import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaIEVH2ut1UyERJfEax9uSVCpJ9NI0fjA",
  authDomain: "fir-crud-b2abc.firebaseapp.com",
  projectId: "fir-crud-b2abc",
  storageBucket: "fir-crud-b2abc.appspot.com",
  messagingSenderId: "820744276567",
  appId: "1:820744276567:web:7a1773e4ac4db73a847112",
  measurementId: "G-LPDGN2Q2P0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
