// Dashboard Page - Main landing after login
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiAward, FiTrendingUp, FiClock, FiCheckCircle, FiZap, FiRefreshCw, FiPlay } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { getAllCourses, getCourse, getLessons } from '../data/courses';
import ContributionTracker from '../components/ContributionTracker';
import styles from './DashboardPage.module.css';

// Challenge templates for procedural generation
// Maps to challenge IDs in ChallengePage
const CHALLENGE_TEMPLATES = {
    beginner: [
        {
            type: 'output',
            templates: [
                { title: 'Hello World', desc: 'Write a function that returns "Hello, World!"', challengeId: 'hello-world' },
                { title: 'Sum Two Numbers', desc: 'Write a function that adds two numbers together', challengeId: 'sum-two-numbers' },
            ]
        },
        {
            type: 'strings',
            templates: [
                { title: 'Hello World', desc: 'Write a function that returns "Hello, World!"', challengeId: 'hello-world' },
            ]
        }
    ],
    intermediate: [
        {
            type: 'conditionals',
            templates: [
                { title: 'FizzBuzz', desc: 'Classic FizzBuzz problem - divisibility logic', challengeId: 'fizzbuzz' },
                { title: 'Palindrome Check', desc: 'Check if a string is the same forwards and backwards', challengeId: 'palindrome' },
            ]
        },
        {
            type: 'loops',
            templates: [
                { title: 'Sum Two Numbers', desc: 'Calculate the sum of two numbers', challengeId: 'sum-two-numbers' },
                { title: 'FizzBuzz', desc: 'Iterate and apply divisibility rules', challengeId: 'fizzbuzz' },
            ]
        }
    ],
    advanced: [
        {
            type: 'algorithms',
            templates: [
                { title: 'Fibonacci', desc: 'Generate Fibonacci numbers efficiently', challengeId: 'fibonacci' },
                { title: 'Palindrome Check', desc: 'Check if a string is a palindrome', challengeId: 'palindrome' },
            ]
        },
        {
            type: 'recursion',
            templates: [
                { title: 'Fibonacci', desc: 'Implement Fibonacci sequence', challengeId: 'fibonacci' },
            ]
        }
    ],
    expert: [
        {
            type: 'algorithms',
            templates: [
                { title: 'FizzBuzz Master', desc: 'Solve FizzBuzz with optimal code', challengeId: 'fizzbuzz' },
                { title: 'Fibonacci Sequence', desc: 'Efficient Fibonacci implementation', challengeId: 'fibonacci' },
            ]
        },
        {
            type: 'optimization',
            templates: [
                { title: 'Palindrome', desc: 'Optimize palindrome detection', challengeId: 'palindrome' },
                { title: 'Fibonacci', desc: 'Optimized Fibonacci with memoization', challengeId: 'fibonacci' },
            ]
        }
    ]
};

// Generate random challenges based on difficulty
const generateChallenges = (difficulty, count = 3) => {
    const templates = CHALLENGE_TEMPLATES[difficulty] || CHALLENGE_TEMPLATES.beginner;
    const challenges = [];
    const usedChallengeIds = new Set();

    // Flatten all templates for this difficulty
    const allTemplates = templates.flatMap(category =>
        category.templates.map(t => ({ ...t, type: category.type }))
    );

    // Shuffle and pick unique challenges
    const shuffled = [...allTemplates].sort(() => Math.random() - 0.5);

    for (const template of shuffled) {
        if (challenges.length >= count) break;
        if (usedChallengeIds.has(template.challengeId)) continue;

        usedChallengeIds.add(template.challengeId);
        challenges.push({
            id: `${difficulty}-${template.challengeId}-${Date.now()}-${challenges.length}`,
            challengeId: template.challengeId,
            title: template.title,
            description: template.desc,
            type: template.type,
            difficulty
        });
    }

    return challenges;
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
    const { completedLessons, certificates, courseProgress } = useProgressStore();

    // Challenge state
    const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
    const [challenges, setChallenges] = useState(() => generateChallenges('beginner'));

    const courses = getAllCourses();

    // Regenerate challenges when difficulty changes
    const handleRefreshChallenges = () => {
        setChallenges(generateChallenges(selectedDifficulty));
    };

    // Change difficulty
    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setChallenges(generateChallenges(difficulty));
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
                    </h2>
                    <button
                        className={styles.refreshBtn}
                        onClick={handleRefreshChallenges}
                        title="Generate new challenges"
                    >
                        <FiRefreshCw /> New Challenges
                    </button>
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
                            className={styles.challengeCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            style={{ '--challenge-color': DIFFICULTY_COLORS[selectedDifficulty] }}
                        >
                            <div className={styles.challengeHeader}>
                                <span className={styles.challengeType}>{challenge.type}</span>
                                <span className={styles.challengeNumber}>#{idx + 1}</span>
                            </div>
                            <h4 className={styles.challengeTitle}>{challenge.title}</h4>
                            <p className={styles.challengeDesc}>{challenge.description}</p>

                            <div className={styles.challengeActions}>
                                <Link
                                    to={`/challenge/${challenge.challengeId}`}
                                    className={styles.tryBtn}
                                >
                                    <FiPlay /> Start Challenge
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
