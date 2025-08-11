"use client";

import React, { useState, useEffect } from 'react';
import styles from './FloatingLiveButton.module.css';

interface FloatingLiveButtonProps {
  liveLink: string;
}

const FloatingLiveButton: React.FC<FloatingLiveButtonProps> = ({ liveLink }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the top of the page (within 10px of top)
      const currentIsAtTop = scrollTop < 10;
      setIsAtTop(currentIsAtTop);
      
      // Hide button when near bottom of page (within 200px of bottom)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 200;
      setIsVisible(!isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!liveLink) return null;

  return (
    <div className={`${styles.floatingButton} ${isVisible ? styles.visible : styles.hidden} ${isAtTop ? styles.atTop : ''}`}>
      <a
        href={liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${styles.floatingLiveBtn}`}
      >
        <span className={styles.text}>Website</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
          <path d="M4 13H16.2L10.6 18.6L12 20L20 12L12 4L10.6 5.4L16.2 11H4V13V13Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  );
};

export default FloatingLiveButton;
