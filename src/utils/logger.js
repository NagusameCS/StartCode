// Logger utility - wraps console methods and can be disabled in production
const isDev = import.meta.env.DEV;

/**
 * Logger utility that respects environment
 * In development: All logs are shown
 * In production: Only errors and warnings are shown (for debugging critical issues)
 * 
 * To completely disable logging in production, set VITE_DISABLE_LOGS=true
 */
const disableLogs = import.meta.env.VITE_DISABLE_LOGS === 'true';

const logger = {
    log: (...args) => {
        if (isDev && !disableLogs) {
            console.log('[StartCode]', ...args);
        }
    },
    
    info: (...args) => {
        if (isDev && !disableLogs) {
            console.info('[StartCode]', ...args);
        }
    },
    
    warn: (...args) => {
        if (!disableLogs) {
            console.warn('[StartCode]', ...args);
        }
    },
    
    error: (...args) => {
        if (!disableLogs) {
            console.error('[StartCode]', ...args);
        }
    },
    
    debug: (...args) => {
        if (isDev && !disableLogs) {
            console.debug('[StartCode]', ...args);
        }
    },

    // Group logging for complex operations
    group: (label) => {
        if (isDev && !disableLogs) {
            console.group(`[StartCode] ${label}`);
        }
    },
    
    groupEnd: () => {
        if (isDev && !disableLogs) {
            console.groupEnd();
        }
    }
};

export default logger;
