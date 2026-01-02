// Animated Wave Background Component - Top-down organic waves using sine formula
import { useMemo } from 'react';
import styles from './WaveBackground.module.css';

// Generate organic wave path using superimposed sine waves
const generateWavePath = (width, height, amplitude, frequency, phase, yOffset) => {
    const points = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        // Superimpose multiple sine waves for organic look
        const y = yOffset + 
            amplitude * Math.sin((frequency * x / width) * Math.PI * 2 + phase) +
            (amplitude * 0.5) * Math.sin((frequency * 2.3 * x / width) * Math.PI * 2 + phase * 1.5) +
            (amplitude * 0.25) * Math.sin((frequency * 4.1 * x / width) * Math.PI * 2 + phase * 0.7);
        points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    
    // Close the path at the bottom
    points.push(`L${width},${height}`);
    points.push(`L0,${height}`);
    points.push('Z');
    
    return points.join(' ');
};

const WaveBackground = ({ position = 'bottom', height = '40vh' }) => {
    // Pre-generate wave paths for animation frames
    const waveLayers = useMemo(() => {
        const width = 2000;
        const waveHeight = 400;
        
        return [
            {
                amplitude: 35,
                frequency: 1.5,
                yOffset: 180,
                opacity: 0.06,
                duration: 12,
            },
            {
                amplitude: 25,
                frequency: 2,
                yOffset: 200,
                opacity: 0.09,
                duration: 15,
            },
            {
                amplitude: 20,
                frequency: 2.5,
                yOffset: 220,
                opacity: 0.05,
                duration: 18,
            },
        ].map((layer, idx) => ({
            ...layer,
            // Generate two phases for seamless loop
            path1: generateWavePath(width, waveHeight, layer.amplitude, layer.frequency, 0, layer.yOffset),
            path2: generateWavePath(width, waveHeight, layer.amplitude, layer.frequency, Math.PI * 2, layer.yOffset),
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
                            d={layer.path1}
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
                            d={layer.path1}
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
