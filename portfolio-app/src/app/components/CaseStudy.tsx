"use client";

import Image from "next/image";
import styles from "./CaseStudy.module.css";
import MarkdownContent from "./MarkdownContent";
import ScrollNavigation from "./ScrollNavigation";
import Stats from "./Stats";
import { useEffect, useState } from "react";

interface CaseStudyProps {
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  role?: string;
  company?: string;
  tools?: string[];
  children: React.ReactNode;
  images?: string[]; // Additional images to display in content
  summary?: string; // Project summary text
  date?: string;    // Project date
  liveLink?: string; // Live project URL
  stats?: Array<{
    title: string;
    layout: 'grid' | 'list';
    data: Array<{
      label: string;
      value: string;
      change: string;
      changeType: 'positive' | 'negative' | 'neutral';
    }>;
  }>; // Stats to display
}

const CaseStudy: React.FC<CaseStudyProps> = ({ 
  title, 
  tags, 
  image = "https://placehold.co/1200x400?text=Project+Image", 
  role,
  company,
  tools,
  children,
  images = [],
  summary,
  date,
  liveLink,
  stats,
}) => {
  const [isTitleLoaded, setIsTitleLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroScale, setHeroScale] = useState(1.2);

  useEffect(() => {
    // Trigger title animation first
    const titleTimer = setTimeout(() => {
      setIsTitleLoaded(true);
    }, 200);

    // Trigger image animation after title
    const imageTimer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 600);

    // Trigger content animation last
    const contentTimer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(imageTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));

      // Scale hero image from 1.2 down to 1.0 over the first viewport of scroll
      const maxDistance = window.innerHeight || 400;
      const clamped = Math.min(Math.max(scrollTop, 0), maxDistance);
      const progress = clamped / maxDistance; // 0 → 1
      const scale = 1.2 - progress * 0.2; // 1.2 → 1.0
      setHeroScale(scale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll Navigation - rendered outside main layout to avoid transform issues */}
      <ScrollNavigation containerSelector=".markdown-content.prose" />
      
      <article className={styles.caseStudy}>

        {/* Title scrolls normally */}
        <div className={`px-section ${styles.heroSectionTitle} ${isTitleLoaded ? styles.titleAnimated : ''}`}>
          <h1 className={`h1 ${styles.title}`}>
            {title}
          </h1>
        </div>

        {/* Pinned hero image only */}
        <div className={styles.heroPinned}>
          <div className={`${styles.heroImage} ${isImageLoaded ? styles.imageAnimated : ''}`}>
            <Image
              src={image}
              alt={`${title} Project`}
              fill
              className="object-cover"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "top",
                transform: `scale(${heroScale})`,
              }}
            />
          </div>
        </div>

        {/* Main content, overlapping and scrolling over hero image */}
        <section className={`${styles.mainContent} ${isContentLoaded ? styles.contentAnimated : ''}`}>
          <div className={styles.mainContentInner}>
            <div className={styles.contentContainer}>
  
            {/* Summary and Details Grid - stack on mobile, side-by-side on desktop, with background and padding */}
            <div>
              {/* Project Summary */}
              {summary && (
                <div id="summary">
                  <div className={`h3 ${styles.summary}`}>
                    <MarkdownContent content={summary} />
                  </div>
                </div>
              )}

              {/* Stats Section */}
              {stats && stats.length > 0 && (
                <div className={styles.statsSection}>
                  {stats.map((statGroup, index) => (
                    <div key={index} className={styles.statGroup}>
                      <Stats
                        title={statGroup.title}
                        stats={statGroup.data}
                        layout={statGroup.layout}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Details: Role, Company, Tools, Date */}
              <div className={styles.detailsGrid}>
                {role && (
                  <div className={styles.detailItem}>
                    <p className={`p ${styles.detailText}`}>
                      <span className={styles.detailLabel}>Role: </span>
                      {role}
                    </p>
                  </div>
                )}
                {company && (
                  <div className={styles.detailItem}>
                    <p className={`p ${styles.detailText}`}>
                      <span className={styles.detailLabel}>Company: </span>
                      {company}
                    </p>
                  </div>
                )}
                {date && (
                  <div className={styles.detailItem}>
                    <p className={`p ${styles.detailText}`}>
                      <span className={styles.detailLabel}>Date: </span>
                      {date}
                    </p>
                  </div>
                )}
                {tools && tools.length > 0 && (
                  <div className={styles.detailItem}>
                    <p className={`p ${styles.detailText}`}>
                      <span className={styles.detailLabel}>Tools: </span>
                      {tools.join(', ')}
                    </p>
                  </div>
                )}
                {liveLink && (
                  <div className={styles.detailItem}>
                    <p className={`p ${styles.detailText}`}>
                      <span className={styles.detailLabel}>Live Link: </span>
                      <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        {liveLink}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* Project Tags */}
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`caption ${styles.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </div>

            <div className={styles.contentWrapper}>
              
              {/* Rich Text Content with interleaved images */}
              <div className={`prose prose-invert ${styles.proseContent}`}>
                {children}
              </div>
  
              {/* Additional images interleaved after content */}
              {images && images.length > 0 && (
                <div className={styles.additionalImages}>
                  {images.map((img, idx) => (
                    <div key={idx} className={styles.additionalImage}>
                      <Image
                        src={img}
                        alt={`Case study image ${idx + 1}`}
                        fill
                        className="object-cover w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

      </article>
      
    </div>
  );
};

export default CaseStudy;