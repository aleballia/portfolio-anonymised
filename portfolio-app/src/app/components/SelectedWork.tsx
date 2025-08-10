"use client";

import React, { useState, useEffect } from "react";
import styles from "./SelectedWork.module.css";
import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudies } from "../../lib/caseStudies";

const OFFSET_X = 32;
const OFFSET_Y = 0;

const SelectedWork: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 920 : true);

  // Get filtered case studies (excluding hidden ones)
  const visibleCaseStudies = getAllCaseStudies();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    // Only trigger hover on non-touch devices
    if (!('ontouchstart' in window)) {
      setCursor({ x: e.clientX + OFFSET_X, y: e.clientY + OFFSET_Y });
      setHoveredIdx(idx);
    }
  };

  const handleFocus = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleBlur = () => {
    setHoveredIdx(null);
  };

  const handleMouseEnter = (idx: number) => {
    // Only trigger hover on non-touch devices
    if (!('ontouchstart' in window)) {
      setHoveredIdx(idx);
    }
  };

  const handleMouseLeave = () => {
    // Only trigger hover on non-touch devices
    if (!('ontouchstart' in window)) {
      setHoveredIdx(null);
    }
  };

  return (
    <>
      <h2 className="heading-section h4">Selected projects</h2>
        
        <div className={styles.workList}>
          {visibleCaseStudies.map((work, idx) => (
            <div
              className={styles.workTitle}
              key={work.id}
              onMouseMove={e => handleMouseMove(e, idx)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {/* Inline image for mobile only */}
                <Image
                  src={work.mainImage}
                  alt={work.title}
                  width={400}
                  height={300}
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
                </Link>
                <div className={styles.mobileSubtitle}>
                  {work.subtitle}
                </div>
              </div>
            ))}
          {/* Floating preview image for desktop hover */}
          {hoveredIdx !== null && !('ontouchstart' in window) && (
            <Image
              src={visibleCaseStudies[hoveredIdx].mainImage}
              alt={visibleCaseStudies[hoveredIdx].title}
              width={400}
              height={300}
              className={styles.previewImg}
              style={{
                left: cursor.x,
                top: cursor.y,
                pointerEvents: "none",
              }}
            />
          )}
          {/* Floating tag for desktop hover */}
          {hoveredIdx !== null && isDesktop && !('ontouchstart' in window) && (
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
              {visibleCaseStudies[hoveredIdx].hoverMessage}
            </div>
          )}
        </div>
    </>
  );
};

export default SelectedWork;
