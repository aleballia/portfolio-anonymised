"use client";

import React, { useEffect, useState } from "react";

export function ImmersiveWrapper({ children }: { children: React.ReactNode }) {
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 800; // adjust if you want the switch earlier/later
      setImmersive(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = [
    "immersive-wrapper",
    immersive ? "dark bg-black min-h-screen" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{children}</div>;
}

