"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlaygroundFAB.module.css";

interface PlaygroundFABProps {
  active: boolean;
  onClick: () => void;
}

const PlaygroundFAB: React.FC<PlaygroundFABProps> = ({ active, onClick }) => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop((window.pageYOffset || document.documentElement.scrollTop) < 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!active && (
        <motion.div
          className={`${styles.wrapper} ${isAtTop ? styles.atTop : ""}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button
            data-playground-fab
            className={styles.fab}
            onClick={onClick}
            title="Open playground – draw and add stickers!"
          >
            <span className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </span>
            <span className={styles.label}>Creative break</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundFAB;
