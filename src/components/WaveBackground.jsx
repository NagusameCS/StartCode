// Animated Wave Background Component - Seamless infinite animation
import styles from './WaveBackground.module.css';

const WaveBackground = ({ position = 'bottom', height = '40vh' }) => {
    return (
        <div 
            className={styles.waveContainer}
            style={{ 
                height,
                [position]: 0,
                top: position === 'top' ? 0 : 'auto',
                bottom: position === 'bottom' ? 0 : 'auto',
                transform: position === 'top' ? 'rotate(180deg)' : 'none'
            }}
        >
            <div className={styles.waveWrapper}>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave1} 
                        d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L0,320Z"
                    />
                </svg>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave1} 
                        d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L0,320Z"
                    />
                </svg>
            </div>
            <div className={styles.waveWrapper2}>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave2} 
                        d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L0,320Z"
                    />
                </svg>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave2} 
                        d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L0,320Z"
                    />
                </svg>
            </div>
            <div className={styles.waveWrapper3}>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave3} 
                        d="M0,256L60,250.7C120,245,240,235,360,218.7C480,203,600,181,720,186.7C840,192,960,224,1080,234.7C1200,245,1320,235,1380,229.3L1440,224L1440,320L0,320Z"
                    />
                </svg>
                <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path 
                        className={styles.wave3} 
                        d="M0,256L60,250.7C120,245,240,235,360,218.7C480,203,600,181,720,186.7C840,192,960,224,1080,234.7C1200,245,1320,235,1380,229.3L1440,224L1440,320L0,320Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default WaveBackground;
