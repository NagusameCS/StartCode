// Authentication store using Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile,
    linkWithPopup,
    unlink,
    EmailAuthProvider,
    linkWithCredential,
    signInWithCredential,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import {
    auth,
    db,
    googleProvider,
    githubProvider
} from '../config/firebase';

// Get user's IP address
const getIPAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.warn('Failed to get IP:', error);
        return null;
    }
};

// Create or update user profile in Firestore (with graceful error handling)
const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return null;

    try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const { email, displayName, photoURL } = user;
            const ip = await getIPAddress();

            await setDoc(userRef, {
                uid: user.uid,
                email,
                displayName: displayName || email?.split('@')[0] || 'User',
                username: (email?.split('@')[0] || 'user') + '_' + Math.random().toString(36).substr(2, 5),
                photoURL,
                createdAt: serverTimestamp(),
                joinDate: new Date().toISOString(),
                completedLessons: [],
                certificates: [],
                currentCourses: {},
                activityLog: {},
                organization: null,
                linkedAccountsVisibility: {
                    google: false,
                    github: false
                },
                lastIP: ip,
                rememberMe: false,
                ...additionalData
            });
        }
        return userRef;
    } catch (error) {
        console.warn('Firestore permission error (this is OK if rules are not set):', error.message);
        return null;
    }
};

// Helper to get user profile with fallback to auth user data
const getUserProfileSafe = async (user) => {
    if (!user) return null;

    try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data();
        }
    } catch (error) {
        console.warn('Could not fetch profile from Firestore:', error.message);
    }

    // Return fallback profile from auth user
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL,
        joinDate: new Date().toISOString(),
    };
};

