// pages/index.js
export default function Home() {
  return (
    <div>
      {/* Header */}
      <header style={{ background: "var(--primary)", color: "var(--primary-foreground)", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Hello :)</span>
          <nav>
            <a href="mailto:your@email.com" style={{ marginRight: "1rem" }}>Send me an email</a>
            <a href="https://linkedin.com">Connect on LinkedIn</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ background: "var(--primary-shade)", color: "var(--primary-shade-foreground)", padding: "3rem 1rem" }}>
        <h1>Alessandra Balliana</h1>
        <p>
          Currently leading AI innovation and growth as the <span style={{ color: "var(--accent-secondary)" }}>Head of Strategy & Design</span> at GoBubble
        </p>
      </section>

      {/* About Me */}
      <section style={{ padding: "2rem 1rem", display: "flex", alignItems: "center" }}>
        <img src="/profile.jpg" alt="Profile" style={{ borderRadius: "50%", width: 150, height: 150, marginRight: "2rem" }} />
        <div>
          <h3>About Me</h3>
          <p>
            I’m a Product Designer & Strategist who leads with curiosity and purpose...
          </p>
          <button style={{ background: "var(--accent)", color: "var(--accent-foreground)", borderRadius: "var(--radius)", padding: "0.5rem 1rem" }}>
            Intro
          </button>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: "2rem 1rem", textAlign: "center" }}>
        {[...Array(8)].map((_, i) => (
          <button key={i} style={{ margin: "0.5rem", borderRadius: "var(--radius-md)", padding: "0.5rem 1.5rem", background: "var(--muted)" }}>
            Skills
          </button>
        ))}
      </section>

      {/* Experience */}
      <section style={{ padding: "2rem 1rem" }}>
        <h2>Experience</h2>
        {/* Timeline and jobs here */}
      </section>

      {/* Selected Work */}
      <section style={{ padding: "2rem 1rem" }}>
        <h2>Selected work</h2>
        {/* Work grid here */}
      </section>

      {/* Achievements */}
      <section style={{ padding: "2rem 1rem" }}>
        <h2>Achievements</h2>
        {/* Achievements grid here */}
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)", padding: "1rem", textAlign: "center" }}>
        <span>© AlessandraBalliana</span>
        <nav style={{ float: "right" }}>
          <a href="mailto:your@email.com" style={{ marginRight: "1rem" }}>Contact</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}