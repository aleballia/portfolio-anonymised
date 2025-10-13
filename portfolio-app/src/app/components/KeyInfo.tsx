"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './KeyInfo.module.css';

interface KeyInfoItem {
  heading: string;
  description: string;
}

interface KeyInfoProps {
  title?: string;
  items: KeyInfoItem[];
  layout?: 'grid' | 'list';
  caption?: string;
}

const KeyInfo: React.FC<KeyInfoProps> = ({ title, items, layout = 'grid', caption }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Add error handling
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.error('KeyInfo component: Invalid or empty items prop', { title, items, layout });
    return (
      <div className={styles.keyInfoContainer}>
        <div className="text-center text-muted-foreground p-4">
          {title && <h3 className={styles.keyInfoTitle}>{title}</h3>}
          <p>No key information available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.keyInfoWrapper}>
      <div className={styles.keyInfoContainer}>
        <div className={`${styles.keyInfoGrid} ${layout === 'list' ? styles.keyInfoList : ''}`}>
        {caption && (
        <div className={`caption ${styles.keyInfoCaption}`}>
          {caption}
        </div>
      )}
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={styles.keyInfoItem}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
            >
              <div className={styles.keyInfoHeading}>
                {item.heading}
              </div>
              <div className={styles.keyInfoDescription}>
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyInfo;
