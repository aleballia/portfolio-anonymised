"use client";

import React from "react";
import ScrollingTicker from "./ScrollingTicker";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
   
    <section className="px-section"
    style={{
        // background: "var(--background)", // REMOVE this line
        color: "var(--foreground)",
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        background: "transparent",
      }}
    >

      <div  style={{ width: "100%", textAlign: "left", position: "relative", zIndex: 1 }}>
        <div style={{ 
          marginBottom: "var(--space-xl)",
        }}>
          <ScrollingTicker 
            text="Leading with curiosity & purpose" 
            speed={40}
            className="display"
          />
        </div>

        <p 
          className={`${styles.heroParagraph} p`}
          style={{ 
          color: "var(--foreground)",
          fontWeight: 300,
          }}
        >
        I’m the person in the room who asks inquisitive questions. Not to be difficult, but to get to what matters, rethink assumptions, and 
        <b style={{color: "var(--accent-secondary)", fontWeight: 500}}> unlock what’s possible</b>. I believe that the best ideas come from collaboration: working together to explore, align, and build towards <b style={{color: "var(--accent-secondary)", fontWeight: 500}}> shared goals</b>.
    </p> 
        
      </div>
    </section>
  );
}