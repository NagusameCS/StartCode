// Global Error Boundary - Catches React errors and displays fallback UI
import { Component } from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        
        // Log to console in development
        if (import.meta.env.DEV) {
            console.error('Error caught by boundary:', error, errorInfo);
        }
        
        // In production, you could send this to an error tracking service
        // e.g., Sentry, LogRocket, etc.
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/StartCode/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorBoundary}>
                    <div className={styles.errorContent}>
                        <FiAlertTriangle className={styles.errorIcon} />
                        <h1>Something went wrong</h1>
                        <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
                        
                        {import.meta.env.DEV && this.state.error && (
                            <details className={styles.errorDetails}>
                                <summary>Error Details (Development Only)</summary>
                                <pre>{this.state.error.toString()}</pre>
                                {this.state.errorInfo && (
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                )}
                            </details>
                        )}

                        <div className={styles.errorActions}>
                            <button onClick={this.handleReload} className={styles.primaryBtn}>
                                <FiRefreshCw /> Refresh Page
                            </button>
                            <button onClick={this.handleGoHome} className={styles.secondaryBtn}>
                                <FiHome /> Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
