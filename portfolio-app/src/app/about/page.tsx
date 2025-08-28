import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import HoverImage from "../components/HoverImage";
import About from "../components/About";
import styles from "./About.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Alessandra Balliana",
  description:
    "Product Design Lead focused on shipping fast, aligning stakeholders, and building AI-driven products.",
};

export default function AboutPage() {
  return (
    <main>
    {/* Header Section */}
     <Header />
<section className="section-loose px-section" style={{}}>
  <About />
  </section>

  <section className="section-tight px-section" style={{}}>
  <Skills />
  </section>

  <section className="section-loose px-section" style={{}}>
  <Experience />
  </section>
     
      
      <section>
        <Footer />
      </section>
    </main>
  );
}
