"use client";

import React, { useState } from "react";

const skills = [
  {
    title: "Product Design",
    description: "From rebuilding real-time moderation tools at Freedom2hear to optimising conversion flows at Resi, I’ve designed SaaS and eCommerce products used by thousands. My approach combines sharp UX thinking with commercial awareness—shaping features that are both intuitive and outcome-driven.",
  },
  {
    title: "Innovation",
    description: "Driving creative solutions and fostering a culture of experimentation to stay ahead in a fast-changing world.",
  },
  {
    title: "Leadership",
    description: "Leading teams with empathy, vision, and clarity—empowering others to do their best work.",
  },
  {
    title: "Design Systems",
    description: "Building scalable, consistent design systems that accelerate product development and ensure brand coherence.",
  },
];

export default function Skills() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-section" style={{ marginBottom: 200  }}>
      <h2 className="h4" style={{ textAlign: "left", marginBottom: 32  }}>Core skills</h2>
      <div style={{
        borderTop: "2px solid var(--border)",
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

              
              borderBottom: "2px solid var(--border)",

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
                maxHeight: open === i ? 200 : 0,
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
