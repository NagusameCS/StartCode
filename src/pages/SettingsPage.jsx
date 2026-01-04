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
    FiZap,
    FiUsers,
    FiLink,
    FiAlertTriangle,
    FiImage,
    FiUpload
} from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, themes } from '../store/themeStore';
import { useProgressStore } from '../store/progressStore';
import { useTeacherStore } from '../store/teacherStore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import styles from './SettingsPage.module.css';

// Preset avatar options
const AVATAR_PRESETS = [
    { id: 'robot1', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=startcode1', name: 'Robot 1' },
    { id: 'robot2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=startcode2', name: 'Robot 2' },
    { id: 'robot3', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=startcode3', name: 'Robot 3' },
    { id: 'pixel1', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=coder1', name: 'Pixel 1' },
    { id: 'pixel2', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=coder2', name: 'Pixel 2' },
    { id: 'pixel3', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=coder3', name: 'Pixel 3' },
    { id: 'shapes1', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=dev1', name: 'Shapes 1' },
    { id: 'shapes2', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=dev2', name: 'Shapes 2' },
    { id: 'identicon1', url: 'https://api.dicebear.com/7.x/identicon/svg?seed=code1', name: 'Pattern 1' },
    { id: 'identicon2', url: 'https://api.dicebear.com/7.x/identicon/svg?seed=code2', name: 'Pattern 2' },
    { id: 'thumbs1', url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=happy1', name: 'Thumbs 1' },
    { id: 'thumbs2', url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=happy2', name: 'Thumbs 2' },
];

const SettingsPage = () => {
    const { user, userProfile, logout, updateProfile, updateProfilePicture, linkProvider, getLinkedProviders, canMergeAccounts, mergeExistingAccount, completeMerge } = useAuthStore();
    const { currentTheme, setTheme } = useThemeStore();
    const { expertMode, toggleExpertMode } = useProgressStore();
    const { isTeacherMode, toggleTeacherMode } = useTeacherStore();

    const [username, setUsername] = useState(userProfile?.username || '');
    const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
    const [organization, setOrganization] = useState(userProfile?.organization || '');
    const [linkedVisibility, setLinkedVisibility] = useState(
        userProfile?.linkedAccountsVisibility || {}
    );
    const [avatarSource, setAvatarSource] = useState(userProfile?.avatarSource || 'default');
    const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.photoURL || '');
    const [customAvatarUrl, setCustomAvatarUrl] = useState('');
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [saving, setSaving] = useState(false);
    const [linking, setLinking] = useState(false);
    const [showMergeConfirm, setShowMergeConfirm] = useState(null);
    const [pendingMerge, setPendingMerge] = useState(null);

    // Get currently linked providers
    const linkedProviders = getLinkedProviders ? getLinkedProviders() : [];

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
                avatarSource,
                photoURL: selectedAvatar || userProfile?.photoURL
            };

            // Update profile picture if changed
            if (selectedAvatar && selectedAvatar !== userProfile?.photoURL) {
                if (updateProfilePicture) {
                    await updateProfilePicture(selectedAvatar);
                }
            }

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
            setShowAvatarPicker(false);
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

    // Handle merging/linking accounts
    const handleMergeAccount = async (providerName) => {
        // Check if already linked
        const providerIds = {
            google: 'google.com',
            github: 'github.com',
            email: 'password'
        };

        if (linkedProviders.includes(providerIds[providerName])) {
            toast.error(`${providerName} is already linked to this account`);
            return;
        }

        setLinking(true);
        try {
            // First try the standard link (for fresh provider connections)
            if (linkProvider) {
                const result = await linkProvider(providerName);
                toast.success(result.message || `${providerName} account linked successfully!`);
                setShowMergeConfirm(null);
            }
        } catch (error) {
            // If the account already exists, try the merge flow
            if (error.message.includes('already exists') || error.code === 'auth/credential-already-in-use') {
                try {
                    if (mergeExistingAccount) {
                        const result = await mergeExistingAccount(providerName);
                        if (result.requiresReauth) {
                            // Store the merge data and prompt re-authentication
                            setPendingMerge({
                                data: result.otherAccountData,
                                accountId: result.otherAccountId,
                                provider: providerName
                            });
                            toast.success('Account found! Please sign back in to complete the merge.');
                        } else {
                            toast.success(result.message);
                        }
                    }
                } catch (mergeError) {
                    toast.error(mergeError.message || `Failed to merge ${providerName} account`);
                }
            } else {
                toast.error(error.message || `Failed to link ${providerName} account`);
            }
        } finally {
            setLinking(false);
            setShowMergeConfirm(null);
        }
    };

    // Complete pending merge after re-authentication
    const handleCompleteMerge = async () => {
        if (!pendingMerge || !completeMerge) return;

        setLinking(true);
        try {
            const result = await completeMerge(pendingMerge.data, pendingMerge.accountId);
            toast.success(`Merge complete! Added ${result.lessonsAdded} lessons and ${result.certsAdded} certificates.`);
            setPendingMerge(null);
        } catch (error) {
            toast.error(error.message || 'Failed to complete merge');
        } finally {
            setLinking(false);
        }
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
                        <label><FiImage /> Profile Picture</label>
                        <div className={styles.avatarSection}>
                            <div className={styles.currentAvatar}>
                                {selectedAvatar || userProfile?.photoURL ? (
                                    <img src={selectedAvatar || userProfile?.photoURL} alt="Avatar" />
                                ) : (
                                    <span>{displayName?.[0] || '?'}</span>
                                )}
                            </div>
                            <button
                                type="button"
                                className={styles.changeAvatarBtn}
                                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                            >
                                <FiImage /> Change Picture
                            </button>
                        </div>

                        {showAvatarPicker && (
                            <div className={styles.avatarPicker}>
                                <h4>Choose an Avatar</h4>
                                <div className={styles.avatarGrid}>
                                    {AVATAR_PRESETS.map(avatar => (
                                        <button
                                            key={avatar.id}
                                            type="button"
                                            className={`${styles.avatarOption} ${selectedAvatar === avatar.url ? styles.selected : ''}`}
                                            onClick={() => setSelectedAvatar(avatar.url)}
                                        >
                                            <img src={avatar.url} alt={avatar.name} />
                                            {selectedAvatar === avatar.url && <FiCheck className={styles.avatarCheck} />}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.customAvatarSection}>
                                    <h4>Or use a custom URL</h4>
                                    <div className={styles.customAvatarInput}>
                                        <input
                                            type="url"
                                            value={customAvatarUrl}
                                            onChange={(e) => setCustomAvatarUrl(e.target.value)}
                                            placeholder="https://example.com/avatar.png"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                if (customAvatarUrl) {
                                                    setSelectedAvatar(customAvatarUrl);
                                                    setCustomAvatarUrl('');
                                                }
                                            }}
                                        >
                                            Use URL
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.avatarSourceOptions}>
                                    <span>Or use picture from:</span>
                                    <button
                                        type="button"
                                        className={`${styles.avatarSourceBtn} ${avatarSource === 'google' ? styles.active : ''}`}
                                        onClick={() => {
                                            const googleProvider = user?.providerData?.find(p => p.providerId === 'google.com');
                                            if (googleProvider?.photoURL) {
                                                setSelectedAvatar(googleProvider.photoURL);
                                                setAvatarSource('google');
                                            }
                                        }}
                                    >
                                        <FaGoogle /> Google
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.avatarSourceBtn} ${avatarSource === 'github' ? styles.active : ''}`}
                                        onClick={() => {
                                            const githubProvider = user?.providerData?.find(p => p.providerId === 'github.com');
                                            if (githubProvider?.photoURL) {
                                                setSelectedAvatar(githubProvider.photoURL);
                                                setAvatarSource('github');
                                            }
                                        }}
                                    >
                                        <FiGithub /> GitHub
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleSaveProfile}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </motion.section>

                {/* Linked Accounts / Account Merging */}
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>
                        <FiLink /> Merge Accounts
                    </h2>
                    <p>Link multiple sign-in methods to this account. <strong>This is permanent and cannot be undone.</strong></p>

                    <div className={styles.mergeWarning}>
                        <FiAlertTriangle />
                        <span>Merging accounts is a permanent action. All linked accounts will share progress and data.</span>
                    </div>

                    {pendingMerge && (
                        <div className={styles.pendingMerge}>
                            <h4>Complete Account Merge</h4>
                            <p>
                                Found progress data from your {pendingMerge.provider} account. 
                                Click below to merge this progress with your current account.
                            </p>
                            <div className={styles.pendingMergeActions}>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCompleteMerge}
                                    disabled={linking}
                                >
                                    {linking ? 'Merging...' : 'Complete Merge'}
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setPendingMerge(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.linkedAccounts}>
                        {[
                            { id: 'google', name: 'Google', icon: FaGoogle, providerId: 'google.com' },
                            { id: 'github', name: 'GitHub', icon: FiGithub, providerId: 'github.com' }
                        ].map(provider => {
                            const Icon = provider.icon;
                            const isLinked = linkedProviders.includes(provider.providerId);

                            return (
                                <div key={provider.id} className={`${styles.linkedAccount} ${isLinked ? styles.linked : ''}`}>
                                    <Icon className={styles.providerIcon} />
                                    <span>{provider.name}</span>
                                    <div className={styles.linkStatus}>
                                        {isLinked ? (
                                            <span className={styles.linkedBadge}>
                                                <FiCheck /> Linked
                                            </span>
                                        ) : showMergeConfirm === provider.id ? (
                                            <div className={styles.confirmMerge}>
                                                <span>Are you sure?</span>
                                                <button
                                                    className={styles.confirmBtn}
                                                    onClick={() => handleMergeAccount(provider.id)}
                                                    disabled={linking}
                                                >
                                                    {linking ? 'Linking...' : 'Yes, Link'}
                                                </button>
                                                <button
                                                    className={styles.cancelBtn}
                                                    onClick={() => setShowMergeConfirm(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={styles.mergeBtn}
                                                onClick={() => setShowMergeConfirm(provider.id)}
                                            >
                                                <FiLink /> Merge
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h3 className={styles.subHeading}>Account Visibility</h3>
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
                                <h3><FiZap /> Expert Mode</h3>
                                <p>Skip prerequisite course requirements. For experienced programmers only.</p>
                            </div>
                            <button
                                className={`${styles.toggle} ${expertMode ? styles.active : ''}`}
                                onClick={toggleExpertMode}
                            >
                                <span className={styles.toggleSlider} />
                            </button>
                        </div>

                        <div className={styles.dangerItem}>
                            <div>
                                <h3><FiUsers /> Teacher Mode</h3>
                                <p>Access class management, student tracking, and teaching tools.</p>
                            </div>
                            <button
                                className={`${styles.toggle} ${isTeacherMode ? styles.active : ''}`}
                                onClick={toggleTeacherMode}
                            >
                                <span className={styles.toggleSlider} />
                            </button>
                        </div>

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
