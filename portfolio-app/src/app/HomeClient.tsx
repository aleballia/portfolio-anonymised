"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import AuroraBackground from "./components/AuroraBackground";
import SelectedWork from "./components/SelectedWork";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
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
          opacity={0.1}
        >
        </AuroraBackground>
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <Hero />
        {/* Skills */}
        <Skills />
        {/* Experience */}
        <Experience />
        {/* Testimonials */}
        <Testimonials />
        {/* Selected Work */}
        <SelectedWork />
        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
} 