// Safe Firestore update
const updateFirestoreSafe = async (userRef, data) => {
    try {
        await setDoc(userRef, data, { merge: true });
    } catch (error) {
        console.warn('Could not update Firestore:', error.message);
    }
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

            // Sign in with OAuth provider (Google or GitHub) - uses popup
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
                    default:
                        set({ error: 'Invalid provider', loading: false });
                        return;
                }

                try {
                    // Use popup for simpler auth flow
                    const result = await signInWithPopup(auth, provider);
                    const user = result.user;
                    const ip = await getIPAddress();

                    await createUserProfile(user);

                    const userRef = doc(db, 'users', user.uid);
                    await updateFirestoreSafe(userRef, { lastIP: ip, rememberMe: get().rememberMe });

                    const userProfile = await getUserProfileSafe(user);

                    set({
                        user,
                        userProfile,
                        lastIP: ip,
                        loading: false
                    });

                    localStorage.setItem('startcode_last_ip', ip);
                    return user;
                } catch (error) {
                    console.error('Sign in error:', error);
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // Sign in with email and password
            signInWithEmail: async (email, password) => {
                set({ loading: true, error: null });

                try {
                    const result = await signInWithEmailAndPassword(auth, email, password);
                    const user = result.user;
                    const ip = await getIPAddress();

                    // Update last IP (may fail if no Firestore permissions)
                    const userRef = doc(db, 'users', user.uid);
                    await updateFirestoreSafe(userRef, { lastIP: ip, rememberMe: get().rememberMe });

                    const userProfile = await getUserProfileSafe(user);

                    set({
                        user,
                        userProfile,
                        lastIP: ip,
                        loading: false
                    });

                    localStorage.setItem('startcode_last_ip', ip);
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // Sign up with email and password
            signUpWithEmail: async (email, password, displayName) => {
                set({ loading: true, error: null });

                try {
                    const result = await createUserWithEmailAndPassword(auth, email, password);
                    const user = result.user;

                    // Update display name
                    if (displayName) {
                        await updateProfile(user, { displayName });
                    }

                    const ip = await getIPAddress();

                    await createUserProfile(user, { displayName });
                    const userProfile = await getUserProfileSafe(user);

                    set({
                        user,
                        userProfile,
                        lastIP: ip,
                        loading: false
                    });

                    localStorage.setItem('startcode_last_ip', ip);
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // Reset password
            resetPassword: async (email) => {
                await sendPasswordResetEmail(auth, email);
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

            // Alias for signOut
            logout: async () => {
                return get().signOut();
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
                        const userProfile = await getUserProfileSafe(user);

                        set({
                            user,
                            userProfile,
                            loading: false
                        });

                        // Check IP security
                        get().checkIPSecurity();
                    } else {
                        set({ user: null, userProfile: null, loading: false });
                    }
                });
            },

            // Update user profile
            updateUserProfile: async (updates) => {
                const { user } = get();
                if (!user) return;

                try {
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, updates, { merge: true });

                    const userProfile = await getUserProfileSafe(user);
                    set({ userProfile });
                } catch (error) {
                    console.warn('Could not update profile:', error.message);
                    set({ error: error.message });
                }
            },

            // Update local profile state (without Firestore)
            updateProfile: (updates) => {
                const { userProfile } = get();
                set({
                    userProfile: {
                        ...userProfile,
                        ...updates
                    }
                });
            },

            // Get linked providers for current user
            getLinkedProviders: () => {
                const { user } = get();
                if (!user) return [];
                return user.providerData.map(p => p.providerId);
            },

            // Link a new provider to the current account (merge accounts)
            linkProvider: async (providerName) => {
                const { user } = get();
                if (!user) throw new Error('Not logged in');

                let provider;
                switch (providerName) {
                    case 'google':
                        provider = googleProvider;
                        break;
                    case 'github':
                        provider = githubProvider;
                        break;
                    default:
                        throw new Error('Invalid provider');
                }

                try {
                    const result = await linkWithPopup(user, provider);

                    // Update Firestore with linked provider info
                    const userRef = doc(db, 'users', user.uid);
                    const linkedProviders = result.user.providerData.map(p => ({
                        providerId: p.providerId,
                        email: p.email,
                        displayName: p.displayName,
                        photoURL: p.photoURL,
                        linkedAt: new Date().toISOString()
                    }));

                    await updateFirestoreSafe(userRef, {
                        linkedProviders,
                        [`${providerName}Linked`]: true,
                        [`${providerName}Email`]: result.user.providerData.find(p =>
                            p.providerId === `${providerName}.com`
                        )?.email
                    });

                    // Refresh user profile
                    const userProfile = await getUserProfileSafe(result.user);
                    set({ user: result.user, userProfile });

                    return { success: true, message: `${providerName} account linked successfully!` };
                } catch (error) {
                    if (error.code === 'auth/credential-already-in-use') {
                        throw new Error(`This ${providerName} account is already linked to another user.`);
                    }
                    if (error.code === 'auth/provider-already-linked') {
                        throw new Error(`A ${providerName} account is already linked.`);
                    }
                    throw error;
                }
            },

            // Check if accounts can be merged (for displaying merge option)
            canMergeAccounts: () => {
                const { user } = get();
                if (!user) return false;
                // Can merge if user has less than 3 providers linked
                return user.providerData.length < 3;
            },

            // Merge progress from another account by signing in and combining data
            mergeAccountProgress: async (providerName) => {
                const { user, userProfile } = get();
                if (!user) throw new Error('Not logged in');

                let provider;
                switch (providerName) {
                    case 'google':
                        provider = googleProvider;
                        break;
                    case 'github':
                        provider = githubProvider;
                        break;
                    default:
                        throw new Error('Invalid provider');
                }

                try {
                    // Try to link the provider (this will merge the accounts)
                    const result = await linkWithPopup(user, provider);

                    // Get the other account's data from Firestore
                    // The linked provider might have had its own account
                    const linkedEmail = result.user.providerData.find(p =>
                        p.providerId === `${providerName}.com`
                    )?.email;

                    // Update current user with linked provider info
                    const userRef = doc(db, 'users', user.uid);
                    const linkedProviders = result.user.providerData.map(p => ({
                        providerId: p.providerId,
                        email: p.email,
                        displayName: p.displayName,
                        photoURL: p.photoURL,
                        linkedAt: new Date().toISOString()
                    }));

                    await updateFirestoreSafe(userRef, {
                        linkedProviders,
                        [`${providerName}Linked`]: true,
                        [`${providerName}Email`]: linkedEmail
                    });

                    // Refresh user profile
                    const updatedProfile = await getUserProfileSafe(result.user);
                    set({ user: result.user, userProfile: updatedProfile });

                    return {
                        success: true,
                        message: `${providerName} account linked successfully! Progress will be shared.`
                    };
                } catch (error) {
                    if (error.code === 'auth/credential-already-in-use') {
                        // This account exists separately - offer to merge progress
                        const credential = GoogleAuthProvider.credentialFromError?.(error) ||
                            GithubAuthProvider.credentialFromError?.(error);

                        throw new Error(
                            `This ${providerName} account already exists. ` +
                            `To merge, sign out and sign in with the ${providerName} account first, ` +
                            `then link your current account from Settings.`
                        );
                    }
                    if (error.code === 'auth/provider-already-linked') {
                        throw new Error(`A ${providerName} account is already linked.`);
                    }
                    throw error;
                }
            },

            // Merge progress data from two accounts (combines completedLessons, certificates, etc.)
            mergeProgressData: async (sourceData, targetUserId) => {
                if (!sourceData || !targetUserId) return;

                try {
                    const targetRef = doc(db, 'users', targetUserId);
                    const targetSnap = await getDoc(targetRef);
                    const targetData = targetSnap.exists() ? targetSnap.data() : {};

                    // Merge completed lessons (union of both)
                    const mergedLessons = [...new Set([
                        ...(targetData.completedLessons || []),
                        ...(sourceData.completedLessons || [])
                    ])];

                    // Merge certificates (union, dedupe by courseId)
                    const existingCertIds = new Set((targetData.certificates || []).map(c => c.courseId));
                    const newCerts = (sourceData.certificates || []).filter(c => !existingCertIds.has(c.courseId));
                    const mergedCerts = [...(targetData.certificates || []), ...newCerts];

                    // Merge activity logs (sum for same days)
                    const mergedActivity = { ...(targetData.activityLog || {}) };
                    for (const [date, count] of Object.entries(sourceData.activityLog || {})) {
                        mergedActivity[date] = (mergedActivity[date] || 0) + count;
                    }

                    // Merge test scores (keep highest)
                    const mergedScores = { ...(targetData.testScores || {}) };
                    for (const [testId, score] of Object.entries(sourceData.testScores || {})) {
                        if (!mergedScores[testId] || score.score > mergedScores[testId].score) {
                            mergedScores[testId] = score;
                        }
                    }

                    // Update target account
                    await setDoc(targetRef, {
                        completedLessons: mergedLessons,
                        certificates: mergedCerts,
                        activityLog: mergedActivity,
                        testScores: mergedScores,
                        lastMerged: new Date().toISOString()
                    }, { merge: true });

                    return {
                        lessonsAdded: mergedLessons.length - (targetData.completedLessons?.length || 0),
                        certsAdded: newCerts.length
                    };
                } catch (error) {
                    console.error('Failed to merge progress:', error);
                    throw error;
                }
            },

            // Update profile picture
            updateProfilePicture: async (photoURL) => {
                const { user } = get();
                if (!user) return;

                try {
                    // Update Firebase Auth profile
                    await updateProfile(user, { photoURL });

                    // Update Firestore
                    const userRef = doc(db, 'users', user.uid);
                    await updateFirestoreSafe(userRef, { photoURL });

                    // Update local state
                    const updatedProfile = await getUserProfileSafe(user);
                    set({ userProfile: updatedProfile });
                } catch (error) {
                    console.error('Failed to update profile picture:', error);
                    throw error;
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
