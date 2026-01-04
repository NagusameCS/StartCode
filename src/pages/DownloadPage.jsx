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
    FiExternalLink,
    FiLoader,
    FiAlertCircle
} from 'react-icons/fi';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import Logo from '../components/Logo';
import styles from './DownloadPage.module.css';

const DownloadPage = () => {
    const [releaseInfo, setReleaseInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadingPlatform, setDownloadingPlatform] = useState(null);

    // Fetch latest release from GitHub
    useEffect(() => {
        const fetchRelease = async () => {
            try {
                const res = await fetch('https://api.github.com/repos/NagusameCS/StartCode/releases/latest');
                if (res.ok) {
                    const data = await res.json();
                    setReleaseInfo(data);
                } else if (res.status === 404) {
                    setError('No releases available yet');
                } else {
                    setError('Could not fetch release info');
                }
            } catch (err) {
                console.warn('Could not fetch release info:', err);
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };
        fetchRelease();
    }, []);

    // Platform-specific file patterns (order matters - first match wins)
    const platformPatterns = {
        windows: [
            { pattern: /\.exe$/i, label: 'Installer (.exe)' },
            { pattern: /\.msi$/i, label: 'MSI Installer' },
            { pattern: /-win.*\.zip$/i, label: 'Portable (.zip)' }
        ],
        mac: [
            { pattern: /\.dmg$/i, label: 'Disk Image (.dmg)' },
            { pattern: /-mac.*\.zip$/i, label: 'ZIP Archive' },
            { pattern: /darwin.*\.zip$/i, label: 'ZIP Archive' }
        ],
        linux: [
            { pattern: /\.AppImage$/i, label: 'AppImage' },
            { pattern: /\.deb$/i, label: 'Debian (.deb)' },
            { pattern: /\.rpm$/i, label: 'RPM Package' },
            { pattern: /-linux.*\.tar\.gz$/i, label: 'Tarball' }
        ]
    };

    // Get all download assets for a platform
    const getPlatformAssets = (platformId) => {
        if (!releaseInfo?.assets) return [];

        const patterns = platformPatterns[platformId] || [];
        const assets = [];

        for (const { pattern, label } of patterns) {
            const asset = releaseInfo.assets.find(a => pattern.test(a.name));
            if (asset) {
                assets.push({
                    name: asset.name,
                    url: asset.browser_download_url,
                    size: (asset.size / (1024 * 1024)).toFixed(1) + ' MB',
                    downloadCount: asset.download_count,
                    label
                });
            }
        }

        return assets;
    };

    // Get primary download for platform (first available)
    const getPrimaryDownload = (platformId) => {
        const assets = getPlatformAssets(platformId);
        return assets[0] || null;
    };

    const platforms = [
        {
            id: 'windows',
            name: 'Windows',
            icon: FaWindows,
            version: 'Windows 10, 11',
            color: '#0078D4'
        },
        {
            id: 'mac',
            name: 'macOS',
            icon: FaApple,
            version: 'macOS 11+',
            color: '#555555'
        },
        {
            id: 'linux',
            name: 'Linux',
            icon: FaLinux,
            version: 'Ubuntu, Fedora, etc.',
            color: '#ffffff'
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

    // Handle download click
    const handleDownload = (url, platformId) => {
        if (!url) return;
        setDownloadingPlatform(platformId);

        // Create a temporary link and click it
        const link = document.createElement('a');
        link.href = url;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset after a delay
        setTimeout(() => setDownloadingPlatform(null), 2000);
    };

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

            {/* Download Section */}
            <motion.div
                className={styles.platformSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2>
                    <FiDownload /> Download
                    {releaseInfo && <span className={styles.versionBadge}>{releaseInfo.tag_name}</span>}
                </h2>

                {loading ? (
                    <div className={styles.loadingState}>
                        <FiLoader className={styles.spinner} />
                        <span>Loading releases...</span>
                    </div>
                ) : error ? (
                    <div className={styles.errorState}>
                        <FiAlertCircle />
                        <span>{error}</span>
                        <a
                            href="https://github.com/NagusameCS/StartCode/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            View on GitHub <FiExternalLink />
                        </a>
                    </div>
                ) : (
                    <div className={styles.downloadGrid}>
                        {platforms.map(platform => {
                            const Icon = platform.icon;
                            const primaryDownload = getPrimaryDownload(platform.id);
                            const allAssets = getPlatformAssets(platform.id);
                            const isDownloading = downloadingPlatform === platform.id;
                            const isAvailable = !!primaryDownload;

                            return (
                                <div
                                    key={platform.id}
                                    className={`${styles.platformCard} ${!isAvailable ? styles.unavailable : ''}`}
                                >
                                    <div className={styles.platformHeader}>
                                        <Icon className={styles.platformIcon} style={{ color: platform.color }} />
                                        <div className={styles.platformInfo}>
                                            <h3>{platform.name}</h3>
                                            <span className={styles.platformVersion}>{platform.version}</span>
                                        </div>
                                    </div>

                                    {isAvailable ? (
                                        <>
                                            <button
                                                className={styles.primaryDownloadBtn}
                                                onClick={() => handleDownload(primaryDownload.url, platform.id)}
                                                disabled={isDownloading}
                                            >
                                                {isDownloading ? (
                                                    <>
                                                        <FiLoader className={styles.spinner} />
                                                        Starting download...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiDownload />
                                                        Download {primaryDownload.label}
                                                    </>
                                                )}
                                            </button>
                                            <div className={styles.downloadMeta}>
                                                <span className={styles.fileSize}>{primaryDownload.size}</span>
                                                <span className={styles.fileName}>{primaryDownload.name}</span>
                                            </div>

                                            {allAssets.length > 1 && (
                                                <div className={styles.altDownloads}>
                                                    <span>Other formats:</span>
                                                    {allAssets.slice(1).map(asset => (
                                                        <a
                                                            key={asset.name}
                                                            href={asset.url}
                                                            className={styles.altDownloadLink}
                                                            download
                                                        >
                                                            {asset.label} ({asset.size})
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className={styles.comingSoon}>
                                            <span>Coming Soon</span>
                                            <p>This platform build is not yet available</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {releaseInfo && (
                    <div className={styles.releaseInfo}>
                        <p>
                            Released {new Date(releaseInfo.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <a
                            href={releaseInfo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.releaseLink}
                        >
                            View release notes <FiExternalLink />
                        </a>
                    </div>
                )}
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

            {/* Installation Instructions */}
            <motion.div
                className={styles.installSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
            >
                <h3><FiAlertCircle /> Installation Instructions</h3>
                <p className={styles.installNote}>
                    Since StartCode is not yet code-signed, your operating system may show security warnings.
                    This is normal for open-source software. Here's how to install:
                </p>
                
                <div className={styles.installInstructions}>
                    <div className={styles.instructionCard}>
                        <div className={styles.instructionHeader}>
                            <FaApple /> macOS
                        </div>
                        <ol className={styles.instructionSteps}>
                            <li>Download the <code>.dmg</code> file</li>
                            <li>Open the <code>.dmg</code> and drag StartCode to Applications</li>
                            <li>When you first open it, you'll see "damaged" or "unidentified developer"</li>
                            <li>Open <strong>Terminal</strong> and run:</li>
                            <li><code>xattr -cr /Applications/StartCode.app</code></li>
                            <li>Now open StartCode normally</li>
                        </ol>
                        <p className={styles.instructionAlt}>
                            Or: Right-click the app → Open → Click "Open" in the dialog
                        </p>
                    </div>

                    <div className={styles.instructionCard}>
                        <div className={styles.instructionHeader}>
                            <FaWindows /> Windows
                        </div>
                        <ol className={styles.instructionSteps}>
                            <li>Download the <code>.exe</code> installer</li>
                            <li>When you see "Windows protected your PC":</li>
                            <li>Click <strong>"More info"</strong></li>
                            <li>Click <strong>"Run anyway"</strong></li>
                            <li>Follow the installation wizard</li>
                        </ol>
                        <p className={styles.instructionAlt}>
                            If the exe doesn't run, try right-clicking → "Run as administrator"
                        </p>
                    </div>

                    <div className={styles.instructionCard}>
                        <div className={styles.instructionHeader}>
                            <FaLinux style={{ color: 'var(--color-text)' }} /> Linux
                        </div>
                        <ol className={styles.instructionSteps}>
                            <li>Download the <code>.AppImage</code> file</li>
                            <li>Make it executable:</li>
                            <li><code>chmod +x StartCode-*.AppImage</code></li>
                            <li>Run: <code>./StartCode-*.AppImage</code></li>
                        </ol>
                        <p className={styles.instructionAlt}>
                            For .deb: <code>sudo dpkg -i startcode_*.deb</code>
                        </p>
                    </div>
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
