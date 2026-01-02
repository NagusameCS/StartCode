// Download Page - Electron client download
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiDownload,
    FiMonitor,
    FiSmartphone,
    FiCheck,
    FiGithub,
    FiCloud,
    FiZap,
    FiShield,
    FiRefreshCw
} from 'react-icons/fi';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import styles from './DownloadPage.module.css';

const DownloadPage = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('windows');

    const platforms = [
        {
            id: 'windows',
            name: 'Windows',
            icon: FaWindows,
            version: '10, 11',
            filename: 'StartCode-Setup-1.0.0.exe',
            size: '85 MB'
        },
        {
            id: 'mac',
            name: 'macOS',
            icon: FaApple,
            version: '11+',
            filename: 'StartCode-1.0.0.dmg',
            size: '92 MB'
        },
        {
            id: 'linux',
            name: 'Linux',
            icon: FaLinux,
            version: 'Ubuntu, Fedora, etc.',
            filename: 'StartCode-1.0.0.AppImage',
            size: '88 MB'
        }
    ];

    const features = [
        {
            icon: FiCloud,
            title: 'Cloud Sync',
            description: 'Your progress syncs automatically between web and desktop'
        },
        {
            icon: FiGithub,
            title: 'GitHub Integration',
            description: 'Push your code to GitHub directly from the app'
        },
        {
            icon: FiZap,
            title: 'Offline Mode',
            description: 'Continue learning without an internet connection'
        },
        {
            icon: FiShield,
            title: 'Local Execution',
            description: 'Run Python and JavaScript code natively on your machine'
        },
        {
            icon: FiRefreshCw,
            title: 'Auto Updates',
            description: 'Stay up to date with automatic background updates'
        }
    ];

    const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

    const handleDownload = () => {
        // In production, this would trigger the actual download
        // For now, show a toast that it's coming soon
        alert('Desktop app coming soon! For now, use the web version.');
    };

    return (
        <div className={styles.download}>
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.heroIcon}>
                    <FiMonitor />
                </div>
                <h1>StartCode Desktop</h1>
                <p>
                    Learn to code offline with our native desktop application.
                    Sync your progress across all devices.
                </p>
            </motion.div>

            {/* Platform Selection */}
            <motion.div
                className={styles.platformSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2>Choose your platform</h2>

                <div className={styles.platforms}>
                    {platforms.map(platform => {
                        const Icon = platform.icon;
                        return (
                            <button
                                key={platform.id}
                                className={`${styles.platform} ${selectedPlatform === platform.id ? styles.selected : ''}`}
                                onClick={() => setSelectedPlatform(platform.id)}
                            >
                                <Icon className={styles.platformIcon} />
                                <span className={styles.platformName}>{platform.name}</span>
                                <span className={styles.platformVersion}>{platform.version}</span>
                                {selectedPlatform === platform.id && (
                                    <FiCheck className={styles.checkIcon} />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.downloadBox}>
                    <div className={styles.downloadInfo}>
                        <span className={styles.filename}>{selectedPlatformData?.filename}</span>
                        <span className={styles.filesize}>{selectedPlatformData?.size}</span>
                    </div>
                    <button
                        className={styles.downloadBtn}
                        onClick={handleDownload}
                    >
                        <FiDownload /> Download for {selectedPlatformData?.name}
                    </button>
                </div>

                <p className={styles.note}>
                    Version 1.0.0 • Requires {selectedPlatformData?.version}
                </p>
            </motion.div>

            {/* Features */}
            <motion.div
                className={styles.featuresSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2>Desktop Features</h2>

                <div className={styles.features}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className={styles.feature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div className={styles.featureIcon}>
                                    <Icon />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Mobile Section */}
            <motion.div
                className={styles.mobileSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <FiSmartphone className={styles.mobileIcon} />
                <div className={styles.mobileContent}>
                    <h3>Mobile App Coming Soon</h3>
                    <p>
                        We're working on iOS and Android apps so you can learn on the go.
                        Join the waitlist to be notified when they're ready.
                    </p>
                    <button className="btn btn-secondary">
                        Join Waitlist
                    </button>
                </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
                className={styles.requirements}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h3>System Requirements</h3>
                <div className={styles.requirementsList}>
                    <div className={styles.requirementItem}>
                        <strong>Windows:</strong> Windows 10 or 11, 4GB RAM, 200MB disk space
                    </div>
                    <div className={styles.requirementItem}>
                        <strong>macOS:</strong> macOS 11 (Big Sur) or later, Apple Silicon or Intel
                    </div>
                    <div className={styles.requirementItem}>
                        <strong>Linux:</strong> Ubuntu 18.04+, Fedora 32+, or compatible distributions
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DownloadPage;
