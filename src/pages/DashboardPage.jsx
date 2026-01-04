// Dashboard Page - Main landing after login
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiAward, FiTrendingUp, FiClock, FiCheckCircle, FiZap, FiRefreshCw, FiPlay } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { getAllCourses, getCourse, getLessons } from '../data/courses';
import { CHALLENGES, DIFFICULTIES, getChallengesByDifficulty } from '../data/challenges';
import ContributionTracker from '../components/ContributionTracker';
import styles from './DashboardPage.module.css';

// Generate random challenges based on difficulty from challenges data
const generateChallenges = (difficulty, completedChallenges = [], count = 3) => {
    const allChallenges = getChallengesByDifficulty(difficulty);
    
    // Sort: uncompleted first, then shuffle within each group
    const uncompleted = allChallenges.filter(c => !completedChallenges.includes(c.id));
    const completed = allChallenges.filter(c => completedChallenges.includes(c.id));
    
    // Shuffle both arrays
    const shuffleArray = arr => [...arr].sort(() => Math.random() - 0.5);
    const shuffledUncompleted = shuffleArray(uncompleted);
    const shuffledCompleted = shuffleArray(completed);
    
    // Prefer uncompleted challenges
    const combined = [...shuffledUncompleted, ...shuffledCompleted];
    
    return combined.slice(0, count).map((challenge) => ({
        ...challenge,
        isCompleted: completedChallenges.includes(challenge.id)
    }));
};

const DIFFICULTY_COLORS = {
    beginner: '#22c55e',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
    expert: '#8b5cf6'
};

const DIFFICULTY_LABELS = {
    beginner: '🌱 Beginner',
    intermediate: '🌿 Intermediate',
    advanced: '🔥 Advanced',
    expert: '⚡ Expert'
};

const DashboardPage = () => {
    const { userProfile } = useAuthStore();
    const { completedLessons, certificates, courseProgress, completedChallenges, challengeStats } = useProgressStore();

    // Challenge state
    const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
    const [challenges, setChallenges] = useState(() => generateChallenges('beginner', []));

    const courses = getAllCourses();

    // Regenerate challenges when difficulty changes
    const handleRefreshChallenges = () => {
        setChallenges(generateChallenges(selectedDifficulty, completedChallenges));
    };

    // Change difficulty
    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setChallenges(generateChallenges(difficulty, completedChallenges));
    };

    // Count completed courses
    const completedCourses = courses.filter(course => {
        const courseLessons = getLessons(course.id);
        return courseLessons.length > 0 && courseLessons.every(l => completedLessons.includes(l.id));
    }).length;

    const startedCourses = Object.keys(courseProgress).length;

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
            label: 'Courses Completed',
            value: `${completedCourses}/${startedCourses || 0}`,
            icon: FiCheckCircle,
            color: '#10b981'
        },
        {
            label: 'Certificates Earned',
            value: certificates.length,
            icon: FiAward,
            color: '#22c55e'
        },
        {
            label: 'Courses Started',
            value: startedCourses,
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

            {/* Daily Coding Challenges */}
            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
            >
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <FiZap style={{ color: DIFFICULTY_COLORS[selectedDifficulty] }} /> Coding Challenges
                        <span className={styles.completedCount}>
                            {completedChallenges.length}/{CHALLENGES.length} completed
                        </span>
                    </h2>
                    <div className={styles.challengeActions}>
                        <button
                            className={styles.refreshBtn}
                            onClick={handleRefreshChallenges}
                            title="Generate new challenges"
                        >
                            <FiRefreshCw /> Refresh
                        </button>
                        <Link to="/challenges" className={styles.viewAll}>
                            View All <FiArrowRight />
                        </Link>
                    </div>
                </div>

                {/* Difficulty Selector */}
                <div className={styles.difficultyTabs}>
                    {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                        <button
                            key={key}
                            className={`${styles.difficultyTab} ${selectedDifficulty === key ? styles.active : ''}`}
                            onClick={() => handleDifficultyChange(key)}
                            style={{
                                '--tab-color': DIFFICULTY_COLORS[key],
                                borderColor: selectedDifficulty === key ? DIFFICULTY_COLORS[key] : 'transparent'
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Challenges Grid */}
                <div className={styles.challengesGrid}>
                    {challenges.map((challenge, idx) => (
                        <motion.div
                            key={challenge.id}
                            className={`${styles.challengeCard} ${challenge.isCompleted ? styles.completed : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            style={{ '--challenge-color': DIFFICULTY_COLORS[selectedDifficulty] }}
                        >
                            <div className={styles.challengeHeader}>
                                <span className={styles.challengeType}>{challenge.category}</span>
                                {challenge.isCompleted && (
                                    <span className={styles.completedBadge}>
                                        <FiCheckCircle /> Done
                                    </span>
                                )}
                            </div>
                            <h4 className={styles.challengeTitle}>{challenge.title}</h4>
                            <p className={styles.challengeDesc}>{challenge.description}</p>
                            <div className={styles.challengeMeta}>
                                <span className={styles.points}>+{DIFFICULTIES[challenge.difficulty].points} pts</span>
                            </div>

                            <div className={styles.challengeFooter}>
                                <Link
                                    to={`/challenge/${challenge.id}`}
                                    className={styles.tryBtn}
                                >
                                    <FiPlay /> {challenge.isCompleted ? 'Try Again' : 'Start'}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

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
