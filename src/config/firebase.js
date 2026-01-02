// Firebase configuration for StartCode
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBoaDx24qTMWb9snZwkyh0aH_YjHfAw49M",
  authDomain: "startcode.firebaseapp.com",
  projectId: "startcode",
  storageBucket: "startcode.firebasestorage.app",
  messagingSenderId: "585392626036",
  appId: "1:585392626036:web:46ac3a774b4a0730a83421",
  measurementId: "G-0CWSZTSX1T",
  databaseURL: "https://startcode-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Auth providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Firestore
export const db = getFirestore(app);

// Realtime Database
export const realtimeDb = getDatabase(app);

export { analytics };
export default app;
