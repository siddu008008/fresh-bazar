import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4zy39H8opy6ex64d18w6gq2ZXms5lL_w",
  authDomain: "store-ease-cf1ea.firebaseapp.com",
  projectId: "store-ease-cf1ea",
  storageBucket: "store-ease-cf1ea.firebasestorage.app",
  messagingSenderId: "31532548557",
  appId: "1:31532548557:web:ede4b3ef6b4443271dc484"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
