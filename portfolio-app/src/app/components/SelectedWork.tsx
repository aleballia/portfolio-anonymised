"use client";

import React, { useState } from "react";
import styles from "./SelectedWork.module.css";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setCursor({ x: e.clientX + OFFSET_X, y: e.clientY + OFFSET_Y });
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const handleFocus = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleBlur = () => {
    setHoveredIdx(null);
  };

  return (
    <section id="selected-work" className="px-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
    <h2 className="h4" style={{  }}>Selected projects
    </h2>
    
    

    <div className={styles.workList}>
      {works.map((work, idx) => (
        <div
          className={styles.workTitle}
          key={work.title}
          onMouseMove={e => handleMouseMove(e, idx)}
          onMouseLeave={handleMouseLeave}
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
          <div>
            <a href={work.href}>{work.title}</a>
            <div className={styles.subtitle}>{work.subtitle}</div>
          </div>
        </div>
      ))}
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
  );
};

export default SelectedWork;
