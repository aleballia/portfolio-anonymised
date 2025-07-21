import Image from "next/image";

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
  subtitle, 
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
    <article className="min-h-screen m-12">

      {/* Hero Section: Title & Subtitle */}
      <div className="px-section py-12" style={{ textAlign: "left" }}>
        <h1 className="display mb-4" style={{ color: "var(--foreground)", fontWeight: 200 }}>
          {title}
        </h1>
        <p className="h3" style={{ color: "var(--foreground)", fontWeight: 400 }}>
          {subtitle}
        </p>
      </div>

      {/* Full-width Image */}
      <div style={{ width: "100%", position: "relative", aspectRatio: "3/1", overflow: "hidden" }}>
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
      <section className="pt-16 pt-12 pb-12">
        <div className="">
            
          {/* Summary and Details Grid - stack on mobile, side-by-side on desktop, with background and padding */}
          <div className="max-w-4xl mb-8 m-auto">
            {/* Project Summary */}
            {summary && (
              <div>
                <div className="h3 text-base md:text-lg pb-24" style={{ color: "var(--muted-foreground)" }}>{summary}</div>
              </div>
            )}
            {/* Details: Role, Company, Tools, Date */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
                maxWidth: 600,
                width: "100%",
              }}
            >
              {role && (
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <p className="p mb-0 text-sm md:text-base" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                    <span style={{ color: "var(--muted-foreground)" }}>Role: </span>
                    {role}
                  </p>
                </div>
              )}
              {company && (
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <p className="p mb-0 text-sm md:text-base" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                    <span style={{ color: "var(--muted-foreground)" }}>Company: </span>
                    {company}
                  </p>
                </div>
              )}
              {date && (
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <p className="p mb-0 text-sm md:text-base" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                    <span style={{ color: "var(--muted-foreground)" }}>Date: </span>
                    {date}
                  </p>
                </div>
              )}
              {tools && tools.length > 0 && (
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <p className="p mb-0 text-sm md:text-base" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                    <span style={{ color: "var(--muted-foreground)" }}>Tools: </span>
                    {tools.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Project Tags */}
            <div className="flex flex-wrap gap-2 mb-8 mt-6 md:mt-12">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="caption px-3 py-1 rounded-full text-xs md:text-sm" 
                  style={{ 
                    background: "var(--primary)", 
                    color: "var(--primary-foreground)" 
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-section pb-24" style={{  }}>
        <div className="max-w-4xl mx-auto">
            
          {/* Rich Text Content with interleaved images */}
          <div className="prose prose-invert" style={{ color: "var(--foreground)" , fontWeight: "inherit" }}>
            {children}
          </div>

          {/* Additional images interleaved after content */}
          {images && images.length > 0 && (
            <div className="flex flex-col gap-8 mt-12">
              {images.map((img, idx) => (
                <div key={idx} className="w-full aspect-[3/2] max-h-[500px] relative overflow-hidden rounded-lg">
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
  );
};

export default CaseStudy;