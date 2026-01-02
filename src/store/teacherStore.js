// Teacher mode store for class management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useTeacherStore = create(
    persist(
        (set, get) => ({
            isTeacherMode: false,
            classes: [],
            savedUsers: [],

            // Toggle teacher mode
            toggleTeacherMode: () => {
                set((state) => ({ isTeacherMode: !state.isTeacherMode }));
            },

            // Create a new class
            createClass: (className) => {
                const newClass = {
                    id: `class_${Date.now()}`,
                    name: className,
                    students: [],
                    createdAt: new Date().toISOString()
                };
                set((state) => ({
                    classes: [...state.classes, newClass]
                }));
                return newClass;
            },

            // Delete a class
            deleteClass: (classId) => {
                set((state) => ({
                    classes: state.classes.filter(c => c.id !== classId)
                }));
            },

            // Rename a class
            renameClass: (classId, newName) => {
                set((state) => ({
                    classes: state.classes.map(c =>
                        c.id === classId ? { ...c, name: newName } : c
                    )
                }));
            },

            // Add student to class by username or email
            addStudentToClass: async (classId, identifier) => {
                try {
                    // Search for user by username or email
                    const usersRef = collection(db, 'users');
                    let q = query(usersRef, where('username', '==', identifier));
                    let snapshot = await getDocs(q);

                    if (snapshot.empty) {
                        q = query(usersRef, where('email', '==', identifier));
                        snapshot = await getDocs(q);
                    }

                    if (snapshot.empty) {
                        throw new Error('User not found');
                    }

                    const userData = snapshot.docs[0].data();
                    const studentId = userData.uid;

                    set((state) => ({
                        classes: state.classes.map(c => {
                            if (c.id === classId && !c.students.includes(studentId)) {
                                return { ...c, students: [...c.students, studentId] };
                            }
                            return c;
                        })
                    }));

                    return userData;
                } catch (error) {
                    throw error;
                }
            },

            // Remove student from class
            removeStudentFromClass: (classId, studentId) => {
                set((state) => ({
                    classes: state.classes.map(c => {
                        if (c.id === classId) {
                            return { ...c, students: c.students.filter(s => s !== studentId) };
                        }
                        return c;
                    })
                }));
            },

            // Get all students' progress for a class
            getClassProgress: async (classId) => {
                const classData = get().classes.find(c => c.id === classId);
                if (!classData) return [];

                const studentsProgress = [];

                for (const studentId of classData.students) {
                    try {
                        const userRef = doc(db, 'users', studentId);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            const userData = userSnap.data();
                            studentsProgress.push({
                                uid: studentId,
                                displayName: userData.displayName,
                                username: userData.username,
                                photoURL: userData.photoURL,
                                completedLessons: userData.completedLessons || [],
                                certificates: userData.certificates || [],
                                activityLog: userData.activityLog || {},
                                joinDate: userData.joinDate
                            });
                        }
                    } catch (error) {
                        console.error(`Failed to get progress for ${studentId}:`, error);
                    }
                }

                return studentsProgress;
            },

            // Save a user to followed list
            saveUser: (userId, userData) => {
                set((state) => {
                    if (!state.savedUsers.find(u => u.uid === userId)) {
                        return {
                            savedUsers: [...state.savedUsers, { uid: userId, ...userData }]
                        };
                    }
                    return state;
                });
            },

            // Remove user from saved list
            unsaveUser: (userId) => {
                set((state) => ({
                    savedUsers: state.savedUsers.filter(u => u.uid !== userId)
                }));
            },

            // Check if user is saved
            isUserSaved: (userId) => {
                return get().savedUsers.some(u => u.uid === userId);
            }
        }),
        {
            name: 'startcode-teacher'
        }
    )
);
