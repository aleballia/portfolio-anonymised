import Experience from "./components/Experience";
import Hero from "./components/Hero";

// pages/index.js
export default function Home() {
  return (
    <div>
      {/* Header */}
      <header style={{ background: "var(--primary-shade)", color: "var(--primary-shade-foreground)", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 400 }}>Hello :)</span>
          <nav>
            <a href="mailto:your@email.com" style={{ marginRight: "1rem", fontWeight: 400 }}>Send me an email</a>
            <a href="https://linkedin.com" style={{ fontWeight: 400 }}>Connect on LinkedIn</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* About Me */}
      <section style={{ padding: "2rem 1rem", display: "flex", alignItems: "center" }}>
        <img src="/profile.jpg" alt="Profile" style={{ borderRadius: "50%", width: 150, height: 150, marginRight: "2rem" }} />
        <div>
          <h3 style={{ fontWeight: 300 }}>About Me</h3>
          <p style={{ fontWeight: 400 }}>
            I'm a Product Designer & Strategist who leads with curiosity and purpose...
          </p>
          <button style={{ background: "var(--accent)", color: "var(--accent-foreground)", borderRadius: "var(--radius)", padding: "0.5rem 1rem", fontWeight: 400 }}>
            Intro
          </button>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: "2rem 1rem", textAlign: "center" }}>
        {[...Array(8)].map((_, i) => (
          <button key={i} style={{ margin: "0.5rem", borderRadius: "var(--radius-md)", padding: "0.5rem 1.5rem", background: "var(--muted)", fontWeight: 400 }}>
            Skills
          </button>
        ))}
      </section>

      {/* Experience */}
      <Experience />

      {/* Selected Work */}
      <section style={{ padding: "2rem 1rem" }}>
        <h2 style={{ fontWeight: 300 }}>Selected work</h2>
        {/* Work grid here */}
      </section>

      {/* Achievements */}
      <section style={{ padding: "2rem 1rem" }}>
        <h2 style={{ fontWeight: 300 }}>Achievements</h2>
        {/* Achievements grid here */}
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)", padding: "1rem", textAlign: "center" }}>
        <span style={{ fontWeight: 400 }}>© AlessandraBalliana</span>
        <nav style={{ float: "right" }}>
          <a href="mailto:your@email.com" style={{ marginRight: "1rem", fontWeight: 400 }}>Contact</a>
          <a href="https://linkedin.com" style={{ fontWeight: 400 }}>LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}