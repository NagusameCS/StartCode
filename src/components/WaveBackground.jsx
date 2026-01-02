// Animated Wave Background Component - Clean CSS-based waves
import styles from './WaveBackground.module.css';

const WaveBackground = ({ position = 'bottom', height = '35vh' }) => {
    return (
        <div
            className={styles.waveContainer}
            style={{
                height,
                top: position === 'top' ? 0 : 'auto',
                bottom: position === 'bottom' ? 0 : 'auto',
                transform: position === 'top' ? 'rotate(180deg)' : 'none',
            }}
        >
            {/* Wave layers using SVG with smooth bezier curves */}
            <svg 
                className={styles.wave} 
                viewBox="0 0 1440 320" 
                preserveAspectRatio="none"
                style={{ opacity: 0.08, animationDuration: '20s' }}
            >
                <path 
                    d="M0,160 C360,240 720,80 1080,160 C1260,200 1380,180 1440,160 L1440,320 L0,320 Z"
                    fill="var(--color-primary)"
                />
            </svg>
            <svg 
                className={styles.wave} 
                viewBox="0 0 1440 320" 
                preserveAspectRatio="none"
                style={{ opacity: 0.05, animationDuration: '25s', animationDelay: '-5s' }}
            >
                <path 
                    d="M0,192 C240,128 480,256 720,192 C960,128 1200,224 1440,192 L1440,320 L0,320 Z"
                    fill="var(--color-primary)"
                />
            </svg>
            <svg 
                className={styles.wave} 
                viewBox="0 0 1440 320" 
                preserveAspectRatio="none"
                style={{ opacity: 0.03, animationDuration: '30s', animationDelay: '-10s' }}
            >
                <path 
                    d="M0,224 C180,160 360,288 540,224 C720,160 900,288 1080,224 C1260,160 1380,200 1440,224 L1440,320 L0,320 Z"
                    fill="var(--color-primary)"
                />
            </svg>
        </div>
    );
};

export default WaveBackground;
