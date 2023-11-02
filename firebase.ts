import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5JwC8YHVkFxugGn7dMXOVpg30RPKBjhc",
  authDomain: "ai-chat-app-9d08c.firebaseapp.com",
  projectId: "ai-chat-app-9d08c",
  storageBucket: "ai-chat-app-9d08c.appspot.com",
  messagingSenderId: "359959798869",
  appId: "1:359959798869:web:4118d80f25159caad620dc",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };
