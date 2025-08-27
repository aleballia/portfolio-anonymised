"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
   <div className="px-section">
    <div className={styles.footerContainer}>
      <span>© 2025 Alessandra Balliana – Portfolio – Built with Cursor</span>
      <nav className={styles.footerNav}>
      <a href="/about">About</a>
        <a target="_blank" href="https://linkedin.com/in/alessandraballiana">LinkedIn</a>
      </nav>
    </div>
   </div>
  </footer>
);

export default Footer;
