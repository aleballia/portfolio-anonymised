"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [showName, setShowName] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // SSR fallback for theme
  let theme = 'light';
  let toggleTheme = () => {};
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch {}

  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setShowName(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowName(true);
    }
  }, [isHome]);

  const handleClick = () => {
    if (!isHome) {
      sessionStorage.setItem('returningFromCaseStudy', 'true');
      router.push("/");
    }
  };

  const handleHiClick = (e: React.MouseEvent) => {
    // Chat functionality removed from homepage
    if (!isHome) {
      sessionStorage.setItem('returningFromCaseStudy', 'true');
      router.push("/");
    }
  };

  return (
    <header className="px-section" style={{ width: "100%", background: "transparent", color: "var(--foreground)", paddingTop: "24px", paddingBottom: "24px", display: "flex", alignItems: "center", minHeight: "80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div
          onMouseEnter={() => {
            // Only trigger hover on non-touch devices
            if (!('ontouchstart' in window)) {
              setHovered(true);
            }
          }}
          onMouseLeave={() => {
            // Only trigger hover on non-touch devices
            if (!('ontouchstart' in window)) {
              setHovered(false);
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            minWidth: "240px",
            height: "40px",
            zIndex: 1001,
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <span
            className="h4"
            style={{
              display: "inline-block",
              width: "100%",
              position: "relative",
            }}
          >
            <span style={{ display: 'block', minHeight: '1.2em', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {hovered ? (
                  <motion.span
                    key="logo-hovered"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={styles.logoSpan}
                  >
                    {isHome ? (
                      <span className={styles.logoGreeting} onClick={handleHiClick}>Hi 👋</span>
                    ) : (
                      <span className={styles.logoHoverContent}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 11H7.8L13.4 5.4L12 4L4 12L12 20L13.4 18.6L7.8 13H20V11V11Z" fill="currentColor"/>
                        </svg>
                        <span className={styles.logoHomepage}>Homepage</span>
                      </span>
                    )}
                  </motion.span>
                ) : (
                  <motion.span
                    key="logo-default"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y:10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0 }}
                  >
                    {isHome ? (
                      <AnimatePresence mode="wait">
                        {!showName ? (
                          <motion.span
                            key="hi"
                            initial={{ opacity: 1, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 1, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={styles.logoGreeting}
                            onClick={handleHiClick}
                          >
                            Hello 👋
                          </motion.span>
                        ) : (
                          <motion.span
                            key="name"
                            initial={{ opacity: 1, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={styles.logoText}
                          >
                            Alessandra Balliana
                            <div style={{fontWeight: 300, fontSize: '0.92rem', color: 'var(--foreground)', marginTop: '0.5rem'}}><b>Product Design Leader</b> – London, UK</div>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    ) : (
                      <span className={styles.logoText}>
                        Alessandra Balliana
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </span>
        </div>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--foreground)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'medium',
            marginLeft: 'auto',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => {
            if (!('ontouchstart' in window)) {
              e.currentTarget.style.backgroundColor = 'var(--background)';
            }
          }}
          onMouseLeave={(e) => {
            if (!('ontouchstart' in window)) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label="Toggle theme"
        >
          <span style={{ fontSize: '1rem' }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
          <span className="caption" style={{ display: 'inline' }}>
            <span className={styles.themeLabelDesktop}>
              {theme === 'dark' ? 'Light off' : 'Light on'}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;