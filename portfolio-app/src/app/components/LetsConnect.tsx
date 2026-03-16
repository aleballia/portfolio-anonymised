"use client";
import React, { useState } from "react";
import styles from "./LetsConnect.module.css";
import ScrollingTicker from "./ScrollingTicker";

const LetsConnect: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "alessandraballiana@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      
      // Reset the button text after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <section className={styles.letsConnectSection}>
      <div className={styles.container}>
      <ScrollingTicker 
            text="Let's connect" 
            speed={80}
            className="display"
          />
       <div className={styles.buttonContainer}> <button 
          onClick={handleCopyEmail}
          className={styles.copyButton}
          aria-label="Copy my email address"
        >
          {copied ? "Email Copied!" : "Copy my email address"}
        </button>
        <a 
        href="https://www.linkedin.com/in/alessandraballiana/"
        target="_blank"
          className={styles.copyButtonLinkedIn}
          aria-label="LinkedIn"
        >
        Connect on LinkedIn
        </a></div>
      </div>
    </section>
  );
};

export default LetsConnect;
