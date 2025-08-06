import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main>]
    {/* Header Section */}
     <Header />

      {/* Introduction Section */}
      <section className="section px-section" style={{ marginTop: "2rem" }}>
        <h1 className="h1" style={{ marginBottom: "1.5rem" }}>About Me</h1>
        <p className="p" style={{ maxWidth: 700 }}>
Product Design Lead with a track record of shipping fast while solving complex problems.
I bring strategic thinking and attention to detail, equally comfortable aligning stakeholders
or getting hands-on to push pixels. I thrive in fast-paced environments, turning ambiguity
into clarity — with a growing focus on AI products and innovation.
        </p>
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
