// Login Page - Authentication with Google, GitHub, and Email/Password
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Icon from '../components/Icon';
import styles from './LoginPage.module.css';

// Black & White SVG Icons
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'reset'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const {
        signInWithProvider,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        setRememberMe: storeSetRememberMe
    } = useAuthStore();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleProviderSignIn = async (providerName) => {
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

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            storeSetRememberMe(rememberMe);

            if (authMode === 'login') {
                await signInWithEmail(email, password);
                toast.success('Welcome back!');
                navigate(from, { replace: true });
            } else if (authMode === 'signup') {
                await signUpWithEmail(email, password, displayName);
                toast.success('Account created! Welcome to StartCode!');
                navigate(from, { replace: true });
            } else if (authMode === 'reset') {
                await resetPassword(email);
                toast.success('Password reset email sent!');
                setAuthMode('login');
            }
        } catch (error) {
            console.error('Auth error:', error);
            let message = 'Authentication failed.';
            if (error.code === 'auth/invalid-credential') {
                message = 'Invalid email or password.';
            } else if (error.code === 'auth/email-already-in-use') {
                message = 'Email already in use.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email.';
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Animated Wave Background */}
            <div className={styles.waveContainer}>
                <svg className={styles.waves} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path className={styles.wave1} d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path className={styles.wave2} d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,208C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path className={styles.wave3} d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,224C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Logo */}
                <div className={styles.logo}>
                    <span className={styles.logoText}>SC</span>
                </div>

                {/* Title */}
                <h1 className={styles.title}>StartCode</h1>
                <p className={styles.subtitle}>
                    {authMode === 'login' && 'Sign in to continue learning'}
                    {authMode === 'signup' && 'Create your account'}
                    {authMode === 'reset' && 'Reset your password'}
                </p>

                <AnimatePresence mode="wait">
                    {authMode !== 'reset' && (
                        <motion.div
                            key="providers"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {/* OAuth Buttons */}
                            <div className={styles.authButtons}>
                                <motion.button
                                    className={styles.authButton}
                                    onClick={() => handleProviderSignIn('google')}
                                    disabled={loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <GoogleIcon />
                                    <span>Continue with Google</span>
                                </motion.button>

                                <motion.button
                                    className={styles.authButton}
                                    onClick={() => handleProviderSignIn('github')}
                                    disabled={loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <GitHubIcon />
                                    <span>Continue with GitHub</span>
                                </motion.button>
                            </div>

                            {/* Divider */}
                            <div className={styles.divider}>
                                <span>or continue with email</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className={styles.form}>
                    {authMode === 'signup' && (
                        <div className={styles.inputGroup}>
                            <Icon name="person" variant="outlined" size="20px" />
                            <input
                                type="text"
                                placeholder="Display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <Icon name="email" variant="outlined" size="20px" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {authMode !== 'reset' && (
                        <div className={styles.inputGroup}>
                            <Icon name="lock" variant="outlined" size="20px" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {authMode === 'login' && (
                        <button
                            type="button"
                            className={styles.forgotBtn}
                            onClick={() => setAuthMode('reset')}
                        >
                            Forgot password?
                        </button>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading ? (
                            <Icon name="sync" className={styles.spinning} size="20px" />
                        ) : (
                            <>
                                {authMode === 'login' && 'Sign In'}
                                {authMode === 'signup' && 'Create Account'}
                                {authMode === 'reset' && 'Send Reset Link'}
                            </>
                        )}
                    </button>
                </form>

                {/* Remember Me (only for login) */}
                {authMode === 'login' && (
                    <label className={styles.rememberMe}>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className={styles.checkbox}>
                            {rememberMe && <Icon name="check" size="14px" />}
                        </span>
                        <span>Remember me (stay signed in on IP change)</span>
                    </label>
                )}

                {/* Toggle Auth Mode */}
                <div className={styles.toggleMode}>
                    {authMode === 'login' && (
                        <>
                            Don't have an account?{' '}
                            <button onClick={() => setAuthMode('signup')}>Sign up</button>
                        </>
                    )}
                    {authMode === 'signup' && (
                        <>
                            Already have an account?{' '}
                            <button onClick={() => setAuthMode('login')}>Sign in</button>
                        </>
                    )}
                    {authMode === 'reset' && (
                        <>
                            Remember your password?{' '}
                            <button onClick={() => setAuthMode('login')}>Sign in</button>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
