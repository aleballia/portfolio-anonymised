"use client";

import React from "react";

export default function Hero() {
  return (
   
    <section 
    className="px-section"
    style={{
        // background: "var(--background)", // REMOVE this line
        color: "var(--foreground)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        background: "transparent", // Optional: ensure transparency
      }}
    >

      <div  style={{ width: "100%", textAlign: "left", position: "relative", zIndex: 1 }}>
        <h1 
            className="display"
            style={{ 
            color: "var(--foreground)",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Product Designer & Strategist

        </h1>
        <h2 className="display" style={{ 
            color: "var(--foreground)",
            marginBottom: 48,
            fontWeight: 200,
          }}>leading with curiosity and purpose.</h2>
        <p 
          className="h3"
          style={{ 
            color: "var(--foreground)",
            paddingBottom: 24,
            fontWeight: 400,
          }}
        >
        I believe the best ideas come from collaboration: working together to explore, align, and build towards shared goals.
        I’ll always be the person in the room asking challenging questions. Not to be difficult, but to get to what matters, reconsider assumptions, and 
        <span style={{color: "var(--accent-secondary)", marginLeft: 8 }}>
        unlock what’s possible. </span>
    </p> 
        
      </div>
    </section>
  );
}