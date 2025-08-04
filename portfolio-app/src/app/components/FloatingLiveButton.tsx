"use client";

import React, { useState, useEffect } from 'react';
import styles from './FloatingLiveButton.module.css';

interface FloatingLiveButtonProps {
  liveLink: string;
}

const FloatingLiveButton: React.FC<FloatingLiveButtonProps> = ({ liveLink }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
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
    <div className={`${styles.floatingButton} ${isVisible ? styles.visible : styles.hidden}`}>
      <a 
        href={liveLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.button}
      >
     {/*   <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path 
            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <polyline 
            points="15,3 21,3 21,9" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <line 
            x1="10" 
            y1="14" 
            x2="21" 
            y2="3" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg> */}
        <span className={styles.text}>Visit Live Site</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
          <path d="M4 13H16.2L10.6 18.6L12 20L20 12L12 4L10.6 5.4L16.2 11H4V13V13Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  );
};

export default FloatingLiveButton;
