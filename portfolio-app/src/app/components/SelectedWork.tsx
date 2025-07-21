"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SelectedWork.module.css";
import LazyCaseStudy from "./LazyCaseStudy";

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
  const [isNavigating, setIsNavigating] = useState(false);
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 920 : true);

  React.useEffect(() => {
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

  const handleWorkClick = (work: WorkItem) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    // Extract the work slug from the href (e.g., "/work/dragonfly" -> "dragonfly")
    const workSlug = work.href.split('/').pop();
    if (workSlug) {
      setOpenCaseStudy(workSlug);
    }
    
    setIsNavigating(false);
  };

  const handleCloseModal = () => {
    setOpenCaseStudy(null);
  };

  return (
    <>
      <section id="selected-work" className="px-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <h2 className="h4" style={{  }}>Selected projects
        </h2>
        
        

        <div className={styles.workList}>
          {works.map((work, idx) => {
            const arrowSvg = (
              <svg
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: 8, verticalAlign: 'middle' }}
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            );
            const hoverMessage =
              work.title === 'Tom&Co.'
                ? <><span>Design System</span>{arrowSvg}</>
                : work.title === 'Freedom2hear'
                ? <><span>AI Innovation</span>{arrowSvg}</>
                : work.title === 'MyFujifilm'
                ? <><span>Ecommerce</span>{arrowSvg}</>
                : '';
            return (
              <div
                className={styles.workTitle}
                key={work.title}
                onMouseMove={e => handleMouseMove(e, idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => handleFocus(idx)}
                onBlur={handleBlur}
                tabIndex={0}
              >
                {/* Inline image for mobile only */}
                <img
                  src={work.image}
                  alt={work.title}
                  className={styles.mobileImage}
                  aria-hidden="true"
                />
                <button
                  onClick={() => handleWorkClick(work)}
                  disabled={isNavigating}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: isNavigating ? 'default' : 'pointer',
                    color: 'inherit',
                    textDecoration: 'none',
                    opacity: isNavigating ? 0.7 : 1,
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    outline: 'none',
                    minHeight: '1.2em',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '1.2em', perspective: '400px' }}>
                    <AnimatePresence mode="wait">
                      {isDesktop && hoveredIdx === idx ? (
                        <motion.span
                          key={`hovered-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          style={{ color: 'var(--accent-secondary)', display: 'inline-flex', alignItems: 'center' }}
                        >
                          {hoverMessage}
                        </motion.span>
                      ) : !isDesktop && hoveredIdx === idx ? (
                        <span style={{ color: 'var(--accent-secondary)', display: 'inline-flex', alignItems: 'center' }}>{hoverMessage}</span>
                      ) : (
                        isDesktop ? (
                          <motion.span
                            key={`default-${idx}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ display: 'inline-block' }}
                          >
                            {work.title}
                          </motion.span>
                        ) : (
                          <span>{work.title}</span>
                        )
                      )}
                    </AnimatePresence>
                  </span>
                </button>
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
        </div>
      </section>

      {/* Lazy Case Study Modal */}
      {openCaseStudy && (
        <LazyCaseStudy
          workSlug={openCaseStudy}
          isOpen={!!openCaseStudy}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SelectedWork;
