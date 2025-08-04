"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const Header: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Add fallback for SSR
  let theme = 'light';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Fallback for SSR - use default values
    console.warn('Theme context not available during SSR');
  }

  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (!isHome) {
      // Set sessionStorage to indicate we're returning from a case study
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
            cursor: "pointer",
            zIndex: 1001,
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
                {!hovered ? (
                  <motion.span
                    key="logo-default"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0 }}
            >
              Alessandra Balliana
                  </motion.span>
                ) : (
                  <motion.span
                    key="logo-hovered"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0 }}
                  >
                    {isHome ? (
                      <>Hi 👋</>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 11H7.8L13.4 5.4L12 4L4 12L12 20L13.4 18.6L7.8 13H20V11V11Z" fill="currentColor"/>
                        </svg>
                        Homepage
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
            marginLeft: 'auto',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s ease',
            minHeight: '44px', // Better touch target for mobile
            minWidth: '44px',
          }}
          onMouseEnter={(e) => {
            // Only trigger hover on non-touch devices
            if (!('ontouchstart' in window)) {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }
          }}
          onMouseLeave={(e) => {
            // Only trigger hover on non-touch devices
            if (!('ontouchstart' in window)) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label="Toggle theme"
        >
          <span style={{ fontSize: '1.2rem' }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
          <span className="caption" style={{ display: 'inline' }}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;