"use client";

import React from "react";
import styles from "./About.module.css";
import { siteRole } from "../../config/site";

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutText}>
        <h1 className="h4" style={{ marginBottom: "2rem" }}>
          About Me
        </h1>
        <p className="h3" style={{ fontWeight: 400, marginBottom: "1rem" }}>
          {siteRole} with a growing focus on AI products and innovation.
          Equally comfortable aligning stakeholders or getting hands-on to push
          pixels, I bring strategic thinking and attention to detail to
          fast-paced environments where every day is different from the last.
        </p>
        <p className="p" style={{ fontWeight: 400 }}>
          Before starting my career in Product Design, I earned a Master&apos;s
          degree in Architecture and a Bachelor&apos;s in Music Performance.
          <br />
          I&apos;m constantly driven by a need to create, learn, and connect with
          other like-minded creative individuals. Outside of work, I spend time
          singing in some of the most vibrant venues in Soho and the West End,
          writing music, or training my cats, Luna and Ares, to travel and
          explore the outdoors together.
        </p>
      </div>
    </div>
  );
};

export default About;
