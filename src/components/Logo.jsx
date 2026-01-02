// StartCode Logo Component - SC in bottom right corner
import styles from './Logo.module.css';

const Logo = ({ size = 40, className = '' }) => {
    const fontSize = Math.round(size * 0.44);
    const padding = Math.round(size * 0.1);
    const borderRadius = Math.round(size * 0.2);

    return (
        <div
            className={`${styles.logo} ${className}`}
            style={{
                width: size,
                height: size,
                padding: padding,
                borderRadius: borderRadius,
            }}
        >
            <span className={styles.text} style={{ fontSize }}>
                SC
            </span>
        </div>
    );
};

export default Logo;
