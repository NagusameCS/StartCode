// Progress store for tracking lesson progress
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from './authStore';

export const useProgressStore = create(
    persist(
        (set, get) => ({
            // Local code storage for each lesson
            lessonCode: {},

            // Code history for review (stores up to 10 submissions per lesson)
            codeHistory: {},

            // Completion status
            completedLessons: [],

            // Current progress in each course
            courseProgress: {},

            // Test scores
            testScores: {},

            // Certificates earned
            certificates: [],

            // Activity log for contribution tracker
            activityLog: {},

            // Completed challenges
            completedChallenges: [],

            // Challenge statistics
            challengeStats: {
                totalAttempts: 0,
                totalCompleted: 0,
                bestTimes: {}, // { challengeId: timeInSeconds }
                completedByCategory: {}, // { category: count }
                completedByDifficulty: {} // { difficulty: count }
            },

            // Expert mode - skip prerequisite blocking
            expertMode: false,

            // Experiments - feature flags for experimental features
            experiments: {
                canvas: false,
                betaFeatures: false
            },

            // Toggle experiment
            toggleExperiment: (experimentName) => {
                set((state) => ({
                    experiments: {
                        ...state.experiments,
                        [experimentName]: !state.experiments[experimentName]
                    }
                }));
            },

            // Toggle expert mode
            toggleExpertMode: () => {
                set((state) => ({ expertMode: !state.expertMode }));
            },

            // Complete a challenge
            completeChallenge: async (challengeId, category, difficulty, timeInSeconds) => {
                const { completedChallenges, challengeStats, activityLog } = get();
                const today = new Date().toISOString().split('T')[0];

                // Check if already completed
                const alreadyCompleted = completedChallenges.includes(challengeId);

                // Update best time if better
                const currentBest = challengeStats.bestTimes[challengeId];
                const newBestTime = (!currentBest || timeInSeconds < currentBest) ? timeInSeconds : currentBest;

                const newCompletedChallenges = alreadyCompleted
                    ? completedChallenges
                    : [...completedChallenges, challengeId];

                const newStats = {
                    totalAttempts: challengeStats.totalAttempts + 1,
                    totalCompleted: alreadyCompleted ? challengeStats.totalCompleted : challengeStats.totalCompleted + 1,
                    bestTimes: {
                        ...challengeStats.bestTimes,
                        [challengeId]: newBestTime
                    },
                    completedByCategory: {
                        ...challengeStats.completedByCategory,
                        [category]: (challengeStats.completedByCategory[category] || 0) + (alreadyCompleted ? 0 : 1)
                    },
                    completedByDifficulty: {
                        ...challengeStats.completedByDifficulty,
                        [difficulty]: (challengeStats.completedByDifficulty[difficulty] || 0) + (alreadyCompleted ? 0 : 1)
                    }
                };

                // Update activity log
                const todayCount = (activityLog[today] || 0) + (alreadyCompleted ? 0 : 1);

                set({
                    completedChallenges: newCompletedChallenges,
                    challengeStats: newStats,
                    activityLog: {
                        ...activityLog,
                        [today]: todayCount
                    }
                });

                // Sync to Firebase
                const authState = useAuthStore.getState();
                if (authState.user) {
                    try {
                        const userRef = doc(db, 'users', authState.user.uid);
                        await setDoc(userRef, {
                            completedChallenges: newCompletedChallenges,
                            challengeStats: newStats,
                            activityLog: {
                                ...activityLog,
                                [today]: todayCount
                            }
                        }, { merge: true });
                    } catch (error) {
                        console.error('Failed to sync challenge progress:', error);
                    }
                }

                return !alreadyCompleted; // Returns true if this was a new completion
            },

            // Check if challenge is completed
            isChallengeCompleted: (challengeId) => {
                return get().completedChallenges.includes(challengeId);
            },

            // Get challenge best time
            getChallengeBestTime: (challengeId) => {
                return get().challengeStats.bestTimes[challengeId] || null;
            },

            // Save code for a specific lesson
            saveCode: (lessonId, code) => {
                set((state) => ({
                    lessonCode: {
                        ...state.lessonCode,
                        [lessonId]: code
                    }
                }));
            },

            // Save code submission to history
            saveCodeToHistory: (lessonId, code, result) => {
                const timestamp = new Date().toISOString();
                const submission = { code, result, timestamp };

                set((state) => {
                    const history = state.codeHistory[lessonId] || [];
                    // Keep only last 10 submissions
                    const newHistory = [submission, ...history].slice(0, 10);
                    return {
                        codeHistory: {
                            ...state.codeHistory,
                            [lessonId]: newHistory
                        }
                    };
                });
            },

            // Get code history for a lesson
            getCodeHistory: (lessonId) => {
                return get().codeHistory[lessonId] || [];
            },

            // Get code for a specific lesson
            getCode: (lessonId) => {
                return get().lessonCode[lessonId] || '';
            },

            // Mark lesson as complete
            completeLesson: async (lessonId, courseId) => {
                const { completedLessons, activityLog } = get();

                if (!completedLessons.includes(lessonId)) {
                    const today = new Date().toISOString().split('T')[0];
                    const newCompleted = [...completedLessons, lessonId];

                    // Update activity log
                    const todayCount = (activityLog[today] || 0) + 1;

                    set((state) => ({
                        completedLessons: newCompleted,
                        activityLog: {
                            ...state.activityLog,
                            [today]: todayCount
                        },
                        courseProgress: {
                            ...state.courseProgress,
                            [courseId]: {
                                ...state.courseProgress[courseId],
                                lastLesson: lessonId,
                                lastUpdated: new Date().toISOString()
                            }
                        }
                    }));

                    // Sync to Firebase
                    const authState = useAuthStore.getState();
                    if (authState.user) {
                        try {
                            const userRef = doc(db, 'users', authState.user.uid);
                            await setDoc(userRef, {
                                completedLessons: newCompleted,
                                activityLog: {
                                    ...activityLog,
                                    [today]: todayCount
                                }
                            }, { merge: true });
                        } catch (error) {
                            console.error('Failed to sync progress:', error);
                        }
                    }
                }
            },

            // Record test score
            recordTestScore: async (testId, score, passed) => {
                set((state) => ({
                    testScores: {
                        ...state.testScores,
                        [testId]: { score, passed, date: new Date().toISOString() }
                    }
                }));

                // Sync to Firebase
                const authState = useAuthStore.getState();
                if (authState.user) {
                    try {
                        const userRef = doc(db, 'users', authState.user.uid);
                        await setDoc(userRef, {
                            testScores: get().testScores
                        }, { merge: true });
                    } catch (error) {
                        console.error('Failed to sync test score:', error);
                    }
                }
            },

            // Award certificate
            awardCertificate: async (courseId, courseName) => {
                const newCertificate = {
                    id: `cert_${courseId}_${Date.now()}`,
                    courseId,
                    courseName,
                    awardedAt: new Date().toISOString()
                };

                set((state) => ({
                    certificates: [...state.certificates, newCertificate]
                }));

                // Sync to Firebase
                const authState = useAuthStore.getState();
                if (authState.user) {
                    try {
                        const userRef = doc(db, 'users', authState.user.uid);
                        await setDoc(userRef, {
                            certificates: get().certificates
                        }, { merge: true });
                    } catch (error) {
                        console.error('Failed to sync certificate:', error);
                    }
                }

                return newCertificate;
            },

            // Check if lesson is completed
            isLessonCompleted: (lessonId) => {
                return get().completedLessons.includes(lessonId);
            },

            // Get course completion percentage
            // Now accepts lessonIds array directly for accurate counting
            getCourseProgress: (courseId, lessonIds) => {
                const { completedLessons } = get();
                // If lessonIds is an array of actual IDs, count those
                if (Array.isArray(lessonIds)) {
                    const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length;
                    return lessonIds.length > 0 ? Math.round((completedCount / lessonIds.length) * 100) : 0;
                }
                // Fallback: treat as total count (legacy behavior)
                const courseLessons = completedLessons.filter(id => id.startsWith(courseId));
                return lessonIds > 0 ? Math.round((courseLessons.length / lessonIds) * 100) : 0;
            },

            // Sync from Firebase (for new login)
            syncFromFirebase: async () => {
                const authState = useAuthStore.getState();
                if (authState.user) {
                    try {
                        const userRef = doc(db, 'users', authState.user.uid);
                        const userSnap = await getDoc(userRef);
                        if (userSnap.exists()) {
                            const data = userSnap.data();
                            set({
                                completedLessons: data.completedLessons || [],
                                testScores: data.testScores || {},
                                certificates: data.certificates || [],
                                activityLog: data.activityLog || {},
                                completedChallenges: data.completedChallenges || [],
                                challengeStats: data.challengeStats || {
                                    totalAttempts: 0,
                                    totalCompleted: 0,
                                    bestTimes: {},
                                    completedByCategory: {},
                                    completedByDifficulty: {}
                                }
                            });
                        }
                    } catch (error) {
                        console.error('Failed to sync from Firebase:', error);
                    }
                }
            },

            // Clear all local progress (for logout)
            clearProgress: () => {
                set({
                    lessonCode: {},
                    completedLessons: [],
                    courseProgress: {},
                    testScores: {},
                    certificates: [],
                    activityLog: {},
                    completedChallenges: [],
                    challengeStats: {
                        totalAttempts: 0,
                        totalCompleted: 0,
                        bestTimes: {},
                        completedByCategory: {},
                        completedByDifficulty: {}
                    }
                });
            }
        }),
        {
            name: 'startcode-progress'
        }
    )
);
