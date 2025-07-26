"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import AuroraBackground from "./components/AuroraBackground";
import SelectedWork, { WorkItem } from "./components/SelectedWork";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SmoothCaseStudyTransition from "./components/SmoothCaseStudyTransition";

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const works: WorkItem[] = [
    {
      title: "Freedom2hear",
      subtitle: "Product Design, Innovation & Growth for an Emotion AI Startup",
      tags: "AI, Product, Innovation",
      image: "work/freedom2hear.png",
      href: "/work/freedom2hear",
    },
    {
      title: "Tom&Co.",
      subtitle: "White Label Design System for Award Winning Ecommerce Agency",
      tags: "Design System, Ecommerce",
      image: "/work/tomandco.png",
      href: "/work/tomandco",
    },
    {
      title: "MyFujifilm",
      subtitle: "Ecommerce for a Leading Global Brand",
      tags: "Ecommerce, Brand",
      image: "/work/myfujifilm.png",
      href: "/work/myfujifilm",
    },
  ];

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
          blend={0.8}
          amplitude={1.0}
          speed={0.8}
          modalOpen={isModalOpen}
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
        <SelectedWork works={works} />
        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
} 