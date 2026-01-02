// Profile Page - User profile view
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiCalendar,
    FiAward,
    FiBook,
    FiEdit2,
    FiGithub,
    FiMail,
    FiBookmark,
    FiExternalLink
} from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useTeacherStore } from '../store/teacherStore';
import { getCourse } from '../data/courses';
import ContributionTracker from '../components/ContributionTracker';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const { userId } = useParams();
    const { user, userProfile } = useAuthStore();
    const { saveUser, unsaveUser, isUserSaved } = useTeacherStore();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Is this the current user's profile?
    const isOwnProfile = !userId || userId === user?.uid;

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                if (isOwnProfile) {
                    setProfile(userProfile);
                } else {
                    const userRef = doc(db, 'users', userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setProfile(userSnap.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId, isOwnProfile, userProfile]);

    // Toggle save
    const handleToggleSave = () => {
        if (isUserSaved(userId)) {
            unsaveUser(userId);
        } else {
            saveUser(userId, {
                displayName: profile?.displayName,
                username: profile?.username,
                photoURL: profile?.photoURL
            });
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className={styles.notFound}>
                <h2>User not found</h2>
                <Link to="/users" className="btn btn-primary">Browse Users</Link>
            </div>
        );
    }

    const joinDate = profile.joinDate
        ? new Date(profile.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Unknown';

    return (
        <div className={styles.profile}>
            {/* Header */}
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.headerBg} />

                <div className={styles.headerContent}>
                    {profile.photoURL ? (
                        <img src={profile.photoURL} alt={profile.displayName} className={styles.avatar} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {profile.displayName?.[0] || profile.username?.[0] || '?'}
                        </div>
                    )}

                    <div className={styles.headerInfo}>
                        <h1>{profile.displayName || 'Anonymous User'}</h1>
                        <p className={styles.username}>@{profile.username || 'user'}</p>

                        {profile.organization && (
                            <p className={styles.organization}>{profile.organization}</p>
                        )}

                        <div className={styles.joinDate}>
                            <FiCalendar />
                            <span>Joined {joinDate}</span>
                        </div>
                    </div>

                    <div className={styles.headerActions}>
                        {isOwnProfile ? (
                            <Link to="/settings" className="btn btn-secondary">
                                <FiEdit2 /> Edit Profile
                            </Link>
                        ) : (
                            <button
                                className={`btn ${isUserSaved(userId) ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={handleToggleSave}
                            >
                                <FiBookmark /> {isUserSaved(userId) ? 'Saved' : 'Save'}
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className={styles.statCard}>
                    <FiAward className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{profile.certificates?.length || 0}</span>
                        <span className={styles.statLabel}>Certificates</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FiBook className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{profile.completedLessons?.length || 0}</span>
                        <span className={styles.statLabel}>Lessons Completed</span>
                    </div>
                </div>
            </motion.div>

            {/* Activity Tracker */}
            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2>Activity</h2>
                <ContributionTracker activityLog={profile.activityLog || {}} />
            </motion.section>

            {/* Certificates */}
            {profile.certificates?.length > 0 && (
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>Certificates</h2>
                    <div className={styles.certificates}>
                        {profile.certificates.map(cert => {
                            const course = getCourse(cert.courseId);
                            return (
                                <Link
                                    key={cert.id}
                                    to={`/certificate/${cert.id}`}
                                    className={styles.certificate}
                                >
                                    <div
                                        className={styles.certIcon}
                                        style={{ backgroundColor: course?.color || '#6366f1' }}
                                    >
                                        <span className={styles.certEmoji}>{course?.icon || '🏆'}</span>
                                    </div>
                                    <div className={styles.certInfo}>
                                        <h3>{cert.courseName}</h3>
                                        <p>Completed {new Date(cert.awardedAt).toLocaleDateString()}</p>
                                    </div>
                                    <FiExternalLink className={styles.certLink} />
                                </Link>
                            );
                        })}
                    </div>
                </motion.section>
            )}

            {/* Linked Accounts (only for own profile) */}
            {isOwnProfile && profile.linkedAccountsVisibility && (
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>Linked Accounts</h2>
                    <div className={styles.linkedAccounts}>
                        {Object.entries(profile.linkedAccountsVisibility).map(([provider, isVisible]) => {
                            const Icon = {
                                google: FaGoogle,
                                github: FiGithub,
                                microsoft: FaMicrosoft,
                                apple: FaApple
                            }[provider] || FiMail;

                            return (
                                <div key={provider} className={styles.linkedAccount}>
                                    <Icon className={styles.providerIcon} />
                                    <span className={styles.providerName}>{provider}</span>
                                    <span className={`${styles.visibility} ${isVisible ? styles.public : styles.private}`}>
                                        {isVisible ? 'Public' : 'Private'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>
            )}
        </div>
    );
};

export default ProfilePage;
