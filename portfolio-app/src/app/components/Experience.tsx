// src/app/components/Experience.tsx
import React from "react";

const experiences = [
  {
    title: "Head of Strategy & Design",
    company: "GoBubble AI Tech",
    period: "2024 – Present",
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
  return (
    <section
      style={{
        background: "var(--background, #000)",
        color: "var(--primary, #7e27e0)",
        padding: "4rem 0",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: 1200,
          margin: "0 auto",
          alignItems: "flex-start",
        }}
      >
        {/* Left: Title */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "5rem",
              fontWeight: 400,
              margin: 0,
              color: "var(--primary, #7e27e0)",
              lineHeight: 1,
            }}
          >
            Experience
          </h2>
        </div>

        {/* Right: Timeline */}
        <div style={{ flex: 2, position: "relative", paddingLeft: "4rem" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "32px",
              top: "16px",
              bottom: "32px",
              width: "4px",
              background: "var(--primary, #7e27e0)",
              opacity: 0.3,
              zIndex: 0,
            }}
          />
          {/* Timeline items */}
          {experiences.map((exp, idx) => (
            <div
              key={exp.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: idx === experiences.length - 1 ? 0 : "3rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--primary, #7e27e0)",
                  border: idx === 0 ? "6px solid var(--background, #000)" : "none",
                  boxShadow: idx === 0 ? "0 0 0 6px var(--primary, #7e27e0, #7e27e0)" : "none",
                  marginRight: 32,
                  marginTop: idx === 0 ? 0 : 4,
                }}
              />
              {/* Content */}
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: idx === 0 ? "2rem" : "1.3rem",
                    color: "var(--primary, #7e27e0)",
                  }}
                >
                  {exp.title}
                </h3>
                <div
                  style={{
                    color: "var(--foreground, #fff)",
                    fontSize: "1.1rem",
                    marginBottom: 4,
                  }}
                >
                  {exp.company} | {exp.period}
                </div>
              </div>
            </div>
          ))}
          {/* Button */}
          <a
            href="#"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              padding: "1rem 2.5rem",
              background: "var(--primary, #7e27e0)",
              color: "var(--primary-foreground, #fff)",
              borderRadius: "var(--radius, 12px)",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Full resumé
          </a>
        </div>
      </div>
    </section>
  );
}