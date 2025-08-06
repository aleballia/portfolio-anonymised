"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
   <div className="px-section">
   <span >© 2025 Alessandra Balliana – Product Design Lead Portfolio – Built with Cursor</span>
    <nav className={styles.footerNav}>
      <a href="mailto:alessandraballiana@gmail.com">Contact</a>
      <a target="_blank" href="https://linkedin.com/in/alessandraballiana">LinkedIn</a>
    </nav>
    </div>
  </footer>
);

export default Footer;
