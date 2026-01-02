// Dashboard Page - Main landing after login
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiAward, FiTrendingUp, FiClock } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { getAllCourses, getCourse } from '../data/courses';
import ContributionTracker from '../components/ContributionTracker';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
    const { userProfile } = useAuthStore();
    const { completedLessons, certificates, courseProgress } = useProgressStore();

    const courses = getAllCourses();

    // Get recently active courses
    const recentCourses = Object.entries(courseProgress)
        .sort((a, b) => new Date(b[1].lastUpdated) - new Date(a[1].lastUpdated))
        .slice(0, 3)
        .map(([courseId]) => getCourse(courseId))
        .filter(Boolean);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Stats
    const stats = [
        {
            label: 'Lessons Completed',
            value: completedLessons.length,
            icon: FiBook,
            color: '#6366f1'
        },
        {
            label: 'Certificates Earned',
            value: certificates.length,
            icon: FiAward,
            color: '#22c55e'
        },
        {
            label: 'Courses Started',
            value: Object.keys(courseProgress).length,
            icon: FiTrendingUp,
            color: '#f59e0b'
        },
        {
            label: 'Days Learning',
            value: userProfile?.joinDate
                ? Math.floor((Date.now() - new Date(userProfile.joinDate)) / (1000 * 60 * 60 * 24))
                : 0,
            icon: FiClock,
            color: '#ec4899'
        }
    ];

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className={styles.greeting}>
                        {getGreeting()}, {userProfile?.displayName?.split(' ')[0] || 'Learner'}! 👋
                    </h1>
                    <p className={styles.subtitle}>Ready to continue your coding journey?</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className={styles.statCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            <stat.icon />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Contribution Tracker */}
            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className={styles.sectionTitle}>Your Activity</h2>
                <ContributionTracker />
            </motion.section>

            {/* Continue Learning */}
            {recentCourses.length > 0 && (
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Continue Learning</h2>
                        <Link to="/courses" className={styles.viewAll}>
                            View all <FiArrowRight />
                        </Link>
                    </div>
                    <div className={styles.courseGrid}>
                        {recentCourses.map(course => (
                            <Link key={course.id} to={`/course/${course.id}`} className={styles.courseCard}>
                                <div className={styles.courseIcon} style={{ backgroundColor: `${course.color}20` }}>
                                    <span>{course.icon}</span>
                                </div>
                                <div className={styles.courseInfo}>
                                    <h3>{course.name}</h3>
                                    <p>{courseProgress[course.id]?.lastLesson ? 'In Progress' : 'Started'}</p>
                                </div>
                                <FiArrowRight className={styles.courseArrow} />
                            </Link>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Start Learning (if no courses) */}
            {recentCourses.length === 0 && (
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🚀</div>
                        <h2>Start Your Coding Journey!</h2>
                        <p>Pick a language and learn from natural language to real code</p>
                        <Link to="/courses" className="btn btn-primary btn-lg">
                            Browse Courses <FiArrowRight />
                        </Link>
                    </div>
                </motion.section>
            )}

            {/* Recommended Courses */}
            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Recommended For You</h2>
                </div>
                <div className={styles.recommendedGrid}>
                    {courses.slice(0, 4).map(course => (
                        <Link key={course.id} to={`/course/${course.id}`} className={styles.recommendedCard}>
                            <div className={styles.recommendedIcon} style={{ backgroundColor: course.color }}>
                                <span>{course.icon}</span>
                            </div>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <div className={styles.recommendedMeta}>
                                <span>{course.lessons?.length || 0} lessons</span>
                                <span>~{course.estimatedHours}h</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default DashboardPage;
