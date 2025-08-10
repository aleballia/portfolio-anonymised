import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main>
    {/* Header Section */}
     <Header />

      {/* Introduction Section */}
      <section className="section px-section" style={{ marginTop: "2rem" }}>
        <div className={styles.aboutContainer}>
          <div className={styles.portraitContainer}>
            <Image 
              src="/avatars/ale.png" 
              alt="Alessandra Balliana" 
              width={200} 
              height={200} 
              className={styles.portraitImage}
            />
          </div>
          
          <div className={styles.aboutText}>
            <h1 className="h1" style={{ marginBottom: "1.5rem" }}>About Me</h1>
            <p className="p" style={{ maxWidth: 700 }}>
Product Design Lead with a track record of shipping fast while solving complex problems.
I bring strategic thinking and attention to detail, equally comfortable aligning stakeholders
or getting hands-on to push pixels. I thrive in fast-paced environments, turning ambiguity
into clarity — with a growing focus on AI products and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-section section-loose">
        <Skills />
      </section>

      {/* Experience Section */}
      <section className="px-section section-loose">
        <Experience />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
