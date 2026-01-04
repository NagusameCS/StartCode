// Dashboard Page - Main landing after login
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiAward, FiTrendingUp, FiClock, FiCheckCircle, FiZap, FiRefreshCw, FiPlay, FiCode } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { getAllCourses, getCourse, getLessons } from '../data/courses';
import ContributionTracker from '../components/ContributionTracker';
import styles from './DashboardPage.module.css';

// Challenge templates for procedural generation
const CHALLENGE_TEMPLATES = {
    beginner: [
        {
            type: 'output',
            templates: [
                { title: 'Hello World', desc: 'Display "Hello, World!" to the console', hint: 'display "Hello, World!"' },
                { title: 'Say Your Name', desc: 'Display a greeting with a name', hint: 'display "Hello, {name}!"' },
                { title: 'Simple Math', desc: 'Display the result of {a} plus {b}', hint: 'display {a} plus {b}' },
            ]
        },
        {
            type: 'variables',
            templates: [
                { title: 'Store a Value', desc: 'Create a variable called age and set it to {n}', hint: 'create variable age to {n}' },
                { title: 'Update Variable', desc: 'Create a variable, then change its value', hint: 'create variable x to 5\nset x to 10' },
                { title: 'Constant Value', desc: 'Create a constant called PI with value 3.14', hint: 'create constant PI to 3.14' },
            ]
        }
    ],
    intermediate: [
        {
            type: 'conditionals',
            templates: [
                { title: 'Age Check', desc: 'Check if age is greater than {n} and display appropriate message', hint: 'if age is greater than {n} then...' },
                { title: 'Grade Calculator', desc: 'Given a score, display the letter grade (A/B/C/D/F)', hint: 'Use otherwise if for multiple conditions' },
                { title: 'Even or Odd', desc: 'Check if a number is even or odd using modulo', hint: 'number modulo 2 is equal to 0' },
            ]
        },
        {
            type: 'loops',
            templates: [
                { title: 'Countdown', desc: 'Count down from {n} to 1', hint: 'repeat while count is greater than 0...' },
                { title: 'Sum Numbers', desc: 'Calculate the sum of numbers from 1 to {n}', hint: 'Use a loop and accumulator variable' },
                { title: 'Print Pattern', desc: 'Display {n} stars in a row', hint: 'repeat {n} times' },
            ]
        }
    ],
    advanced: [
        {
            type: 'functions',
            templates: [
                { title: 'Create a Function', desc: 'Define a function that takes a name and returns a greeting', hint: 'define function greet with parameters name...' },
                { title: 'Calculator Function', desc: 'Create a function that adds two numbers and returns the result', hint: 'Use return to give back the value' },
                { title: 'Factorial', desc: 'Write a function to calculate factorial of {n}', hint: 'Use a loop or recursion' },
            ]
        },
        {
            type: 'lists',
            templates: [
                { title: 'List Sum', desc: 'Create a list of numbers and calculate their sum', hint: 'for each item in list...' },
                { title: 'Find Maximum', desc: 'Find the largest number in a list', hint: 'Compare each item to a max variable' },
                { title: 'Filter List', desc: 'Get all numbers greater than {n} from a list', hint: 'Use conditionals inside a loop' },
            ]
        }
    ],
    expert: [
        {
            type: 'algorithms',
            templates: [
                { title: 'FizzBuzz', desc: 'Print 1-{n}, but "Fizz" for 3x, "Buzz" for 5x, "FizzBuzz" for both', hint: 'Use modulo and nested conditionals' },
                { title: 'Palindrome Check', desc: 'Check if a word is the same forwards and backwards', hint: 'Compare characters from start and end' },
                { title: 'Prime Checker', desc: 'Determine if {n} is a prime number', hint: 'Check divisibility up to sqrt(n)' },
            ]
        },
        {
            type: 'complex',
            templates: [
                { title: 'Fibonacci', desc: 'Generate the first {n} Fibonacci numbers', hint: 'Each number is sum of previous two' },
                { title: 'Bubble Sort', desc: 'Sort a list of numbers from smallest to largest', hint: 'Compare adjacent elements repeatedly' },
                { title: 'Binary Search', desc: 'Find a number in a sorted list efficiently', hint: 'Check middle, then search half' },
            ]
        }
    ]
};

// Generate random challenges based on difficulty
const generateChallenges = (difficulty, count = 3) => {
    const templates = CHALLENGE_TEMPLATES[difficulty] || CHALLENGE_TEMPLATES.beginner;
    const challenges = [];
    const usedIndices = new Set();

    // Flatten all templates for this difficulty
    const allTemplates = templates.flatMap(category => 
        category.templates.map(t => ({ ...t, type: category.type }))
    );

    while (challenges.length < count && challenges.length < allTemplates.length) {
        const idx = Math.floor(Math.random() * allTemplates.length);
        if (usedIndices.has(idx)) continue;
        usedIndices.add(idx);

        const template = allTemplates[idx];
        
        // Replace placeholders with random values
        const randomNum = Math.floor(Math.random() * 20) + 5;
        const randomA = Math.floor(Math.random() * 10) + 1;
        const randomB = Math.floor(Math.random() * 10) + 1;
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const processText = (text) => {
            return text
                .replace(/\{n\}/g, randomNum)
                .replace(/\{a\}/g, randomA)
                .replace(/\{b\}/g, randomB)
                .replace(/\{name\}/g, randomName);
        };

        challenges.push({
            id: `${difficulty}-${idx}-${Date.now()}`,
            title: processText(template.title),
            description: processText(template.desc),
            hint: processText(template.hint),
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
    const [expandedChallenge, setExpandedChallenge] = useState(null);

    const courses = getAllCourses();

    // Regenerate challenges when difficulty changes
    const handleRefreshChallenges = () => {
        setChallenges(generateChallenges(selectedDifficulty));
        setExpandedChallenge(null);
    };

    // Change difficulty
    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setChallenges(generateChallenges(difficulty));
        setExpandedChallenge(null);
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
                            className={`${styles.challengeCard} ${expandedChallenge === challenge.id ? styles.expanded : ''}`}
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
                                <button
                                    className={styles.hintBtn}
                                    onClick={() => setExpandedChallenge(
                                        expandedChallenge === challenge.id ? null : challenge.id
                                    )}
                                >
                                    {expandedChallenge === challenge.id ? 'Hide Hint' : 'Show Hint'}
                                </button>
                                <Link 
                                    to="/canvas" 
                                    className={styles.tryBtn}
                                >
                                    <FiPlay /> Try in Canvas
                                </Link>
                            </div>

                            {expandedChallenge === challenge.id && (
                                <motion.div
                                    className={styles.challengeHint}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    <FiCode />
                                    <pre>{challenge.hint}</pre>
                                </motion.div>
                            )}
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
