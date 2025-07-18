"use client";

import React from "react";

export default function Hero() {
  return (
    <section 
      style={{ 
        background: "var(--primary-shade)", 
        color: "var(--primary-shade-foreground)", 
        padding: "6rem 2rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "left"
      }}
    >

      <div style={{ maxWidth: "1200px", width: "100%", textAlign: "left", position: "relative", zIndex: 1 }}>
        <h1 
          className="display"
          style={{ 
            color: "var(--primary-shade-foreground)",
            fontWeight: 300
          }}
        >
          Alessandra Balliana
        </h1>
        
        <p 
          className="h3"
          style={{ 
            color: "var(--primary-shade-foreground)",
            fontWeight: 300
          }}
        >
         Product Design Lead
        </p>
        
      </div>
    </section>
  );
}