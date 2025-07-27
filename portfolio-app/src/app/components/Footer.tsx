"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={`px-section ${styles.footer}`}>
    <span >© 2025 Alessandra Balliana – Product Design Lead Portfolio – Built with Cursor</span>
    <nav className={styles.footerNav}>
      <a href="mailto:alessandraballiana@gmail.com">Contact</a>
      <a href="https://linkedin.com/in/alessandra-balliana">LinkedIn</a>
    </nav>
  </footer>
);

export default Footer;
