"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider'; 
import styles from './WebPThemeToggle.module.css';

const WebPThemeToggle: React.FC = () => {
    const themeContext = useTheme();
    const lottieRef = useRef<any>(null);
    const [isLottieReady, setIsLottieReady] = useState(false);

    // Set the correct initial frame based on theme
    const setCorrectFrame = () => {
        if (!lottieRef.current || !themeContext || !isLottieReady) return;
        
        const lottie = lottieRef.current;
        if (typeof lottie.seek !== 'function') return;

        try {
            if (themeContext.theme === 'dark') {
                lottie.seek('0%'); // Dark state
            } else {
                lottie.seek('50%'); // Light state
            }
        } catch (error) {
            console.warn('Lottie seek failed:', error);
        }
    };

    // Load lottie-player script and set correct frame when theme changes
    useEffect(() => {
        if (!themeContext) return;

        // Load lottie-player script if not already loaded
        if (!document.querySelector('script[src*="lottie-player"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
            document.head.appendChild(script);
        }

        // Set frame when theme changes (but not during animation)
        if (isLottieReady && !themeContext.isAnimating) {
            setCorrectFrame();
        }
    }, [themeContext?.theme, isLottieReady, themeContext?.isAnimating]);

    // Set initial frame when Lottie becomes ready
    useEffect(() => {
        if (isLottieReady && themeContext) {
            // Small delay to ensure Lottie is fully initialized
            const timeout = setTimeout(() => {
                setCorrectFrame();
            }, 50);
            
            return () => clearTimeout(timeout);
        }
    }, [isLottieReady, themeContext]);

    const handleToggle = () => {
        if (!themeContext || themeContext.isAnimating || !lottieRef.current || typeof lottieRef.current.seek !== 'function') return;

        const { theme, toggleTheme, setIsAnimating } = themeContext;

        // Start animation state and theme change immediately
        setIsAnimating(true);
        toggleTheme();

        const lottie = lottieRef.current;

        try {
            if (theme === 'dark') {
                // Dark to light: play from 0% to 50%
                lottie.seek('0%');
                if (typeof lottie.setDirection === 'function') {
                    lottie.setDirection(1); // Forward
                }
                lottie.play();

                // Stop at 50% (2 seconds in a 4s animation)
                setTimeout(() => {
                    try {
                        lottie.pause();
                        lottie.seek('50%');
                    } catch (error) {
                        console.warn('Lottie control failed:', error);
                    }
                    setIsAnimating(false);
                }, 2000);
            } else {
                // Light to dark: play from 50% to 100%
                lottie.seek('50%');
                if (typeof lottie.setDirection === 'function') {
                    lottie.setDirection(1); // Forward
                }
                lottie.play();

                // Stop at 100%, then reset to 0%
                setTimeout(() => {
                    try {
                        lottie.pause();
                        lottie.seek('0%');
                    } catch (error) {
                        console.warn('Lottie control failed:', error);
                    }
                    setIsAnimating(false);
                }, 2000);
            }
        } catch (error) {
            console.warn('Lottie animation failed:', error);
            setIsAnimating(false);
        }
    };

    if (!themeContext) {
        console.warn('WebPThemeToggle: useTheme must be used within a ThemeProvider');
        return null;
    }

    const { theme, isAnimating } = themeContext;

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
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    onEvent={(event: any) => {
                        if (event.type === 'ready') {
                            setIsLottieReady(true);
                        }
                    }}
                />
            </div>
        </button>
    );
};

export default WebPThemeToggle;