// Authentication store using Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
    auth,
    db,
    googleProvider,
    githubProvider,
    microsoftProvider,
    appleProvider
} from '../config/firebase';

// Get user's IP address
const getIPAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Failed to get IP:', error);
        return null;
    }
};

// Create or update user profile in Firestore
const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { email, displayName, photoURL } = user;
        const createdAt = serverTimestamp();
        const ip = await getIPAddress();

        try {
            await setDoc(userRef, {
                uid: user.uid,
                email,
                displayName: displayName || email.split('@')[0],
                username: email.split('@')[0] + '_' + Math.random().toString(36).substr(2, 5),
                photoURL,
                createdAt,
                joinDate: new Date().toISOString(),
                completedLessons: [],
                certificates: [],
                currentCourses: {},
                organization: null,
                linkedAccountsVisibility: {
                    google: false,
                    github: false,
                    microsoft: false,
                    apple: false
                },
                lastIP: ip,
                rememberMe: false,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user profile:', error);
        }
    }

    return userRef;
};

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            userProfile: null,
            loading: true,
            error: null,
            rememberMe: false,
            lastIP: null,

            setRememberMe: (value) => set({ rememberMe: value }),

            // Sign in with provider
            signInWithProvider: async (providerName) => {
                set({ loading: true, error: null });

                let provider;
                switch (providerName) {
                    case 'google':
                        provider = googleProvider;
                        break;
                    case 'github':
                        provider = githubProvider;
                        break;
                    case 'microsoft':
                        provider = microsoftProvider;
                        break;
                    case 'apple':
                        provider = appleProvider;
                        break;
                    default:
                        set({ error: 'Invalid provider', loading: false });
                        return;
                }

                try {
                    const result = await signInWithPopup(auth, provider);
                    const user = result.user;
                    const ip = await getIPAddress();

                    await createUserProfile(user);

                    // Update last IP
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, { lastIP: ip, rememberMe: get().rememberMe }, { merge: true });

                    // Fetch user profile
                    const userSnap = await getDoc(userRef);

                    set({
                        user,
                        userProfile: userSnap.data(),
                        lastIP: ip,
                        loading: false
                    });

                    // Store IP in localStorage for comparison
                    localStorage.setItem('startcode_last_ip', ip);

                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // Sign out
            signOut: async () => {
                try {
                    await firebaseSignOut(auth);
                    localStorage.removeItem('startcode_last_ip');
                    set({ user: null, userProfile: null, lastIP: null });
                } catch (error) {
                    set({ error: error.message });
                }
            },

            // Check IP and enforce logout if changed
            checkIPSecurity: async () => {
                const { user, rememberMe } = get();
                if (!user) return true;

                // If remember me is enabled, skip IP check
                if (rememberMe) return true;

                const currentIP = await getIPAddress();
                const storedIP = localStorage.getItem('startcode_last_ip');

                if (storedIP && currentIP !== storedIP) {
                    await get().signOut();
                    return false;
                }

                return true;
            },

            // Initialize auth listener
            initializeAuth: () => {
                set({ loading: true });

                return onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const userRef = doc(db, 'users', user.uid);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            set({
                                user,
                                userProfile: userSnap.data(),
                                loading: false
                            });

                            // Check IP security
                            get().checkIPSecurity();
                        } else {
                            set({ user, userProfile: null, loading: false });
                        }
                    } else {
                        set({ user: null, userProfile: null, loading: false });
                    }
                });
            },

            // Update user profile
            updateProfile: async (updates) => {
                const { user } = get();
                if (!user) return;

                try {
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, updates, { merge: true });

                    const userSnap = await getDoc(userRef);
                    set({ userProfile: userSnap.data() });
                } catch (error) {
                    set({ error: error.message });
                }
            }
        }),
        {
            name: 'startcode-auth',
            partialize: (state) => ({
                rememberMe: state.rememberMe,
                lastIP: state.lastIP
            })
        }
    )
);
