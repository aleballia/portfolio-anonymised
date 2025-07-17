"use client";

// src/app/components/Experience.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";

const experiences = [
    {
        title: "Head of Product Design, Innovation & Growth",
        company: "Freedom2hear",
        period: "Jan 2024 – Present",
    },
    {
        title: "Lead Product Designer (Manager)",
        company: "PwC",
        period: "2022 — 23",
    },
    {
        title: "Lead UX/UI Designer",
        company: "Resi",
        period: "2022",
    },
    {
        title: "Design Systems Manager",
        company: "Tom&Co",
        period: "2019 – 22",
    },
    {
        title: "Senior UX/UI Designer",
        company: "Tom&Co",
        period: "2019 – 22",
    },
];

export default function Experience() {
    // Store refs for each circle
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lineHeights, setLineHeights] = useState<number[]>([]);
    const [animatedLines, setAnimatedLines] = useState<boolean[]>([]);
    const [animatedCircles, setAnimatedCircles] = useState<boolean[]>([]);

    useEffect(() => {
        function calculateHeights() {
            const heights: number[] = [];
            for (let i = 0; i < circleRefs.current.length - 1; i++) {
                const current = circleRefs.current[i];
                const next = circleRefs.current[i + 1];
                if (current && next) {
                    const currentRect = current.getBoundingClientRect();
                    const nextRect = next.getBoundingClientRect();
                    const currentCenter = currentRect.top + currentRect.height / 2;
                    const nextCenter = nextRect.top + nextRect.height / 2;
                    heights.push(nextCenter - currentCenter);
                }
            }
            setLineHeights(heights);
        }
        calculateHeights();
        window.addEventListener('resize', calculateHeights);
        return () => window.removeEventListener('resize', calculateHeights);
    }, []);

    // Handler to mark a line as animated
    const handleLineInView = (idx: number) => {
        setAnimatedLines(prev => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
        });
    };

    const handleCircleInView = (idx: number) => {
        setAnimatedCircles(prev => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
        });
    };

    const ANIMATION_DURATION = 0.6;
    const BASE_DELAY = 0.15;

    const circleSizes = [48, 36, 24, 16, 12]; // Progressive sizes for main circles

    return (
        <section
            style={{
                background: "var(--background, #000)",
                color: "var(--primary-shade)",
                padding: "4rem 0",
                minHeight: "80vh"
            }}
        >
            <div
                style={{
                    display: "flex",
                    maxWidth: 1200,
                    margin: "0 auto",
                    alignItems: "flex-start"
                }}
            >
                {/* Left: Title */}
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            fontSize: "5rem",
                            fontWeight: 400,
                            margin: 0,
                            color: "var(--primary-shade)",
                            lineHeight: 1
                        }}
                    >
                        Experience
                    </h2>
                </div>

                {/* Right: Timeline */}
                <div
                    style={{
                        flex: 2,
                        position: "relative",
                        paddingLeft: 0,
                        width: "100%",
                        maxWidth: "100%"
                    }}
                >
                    {experiences.map((exp, idx) => {
                        const size = circleSizes[idx] || 24;
                        const dashedSize = size + 8;
                        const circleClass = idx === 0 ? styles.circleQuad : styles.circleDouble;
                        return (
                            <motion.div
                                key={exp.title}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY }}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: idx === experiences.length - 1 ? 0 : "2.5rem",
                                    position: "relative",
                                    zIndex: 1,
                                    width: "100%",
                                }}
                            >
                                {/* Left: Circle */}
                                <div
                                    ref={el => { circleRefs.current[idx] = el; }}
                                    style={{
                                        width: 48,
                                        minWidth: 48,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative"
                                    }}
                                >
 
                                    
                                    <motion.div
                                        className={`${styles.circle} ${circleClass}`}
                                        initial={{ scale: 0.7 }}
                                        animate={animatedCircles[idx] ? { scale: 1 } : undefined}
                                        whileInView={animatedCircles[idx] ? undefined : { scale: 1 }}
                                        onViewportEnter={() => handleCircleInView(idx)}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * BASE_DELAY }}
                                        style={{
                                            width: size,
                                            height: size,
                                            marginTop: idx === 0 ? 0 : 4,
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    />
                                    {/* Vertical line segment between circles, except after last item */}
                                    {idx < experiences.length - 1 && lineHeights[idx] && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={
                                                animatedLines[idx]
                                                    ? { height: lineHeights[idx] }
                                                    : undefined
                                            }
                                            whileInView={
                                                animatedLines[idx]
                                                    ? undefined
                                                    : { height: lineHeights[idx] }
                                            }
                                            onViewportEnter={() => handleLineInView(idx)}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * BASE_DELAY + 0.2 }}
                                            style={{
                                                position: "absolute",
                                                top: (idx === 0 ? 48 : 32) / 2,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 1,
                                                background: "var(--primary-shade)",
                                                zIndex: 0
                                            }}
                                        />
                                    )}
                                </div>
                                {/* Right: Content */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.1 }}
                                    style={{
                                        marginLeft: 24,
                                        flex: 1,
                                        minWidth: 0
                                    }}
                                >
                                    <motion.h3
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.2 }}
  style={{
    margin: 0,
    fontSize: idx === 0 ? "2rem" : "1.3rem",
    color: "var(--primary-shade)"
  }}
>
  {exp.title}
</motion.h3>
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.25 }}
  style={{
    color: "var(--foreground, #fff)",
    fontSize: "1.1rem",
    marginBottom: 4
  }}
>
  {exp.company} | {exp.period}
</motion.div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                    {/* Button aligned with text */}
                    <div
                        style={{
                            marginLeft: 72,
                            marginTop: "2rem"
                        }}
                        className="resume-btn-wrapper"
                    >
                        <a
                            href="#"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2rem",
                                background: "var(--primary)",
                                color: "var(--primary-foreground, #fff)",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                textDecoration: "none",
                                fontWeight: 700,
                                textAlign: "center"
                            }}
                        >
                            Full resume
                        </a>
                    </div>
                
                    <style jsx>{`
            @media (max-width: 700px) {
              .resume-btn-wrapper {
                margin-left: 0 !important;
                text-align: left;
              }
              div[style*='display: flex'][style*='align-items: flex-start'] {
                flex-direction: column !important;
                align-items: flex-start !important;
              }
              div[style*='width: 48px'][style*='display: flex'] {
                margin-bottom: 1rem;
              }
            }
          `}</style>
                </div>
            </div>
        </section>
    );
}