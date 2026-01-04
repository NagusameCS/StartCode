// Challenges Browser Page
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiSearch,
    FiFilter,
    FiCheck,
    FiLock,
    FiAward,
    FiTrendingUp,
    FiClock,
    FiZap,
    FiTarget,
    FiUsers,
    FiPlus
} from 'react-icons/fi';
import { useProgressStore } from '../store/progressStore';
import {
    getAllChallenges,
    CATEGORIES,
    DIFFICULTIES,
    getChallengeCountByCategory,
    getChallengeCountByDifficulty
} from '../data/challenges';
import styles from './ChallengesPage.module.css';

const ChallengesPage = () => {
    const { completedChallenges, challengeStats, isChallengeCompleted, getChallengeBestTime } = useProgressStore();

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showCompleted, setShowCompleted] = useState(true);

    const allChallenges = getAllChallenges();
    const categoryCount = getChallengeCountByCategory();
    const difficultyCount = getChallengeCountByDifficulty();

    // Filter challenges
    const filteredChallenges = useMemo(() => {
        return allChallenges.filter(challenge => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!challenge.title.toLowerCase().includes(query) &&
                    !challenge.description.toLowerCase().includes(query)) {
                    return false;
                }
            }

            // Category filter
            if (selectedCategory !== 'all' && challenge.category !== selectedCategory) {
                return false;
            }

            // Difficulty filter
            if (selectedDifficulty !== 'all' && challenge.difficulty !== selectedDifficulty) {
                return false;
            }

            // Completed filter
            if (!showCompleted && isChallengeCompleted(challenge.id)) {
                return false;
            }

            return true;
        });
    }, [allChallenges, searchQuery, selectedCategory, selectedDifficulty, showCompleted, isChallengeCompleted]);

    // Calculate stats
    const totalPoints = Object.entries(challengeStats.completedByDifficulty || {}).reduce((sum, [diff, count]) => {
        return sum + (DIFFICULTIES[diff]?.points || 0) * count;
    }, 0);

    const formatTime = (seconds) => {
        if (!seconds) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.challengesPage}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1><FiTarget /> Coding Challenges</h1>
                    <p>Practice your skills with {allChallenges.length} challenges across {Object.keys(CATEGORIES).length} categories</p>
                </div>

                {/* Action Buttons */}
                <div className={styles.headerActions}>
                    <Link to="/challenges/community" className={styles.communityBtn}>
                        <FiUsers /> Community Challenges
                    </Link>
                    <Link to="/challenges/submit" className={styles.createBtn}>
                        <FiPlus /> Create Challenge
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <FiCheck className={styles.statIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{completedChallenges.length}</span>
                            <span className={styles.statLabel}>Completed</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FiTarget className={styles.statIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{allChallenges.length - completedChallenges.length}</span>
                            <span className={styles.statLabel}>Remaining</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FiAward className={styles.statIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{totalPoints}</span>
                            <span className={styles.statLabel}>Total Points</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FiTrendingUp className={styles.statIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{challengeStats.totalAttempts || 0}</span>
                            <span className={styles.statLabel}>Attempts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search challenges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label><FiFilter /> Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories ({allChallenges.length})</option>
                        {Object.entries(CATEGORIES).map(([key, cat]) => (
                            <option key={key} value={key}>
                                {cat.icon} {cat.name} ({categoryCount[key] || 0})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Difficulty:</label>
                    <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                        <option value="all">All Levels</option>
                        {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                            <option key={key} value={key}>
                                {diff.icon} {diff.name} ({difficultyCount[key] || 0})
                            </option>
                        ))}
                    </select>
                </div>

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                    />
                    Show completed
                </label>
            </div>

            {/* Progress by Difficulty */}
            <div className={styles.progressSection}>
                <h2>Progress by Difficulty</h2>
                <div className={styles.progressBars}>
                    {Object.entries(DIFFICULTIES).map(([key, diff]) => {
                        const total = difficultyCount[key] || 0;
                        const completed = challengeStats.completedByDifficulty?.[key] || 0;
                        const percentage = total > 0 ? (completed / total) * 100 : 0;

                        return (
                            <div key={key} className={styles.progressItem}>
                                <div className={styles.progressLabel}>
                                    <span>{diff.icon} {diff.name}</span>
                                    <span>{completed}/{total}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${percentage}%`, background: diff.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Category Quick Links */}
            <div className={styles.categorySection}>
                <h2>Categories</h2>
                <div className={styles.categoryGrid}>
                    {Object.entries(CATEGORIES).map(([key, cat]) => {
                        const total = categoryCount[key] || 0;
                        const completed = challengeStats.completedByCategory?.[key] || 0;

                        return (
                            <button
                                key={key}
                                className={`${styles.categoryCard} ${selectedCategory === key ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                            >
                                <span className={styles.categoryIcon}>{cat.icon}</span>
                                <span className={styles.categoryName}>{cat.name}</span>
                                <span className={styles.categoryProgress}>{completed}/{total}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Challenges Grid */}
            <div className={styles.challengesSection}>
                <div className={styles.sectionHeader}>
                    <h2>Challenges ({filteredChallenges.length})</h2>
                </div>

                {filteredChallenges.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FiSearch />
                        <p>No challenges match your filters</p>
                        <button onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedDifficulty('all');
                            setShowCompleted(true);
                        }}>Clear Filters</button>
                    </div>
                ) : (
                    <div className={styles.challengesGrid}>
                        {filteredChallenges.map((challenge, index) => {
                            const isComplete = isChallengeCompleted(challenge.id);
                            const bestTime = getChallengeBestTime(challenge.id);
                            const diffConfig = DIFFICULTIES[challenge.difficulty];
                            const catConfig = CATEGORIES[challenge.category];

                            return (
                                <motion.div
                                    key={challenge.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                >
                                    <Link
                                        to={`/challenge/${challenge.id}`}
                                        className={`${styles.challengeCard} ${isComplete ? styles.completed : ''}`}
                                    >
                                        <div className={styles.cardHeader}>
                                            <span
                                                className={styles.difficultyBadge}
                                                style={{ background: diffConfig.color }}
                                            >
                                                {diffConfig.icon} {diffConfig.name}
                                            </span>
                                            {isComplete && (
                                                <span className={styles.completedBadge}>
                                                    <FiCheck /> Done
                                                </span>
                                            )}
                                        </div>

                                        <h3 className={styles.cardTitle}>{challenge.title}</h3>
                                        <p className={styles.cardDesc}>{challenge.description}</p>

                                        <div className={styles.cardFooter}>
                                            <span className={styles.categoryTag}>
                                                {catConfig.icon} {catConfig.name}
                                            </span>
                                            <div className={styles.cardMeta}>
                                                {bestTime && (
                                                    <span className={styles.bestTime}>
                                                        <FiClock /> {formatTime(bestTime)}
                                                    </span>
                                                )}
                                                <span className={styles.points}>
                                                    <FiAward /> {diffConfig.points} pts
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengesPage;
