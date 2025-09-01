"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import styles from './Stats.module.css';

interface StatItem {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

interface StatsProps {
  title?: string;
  stats: StatItem[];
  layout?: 'grid' | 'list';
}

const Stats: React.FC<StatsProps> = ({ title, stats, layout = 'grid' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Add error handling after hooks
  if (!stats || !Array.isArray(stats) || stats.length === 0) {
    console.error('Stats component: Invalid or empty stats prop', { title, stats, layout });
    return (
      <div className={styles.statsContainer}>
        <div className="text-center text-muted-foreground p-4">
          {title && <h3 className={styles.statsTitle}>{title}</h3>}
          <p>No stats data available</p>
        </div>
      </div>
    );
  }

  const parseValue = (value: string) => {
    // Handle different value formats
    if (value.includes('%')) {
      const number = parseFloat(value.replace('%', ''));
      return { number: Math.abs(number), suffix: '%', isNegative: number < 0 };
    }
    if (value.includes('+')) {
      return { number: parseFloat(value.replace('+', '')), suffix: '', isNegative: false };
    }
    if (value.includes('-')) {
      return { number: parseFloat(value.replace('-', '')), suffix: '', isNegative: true };
    }
    return { number: parseFloat(value) || 0, suffix: '', isNegative: false };
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'var(--green-500)';
      case 'negative':
        return 'var(--red-500)';
      default:
        return 'var(--muted-foreground)';
    }
  };

  return (
    <div ref={ref} className={styles.statsContainer}>
      <div className={`${styles.statsGrid} ${layout === 'list' ? styles.statsList : ''}`}>
        {stats.map((stat, index) => {
          const { number, suffix, isNegative } = parseValue(stat.value);
          
          return (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
            >
              <div className={styles.statValue}>
                <motion.span
                  className={styles.statNumber}
                  initial={{ scale: 0.8 }}
                  animate={isInView ? { } : { }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: index * 0.1 + 0.3
                  }}
                >
                  <AnimatedCounter 
                    value={number} 
                    suffix={suffix}
                    isVisible={isInView}
                    delay={index * 0.1 + 0.5}
                    isNegative={isNegative}
                  />
                </motion.span>
              </div>
              
              <div className={styles.statDetails}>
                <div className={styles.statLabel}>{stat.label}</div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
  isNegative: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix, isVisible, delay, isNegative }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = value / steps;
    const stepDuration = duration / steps;
    
    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isVisible, value]);

  // Add error handling after hooks
  if (typeof value !== 'number' || isNaN(value)) {
    console.error('AnimatedCounter: Invalid value prop', value);
    return <span>Error: Invalid value</span>;
  }

  // Format the number based on the original value
  const formatNumber = (num: number) => {
    if (value >= 100) {
      return Math.round(num).toLocaleString();
    } else if (value >= 10) {
      return Math.round(num * 10) / 10;
    } else {
      return Math.round(num * 100) / 100;
    }
  };

  return (
    <span>
      {isNegative ? '-' : '+'}
      {formatNumber(count)}{suffix}
    </span>
  );
};

export default Stats;
