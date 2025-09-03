"use client";
import React from "react";
import HoverImage from "./HoverImage";
import styles from "./About.module.css";

const About: React.FC = () => {
    return (
        <section>
        <div className={styles.aboutContainer}>
            <img src="/avatars/ale.png" alt="Alps with family" className={styles.portraitImage} />
            <div className={styles.aboutText}>
             <h1 className="h4" style={{ marginBottom: "2rem" }}>About Me</h1>
                <p className="h3" style={{ fontWeight: 400, marginBottom: "1rem" }}>
                <HoverImage imageSrc="/about/speaker.png" imageAlt="Product Design Leader - Speaking at Conference">Product Design Leader</HoverImage> with a growing focus on AI products and innovation. Equally comfortable aligning stakeholders or getting hands-on to push pixels, I bring strategic thinking and attention to detail to fast-paced environments where every day is different from the last.
                </p>

                <p className="p" style={{ fontWeight: 400 }}>
                    Before starting my career in Product Design, I earned a Master's degree in <HoverImage imageSrc="/about/architecture.png" imageAlt="Image from graduation"> Architecture</HoverImage> and a Bachelor's in <HoverImage imageSrc="/about/twiceful.png" imageAlt="Music performance"> Music Performance</HoverImage>.
                    <br />I'm constantly driven by a need to create, learn, and connect with other like-minded creative individuals.
                    Outside of work, I spend time singing in some of the most vibrant <HoverImage imageSrc="/about/ale-singer.png" imageAlt="Venues in Soho"> venues in Soho and the West End</HoverImage>, writing music, or training my cats, <HoverImage imageSrc="/about/teo-luna.png" imageAlt="Traveling with cats">Luna</HoverImage> and <HoverImage imageSrc="/about/ares.png" imageAlt="Traveling with cats"> Ares,</HoverImage> to travel and <HoverImage imageSrc="/about/ale-luna.png" imageAlt="Alps with family"> explore the outdoors together</HoverImage>.
                </p>
            </div>
        </div>
        </section>
    );
};

export default About;
