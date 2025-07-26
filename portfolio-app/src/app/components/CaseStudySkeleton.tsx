import React from "react";

const skeletonStyle = {
  background: "#ffbaba", // bright debug color
  borderRadius: "8px",
  animation: "pulse 1.5s infinite",
};

export default function CaseStudySkeleton() {
  return (
    <div style={{
      padding: "2rem",
      minHeight: 400,
      border: "2px solid red", // debug border
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>
      <div style={{ ...skeletonStyle, width: "60%", height: "2.5rem", marginBottom: "1rem" }} />
      <div style={{ ...skeletonStyle, width: "40%", height: "1.5rem", marginBottom: "2rem" }} />
      <div style={{ ...skeletonStyle, width: "100%", height: "1.2rem" }} />
      <div style={{ ...skeletonStyle, width: "90%", height: "1.2rem" }} />
      <div style={{ ...skeletonStyle, width: "80%", height: "1.2rem" }} />
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 