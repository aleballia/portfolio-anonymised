"use client";

import React, { useState } from "react";
import styles from "./SelectedWork.module.css";

export type WorkItem = {
    title: string;
    subtitle: string; // <-- Add this line
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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
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
    <section className="px-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
    <h2 className="h4" style={{ fontWeight: 300 }}>Selected work</h2>
    <div className={styles.workList}>
      {works.map((work, idx) => (
        <div
          href={work.href}
          key={work.title}
          className={styles.workTitle}
          onMouseMove={e => handleMouseMove(e, idx)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleFocus(idx)}
          onBlur={handleBlur}
          tabIndex={0}
        >
        <div>
          <a>{work.title}</a>  <div style={{display: "flex", flexDirection: "row", gap: "2rem"}}>  
            {work.subtitle && (
              <div className={styles.subtitle}>{work.subtitle}</div>
            )}
          </div></div>
        </div>
        
                   
      ))}
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
