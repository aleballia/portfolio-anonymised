"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={`${styles.footer} caption`}>
   <div className="px-section">
    <div className={styles.footerContainer}>
      <span>© 2025 Alessandra Balliana – Portfolio – Built with Cursor</span>
    </div>
   </div>
  </footer>
);

export default Footer;
