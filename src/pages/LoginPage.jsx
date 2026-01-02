// Login Page - Authentication with OAuth providers
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Icon from '../components/Icon';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signInWithProvider, setRememberMe: storeSetRememberMe } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const providers = [
    { name: 'google', label: 'Continue with Google', letter: 'G' },
    { name: 'github', label: 'Continue with GitHub', letter: 'GH' },
    { name: 'microsoft', label: 'Continue with Microsoft', letter: 'M' },
    { name: 'apple', label: 'Continue with Apple', letter: '' },
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
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className={styles.logo}>
          <Icon name="code" size="32px" />
        </div>

        {/* Title */}
        <h1 className={styles.title}>StartCode</h1>
        <p className={styles.subtitle}>
          Learn to code from natural language to real programming
        </p>

        {/* Features */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <Icon name="rocket_launch" variant="outlined" size="20px" />
            <span>Natural language start</span>
          </div>
          <div className={styles.feature}>
            <Icon name="trending_up" variant="outlined" size="20px" />
            <span>Progress to real code</span>
          </div>
          <div className={styles.feature}>
            <Icon name="workspace_premium" variant="outlined" size="20px" />
            <span>Earn certificates</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span>Sign in to continue</span>
        </div>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          {providers.map((provider) => (
            <motion.button
              key={provider.name}
              className={styles.authButton}
              onClick={() => handleSignIn(provider.name)}
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              data-provider={provider.name}
            >
              <span className={styles.providerIcon} data-provider={provider.name}>
                {provider.letter}
              </span>
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
            {rememberMe && <Icon name="check" size="14px" />}
          </span>
          <span>Remember me (don't log out on IP change)</span>
        </label>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <Icon name="lock" variant="outlined" size="16px" />
          <span>Sessions are tied to your IP address for security</span>
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
