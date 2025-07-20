"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (!isHome && hovered) {
      e.preventDefault();
      router.back();
    } else if (!isHome && !hovered) {
      window.location.href = "/";
    }
  };

  return (
    <header className="px-section" style={{ width: "100%", background: "transparent", color: "var(--foreground)", paddingTop: "24px", paddingBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          onMouseEnter={() => !isHome && setHovered(true)}
          onMouseLeave={() => !isHome && setHovered(false)}
          style={{
            perspective: "600px",
            display: "inline-block",
            position: "relative",
            minWidth: "240px",
            height: "40px",
            cursor: "pointer",
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
              transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1)",
              transformStyle: "preserve-3d",
              transform: !isHome && hovered ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          >
            {/* Front Face */}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backfaceVisibility: "hidden",
                opacity: !isHome && hovered ? 0 : 1,
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Alessandra Balliana
            </span>
            {/* Back Face */}
            {!isHome && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                  <path d="M20 11H7.8L13.4 5.4L12 4L4 12L12 20L13.4 18.6L7.8 13H20V11V11Z" fill="currentColor"/>
                </svg>
                Back
              </span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;