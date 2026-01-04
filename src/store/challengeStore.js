// User-Submitted Challenges Store
import { create } from 'zustand';
import { db } from '../config/firebase';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
    increment
} from 'firebase/firestore';

// Available constraints for challenges
export const CHALLENGE_CONSTRAINTS = {
    maxLineCount: {
        id: 'maxLineCount',
        label: 'Max Line Count',
        description: 'Limit the number of lines in the solution',
        type: 'number',
        default: null,
        icon: '📏'
    },
    maxCharCount: {
        id: 'maxCharCount',
        label: 'Max Character Count',
        description: 'Limit the total characters (code golf style)',
        type: 'number',
        default: null,
        icon: '✂️'
    },
    noLoops: {
        id: 'noLoops',
        label: 'No Loops',
        description: 'Cannot use for, while, or do-while loops',
        type: 'boolean',
        default: false,
        icon: '🚫'
    },
    noRecursion: {
        id: 'noRecursion',
        label: 'No Recursion',
        description: 'Function cannot call itself',
        type: 'boolean',
        default: false,
        icon: '🔄'
    },
    noBuiltIns: {
        id: 'noBuiltIns',
        label: 'No Built-in Methods',
        description: 'Cannot use array/string methods like map, filter, sort',
        type: 'boolean',
        default: false,
        icon: '🔧'
    },
    singleExpression: {
        id: 'singleExpression',
        label: 'Single Expression',
        description: 'Solution must be a single return expression',
        type: 'boolean',
        default: false,
        icon: '1️⃣'
    },
    timeLimit: {
        id: 'timeLimit',
        label: 'Time Limit (ms)',
        description: 'Maximum execution time in milliseconds',
        type: 'number',
        default: 5000,
        icon: '⏱️'
    },
    noVariables: {
        id: 'noVariables',
        label: 'No Extra Variables',
        description: 'Cannot declare variables (const, let, var)',
        type: 'boolean',
        default: false,
        icon: '📦'
    },
    mustUseRecursion: {
        id: 'mustUseRecursion',
        label: 'Must Use Recursion',
        description: 'Solution must use recursive approach',
        type: 'boolean',
        default: false,
        icon: '🔁'
    },
    complexityLimit: {
        id: 'complexityLimit',
        label: 'Complexity Limit',
        description: 'Maximum Big-O complexity allowed',
        type: 'select',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
        default: null,
        icon: '📊'
    }
};

export const useChallengeStore = create((set, get) => ({
    // User-submitted challenges
    userChallenges: [],
    loading: false,
    error: null,

    // Fetch all user-submitted challenges
    fetchUserChallenges: async () => {
        set({ loading: true, error: null });
        try {
            const q = query(
                collection(db, 'userChallenges'),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(q);
            const challenges = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || new Date()
            }));
            set({ userChallenges: challenges, loading: false });
            return challenges;
        } catch (error) {
            console.error('Error fetching user challenges:', error);
            set({ error: error.message, loading: false });
            return [];
        }
    },

    // Get a single user challenge by ID
    getUserChallenge: async (challengeId) => {
        try {
            const docRef = doc(db, 'userChallenges', challengeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                    createdAt: docSnap.data().createdAt?.toDate?.() || new Date()
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting challenge:', error);
            return null;
        }
    },

    // Submit a new challenge
    submitChallenge: async (challengeData, userId, userName) => {
        set({ loading: true, error: null });
        try {
            const docRef = await addDoc(collection(db, 'userChallenges'), {
                ...challengeData,
                authorId: userId,
                authorName: userName,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                plays: 0,
                completions: 0,
                likes: 0,
                likedBy: [],
                status: 'published', // or 'draft', 'pending_review'
            });

            // Refresh the list
            await get().fetchUserChallenges();
            set({ loading: false });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error submitting challenge:', error);
            set({ error: error.message, loading: false });
            return { success: false, error: error.message };
        }
    },

    // Update a challenge (only by author)
    updateChallenge: async (challengeId, updates) => {
        try {
            const docRef = doc(db, 'userChallenges', challengeId);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
            await get().fetchUserChallenges();
            return { success: true };
        } catch (error) {
            console.error('Error updating challenge:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete a challenge (only by author)
    deleteChallenge: async (challengeId) => {
        try {
            await deleteDoc(doc(db, 'userChallenges', challengeId));
            await get().fetchUserChallenges();
            return { success: true };
        } catch (error) {
            console.error('Error deleting challenge:', error);
            return { success: false, error: error.message };
        }
    },

    // Like/unlike a challenge
    toggleLike: async (challengeId, userId) => {
        try {
            const docRef = doc(db, 'userChallenges', challengeId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) return { success: false };

            const data = docSnap.data();
            const likedBy = data.likedBy || [];
            const hasLiked = likedBy.includes(userId);

            if (hasLiked) {
                // Unlike
                await updateDoc(docRef, {
                    likes: increment(-1),
                    likedBy: likedBy.filter(id => id !== userId)
                });
            } else {
                // Like
                await updateDoc(docRef, {
                    likes: increment(1),
                    likedBy: [...likedBy, userId]
                });
            }

            await get().fetchUserChallenges();
            return { success: true, liked: !hasLiked };
        } catch (error) {
            console.error('Error toggling like:', error);
            return { success: false, error: error.message };
        }
    },

    // Record a play
    recordPlay: async (challengeId) => {
        try {
            const docRef = doc(db, 'userChallenges', challengeId);
            await updateDoc(docRef, {
                plays: increment(1)
            });
        } catch (error) {
            console.error('Error recording play:', error);
        }
    },

    // Record a completion
    recordCompletion: async (challengeId) => {
        try {
            const docRef = doc(db, 'userChallenges', challengeId);
            await updateDoc(docRef, {
                completions: increment(1)
            });
        } catch (error) {
            console.error('Error recording completion:', error);
        }
    },

    // Get challenges by author
    getChallengesByAuthor: async (authorId) => {
        try {
            const q = query(
                collection(db, 'userChallenges'),
                where('authorId', '==', authorId),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching author challenges:', error);
            return [];
        }
    },

    // Clear error
    clearError: () => set({ error: null })
}));
