// Users Page - Browse and search for users
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiStar, FiBookmark, FiAward, FiAlertCircle } from 'react-icons/fi';
import { collection, query, orderBy, limit, getDocs, where, startAt, endAt } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useTeacherStore } from '../store/teacherStore';
import styles from './UsersPage.module.css';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showSaved, setShowSaved] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const { savedUsers, saveUser, unsaveUser, isUserSaved } = useTeacherStore();
    const { user, userProfile } = useAuthStore();

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setFetchError(null);
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
                let userData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Always ensure current user is in the list
                if (user && userProfile) {
                    const currentUserInList = userData.some(u => u.id === user.uid || u.uid === user.uid);
                    if (!currentUserInList) {
                        // Add current user to the beginning
                        userData = [{
                            id: user.uid,
                            uid: user.uid,
                            displayName: userProfile.displayName || user.displayName || 'You',
                            username: userProfile.username || user.email?.split('@')[0] || 'user',
                            photoURL: userProfile.photoURL || user.photoURL,
                            certificates: userProfile.certificates || [],
                            completedLessons: userProfile.completedLessons || [],
                            isCurrentUser: true
                        }, ...userData];
                    } else {
                        // Mark current user in the list
                        userData = userData.map(u => ({
                            ...u,
                            isCurrentUser: u.id === user.uid || u.uid === user.uid
                        }));
                    }
                }

                setUsers(userData);

                // If we only got the current user, might be a permissions issue
                if (userData.length <= 1 && user) {
                    setFetchError('permissions');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setFetchError(error.code === 'permission-denied' ? 'permissions' : 'error');
                // If Firestore fails, at least show the current user
                if (user && userProfile) {
                    setUsers([{
                        id: user.uid,
                        uid: user.uid,
                        displayName: userProfile.displayName || user.displayName || 'You',
                        username: userProfile.username || user.email?.split('@')[0] || 'user',
                        photoURL: userProfile.photoURL || user.photoURL,
                        certificates: userProfile.certificates || [],
                        completedLessons: userProfile.completedLessons || [],
                        isCurrentUser: true
                    }]);
                }
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchUsers, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, user, userProfile]);

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

            {/* Permissions warning */}
            {fetchError === 'permissions' && !showSaved && (
                <motion.div
                    className={styles.permissionsWarning}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <FiAlertCircle />
                    <div>
                        <strong>Limited Access</strong>
                        <p>Firestore security rules need to be updated to see other users. Go to Firebase Console → Firestore → Rules and allow authenticated users to read the users collection.</p>
                    </div>
                </motion.div>
            )}

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
                        displayUsers.map((userData, index) => (
                            <motion.div
                                key={userData.uid || userData.id}
                                className={`${styles.userCard} ${userData.isCurrentUser ? styles.currentUser : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                layout
                            >
                                <Link to={`/profile/${userData.uid || userData.id}`} className={styles.userLink}>
                                    {userData.photoURL ? (
                                        <img src={userData.photoURL} alt={userData.displayName} className={styles.avatar} />
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>
                                            {userData.displayName?.[0] || userData.username?.[0] || '?'}
                                        </div>
                                    )}

                                    <div className={styles.userInfo}>
                                        <h3>
                                            {userData.displayName || 'Anonymous'}
                                            {userData.isCurrentUser && <span className={styles.youBadge}>You</span>}
                                        </h3>
                                        <p>@{userData.username || 'user'}</p>
                                    </div>
                                </Link>

                                <div className={styles.userStats}>
                                    <div className={styles.stat}>
                                        <FiAward />
                                        <span>{userData.certificates?.length || 0}</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <FiStar />
                                        <span>{userData.completedLessons?.length || 0}</span>
                                    </div>
                                </div>

                                {!userData.isCurrentUser && (
                                    <button
                                        className={`${styles.saveBtn} ${isUserSaved(userData.uid || userData.id) ? styles.saved : ''}`}
                                        onClick={() => handleToggleSave({ ...userData, uid: userData.uid || userData.id })}
                                        title={isUserSaved(userData.uid || userData.id) ? 'Unsave' : 'Save'}
                                    >
                                        <FiBookmark />
                                    </button>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UsersPage;
