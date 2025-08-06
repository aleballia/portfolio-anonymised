"use client";

import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "loose" | "none";
  id?: string;
}

export default function Section({ 
  children, 
  className = "", 
  spacing = "default",
  id 
}: SectionProps) {
  const spacingClass = spacing === "none" ? "" : `section-${spacing === "default" ? "" : spacing}`;
  
  return (
    <section 
      id={id}
      className={`px-section ${spacingClass} ${className}`}
    >
      {children}
    </section>
  );
}
