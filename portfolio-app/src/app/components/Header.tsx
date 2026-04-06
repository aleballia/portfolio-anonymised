"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import WebPThemeToggle from './WebPThemeToggle';
import LocalTime from './LocalTime';
import styles from "./Header.module.css";
import { siteRole } from "../../config/site";

const Header: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isHome) {
      // Save current scroll position before navigating
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      sessionStorage.setItem('returningFromCaseStudy', 'true');
      sessionStorage.setItem('scrollPosition', scrollPosition.toString());
      router.push("/");
    }
  };

  return (
    <header className="px-section" style={{ width: "100%", background: "transparent", color: "var(--foreground)", paddingTop: "24px", paddingBottom: "24px", display: "flex", alignItems: "center", minHeight: "80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div
          onMouseEnter={() => {
            // Only trigger hover on non-touch devices and not during navigation
            if (!('ontouchstart' in window) && !document.hidden) {
              setHovered(true);
            }
          }}
          onMouseLeave={() => {
            // Only trigger hover on non-touch devices
            if (!('ontouchstart' in window)) {
              setHovered(false);
            }
          }}
          onTouchStart={() => {
            // On touch devices, show hover state briefly for feedback
            setHovered(true);
            setTimeout(() => setHovered(false), 100);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            minWidth: "240px",
            height: "40px",
            zIndex: 1001,
            cursor: "pointer",
            userSelect: "none",
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
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={styles.logoSpan}
                    style={{ pointerEvents: 'none' }}
                  >
                    {isHome ? (
                      <span className={styles.logoGreeting}>Hello 👋</span>
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
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0, pointerEvents: 'none' }}
                  >
                    <span className={styles.logoText}>
                      {siteRole}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LocalTime />
          <WebPThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;