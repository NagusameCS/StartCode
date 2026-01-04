// Community Challenges Page - Browse user-submitted challenges
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiSearch,
    FiFilter,
    FiHeart,
    FiPlay,
    FiUser,
    FiClock,
    FiPlus,
    FiTrendingUp,
    FiStar,
    FiUsers,
    FiAward,
    FiZap,
    FiDownload
} from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useChallengeStore, CHALLENGE_CONSTRAINTS } from '../store/challengeStore';
import { useTeacherStore } from '../store/teacherStore';
import { CATEGORIES, DIFFICULTIES } from '../data/challenges';
import { importChallengesFromRepo } from '../data/import404Challenges';
import toast from 'react-hot-toast';
import styles from './UserChallengesPage.module.css';

const SORT_OPTIONS = {
    newest: { label: 'Newest', icon: FiClock },
    popular: { label: 'Most Played', icon: FiTrendingUp },
    liked: { label: 'Most Liked', icon: FiHeart },
    completed: { label: 'Most Completed', icon: FiAward }
};

const UserChallengesPage = () => {
    const { user } = useAuthStore();
    const { userChallenges, loading, fetchUserChallenges, toggleLike } = useChallengeStore();
    const { isTeacherMode } = useTeacherStore();

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [importing, setImporting] = useState(false);

    // Load challenges on mount
    useEffect(() => {
        fetchUserChallenges();
    }, [fetchUserChallenges]);

    // Filter and sort challenges
    const filteredChallenges = useMemo(() => {
        let result = [...userChallenges];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query) ||
                c.authorName?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(c => c.category === selectedCategory);
        }

        // Difficulty filter
        if (selectedDifficulty !== 'all') {
            result = result.filter(c => c.difficulty === selectedDifficulty);
        }

        // Sort
        switch (sortBy) {
            case 'popular':
                result.sort((a, b) => (b.plays || 0) - (a.plays || 0));
                break;
            case 'liked':
                result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
            case 'completed':
                result.sort((a, b) => (b.completions || 0) - (a.completions || 0));
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [userChallenges, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

    // Stats
    const stats = useMemo(() => ({
        total: userChallenges.length,
        totalPlays: userChallenges.reduce((sum, c) => sum + (c.plays || 0), 0),
        totalLikes: userChallenges.reduce((sum, c) => sum + (c.likes || 0), 0),
        authors: new Set(userChallenges.map(c => c.authorId)).size
    }), [userChallenges]);

    // Handle like
    const handleLike = async (e, challengeId) => {
        e.preventDefault();
        e.stopPropagation();
        if (user) {
            await toggleLike(challengeId, user.uid);
        }
    };

    // Handle importing challenges from 404 repo (teacher only)
    const handleImportChallenges = async () => {
        if (!isTeacherMode) return;
        
        setImporting(true);
        try {
            const results = await importChallengesFromRepo();
            if (results.success.length > 0) {
                toast.success(`Imported ${results.success.length} challenges!`);
            }
            if (results.skipped.length > 0) {
                toast(`Skipped ${results.skipped.length} (already exist)`, { icon: 'ℹ️' });
            }
            if (results.errors.length > 0) {
                toast.error(`Failed to import ${results.errors.length} challenges`);
            }
            // Refresh the list
            await fetchUserChallenges();
        } catch (error) {
            console.error('Import error:', error);
            toast.error('Failed to import challenges');
        }
        setImporting(false);
    };

    // Format date
    const formatDate = (date) => {
        const d = new Date(date);
        const now = new Date();
        const diffMs = now - d;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return d.toLocaleDateString();
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1><FiUsers /> Community Challenges</h1>
                    <p>Challenges created by the StartCode community</p>
                </div>
                <div className={styles.headerActions}>
                    {isTeacherMode && (
                        <button 
                            className={styles.importBtn}
                            onClick={handleImportChallenges}
                            disabled={importing}
                        >
                            <FiDownload /> {importing ? 'Importing...' : 'Import 404 Repo'}
                        </button>
                    )}
                    <Link to="/challenges/submit" className={styles.createBtn}>
                        <FiPlus /> Create Challenge
                    </Link>
                </div>
            </header>

            {/* Stats */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <FiZap className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.total}</span>
                        <span className={styles.statLabel}>Challenges</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FiPlay className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.totalPlays}</span>
                        <span className={styles.statLabel}>Total Plays</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FiHeart className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.totalLikes}</span>
                        <span className={styles.statLabel}>Total Likes</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FiUser className={styles.statIcon} />
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.authors}</span>
                        <span className={styles.statLabel}>Contributors</span>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.searchBox}>
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search challenges..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {Object.entries(CATEGORIES).map(([key, cat]) => (
                            <option key={key} value={key}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <select
                        value={selectedDifficulty}
                        onChange={e => setSelectedDifficulty(e.target.value)}
                    >
                        <option value="all">All Difficulties</option>
                        {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                            <option key={key} value={key}>
                                {diff.icon} {diff.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        {Object.entries(SORT_OPTIONS).map(([key, opt]) => (
                            <option key={key} value={key}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className={styles.resultsInfo}>
                <span>{filteredChallenges.length} challenges found</span>
            </div>

            {/* Loading */}
            {loading && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <span>Loading challenges...</span>
                </div>
            )}

            {/* Challenges Grid */}
            {!loading && filteredChallenges.length > 0 && (
                <div className={styles.challengesGrid}>
                    {filteredChallenges.map((challenge, idx) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                to={`/challenge/user/${challenge.id}`}
                                className={styles.challengeCard}
                            >
                                <div className={styles.cardHeader}>
                                    <span
                                        className={styles.difficultyBadge}
                                        style={{ backgroundColor: DIFFICULTIES[challenge.difficulty]?.color }}
                                    >
                                        {DIFFICULTIES[challenge.difficulty]?.icon} {DIFFICULTIES[challenge.difficulty]?.name}
                                    </span>
                                    <span className={styles.points}>
                                        +{challenge.points || DIFFICULTIES[challenge.difficulty]?.points || 10} pts
                                    </span>
                                </div>

                                <h3 className={styles.cardTitle}>{challenge.title}</h3>
                                <p className={styles.cardDesc}>{challenge.description}</p>

                                {/* Constraints */}
                                {challenge.constraints && Object.keys(challenge.constraints).length > 0 && (
                                    <div className={styles.constraintTags}>
                                        {Object.entries(challenge.constraints).slice(0, 3).map(([key, value]) => (
                                            <span key={key} className={styles.constraintTag}>
                                                {CHALLENGE_CONSTRAINTS[key]?.icon}{' '}
                                                {typeof value === 'boolean'
                                                    ? CHALLENGE_CONSTRAINTS[key]?.label
                                                    : value
                                                }
                                            </span>
                                        ))}
                                        {Object.keys(challenge.constraints).length > 3 && (
                                            <span className={styles.constraintTag}>
                                                +{Object.keys(challenge.constraints).length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <div className={styles.authorInfo}>
                                        <FiUser />
                                        <span>{challenge.authorName || 'Anonymous'}</span>
                                    </div>
                                    <span className={styles.cardDate}>
                                        {formatDate(challenge.createdAt)}
                                    </span>
                                </div>

                                <div className={styles.cardStats}>
                                    <span className={styles.stat}>
                                        <FiPlay /> {challenge.plays || 0}
                                    </span>
                                    <span className={styles.stat}>
                                        <FiAward /> {challenge.completions || 0}
                                    </span>
                                    <button
                                        className={`${styles.likeBtn} ${challenge.likedBy?.includes(user?.uid) ? styles.liked : ''}`}
                                        onClick={(e) => handleLike(e, challenge.id)}
                                    >
                                        <FiHeart /> {challenge.likes || 0}
                                    </button>
                                </div>

                                <div className={styles.categoryTag}>
                                    {CATEGORIES[challenge.category]?.icon} {CATEGORIES[challenge.category]?.name}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredChallenges.length === 0 && (
                <div className={styles.emptyState}>
                    <FiZap className={styles.emptyIcon} />
                    <h2>No challenges found</h2>
                    {userChallenges.length === 0 ? (
                        <>
                            <p>Be the first to create a community challenge!</p>
                            <Link to="/challenges/submit" className={styles.createBtn}>
                                <FiPlus /> Create Challenge
                            </Link>
                        </>
                    ) : (
                        <p>Try adjusting your filters or search query.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserChallengesPage;
