import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import AuroraBackground from "./components/AuroraBackground";
import SelectedWork, { WorkItem } from "./components/SelectedWork";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// pages/index.js
export default function Home() {
  const works: WorkItem[] = [
    {
      title: "Freedom2hear",
      subtitle: "Product Design, Innovation & Growth for an Emotion AI Startup",
      tags: "AI, Product, Innovation",
      image: "work/freedom2hear.png",
      href: "/work/freedom2hear",
    },
    {
      title: "Dragonfly",
      subtitle: "White Label Design System for Award Winning Ecommerce Agency",
      tags: "Design System, Ecommerce",
      image: "/work/dragonfly.png",
      href: "/work/dragonfly",
    },
    {
      title: "MyFujifilm",
      subtitle: "Ecommerce for a Leading Global Brand",
      tags: "Ecommerce, Brand",
      image: "/work/myfujifilm.png",
      href: "/work/myfujifilm",
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
      <Footer />
    </div>
  );
}