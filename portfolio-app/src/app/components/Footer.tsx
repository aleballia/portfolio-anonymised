"use client";

import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const SCROLL_THRESHOLD = 120;

const Footer: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <footer className={`${styles.footer} ${visible ? styles.visible : ""} caption`}>
      <div className="px-section">
        <div className={styles.footerContainer}>
          <span>© 2025 Alessandra Balliana – Portfolio – Built with Cursor</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
