// Certificate Page - View and download certificates
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiDownload,
    FiShare2,
    FiArrowLeft,
    FiAward,
    FiCalendar,
    FiCheckCircle,
    FiCopy
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { getCourse } from '../data/courses';
import toast from 'react-hot-toast';
import styles from './CertificatePage.module.css';

const CertificatePage = () => {
    const { certId } = useParams();
    const navigate = useNavigate();
    const { user, userProfile } = useAuthStore();
    const certRef = useRef(null);

    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchCertificate = async () => {
            setLoading(true);
            try {
                // First check user's own certificates
                if (userProfile?.certificates) {
                    const found = userProfile.certificates.find(c => c.id === certId);
                    if (found) {
                        setCertificate({
                            ...found,
                            userName: userProfile.displayName || 'Student',
                            userUsername: userProfile.username
                        });
                        setLoading(false);
                        return;
                    }
                }

                // If not found in current user, this might be a shared certificate
                // We'd need to query by certificate ID across all users
                // For now, show not found
                setCertificate(null);
            } catch (error) {
                console.error('Error fetching certificate:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [certId, userProfile]);

    // Download as image
    const handleDownload = async () => {
        if (!certRef.current) return;

        setDownloading(true);
        try {
            const canvas = await html2canvas(certRef.current, {
                scale: 2,
                backgroundColor: null,
                logging: false
            });

            const link = document.createElement('a');
            link.download = `startcode-certificate-${certificate.courseId}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            toast.success('Certificate downloaded!');
        } catch (error) {
            console.error('Error downloading certificate:', error);
            toast.error('Failed to download certificate');
        } finally {
            setDownloading(false);
        }
    };

    // Copy share link
    const handleCopyLink = () => {
        const url = `${window.location.origin}/certificate/${certId}`;
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    };

    // Share to LinkedIn
    const shareToLinkedIn = () => {
        const url = `${window.location.origin}/certificate/${certId}`;
        const text = `I just earned my ${certificate.courseName} certificate on StartCode!`;
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    // Share to Twitter
    const shareToTwitter = () => {
        const url = `${window.location.origin}/certificate/${certId}`;
        const text = `I just earned my ${certificate.courseName} certificate on StartCode! 🎉`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner" />
            </div>
        );
    }

    if (!certificate) {
        return (
            <div className={styles.notFound}>
                <FiAward />
                <h2>Certificate not found</h2>
                <p>This certificate may have been removed or the link is invalid.</p>
                <Link to="/profile" className="btn btn-primary">
                    View Your Certificates
                </Link>
            </div>
        );
    }

    const course = getCourse(certificate.courseId);
    const awardedDate = new Date(certificate.awardedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.page}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <button
                    className={styles.backBtn}
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft /> Back
                </button>

                <div className={styles.actions}>
                    <button
                        className="btn btn-secondary"
                        onClick={handleCopyLink}
                    >
                        <FiCopy /> Copy Link
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleDownload}
                        disabled={downloading}
                    >
                        <FiDownload /> {downloading ? 'Downloading...' : 'Download'}
                    </button>
                </div>
            </motion.div>

            {/* Certificate Preview */}
            <motion.div
                className={styles.certificateWrapper}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div ref={certRef} className={styles.certificate}>
                    <div className={styles.certBorder}>
                        <div className={styles.certInner}>
                            {/* Header */}
                            <div className={styles.certHeader}>
                                <span className={styles.logo}>StartCode</span>
                                <span className={styles.certTitle}>Certificate of Completion</span>
                            </div>

                            {/* Main Content */}
                            <div className={styles.certContent}>
                                <p className={styles.presentedTo}>This certifies that</p>
                                <h1 className={styles.userName}>{certificate.userName}</h1>
                                <p className={styles.hasCompleted}>has successfully completed</p>

                                <div
                                    className={styles.courseTitle}
                                    style={{ '--course-color': course?.color || '#6366f1' }}
                                >
                                    <span className={styles.courseIcon}>{course?.icon || '📜'}</span>
                                    <span>{certificate.courseName}</span>
                                </div>

                                <div className={styles.scoreSection}>
                                    <FiCheckCircle />
                                    <span>Score: {certificate.score}%</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className={styles.certFooter}>
                                <div className={styles.footerLeft}>
                                    <FiCalendar />
                                    <span>{awardedDate}</span>
                                </div>
                                <div className={styles.footerRight}>
                                    <span className={styles.certId}>ID: {certificate.id?.slice(-8)}</span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className={styles.decoration1} />
                            <div className={styles.decoration2} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Share Section */}
            <motion.div
                className={styles.shareSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3>
                    <FiShare2 /> Share Your Achievement
                </h3>
                <div className={styles.shareButtons}>
                    <button
                        className={styles.linkedinBtn}
                        onClick={shareToLinkedIn}
                    >
                        <FaLinkedin /> LinkedIn
                    </button>
                    <button
                        className={styles.twitterBtn}
                        onClick={shareToTwitter}
                    >
                        <FaTwitter /> Twitter
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CertificatePage;
