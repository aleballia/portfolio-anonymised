import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import AuroraBackground from "./components/AuroraBackground";
import SelectedWork, { WorkItem } from "./components/SelectedWork";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";

// pages/index.js
export default function Home() {
  const works: WorkItem[] = [
    {
      title: "Freedom2hear",
      subtitle: "Product, Innovation & Growth for an Emotion AI Startup",
      tags: "AI, Product, Innovation",
      image: "/vercel.svg",
      href: "/work/brand-identity",
    },
    {
      title: "Dragonfly",
      subtitle: "White LabelDesign System for an Award Winning Ecommerce Agency",
      tags: "Design System, Ecommerce",
      image: "/window.svg",
      href: "/work/ui-animation",
    },
    {
      title: "MyFujifilm",
      subtitle: "Ecommerce for a Leading Global Brand",
      tags: "Ecommerce, Brand",
      image: "/globe.svg",
      href: "/work/portfolio-website",
    },
    {
      title: "The Oak",
      subtitle: "Design System for the Biggest Residential Architecture Firm in the UK",
      tags: "Design System, Architecture",
      image: "/file.svg",
      href: "/work/web-illustration",
    },
  ];

  return (
    <div>
      {/* Aurora only behind header and hero */}
      <AuroraBackground
        colorStops={["#AD00A2", "#7E27E0", "#1efb7d",]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
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
      <footer className="px-section" style={{ background: "var(--primary)", color: "var(--primary-foreground)", textAlign: "center" }}>
        <span style={{ fontWeight: 400 }}>© AlessandraBalliana</span>
        <nav style={{ float: "right" }}>
          <a href="mailto:your@email.com" style={{ marginRight: "1rem", fontWeight: 400 }}>Contact</a>
          <a href="https://linkedin.com" style={{ fontWeight: 400 }}>LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}