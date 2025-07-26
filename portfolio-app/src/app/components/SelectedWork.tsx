"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "../../lib/caseStudies";

const OFFSET_X = 32;
const OFFSET_Y = 0;

const SelectedWork: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 920 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setCursor({ x: e.clientX + OFFSET_X, y: e.clientY + OFFSET_Y });
    setHoveredIdx(idx);
  };

  const handleFocus = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleBlur = () => {
    setHoveredIdx(null);
  };

  return (
    <>
      <section id="selected-work" className="px-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <h2 className="h4" style={{  }}>Selected projects
        </h2>
        
        

        <div className={styles.workList}>
          {caseStudies.map((work, idx) => (
            <div
              className={styles.workTitle}
              key={work.id}
              onMouseMove={e => handleMouseMove(e, idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Inline image for mobile only */}
                <img
                  src={work.mainImage}
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
                  {work.hoverMessage && <span className={styles.hoverMessage}>{work.hoverMessage}</span>}
                </Link>
                <div className={styles.mobileSubtitle}>
                  {work.subtitle}
                </div>
              </div>
            ))}
          {/* Floating preview image for desktop hover */}
          {hoveredIdx !== null && (
            <img
              src={caseStudies[hoveredIdx].mainImage}
              alt={caseStudies[hoveredIdx].title}
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
              {caseStudies[hoveredIdx].hoverMessage}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SelectedWork;
