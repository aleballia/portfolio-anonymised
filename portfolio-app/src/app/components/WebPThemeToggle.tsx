"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider'; 
import styles from './WebPThemeToggle.module.css';

const WebPThemeToggle: React.FC = () => {
    const themeContext = useTheme();
    const lottieRef = useRef<any>(null);
    const [isLottieReady, setIsLottieReady] = useState(false);
    const hasInitializedRef = useRef(false);
    const lastThemeRef = useRef<'light' | 'dark' | null>(null);
    const pendingToggleRef = useRef<'toLight' | 'toDark' | null>(null);

    // Ensure lottie-player script is present
    useEffect(() => {
        if (!document.querySelector('script[src*="lottie-player"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
            document.head.appendChild(script);
        }
    }, []);

    const pauseAndSeek = (percent: '0%' | '50%') => {
        const lottie = lottieRef.current as any;
        if (!lottie) return;
        try {
            if (typeof lottie.pause === 'function') lottie.pause();
            if (typeof lottie.seek === 'function') lottie.seek(percent);
        } catch {}
    };

    const playRangeToLight = () => {
        const lottie = lottieRef.current as any;
        if (!lottie) return;
        try {
            if (typeof lottie.seek === 'function') lottie.seek('0%');
            if (typeof lottie.setDirection === 'function') lottie.setDirection(1);
            if (typeof lottie.play === 'function') lottie.play();
            setTimeout(() => {
                pauseAndSeek('50%');
                themeContext?.setIsAnimating(false);
            }, 2000);
        } catch {
            themeContext?.setIsAnimating(false);
        }
    };

    const playRangeToDark = () => {
        const lottie = lottieRef.current as any;
        if (!lottie) return;
        try {
            if (typeof lottie.seek === 'function') lottie.seek('50%');
            if (typeof lottie.setDirection === 'function') lottie.setDirection(1);
            if (typeof lottie.play === 'function') lottie.play();
            setTimeout(() => {
                pauseAndSeek('0%');
                themeContext?.setIsAnimating(false);
            }, 2000);
        } catch {
            themeContext?.setIsAnimating(false);
        }
    };

    // Attach robust 'ready' listener
    useEffect(() => {
        const el = lottieRef.current as any;
        if (!el) return;

        const onReady = () => {
            setIsLottieReady(true);
            // If a toggle was queued before ready, play it now
            const queued = pendingToggleRef.current;
            pendingToggleRef.current = null;
            if (queued === 'toLight') {
                playRangeToLight();
                return;
            }
            if (queued === 'toDark') {
                playRangeToDark();
                return;
            }
            // Otherwise, initialize to current theme frame
            const target = themeContext?.theme === 'dark' ? '0%' : '50%';
            pauseAndSeek(target as '0%' | '50%');
            hasInitializedRef.current = true;
            lastThemeRef.current = themeContext?.theme ?? null;
        };

        el.addEventListener('ready', onReady as EventListener);
        return () => {
            el.removeEventListener('ready', onReady as EventListener);
        };
    }, [themeContext]);

    // Animate on system/manual theme changes after init
    useEffect(() => {
        if (!themeContext || !isLottieReady) return;
        const newTheme = themeContext.theme;
        const prev = lastThemeRef.current;
        if (!hasInitializedRef.current) return;
        if (!prev || prev === newTheme || themeContext.isAnimating) {
            lastThemeRef.current = newTheme;
            return;
        }
        lastThemeRef.current = newTheme;
        themeContext.setIsAnimating(true);
        if (newTheme === 'light') playRangeToLight(); else playRangeToDark();
    }, [themeContext?.theme, isLottieReady, themeContext?.isAnimating]);

    const handleToggle = () => {
        if (!themeContext || themeContext.isAnimating) return;
        const { theme, toggleTheme, setIsAnimating } = themeContext;
        const target = theme === 'dark' ? 'toLight' : 'toDark';

        // If player not ready yet, queue and flip theme now
        if (!isLottieReady) {
            pendingToggleRef.current = target;
            setIsAnimating(true);
            toggleTheme();
            return;
        }

        // Player ready: animate and flip theme
        setIsAnimating(true);
        if (target === 'toLight') playRangeToLight(); else playRangeToDark();
        toggleTheme();
    };

    if (!themeContext) {
        console.warn('WebPThemeToggle: useTheme must be used within a ThemeProvider');
        return null;
    }

    const { isAnimating } = themeContext;

    return (
        <button
            className={styles.themeToggleButton}
            onClick={handleToggle}
            disabled={isAnimating}
            aria-label="Toggle theme"
        >
            <div className={styles.animationContainer}>
                {/* @ts-expect-error - lottie-player is a web component */}
                <lottie-player
                    ref={lottieRef}
                    src="/lottie/light-dark-mode.json"
                    renderer="svg"
                    autoplay={false}
                    loop={false}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </button>
    );
};

export default WebPThemeToggle;