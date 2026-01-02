// Login Page - Authentication with OAuth providers
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub, FaMicrosoft, FaApple } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { signInWithProvider, setRememberMe: storeSetRememberMe } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const providers = [
        { name: 'google', label: 'Continue with Google', icon: FaGoogle, color: '#ea4335' },
        { name: 'github', label: 'Continue with GitHub', icon: FaGithub, color: '#333' },
        { name: 'microsoft', label: 'Continue with Microsoft', icon: FaMicrosoft, color: '#00a4ef' },
        { name: 'apple', label: 'Continue with Apple', icon: FaApple, color: '#000' },
    ];

    const handleSignIn = async (providerName) => {
        setLoading(true);
        try {
            storeSetRememberMe(rememberMe);
            await signInWithProvider(providerName);
            toast.success('Welcome to StartCode!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Sign in error:', error);
            toast.error(error.message || 'Failed to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo */}
                <motion.div
                    className={styles.logo}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className={styles.logoIcon}>{'</>'}</span>
                </motion.div>

                {/* Title */}
                <h1 className={styles.title}>Welcome to StartCode</h1>
                <p className={styles.subtitle}>
                    Learn to code from natural language to real programming
                </p>

                {/* Features */}
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>🚀</span>
                        <span>Start with natural language</span>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>📈</span>
                        <span>Progress to real code</span>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>🏆</span>
                        <span>Earn certificates</span>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}>
                    <span>Sign in to continue</span>
                </div>

                {/* Auth Buttons */}
                <div className={styles.authButtons}>
                    {providers.map((provider, index) => (
                        <motion.button
                            key={provider.name}
                            className={styles.authButton}
                            onClick={() => handleSignIn(provider.name)}
                            disabled={loading}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <provider.icon style={{ color: provider.color }} />
                            <span>{provider.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Remember Me */}
                <label className={styles.rememberMe}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className={styles.checkbox}>
                        {rememberMe && '✓'}
                    </span>
                    <span>Remember me (don't log out on IP change)</span>
                </label>

                {/* Security Notice */}
                <p className={styles.securityNotice}>
                    🔒 For security, sessions are tied to your IP address.
                    Enable "Remember me" if you're on mobile or changing networks.
                </p>

                {/* Footer */}
                <div className={styles.footer}>
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </motion.div>

            {/* Background decoration */}
            <div className={styles.bgDecoration}>
                <div className={styles.bgCircle1}></div>
                <div className={styles.bgCircle2}></div>
                <div className={styles.bgCircle3}></div>
            </div>
        </div>
    );
};

export default LoginPage;
