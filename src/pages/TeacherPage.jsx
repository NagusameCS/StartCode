// Teacher Page - Class management and student monitoring
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiEdit2,
    FiBook,
    FiAward,
    FiClock,
    FiChevronRight,
    FiX,
    FiCheck
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useTeacherStore } from '../store/teacherStore';
import { getCourse } from '../data/courses';
import styles from './TeacherPage.module.css';

const TeacherPage = () => {
    const { user } = useAuthStore();
    const {
        classes,
        activeClassId,
        setActiveClass,
        createClass,
        deleteClass,
        renameClass,
        addStudent,
        removeStudent
    } = useTeacherStore();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentProgress, setStudentProgress] = useState({});
    const [editingClass, setEditingClass] = useState(null);
    const [editName, setEditName] = useState('');

    const activeClass = classes.find(c => c.id === activeClassId);

    // Search for students
    const handleSearchStudents = async () => {
        if (studentSearch.length < 2) return;

        setSearchLoading(true);
        try {
            // Search by username or email
            const usersRef = collection(db, 'users');
            const q = query(
                usersRef,
                where('username', '>=', studentSearch.toLowerCase()),
                where('username', '<=', studentSearch.toLowerCase() + '\uf8ff')
            );

            const snapshot = await getDocs(q);
            const results = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                // Don't include self or already added students
                if (doc.id !== user?.uid && !activeClass?.students?.includes(doc.id)) {
                    results.push({
                        id: doc.id,
                        ...data
                    });
                }
            });

            setSearchResults(results.slice(0, 10));
        } catch (error) {
            console.error('Error searching students:', error);
        } finally {
            setSearchLoading(false);
        }
    };

    // Fetch student progress
    useEffect(() => {
        const fetchStudentProgress = async () => {
            if (!activeClass?.students?.length) return;

            const progress = {};

            for (const studentId of activeClass.students) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', studentId));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        progress[studentId] = {
                            displayName: data.displayName,
                            username: data.username,
                            photoURL: data.photoURL,
                            completedLessons: data.completedLessons?.length || 0,
                            certificates: data.certificates?.length || 0,
                            lastActive: data.lastActive
                        };
                    }
                } catch (error) {
                    console.error('Error fetching student progress:', error);
                }
            }

            setStudentProgress(progress);
        };

        fetchStudentProgress();
    }, [activeClass?.students]);

    // Create new class
    const handleCreateClass = () => {
        if (newClassName.trim()) {
            createClass(newClassName.trim());
            setNewClassName('');
            setShowCreateModal(false);
        }
    };

    // Add student to class
    const handleAddStudent = () => {
        if (selectedStudent && activeClassId) {
            addStudent(activeClassId, selectedStudent.id);
            setSelectedStudent(null);
            setStudentSearch('');
            setSearchResults([]);
            setShowAddStudentModal(false);
        }
    };

    // Start editing class name
    const handleStartEdit = (classItem) => {
        setEditingClass(classItem.id);
        setEditName(classItem.name);
    };

    // Save class name edit
    const handleSaveEdit = () => {
        if (editName.trim() && editingClass) {
            renameClass(editingClass, editName.trim());
            setEditingClass(null);
            setEditName('');
        }
    };

    return (
        <div className={styles.teacher}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Teacher Dashboard</h1>
                <p>Monitor your students' progress</p>
            </motion.div>

            <div className={styles.content}>
                {/* Sidebar - Class List */}
                <motion.aside
                    className={styles.sidebar}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className={styles.sidebarHeader}>
                        <h2>Classes</h2>
                        <button
                            className={styles.addBtn}
                            onClick={() => setShowCreateModal(true)}
                        >
                            <FiPlus />
                        </button>
                    </div>

                    <div className={styles.classList}>
                        {classes.length === 0 ? (
                            <p className={styles.noClasses}>
                                No classes yet. Create one to start monitoring students.
                            </p>
                        ) : (
                            classes.map(classItem => (
                                <div
                                    key={classItem.id}
                                    className={`${styles.classItem} ${activeClassId === classItem.id ? styles.active : ''}`}
                                    onClick={() => setActiveClass(classItem.id)}
                                >
                                    {editingClass === classItem.id ? (
                                        <div className={styles.editRow}>
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className={styles.editInput}
                                                autoFocus
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <button onClick={handleSaveEdit} className={styles.saveBtn}>
                                                <FiCheck />
                                            </button>
                                            <button onClick={() => setEditingClass(null)} className={styles.cancelBtn}>
                                                <FiX />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={styles.classInfo}>
                                                <FiUsers />
                                                <span>{classItem.name}</span>
                                                <span className={styles.studentCount}>
                                                    {classItem.students?.length || 0}
                                                </span>
                                            </div>
                                            <div className={styles.classActions}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStartEdit(classItem);
                                                    }}
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (confirm('Delete this class?')) {
                                                            deleteClass(classItem.id);
                                                        }
                                                    }}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </motion.aside>

                {/* Main Content - Student Progress */}
                <motion.main
                    className={styles.main}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {activeClass ? (
                        <>
                            <div className={styles.mainHeader}>
                                <h2>{activeClass.name}</h2>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowAddStudentModal(true)}
                                >
                                    <FiPlus /> Add Student
                                </button>
                            </div>

                            {activeClass.students?.length === 0 ? (
                                <div className={styles.empty}>
                                    <FiUsers />
                                    <h3>No students yet</h3>
                                    <p>Add students to start monitoring their progress</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowAddStudentModal(true)}
                                    >
                                        <FiPlus /> Add Student
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.studentList}>
                                    {activeClass.students?.map(studentId => {
                                        const student = studentProgress[studentId];
                                        if (!student) return null;

                                        return (
                                            <motion.div
                                                key={studentId}
                                                className={styles.studentCard}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className={styles.studentHeader}>
                                                    {student.photoURL ? (
                                                        <img src={student.photoURL} alt={student.displayName} className={styles.studentAvatar} />
                                                    ) : (
                                                        <div className={styles.studentAvatarPlaceholder}>
                                                            {student.displayName?.[0] || '?'}
                                                        </div>
                                                    )}
                                                    <div className={styles.studentInfo}>
                                                        <h3>{student.displayName || 'Anonymous'}</h3>
                                                        <p>@{student.username || 'user'}</p>
                                                    </div>
                                                    <div className={styles.studentActions}>
                                                        <Link
                                                            to={`/profile/${studentId}`}
                                                            className={styles.viewBtn}
                                                        >
                                                            View <FiChevronRight />
                                                        </Link>
                                                        <button
                                                            className={styles.removeBtn}
                                                            onClick={() => removeStudent(activeClassId, studentId)}
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={styles.studentStats}>
                                                    <div className={styles.stat}>
                                                        <FiBook />
                                                        <span>{student.completedLessons} lessons</span>
                                                    </div>
                                                    <div className={styles.stat}>
                                                        <FiAward />
                                                        <span>{student.certificates} certificates</span>
                                                    </div>
                                                    {student.lastActive && (
                                                        <div className={styles.stat}>
                                                            <FiClock />
                                                            <span>
                                                                Active {new Date(student.lastActive).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.empty}>
                            <FiUsers />
                            <h3>Select a class</h3>
                            <p>Choose a class from the sidebar to view student progress</p>
                        </div>
                    )}
                </motion.main>
            </div>

            {/* Create Class Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Create New Class</h3>
                            <input
                                type="text"
                                placeholder="Class name..."
                                value={newClassName}
                                onChange={(e) => setNewClassName(e.target.value)}
                                autoFocus
                            />
                            <div className={styles.modalActions}>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCreateClass}
                                    disabled={!newClassName.trim()}
                                >
                                    Create
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Student Modal */}
            <AnimatePresence>
                {showAddStudentModal && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAddStudentModal(false)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Add Student</h3>
                            <p className={styles.modalNote}>
                                Search for a student by username. You don't need their permission to add them.
                            </p>

                            <div className={styles.searchRow}>
                                <input
                                    type="text"
                                    placeholder="Search username..."
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchStudents()}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSearchStudents}
                                    disabled={studentSearch.length < 2}
                                >
                                    <FiSearch />
                                </button>
                            </div>

                            {searchLoading && (
                                <div className={styles.searchLoading}>
                                    <div className="spinner" />
                                </div>
                            )}

                            {searchResults.length > 0 && (
                                <div className={styles.searchResults}>
                                    {searchResults.map(result => (
                                        <div
                                            key={result.id}
                                            className={`${styles.searchResult} ${selectedStudent?.id === result.id ? styles.selected : ''}`}
                                            onClick={() => setSelectedStudent(result)}
                                        >
                                            {result.photoURL ? (
                                                <img src={result.photoURL} alt={result.displayName} />
                                            ) : (
                                                <div className={styles.resultPlaceholder}>
                                                    {result.displayName?.[0] || '?'}
                                                </div>
                                            )}
                                            <div className={styles.resultInfo}>
                                                <span>{result.displayName}</span>
                                                <span>@{result.username}</span>
                                            </div>
                                            {selectedStudent?.id === result.id && <FiCheck />}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className={styles.modalActions}>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowAddStudentModal(false);
                                        setSelectedStudent(null);
                                        setStudentSearch('');
                                        setSearchResults([]);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddStudent}
                                    disabled={!selectedStudent}
                                >
                                    Add Student
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeacherPage;
