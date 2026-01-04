// Firebase configuration for StartCode
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Use environment variables if available, otherwise fall back to hardcoded values
// In production, set these in your hosting environment (Vercel, Netlify, etc.)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBoaDx24qTMWb9snZwkyh0aH_YjHfAw49M",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "startcode.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "startcode",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "startcode.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "585392626036",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:585392626036:web:46ac3a774b4a0730a83421",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0CWSZTSX1T",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://startcode-default-rtdb.firebaseio.com"
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
