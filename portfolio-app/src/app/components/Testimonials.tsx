"use client";
import React from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "They're a truly talented and credible leader in design, with a passion for their craft that is demonstrated through the rigor in their methodology, and their attention to detail. Their knack for turning complex challenges into something simple and straightforward is impressive. And as a strategic storyteller, they shine. Beyond their craft, they actively learn from others, asking questions, demonstrating their curiosity, and finding ways to work better together. They're a fantastic collaborator, always there to support those around them. It's been an absolute pleasure working with them, and I've cherished every moment of being part of their journey.",
    author: "Lauren Pleydell-Pearce",
    role: "Chief Creative Officer, PwC",
    avatar: "/avatars/lauren.jpeg",
  },
  {
    quote:
      "They are a rare find. Not often do you come across a designer who is so excellent at their craft, but also so attuned to linking that craft to building opportunities. Whilst working with them I had the pleasure of witnessing them link client challenges to design solutions, in a way that always advocated for design and client value in equal measure. Their knowledge of Design Systems is next to none. Optimistic, strategic and creative, they are a multi-talented designer that I would always choose to work with!",
    author: "Mikey Dilworth",
    role: "Design & Creative Director, ex-PwC",
    avatar: "/avatars/mikey.jpeg",
  },
  {
    quote:
      "When they joined the team, not only did we get a great designer, but they also helped elevate the design standards of the rest of the team. Prior to their arrival, the team had consisted of relatively inexperienced designers who had built the app in quite an ad-hoc, messy way. They helped create structure and logic by implementing a design system. Two years after their departure, we have rebranded and built a new design system, but it was their building blocks that created the foundations of how we still work to this day. I would definitely work with them again.",
    author: "Nic Yeels",
    role: "VP of Product & Design, Resi",
    avatar: "/avatars/nic.jpeg",
  },
  {
    quote:
      "They are a brilliant designer, always delivering high-quality work. They played a key role in establishing our internal design system at Tom&Co during their time on my team. They constantly strive to elevate the standard of design, showcasing their commitment to excellence. Their dedication, hard work, and eagerness to learn make them an asset to any design project. I wholeheartedly recommend them!",
    author: "Sara Deambrosis",
    role: "Head of Design, Tom&Co",
    avatar: "/avatars/sara.jpeg",
  },
];

const Testimonials: React.FC = () => (
  <section className={` ${styles.testimonialsSection}`}>
    <h2 className="h4 heading-section">Kind words</h2>
    <div className={styles.testimonialsGrid}>
      {testimonials.map((t, idx) => (
        <div className={styles.testimonialCard} key={idx}>
          <div className={styles.avatarRow}>
            <Image
              src={t.avatar}
              alt={t.author}
              width={48}
              height={48}
              className={styles.avatar}
            />
            <div>
              <div className="author p font-medium">{t.author}</div>
              <div className="role caption">{t.role}</div>
            </div>
          </div>
          <blockquote className={`p ${styles.quote}`}>
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
