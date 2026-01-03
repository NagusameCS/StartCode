// Download Page - Electron client download
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiDownload,
    FiMonitor,
    FiCheck,
    FiGithub,
    FiCloud,
    FiZap,
    FiShield,
    FiRefreshCw,
    FiExternalLink
} from 'react-icons/fi';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import Logo from '../components/Logo';
import styles from './DownloadPage.module.css';

const DownloadPage = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('windows');
    const [releaseInfo, setReleaseInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch latest release from GitHub
    useEffect(() => {
        const fetchRelease = async () => {
            try {
                const res = await fetch('https://api.github.com/repos/NagusameCS/StartCode/releases/latest');
                if (res.ok) {
                    const data = await res.json();
                    setReleaseInfo(data);
                }
            } catch (err) {
                console.warn('Could not fetch release info:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRelease();
    }, []);

    // Get download URL for platform
    const getDownloadUrl = (platformId) => {
        if (!releaseInfo?.assets) return null;
        const patterns = {
            windows: /\.exe$/i,
            mac: /\.dmg$/i,
            linux: /\.AppImage$/i
        };
        const asset = releaseInfo.assets.find(a => patterns[platformId]?.test(a.name));
        return asset?.browser_download_url || null;
    };

    // Get file size for platform
    const getFileSize = (platformId) => {
        if (!releaseInfo?.assets) return 'Coming soon';
        const patterns = {
            windows: /\.exe$/i,
            mac: /\.dmg$/i,
            linux: /\.AppImage$/i
        };
        const asset = releaseInfo.assets.find(a => patterns[platformId]?.test(a.name));
        if (!asset) return 'Coming soon';
        const mb = (asset.size / (1024 * 1024)).toFixed(1);
        return `${mb} MB`;
    };

    const platforms = [
        {
            id: 'windows',
            name: 'Windows',
            icon: FaWindows,
            version: '10, 11',
        },
        {
            id: 'mac',
            name: 'macOS',
            icon: FaApple,
            version: '11+',
        },
        {
            id: 'linux',
            name: 'Linux',
            icon: FaLinux,
            version: 'Ubuntu, Fedora, etc.',
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
    const downloadUrl = getDownloadUrl(selectedPlatform);
    const fileSize = getFileSize(selectedPlatform);

    const handleDownload = (platformId) => {
        const url = getDownloadUrl(platformId || selectedPlatform);
        if (url) {
            window.location.href = url;
        } else {
            toast?.error?.('Download not available yet') || alert('Download not available yet');
        }
    };

    // Get all available downloads
    const getAvailableDownloads = () => {
        if (!releaseInfo?.assets) return [];
        return platforms.map(p => ({
            ...p,
            url: getDownloadUrl(p.id),
            size: getFileSize(p.id),
            available: !!getDownloadUrl(p.id)
        }));
    };

    const availableDownloads = getAvailableDownloads();

    return (
        <div className={styles.download}>
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.heroIcon}>
                    <Logo size={80} />
                </div>
                <h1>StartCode Desktop</h1>
                <p>
                    Learn to code offline with our native desktop application.
                    Sync your progress across all devices.
                </p>
            </motion.div>

            {/* Direct Download Buttons */}
            <motion.div
                className={styles.platformSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2>Download for your platform</h2>

                <div className={styles.downloadButtons}>
                    {platforms.map(platform => {
                        const Icon = platform.icon;
                        const url = getDownloadUrl(platform.id);
                        const size = getFileSize(platform.id);
                        const isAvailable = !!url;

                        return (
                            <button
                                key={platform.id}
                                className={`${styles.downloadButton} ${!isAvailable ? styles.unavailable : ''}`}
                                onClick={() => handleDownload(platform.id)}
                                disabled={loading || !isAvailable}
                            >
                                <Icon className={styles.platformBtnIcon} />
                                <div className={styles.downloadBtnInfo}>
                                    <span className={styles.downloadBtnName}>
                                        {isAvailable ? `Download for ${platform.name}` : `${platform.name} (Coming Soon)`}
                                    </span>
                                    <span className={styles.downloadBtnSize}>
                                        {loading ? 'Loading...' : size}
                                    </span>
                                </div>
                                {isAvailable && <FiDownload className={styles.downloadIcon} />}
                            </button>
                        );
                    })}
                </div>

                <p className={styles.note}>
                    {releaseInfo ? `Version ${releaseInfo.tag_name}` : 'Latest version'} • 
                    <a 
                        href="https://github.com/NagusameCS/StartCode/releases" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.releasesLink}
                    >
                        View all releases
                    </a>
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

            {/* GitHub Link */}
            <motion.div
                className={styles.githubSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <FiGithub className={styles.githubIcon} />
                <div className={styles.githubContent}>
                    <h3>Open Source</h3>
                    <p>
                        StartCode is open source! Contribute to the project, report bugs, or explore the code.
                    </p>
                    <a
                        href="https://github.com/NagusameCS/StartCode"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        <FiGithub /> View on GitHub
                    </a>
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
