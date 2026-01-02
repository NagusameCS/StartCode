// Login Page - Authentication with Google, GitHub, and Email/Password
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Icon from '../components/Icon';
import styles from './LoginPage.module.css';

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
          <Icon name="code" size="32px" />
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
                  <span className={styles.providerIcon} data-provider="google">G</span>
                  <span>Continue with Google</span>
                </motion.button>

                <motion.button
                  className={styles.authButton}
                  onClick={() => handleProviderSignIn('github')}
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className={styles.providerIcon} data-provider="github">
                    <Icon name="code" size="16px" />
                  </span>
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
