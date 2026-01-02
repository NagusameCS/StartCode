// Users Page - Browse and search for users
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiStar, FiBookmark, FiAward } from 'react-icons/fi';
import { collection, query, orderBy, limit, getDocs, where, startAt, endAt } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useTeacherStore } from '../store/teacherStore';
import styles from './UsersPage.module.css';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showSaved, setShowSaved] = useState(false);
    const { savedUsers, saveUser, unsaveUser, isUserSaved } = useTeacherStore();

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersRef = collection(db, 'users');
                let q;

                if (searchQuery.trim()) {
                    // Search by username prefix
                    q = query(
                        usersRef,
                        orderBy('username'),
                        startAt(searchQuery.toLowerCase()),
                        endAt(searchQuery.toLowerCase() + '\uf8ff'),
                        limit(50)
                    );
                } else {
                    // Get recent users
                    q = query(usersRef, orderBy('joinDate', 'desc'), limit(50));
                }

                const snapshot = await getDocs(q);
                const userData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchUsers, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Toggle saved user
    const handleToggleSave = (user) => {
        if (isUserSaved(user.uid)) {
            unsaveUser(user.uid);
        } else {
            saveUser(user.uid, {
                displayName: user.displayName,
                username: user.username,
                photoURL: user.photoURL
            });
        }
    };

    // Display users (either all or saved)
    const displayUsers = showSaved ? savedUsers : users;

    return (
        <div className={styles.users}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Users</h1>
                <p>Explore learners in the StartCode community</p>
            </motion.div>

            {/* Search and filters */}
            <motion.div
                className={styles.controls}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className={styles.searchBox}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${!showSaved ? styles.active : ''}`}
                        onClick={() => setShowSaved(false)}
                    >
                        <FiUser /> All Users
                    </button>
                    <button
                        className={`${styles.filterBtn} ${showSaved ? styles.active : ''}`}
                        onClick={() => setShowSaved(true)}
                    >
                        <FiBookmark /> Saved ({savedUsers.length})
                    </button>
                </div>
            </motion.div>

            {/* Users grid */}
            <div className={styles.grid}>
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        // Loading skeletons
                        [...Array(6)].map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                className={styles.skeleton}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        ))
                    ) : displayUsers.length === 0 ? (
                        <motion.div
                            className={styles.empty}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <FiUser className={styles.emptyIcon} />
                            <h3>{showSaved ? 'No saved users' : 'No users found'}</h3>
                            <p>{showSaved ? 'Save users to keep track of them' : 'Try a different search'}</p>
                        </motion.div>
                    ) : (
                        displayUsers.map((user, index) => (
                            <motion.div
                                key={user.uid || user.id}
                                className={styles.userCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                layout
                            >
                                <Link to={`/profile/${user.uid || user.id}`} className={styles.userLink}>
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName} className={styles.avatar} />
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>
                                            {user.displayName?.[0] || user.username?.[0] || '?'}
                                        </div>
                                    )}

                                    <div className={styles.userInfo}>
                                        <h3>{user.displayName || 'Anonymous'}</h3>
                                        <p>@{user.username || 'user'}</p>
                                    </div>
                                </Link>

                                <div className={styles.userStats}>
                                    <div className={styles.stat}>
                                        <FiAward />
                                        <span>{user.certificates?.length || 0}</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <FiStar />
                                        <span>{user.completedLessons?.length || 0}</span>
                                    </div>
                                </div>

                                <button
                                    className={`${styles.saveBtn} ${isUserSaved(user.uid || user.id) ? styles.saved : ''}`}
                                    onClick={() => handleToggleSave({ ...user, uid: user.uid || user.id })}
                                    title={isUserSaved(user.uid || user.id) ? 'Unsave' : 'Save'}
                                >
                                    <FiBookmark />
                                </button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UsersPage;
