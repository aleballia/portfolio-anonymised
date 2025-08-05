"use client";

import React, { useState } from "react";

const skills = [
  {
    title: "Product Design",
    description: "With 8+ years of experience across B2B, B2C, SaaS, and eCommerce, I’ve built products in fast-paced in-house and agency teams. I combine strategic thinking, technical fluency, and commercial awareness to design thoughtful, user-centred solutions that drive business impact.",
  },
  {
    title: "Innovation",
    description: "I thrive in multidisciplinary teams working with emerging technologies. I bring structure to ambiguity, using strategic thinking and experimentation to explore bold ideas and turn them into focused product direction. My approach helps teams align quickly, test with purpose, and move forward with clarity.",
  },
  {
    title: "Leadership",
    description: "I lead with clarity, empathy, and purpose. Whether guiding cross-functional teams or mentoring individuals, I focus on aligning vision with execution and creating space for others to grow. I’m passionate about building communities around design, fostering a sense of shared purpose, and shaping cultures where people can do their best work.",
  },
  {
    title: "Design Systems",
    description: "Since 2019, I’ve led the creation and evolution of design systems for organisations ranging from early-stage startups to global brands. From white-label frameworks to multi-brand libraries, my focus is on systems that scale with product growth, support accessibility, and drive alignment across teams, always tied to measurable impact.",
  },
];

export default function Skills() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-section" style={{ marginBottom: 200  }}>
      <h2 className="h4" style={{ textAlign: "left", marginBottom: 32  }}>Core skills</h2>
      <div style={{
        borderTop: "0.5px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
      }}>
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            style={{

              
              borderBottom: "0.5px solid var(--border)",

              padding: "1.5rem 1.5rem",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              minHeight: 120,
              position: "relative",
              width: "100%",
            }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="h3" style={{ display: "flex", alignItems: "center" , fontWeight: 400 }}>
  {open === i ? (
    // Minus icon
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" style={{ marginRight: 12, verticalAlign: "middle" }}>
      <path d="M4 10h12" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ) : (
    // Plus icon
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" style={{ marginRight: 12, verticalAlign: "middle" }}>
      <path d="M10 4v12M4 10h12" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )}
  {skill.title}
</div>
            {/* Show description on desktop, or as an accordion on mobile */}
            <div
              style={{
                fontSize: "1rem",
                color: "var(--foreground)",
                overflow: "hidden",
                transition: "max-height 0.3s",
                marginTop: open === i ? 8 : 0,
                fontWeight: 300,
              }}
            >
              {open === i && skill.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
