"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import AuroraBackground from "./components/AuroraBackground";
import SelectedWork from "./components/SelectedWork";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Section from "./components/Section";
import About from "./components/About";
import Experience from "./components/Experience";
import LetsConnect from "./components/LetsConnect";
import ClientLogos from "./components/ClientLogos";
import styles from "./HomeClient.module.css";

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen for modal state changes
  useEffect(() => {
    const handleModalStateChange = (event: CustomEvent) => {
      setIsModalOpen(event.detail.isOpen);
    };

    window.addEventListener('modalStateChange', handleModalStateChange as EventListener);
    return () => {
      window.removeEventListener('modalStateChange', handleModalStateChange as EventListener);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1}}
      animate={{ opacity: 1}}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      <div>
        {/* Aurora only behind header and hero */}
        <AuroraBackground
          colorStops={["#AD00A2", "#7E27E0", "#1efb7d",]}
          blend={0.5}
          amplitude={0.5}
          speed={0.8}
          modalOpen={isModalOpen}
          opacity={0.2}
        />

       <div className={styles.heroBackground}>
        <div className={styles.contentWrapper}>
          {/* Header */}
          <Header />
          
          {/* Hero Section - no spacing needed as it's full height */}
          <Hero />
        </div>
        </div>



        {/* Selected Work */}
        <Section className="section-loose" id="selected-work">
          <SelectedWork />
        </Section>

                {/* About */}
        <Section className="section-loose">
          <About />
        </Section>
        
        {/* Testimonials */}
        <Section className="section-loose">
          <Testimonials />
        </Section>

        
      {/* Selected Work */}
         <Section className="section-loose" id="client-logos">
          <ClientLogos />
        </Section>
        
        {/* Let's Connect */}
          <LetsConnect />

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
} 