// Firebase configuration for StartCode
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

/**
 * Firebase Configuration
 * 
 * IMPORTANT SECURITY NOTE:
 * Firebase API keys are designed to be public - they only identify your project.
 * Security is enforced through Firebase Security Rules, NOT by hiding the API key.
 * 
 * To secure your Firebase project:
 * 1. Set up Firebase Security Rules in the Firebase Console
 * 2. Add domain restrictions in Google Cloud Console > APIs & Services > Credentials
 * 3. Enable App Check for additional protection
 * 
 * For deployment, set environment variables in your hosting platform:
 * - Vercel: Settings > Environment Variables
 * - Netlify: Site settings > Environment variables
 * - GitHub Pages: Use GitHub Secrets with GitHub Actions
 */

// Check if we're in production and env vars are required
const isProd = import.meta.env.PROD;

// Helper to get env var with fallback for development
const getEnvVar = (key, devFallback) => {
    const value = import.meta.env[key];
    if (value) return value;

    // In production, warn if using fallbacks (they shouldn't be used)
    if (isProd && devFallback) {
        console.warn(`[Firebase] Missing env var: ${key}. Using development fallback.`);
    }

    return devFallback;
};

const firebaseConfig = {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY', "AIzaSyBoaDx24qTMWb9snZwkyh0aH_YjHfAw49M"),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', "startcode.firebaseapp.com"),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', "startcode"),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', "startcode.firebasestorage.app"),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', "585392626036"),
    appId: getEnvVar('VITE_FIREBASE_APP_ID', "1:585392626036:web:46ac3a774b4a0730a83421"),
    measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', "G-0CWSZTSX1T"),
    databaseURL: getEnvVar('VITE_FIREBASE_DATABASE_URL', "https://startcode-default-rtdb.firebaseio.com")
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
