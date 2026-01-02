// Loading Screen Component
import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.container}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.logo}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <span className={styles.logoIcon}>{'</>'}</span>
                </motion.div>
                <h1 className={styles.title}>StartCode</h1>
                <p className={styles.subtitle}>Loading...</p>
                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingScreen;
