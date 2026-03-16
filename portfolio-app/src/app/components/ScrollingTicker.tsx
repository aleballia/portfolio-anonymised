"use client";
import React from "react";
import styles from "./ScrollingTicker.module.css";

interface ScrollingTickerProps {
  text: string;
  speed?: number;
  className?: string;
}

const REPEAT_COUNT = 8;

const ScrollingTicker: React.FC<ScrollingTickerProps> = ({ 
  text, 
  speed = 5, 
  className = "" 
}) => {
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => (
    <React.Fragment key={i}>
      <span className={styles.tickerText}>{text}</span>
      <span className={styles.separator}>•</span>
    </React.Fragment>
  ));

  return (
    <div className={`${styles.tickerContainer} ${className}`}>
      <div 
        className={styles.tickerTrack}
        style={{ 
          animationDuration: `${speed}s`,
          animationDelay: '0s'
        }}
      >
        {items}
        {items}
      </div>
    </div>
  );
};

export default ScrollingTicker;
