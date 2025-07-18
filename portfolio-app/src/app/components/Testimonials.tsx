"use client";
import React from "react";
import styles from "./Testimonials.module.css";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "You're a truly talented and credible leader in design, with a passion for your craft that is demonstrated through the rigor in your methodology, and your attention to detail. Your knack for turning complex challenges into something simple and straightforward is impressive. And as a strategic storyteller, you shine. Beyond your craft, I admire how you actively learn from others, asking questions, demonstrating your curiosity, and finding ways to work better together. You're a fantastic collaborator, always there to support those around you. It's been an absolute pleasure working with you, and I've cherished every moment of being part of your journey.",
    author: "Lauren Pleydell-Pearce",
    role: "Chief Creative Officer, PwC",
    avatar: "/avatars/lauren.jpeg",
  },
  {
    quote: "Ale is a rare find. Not often do you come across a designer who is so excellent at their craft, but also but also so attuned to linking that craft to building opportunities. Whilst working with Ale I had the pleasure of witnessing her link client challenges to design solutions, in a way that always advocated for design and client value in equal measure. Her knowledge of Design Systems is next to none. Optimistic, strategic and creative, Ale is a multi-talented designer that I would always choose to work with!",
    author: "Mikey Dilworth",
    role: "Design & Creative Director, PwC",
    avatar: "/avatars/mikey.jpeg",
  },
  {
    quote: "When Ale joined the team, not only did we get a great designer, but she also helped elevate the design standards of the rest of the team. Prior to her, the team had consisted of relatively inexperienced designers who had built the app in quite an ad-hoc, messy way. Ale helped create structure and logic by implementing a design system. Two years after her departure, we have rebranded and built a new design system, but it was Ale's building blocks that created the foundations of how we still work to this day. I would definitely work with Ale again.",
    author: "Nic Yeels",
    role: "VP of Product & Design, Resi",
    avatar: "/avatars/nic.jpeg",
  },
  {
    quote: "Alessandra is a brilliant designer, always delivering high-quality work. She played a key role in establishing our internal design system at Tom&Co during her time on my team. She constantly strives to elevate the standard of design, showcasing her commitment to excellence. Her dedication, hard work, and eagerness to learn make her an asset to any design project. I wholeheartedly recommend her!",
    author: "Sara Deambrosis",
    role: "Head of Design, Tom&Co",
    avatar: "/avatars/sara.jpeg",
  },
];

const Testimonials: React.FC = () => (
  <section className={`px-section ${styles.testimonialsSection}`}>
    <h2 className="h4" style={{ marginBottom: "2.5rem" }}>Kind words</h2>
    <div className={styles.testimonialsGrid}>
      {testimonials.map((t, idx) => (
        <div className={styles.testimonialCard} key={idx}>
          <div className={styles.avatarRow}>
            <img src={t.avatar} alt={t.author} className={styles.avatar} />
            <div>
              <div className={styles.author}>{t.author}</div>
              <div className={styles.role}>{t.role}</div>
            </div>
          </div>
          <blockquote className={styles.quote}>
            “{t.quote}”
          </blockquote>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials; 