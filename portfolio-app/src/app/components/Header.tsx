"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (!isHome && hovered) {
      e.preventDefault();
      // Set sessionStorage to indicate we're returning from a case study
      sessionStorage.setItem('returningFromCaseStudy', 'true');
      router.back();
    } else if (!isHome && !hovered) {
      // Set sessionStorage to indicate we're returning from a case study
      sessionStorage.setItem('returningFromCaseStudy', 'true');
      window.location.href = "/";
    }
  };

  return (
    <header className="px-section" style={{ width: "100%", background: "transparent", color: "var(--foreground)", paddingTop: "24px", paddingBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-block",
            position: "relative",
            minWidth: "240px",
            height: "40px",
            cursor: "pointer",
            zIndex: 1001,
          }}
          onClick={handleClick}
        >
          <span
            className="h4"
            style={{
              display: "inline-block",
              width: "100%",
              height: "40px",
              position: "relative",
            }}
          >
            <span style={{ display: 'block', minHeight: '1.2em', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {!hovered ? (
                  <motion.span
                    key="logo-default"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0 }}
                  >
                    Alessandra Balliana
                  </motion.span>
                ) : (
                  <motion.span
                    key="logo-hovered"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'absolute', left: 0, right: 0, color: 'var(--accent-secondary)' }}
                  >
                    {isHome ? (
                      <>Hi 👋</>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                          <path d="M20 11H7.8L13.4 5.4L12 4L4 12L12 20L13.4 18.6L7.8 13H20V11V11Z" fill="currentColor"/>
                        </svg>
                        Back
                      </>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;