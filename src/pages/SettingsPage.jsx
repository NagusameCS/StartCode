// Settings Page - Theme, account, and preferences
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiSun,
    FiMoon,
    FiMonitor,
    FiTerminal,
    FiUser,
    FiLock,
    FiGlobe,
    FiLogOut,
    FiTrash2,
    FiCheck,
    FiEye,
    FiEyeOff,
    FiZap
} from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, themes } from '../store/themeStore';
import { useProgressStore } from '../store/progressStore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
    const { user, userProfile, logout, updateProfile } = useAuthStore();
    const { currentTheme, setTheme } = useThemeStore();
    const { expertMode, toggleExpertMode } = useProgressStore();

    const [username, setUsername] = useState(userProfile?.username || '');
    const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
    const [organization, setOrganization] = useState(userProfile?.organization || '');
    const [linkedVisibility, setLinkedVisibility] = useState(
        userProfile?.linkedAccountsVisibility || {}
    );
    const [avatarSource, setAvatarSource] = useState(userProfile?.avatarSource || 'default');
    const [saving, setSaving] = useState(false);

    const themeIcons = {
        light: FiSun,
        dark: FiMoon,
        highContrast: FiMonitor,
        retroTerminal: FiTerminal
    };

    // Save profile changes
    const handleSaveProfile = async () => {
        if (!user) return;

        setSaving(true);
        try {
            const updates = {
                username: username.toLowerCase().trim(),
                displayName: displayName.trim(),
                organization: organization.trim(),
                linkedAccountsVisibility: linkedVisibility,
                avatarSource
            };

            // Try to update Firestore, but don't fail if it doesn't work
            try {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, updates);
            } catch (firestoreError) {
                console.warn('Could not save to Firestore:', firestoreError.message);
            }

            // Always update local state
            updateProfile(updates);

            toast.success('Profile saved!');
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    // Toggle linked account visibility
    const toggleVisibility = (provider) => {
        setLinkedVisibility(prev => ({
            ...prev,
            [provider]: !prev[provider]
        }));
    };

    // Delete account
    const handleDeleteAccount = async () => {
        const confirmed = confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmed) return;

        const doubleConfirm = confirm(
            'This will permanently delete all your progress, certificates, and data. Are you absolutely sure?'
        );

        if (!doubleConfirm) return;

        try {
            // Try to delete user document from Firestore
            try {
                await deleteDoc(doc(db, 'users', user.uid));
            } catch (firestoreError) {
                console.warn('Could not delete from Firestore:', firestoreError.message);
            }

            // Sign out
            await logout();

            toast.success('Account deleted');
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error('Failed to delete account');
        }
    };

    const providers = [
        { id: 'google', name: 'Google', icon: FaGoogle },
        { id: 'github', name: 'GitHub', icon: FiGithub },
        { id: 'microsoft', name: 'Microsoft', icon: FaMicrosoft },
        { id: 'apple', name: 'Apple', icon: FaApple }
    ];

    return (
        <div className={styles.settings}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Settings</h1>
                <p>Customize your experience</p>
            </motion.div>

            <div className={styles.sections}>
                {/* Theme Section */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>
                        <FiSun /> Appearance
                    </h2>
                    <p>Choose your preferred theme</p>

                    <div className={styles.themes}>
                        {Object.entries(themes).map(([key, themeData]) => {
                            const Icon = themeIcons[key] || FiSun;
                            return (
                                <button
                                    key={key}
                                    className={`${styles.themeOption} ${currentTheme === key ? styles.active : ''}`}
                                    onClick={() => setTheme(key)}
                                >
                                    <div
                                        className={styles.themePreview}
                                        style={{
                                            '--preview-bg': themeData.colors.background,
                                            '--preview-card': themeData.colors.card,
                                            '--preview-text': themeData.colors.text,
                                            '--preview-primary': themeData.colors.primary
                                        }}
                                    >
                                        <div className={styles.previewHeader} />
                                        <div className={styles.previewContent}>
                                            <div className={styles.previewLine} />
                                            <div className={styles.previewLine} />
                                        </div>
                                    </div>
                                    <span className={styles.themeName}>
                                        <Icon /> {themeData.name}
                                    </span>
                                    {currentTheme === key && <FiCheck className={styles.checkIcon} />}
                                </button>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Expert Mode Section */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <h2>
                        <FiZap /> Expert Mode
                    </h2>
                    <p>Skip prerequisite course requirements</p>

                    <div className={styles.toggleContainer}>
                        <div className={styles.toggleInfo}>
                            <strong>Enable Expert Mode</strong>
                            <span>Access any course without completing prerequisites first. Recommended for experienced programmers.</span>
                        </div>
                        <button
                            className={`${styles.toggle} ${expertMode ? styles.active : ''}`}
                            onClick={toggleExpertMode}
                        >
                            <span className={styles.toggleSlider} />
                        </button>
                    </div>
                </motion.section>

                {/* Profile Section */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>
                        <FiUser /> Profile
                    </h2>
                    <p>Your public profile information</p>

                    <div className={styles.formGroup}>
                        <label>Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <div className={styles.inputPrefix}>
                            <span>@</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.replace(/[^a-z0-9_]/gi, ''))}
                                placeholder="username"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Organization (optional)</label>
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="School or company"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Profile Picture Source</label>
                        <div className={styles.avatarSourceOptions}>
                            <button
                                type="button"
                                className={`${styles.avatarSourceBtn} ${avatarSource === 'default' ? styles.active : ''}`}
                                onClick={() => setAvatarSource('default')}
                            >
                                <div className={styles.avatarPreview}>
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Default" />
                                    ) : (
                                        <span>{displayName?.[0] || '?'}</span>
                                    )}
                                </div>
                                <span>Default</span>
                                {avatarSource === 'default' && <FiCheck className={styles.checkIcon} />}
                            </button>
                            <button
                                type="button"
                                className={`${styles.avatarSourceBtn} ${avatarSource === 'google' ? styles.active : ''}`}
                                onClick={() => setAvatarSource('google')}
                            >
                                <div className={styles.avatarPreview}>
                                    <FaGoogle />
                                </div>
                                <span>Google</span>
                                {avatarSource === 'google' && <FiCheck className={styles.checkIcon} />}
                            </button>
                            <button
                                type="button"
                                className={`${styles.avatarSourceBtn} ${avatarSource === 'github' ? styles.active : ''}`}
                                onClick={() => setAvatarSource('github')}
                            >
                                <div className={styles.avatarPreview}>
                                    <FiGithub />
                                </div>
                                <span>GitHub</span>
                                {avatarSource === 'github' && <FiCheck className={styles.checkIcon} />}
                            </button>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleSaveProfile}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </motion.section>

                {/* Linked Accounts */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>
                        <FiLock /> Linked Accounts
                    </h2>
                    <p>Control which linked accounts are visible on your profile</p>

                    <div className={styles.linkedAccounts}>
                        {providers.map(provider => {
                            const Icon = provider.icon;
                            const isVisible = linkedVisibility[provider.id];

                            return (
                                <div key={provider.id} className={styles.linkedAccount}>
                                    <Icon className={styles.providerIcon} />
                                    <span>{provider.name}</span>
                                    <button
                                        className={`${styles.visibilityToggle} ${isVisible ? styles.visible : ''}`}
                                        onClick={() => toggleVisibility(provider.id)}
                                    >
                                        {isVisible ? <FiEye /> : <FiEyeOff />}
                                        {isVisible ? 'Public' : 'Private'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Language Section */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>
                        <FiGlobe /> Language
                    </h2>
                    <p>Select your preferred language</p>

                    <select className={styles.select}>
                        <option value="en">English</option>
                        <option value="es" disabled>Spanish (coming soon)</option>
                        <option value="zh" disabled>Mandarin (coming soon)</option>
                        <option value="hi" disabled>Hindi (coming soon)</option>
                    </select>
                </motion.section>

                {/* Danger Zone */}
                <motion.section
                    className={`${styles.section} ${styles.danger}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2>
                        <FiTrash2 /> Danger Zone
                    </h2>

                    <div className={styles.dangerActions}>
                        <div className={styles.dangerItem}>
                            <div>
                                <h3>Sign Out</h3>
                                <p>Sign out of your account on this device</p>
                            </div>
                            <button
                                className="btn btn-secondary"
                                onClick={logout}
                            >
                                <FiLogOut /> Sign Out
                            </button>
                        </div>

                        <div className={styles.dangerItem}>
                            <div>
                                <h3>Delete Account</h3>
                                <p>Permanently delete your account and all data</p>
                            </div>
                            <button
                                className={styles.deleteBtn}
                                onClick={handleDeleteAccount}
                            >
                                <FiTrash2 /> Delete
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default SettingsPage;
