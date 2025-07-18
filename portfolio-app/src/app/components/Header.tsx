"use client";
import React from "react";

const Header: React.FC = () => (
  <header className="px-section" style={{ background: "transparent", color: "var(--foreground)", paddingTop: "24px" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span className="h4" style={{ letterSpacing: "-0.02em", color: "var(--foreground)" }}>
        Alessandra Balliana
      </span>
      <nav style={{display: "flex", gap: "2rem", alignItems: "center"}}>
        <a className="p" href="#selected-work" style={{ fontWeight: 400, color: "var(foreground)" }}>
          Selected work
        </a>
        <a className="p" href="https://linkedin.com" style={{ fontWeight: 400, color: "var(foreground)" }}>
          About
        </a>
      </nav>
    </div>
  </header>
);

export default Header; 