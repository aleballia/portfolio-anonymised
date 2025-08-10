"use client";

// src/app/components/Experience.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";

const experiences = [
    {
        title: "Head of Product Design",
        company: "Freedom2hear, Innovation & Growth",
        period: "Jan 2024 to Present",
    },
    {
        title: "Lead Product Designer (Manager)",
        company: "PwC, Experience Design",
        period: "Nov 2022 to Nov 2023",
    },
    {
        title: "Lead UX/UI Designer",
        company: "Resi, Challenger Scale Up",
        period: "Jun 2022 to Nov 2023",
    },
    {
        title: "Design Systems Manager",
        company: "Tom&Co, Ecommerce Agency",
        period: "Jul 2019 to Jun 2022",
    },
    {
        title: "Senior UX/UI Designer",
        company: "Tom&Co, Ecommerce Agency",
        period: "Jul 2019 to Jun 2022",
    },
    {
        title: "button", // Special marker for button
        company: "",
        period: "",
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

    const circleSizes = [48, 36, 24, 16, 12, 12]; // Progressive sizes for main circles

    return (
        <div
            style={{
                color: "var(--foreground)",
                minHeight: "80vh",
            }}
        >
            <div
                className={styles.experienceContainer}
                style={{
                    display: "flex",
                    margin: "0 auto",
                    alignItems: "flex-start"
                }}
            >
                {/* Left: Title */}
                <div className={styles.experienceTitle} style={{ flex: 2, marginTop: "-32px" }}>
                    <h2 
                      className="display"
                      style={{ fontWeight: 400 }}
                    >
                      Experience
                    </h2>
                </div>

                {/* Right: Timeline */}
                <div
                    className={styles.timelineContainer}
                    style={{
                        flex: 2.5, // This gives the timeline more space
                        position: "relative",
                        paddingLeft: 0,
                        width: "100%",
                        maxWidth: "100%"
                    }}
                >
                    {experiences.map((exp, idx) => {
                        const size = circleSizes[idx] || 24;
                        const circleClass = idx === 0 ? styles.circleQuad : styles.circleDouble;
                        return (
                            <motion.div
                                key={exp.title}
                                className={styles.timelineItem}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY }}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: idx === experiences.length - 1 ? 0 : "4rem",
                                    position: "relative",
                                    zIndex: 1,
                                    width: "100%",
                                    marginLeft: "3.275rem"
                                }}
                            >
                                {/* Left: Circle */}
                                <div
                                    ref={el => { circleRefs.current[idx] = el; }}
                                    className={styles.circleContainer}
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
                                                background: "var(--primary)",
                                                zIndex: 0
                                            }}
                                        />
                                    )}
                                </div>
                                {/* Right: Content */}
                                <motion.div
                                    className={styles.contentContainer}
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
                                    {exp.title === "button" ? (
                                        <motion.div
                                            className={styles.downloadButton}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.2 }}
                                            style={{ marginLeft: 10 }}
                                        >
                                            <a
                                                href="/ab-resume.pdf"
                                                className="btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Download CV
                                            </a>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <motion.h3
                                                className={`${idx === 0 ? "h2" : "h3"} ${styles.jobTitle}`}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.2 }}
                                                style={{ 
                                                  margin: 0, 
                                                  marginLeft: 10, 
                                                  marginBottom: 8,
                                                  fontWeight: 200,
                                                }}
                                            >
                                                {exp.title}
                                            </motion.h3>
                                            <motion.div
                                                className={`p ${styles.jobDetails}`}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{ duration: ANIMATION_DURATION, delay: idx * BASE_DELAY + 0.25 }}
                                                style={{ 
                                                  marginBottom: 4, 
                                                  marginLeft: 12,
                                                }}
                                            >
                                               <span style={{ fontWeight: 400 }}>{exp.company}</span> <span style={{ fontWeight: 200 }}> – {exp.period}</span>
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}