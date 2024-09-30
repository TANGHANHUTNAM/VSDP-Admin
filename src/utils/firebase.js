import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtSKTVh3c6h2ceKMFs7A89RzXwMpVQWtw",
  authDomain: "vsdp-32285.firebaseapp.com",
  projectId: "vsdp-32285",
  storageBucket: "vsdp-32285.appspot.com",
  messagingSenderId: "611392991745",
  appId: "1:611392991745:web:019237666a419844e4c600",
  measurementId: "G-BSZJD3H1NC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
