"use client";
import React from "react";
import styles from "./ScrollingTicker.module.css";

interface ScrollingTickerProps {
  text: string;
  speed?: number;
  className?: string;
}

const ScrollingTicker: React.FC<ScrollingTickerProps> = ({ 
  text, 
  speed = 5, 
  className = "" 
}) => {
  return (
    <div className={`${styles.tickerContainer} ${className}`}>
      <div 
        className={styles.tickerTrack}
        style={{ 
          animationDuration: `${speed}s`,
          animationDelay: '0s'
        }}
      >
        <span className={styles.tickerText}>{text}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tickerText}>{text}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tickerText}>{text}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tickerText}>{text}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tickerText}>{text}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tickerText}>{text}</span>
      </div>
    </div>
  );
};

export default ScrollingTicker;
