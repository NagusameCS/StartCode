// Theme store for managing app themes
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const themes = {
    light: {
        name: 'Light',
        colors: {
            primary: '#6366f1',
            primaryHover: '#4f46e5',
            background: '#ffffff',
            backgroundSecondary: '#f8fafc',
            backgroundTertiary: '#f1f5f9',
            text: '#1e293b',
            textSecondary: '#64748b',
            textMuted: '#94a3b8',
            border: '#e2e8f0',
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
            card: '#ffffff',
            cardHover: '#f8fafc',
            shadow: 'rgba(0, 0, 0, 0.1)',
            codeBackground: '#f8fafc',
            codeText: '#1e293b'
        }
    },
    dark: {
        name: 'Dark',
        colors: {
            primary: '#818cf8',
            primaryHover: '#6366f1',
            background: '#0f172a',
            backgroundSecondary: '#1e293b',
            backgroundTertiary: '#334155',
            text: '#f1f5f9',
            textSecondary: '#94a3b8',
            textMuted: '#64748b',
            border: '#334155',
            success: '#4ade80',
            error: '#f87171',
            warning: '#fbbf24',
            info: '#60a5fa',
            card: '#1e293b',
            cardHover: '#334155',
            shadow: 'rgba(0, 0, 0, 0.3)',
            codeBackground: '#1e293b',
            codeText: '#e2e8f0'
        }
    },
    highContrast: {
        name: 'High Contrast',
        colors: {
            primary: '#ffff00',
            primaryHover: '#ffd700',
            background: '#000000',
            backgroundSecondary: '#1a1a1a',
            backgroundTertiary: '#333333',
            text: '#ffffff',
            textSecondary: '#e0e0e0',
            textMuted: '#b0b0b0',
            border: '#ffffff',
            success: '#00ff00',
            error: '#ff0000',
            warning: '#ffff00',
            info: '#00ffff',
            card: '#1a1a1a',
            cardHover: '#333333',
            shadow: 'rgba(255, 255, 255, 0.1)',
            codeBackground: '#1a1a1a',
            codeText: '#ffffff'
        }
    },
    terminal: {
        name: 'Retro Terminal',
        colors: {
            primary: '#00ff41',
            primaryHover: '#00cc33',
            background: '#0d0208',
            backgroundSecondary: '#1a1a1a',
            backgroundTertiary: '#2a2a2a',
            text: '#00ff41',
            textSecondary: '#00cc33',
            textMuted: '#008f11',
            border: '#00ff41',
            success: '#00ff41',
            error: '#ff0040',
            warning: '#ffb000',
            info: '#00d4ff',
            card: '#1a1a1a',
            cardHover: '#2a2a2a',
            shadow: 'rgba(0, 255, 65, 0.2)',
            codeBackground: '#0d0208',
            codeText: '#00ff41'
        }
    }
};

export const useThemeStore = create(
    persist(
        (set, get) => ({
            currentTheme: 'dark',

            setTheme: (themeName) => {
                if (themes[themeName]) {
                    set({ currentTheme: themeName });
                    applyTheme(themeName);
                }
            },

            getTheme: () => themes[get().currentTheme],

            initTheme: () => {
                applyTheme(get().currentTheme);
            }
        }),
        {
            name: 'startcode-theme'
        }
    )
);

// Apply theme to CSS variables
export const applyTheme = (themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
};
