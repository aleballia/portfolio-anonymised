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
            fontWeight: 200,
            marginBottom: "var(--space-xl)",
          }}
        >
          Product Designer & Strategist —
        
         <b className="display" style={{ 
            color: "var(--foreground)",
            fontWeight: 400,
          }}> Leading with curiosity and purpose.</b></h1>

        <p 
          className="h3"
          style={{ 
          color: "var(--foreground)",
          fontWeight: 300,
          }}
        >
        I believe the best ideas come from collaboration: working together to explore, align, and build towards shared goals.
        I’ll always be the person in the room asking challenging questions. Not to be difficult, but to get to what matters, reconsider assumptions, and 
        <b style={{color: "var(--accent-secondary)", fontWeight: 400}}> unlock what’s possible. </b>
    </p> 
        
      </div>
    </section>
  );
}