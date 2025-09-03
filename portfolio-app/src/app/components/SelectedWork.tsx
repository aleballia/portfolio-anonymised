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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
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
            <Link
              href={work.href}
              key={work.id}
              className={styles.workTitle}
              onMouseMove={e => handleMouseMove(e, idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave()}
              onFocus={() => handleFocus(idx)}
              onBlur={handleBlur}
              onClick={() => {
                // Save current scroll position before navigating to case study
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                sessionStorage.setItem('scrollPosition', scrollPosition.toString());
              }}
            >
              {/* Work content */}
              <div className={styles.workContent}>
                <span className={styles.workTitleText}>{work.title}</span>
                <div className={styles.workSubtitle}>
                  {work.subtitle}
                </div>
              </div>
              
              {/* Work image with hover animation */}
              <div className={styles.imageContainer}>
                <Image
                  src={work.mainImage}
                  alt={work.title}
                  width={400}
                  height={300}
                  className={styles.workImage}
                  aria-hidden="true"
                />
              </div>
            </Link>
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
                left: cursor.x + 20,
                top: cursor.y - 10,
              }}
            >
              View Project
            </div>
          )}
        </div>
    </>
  );
};

export default SelectedWork;
