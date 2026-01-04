// 404 Not Found Page
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiSearch, FiBookOpen, FiZap } from 'react-icons/fi';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.page}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.errorCode}>
                    <span className={styles.digit}>4</span>
                    <span className={styles.zero}>
                        <FiSearch />
                    </span>
                    <span className={styles.digit}>4</span>
                </div>

                <h1>Page Not Found</h1>
                <p>
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className={styles.actions}>
                    <Link to="/dashboard" className={styles.primaryBtn}>
                        <FiHome /> Go to Dashboard
                    </Link>
                    <button onClick={() => window.history.back()} className={styles.secondaryBtn}>
                        <FiArrowLeft /> Go Back
                    </button>
                </div>

                <div className={styles.suggestions}>
                    <h2>Maybe you were looking for:</h2>
                    <div className={styles.links}>
                        <Link to="/courses" className={styles.suggestionLink}>
                            <FiBookOpen />
                            <span>Browse Courses</span>
                        </Link>
                        <Link to="/challenges" className={styles.suggestionLink}>
                            <FiZap />
                            <span>Try Challenges</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
