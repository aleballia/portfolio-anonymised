"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider'; 
import styles from './WebPThemeToggle.module.css';

// Declare the lottie-player custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lottie-player': any;
        }
    }
}

const WebPThemeToggle: React.FC = () => {
    const themeContext = useTheme();
    const lottieRef = useRef<any>(null);

    if (!themeContext) {
        console.warn('WebPThemeToggle: useTheme must be used within a ThemeProvider');
        return null;
    }

    const { theme, toggleTheme, isAnimating, setIsAnimating } = themeContext;

    // Load lottie-player script and set correct frame when theme changes
    useEffect(() => {
        // Load lottie-player script if not already loaded
        if (!document.querySelector('script[src*="lottie-player"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
            document.head.appendChild(script);
        }

        // Wait for both script and component to be ready
        const setInitialFrame = () => {
            if (lottieRef.current && !isAnimating && typeof lottieRef.current.seek === 'function') {
                const lottie = lottieRef.current;
                try {
                    // Set to appropriate frame based on theme
                    if (theme === 'dark') {
                        lottie.seek('0%'); // Start frame (dark state)
                    } else {
                        lottie.seek('50%'); // Middle frame (light state)
                    }
                } catch (error) {
                    console.warn('Lottie seek failed:', error);
                }
            }
        };

        // Try immediately, then with a small delay if needed
        setInitialFrame();
        const timeout = setTimeout(setInitialFrame, 100);

        return () => clearTimeout(timeout);
    }, [theme, isAnimating]);

    const handleToggle = () => {
        if (isAnimating || !lottieRef.current || typeof lottieRef.current.seek !== 'function') return;

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

         return (
                  <button
            onClick={handleToggle}
            disabled={isAnimating}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'auto',
                padding: 0,
                justifyContent: 'center',
            }}
            aria-label="Toggle theme"
         >
            <div style={{ width: '80px', height: '80px', position: 'relative' }}>
                <lottie-player
                    ref={lottieRef}
                    src="/lottie/light-dark-mode.json"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    onEvent={(event: any) => {
                        if (event.type === 'ready') {
                            // Set initial frame based on theme
                            const lottie = lottieRef.current;
                            if (lottie && typeof lottie.seek === 'function') {
                                try {
                                    if (theme === 'dark') {
                                        lottie.seek('0%'); // Start frame (dark state)
                                    } else {
                                        lottie.seek('50%'); // Middle frame (light state)
                                    }
                                } catch (error) {
                                    console.warn('Lottie initial seek failed:', error);
                                }
                            }
                        }
                    }}
                />
            </div>
        </button>
    );
};

export default WebPThemeToggle;
