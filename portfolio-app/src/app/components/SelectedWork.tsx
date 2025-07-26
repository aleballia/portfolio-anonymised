"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SelectedWork.module.css";
import Link from "next/link";

export type WorkItem = {
    title: string;
    subtitle: string;
    tags: string;
    image: string;
    href: string;
};

interface SelectedWorkProps {
  works: WorkItem[];
}

const OFFSET_X = 32;
const OFFSET_Y = 0;

const SelectedWork: React.FC<SelectedWorkProps> = ({ works }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoveredTitle, setHoveredTitle] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 920 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple text swap component
  const AnimatedText = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
    return (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ 
          fontFamily: 'monospace', 
          color: 'var(--accent-secondary)',
          display: 'block'
        }}
      >
        {text}
      </motion.span>
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setCursor({ x: e.clientX + OFFSET_X, y: e.clientY + OFFSET_Y });
    setHoveredIdx(idx);
  };

  const handleFocus = (idx: number) => {
    setHoveredIdx(idx);
    setHoveredTitle(idx);
  };

  const handleBlur = () => {
    setHoveredIdx(null);
    setHoveredTitle(null);
  };

  return (
    <>
      <section id="selected-work" className="px-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <h2 className="h4" style={{  }}>Selected projects
        </h2>
        
        

        <div className={styles.workList}>
          {works.map((work, idx) => {
            const hoverMessage =
              work.title === 'Tom&Co.'
                ? 'Design System'
                : work.title === 'Freedom2hear'
                ? 'AI Innovation'
                : work.title === 'MyFujifilm'
                ? 'Ecommerce'
                : '';
            return (
            <div
              className={styles.workTitle}
              key={work.title}
              onMouseMove={e => handleMouseMove(e, idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Inline image for mobile only */}
                <img
                  src={work.image}
                  alt={work.title}
                  className={styles.mobileImage}
                  aria-hidden="true"
                />
                <Link
                  href={work.href}
                  className={styles.workButton}
                  tabIndex={0}
                  onFocus={() => handleFocus(idx)}
                  onBlur={handleBlur}
                >
                  <span className={styles.workTitleText}>{work.title}</span>
                  {hoverMessage && <span className={styles.hoverMessage}>{hoverMessage}</span>}
                </Link>
                <div className={styles.mobileSubtitle}>
                  {work.subtitle}
                </div>
              </div>
            );
          })}
          {/* Floating preview image for desktop hover */}
          {hoveredIdx !== null && (
            <img
              src={works[hoveredIdx].image}
              alt={works[hoveredIdx].title}
              className={styles.previewImg}
              style={{
                left: cursor.x,
                top: cursor.y,
                pointerEvents: "none",
              }}
            />
          )}
          {/* Floating tag for desktop hover */}
          {hoveredIdx !== null && isDesktop && (
            <div
              className={styles.floatingTag}
              style={{
                position: "fixed",
                left: cursor.x + 20,
                top: cursor.y - 10,
                pointerEvents: "none",
                zIndex: 1000,
                background: "var(--accent)",
                color: "var(--accent-foreground)",
                padding: "0.25rem 1rem",
                borderRadius: "9999px",
                fontSize: "1.25rem",
                fontWeight: "600",
                whiteSpace: "nowrap",
                opacity: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {works[hoveredIdx].title === 'Tom&Co.'
                ? 'Design System'
                : works[hoveredIdx].title === 'Freedom2hear'
                ? 'AI Innovation'
                : works[hoveredIdx].title === 'MyFujifilm'
                ? 'Ecommerce'
                : ''}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SelectedWork;
