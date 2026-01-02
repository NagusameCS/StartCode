// Animated Wave Background Component - Smooth organic waves
import { useMemo } from 'react';
import styles from './WaveBackground.module.css';

// Generate smooth wave path using a single gentle sine wave
const generateWavePath = (width, height, amplitude, frequency, phase, yOffset) => {
    const points = [];
    const segments = 200; // More segments = smoother curve

    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        // Use a single smooth sine wave - no spiky harmonics
        const y = yOffset + amplitude * Math.sin((frequency * x / width) * Math.PI * 2 + phase);
        points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
    }

    // Close the path at the bottom
    points.push(`L${width},${height}`);
    points.push(`L0,${height}`);
    points.push('Z');

    return points.join(' ');
};

const WaveBackground = ({ position = 'bottom', height = '40vh' }) => {
    // Pre-generate wave paths for animation
    const waveLayers = useMemo(() => {
        const width = 2000;
        const waveHeight = 400;

        return [
            {
                amplitude: 25,
                frequency: 0.8,
                yOffset: 200,
                opacity: 0.04,
                duration: 25, // Slower animation
            },
            {
                amplitude: 18,
                frequency: 1.2,
                yOffset: 220,
                opacity: 0.06,
                duration: 30,
            },
            {
                amplitude: 12,
                frequency: 1.5,
                yOffset: 240,
                opacity: 0.03,
                duration: 35,
            },
        ].map((layer, idx) => ({
            ...layer,
            path: generateWavePath(width, waveHeight, layer.amplitude, layer.frequency, 0, layer.yOffset),
            id: idx,
        }));
    }, []);

    return (
        <div
            className={styles.waveContainer}
            style={{
                height,
                top: position === 'top' ? 0 : 'auto',
                bottom: position === 'bottom' ? 0 : 'auto',
                transform: position === 'top' ? 'scaleY(-1)' : 'none',
            }}
        >
            {waveLayers.map((layer) => (
                <div
                    key={layer.id}
                    className={styles.waveLayer}
                    style={{
                        animationDuration: `${layer.duration}s`,
                    }}
                >
                    <svg
                        className={styles.waveSvg}
                        viewBox="0 0 2000 400"
                        preserveAspectRatio="none"
                    >
                        <path
                            d={layer.path}
                            fill="var(--color-primary)"
                            style={{ opacity: layer.opacity }}
                        />
                    </svg>
                    <svg
                        className={styles.waveSvg}
                        viewBox="0 0 2000 400"
                        preserveAspectRatio="none"
                    >
                        <path
                            d={layer.path}
                            fill="var(--color-primary)"
                            style={{ opacity: layer.opacity }}
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default WaveBackground;
