import Image from "next/image";
import styles from "./CaseStudy.module.css";

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

}) => {
  return (
    <div>
      <article className={styles.caseStudy}>

        {/* Hero Section: Title & Subtitle */}
        <div className={`px-section ${styles.heroSectionTitle}`}>
          <h1 className={`h1 ${styles.title}`}>
            {title}
          </h1>
        </div>

        {/* Full-width Image */}
        <div className={styles.heroImage}>
          <Image
            src={image}
            alt={`${title} Project`}
            fill
            className="object-cover"
            priority
            style={{
            objectFit: "cover",
            objectPosition: "top",
            }}
          />
        </div>

        {/* Main content, pushed down by image height */}
        <section className={styles.mainContent}>
          <div className={styles.contentContainer}>
              
            {/* Summary and Details Grid - stack on mobile, side-by-side on desktop, with background and padding */}
            <div>
              {/* Project Summary */}
              {summary && (
                <div>
                  <p className={`h3 ${styles.summary}`}>{summary}</p>
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
        </section>

        <section className={styles.contentSection}>
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
        </section>
      </article>
    </div>
  );
};

export default CaseStudy;