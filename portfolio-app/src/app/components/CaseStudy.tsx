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
    <article className="min-h-screen">

      {/* Hero Section: 50-50 split */}
      <div className="flex flex-col md:flex-row w-full aspect-[3/1] overflow-hidden">
        {/* Left: Title & Subtitle */}
        <div className=" px-section flex flex-col justify-center items-start px-8 py-8 md:w-1/2">
          <h1 className="display mb-2" style={{ color: "var(--foreground)" , fontWeight: "400" }}>{title}</h1>
          <p className="h3" style={{ color: "var(--muted-foreground)" , fontWeight: "300" }}>{subtitle}</p>
        </div>
        {/* Right: Image */}
        <div className="relative w-full h-64 md:h-auto md:w-1/2">
          <Image
            src={image}
            alt={`${title} Project`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Main content, pushed down by image height */}
      <section className="px-section pt-16 md:pt-24 pb-24" style={{ background: "var(--primary-shade)" }}>
        <div className="">

          {/* Summary and Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24">

            {/* Project Summary */}
            {summary && (
              <div className="md:col-span-2">
                <div className="p" style={{ color: "var(--foreground)" , fontWeight: "500" , fontSize: "1.5rem" , letterSpacing: "-0.04em" }}>{summary}</div>
              </div>
            )}
            
            {/* Details: Role, Company, Tools */}
            <div className="md:col-span-2 flex flex-col gap-2">
              {(role || company || tools || date) && (
                <div className="flex flex-col gap-4">
                  {role && (
                    <p className="p mb-2" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                      <span style={{ color: "var(--muted-foreground)" }}>Role: </span>
                      {role}
                    </p>
                  )}
                  {company && (
                    <p className="p mb-2" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                      <span style={{ color: "var(--muted-foreground)" }}>Company: </span>
                      {company}
                    </p>
                  )}
                  {date && (
                    <p className="p mb-2" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                      <span style={{ color: "var(--muted-foreground)" }}>Date: </span>
                      {date}
                    </p>
                  )}
                  {tools && tools.length > 0 && (
                    <p className="p mb-2" style={{ color: "var(--foreground)", fontWeight: 300 }}>
                      <span style={{ color: "var(--muted-foreground)" }}>Tools: </span>
                      {tools.join(', ')}
                    </p>
                  )}
                </div>
              )}
              
              {/* Project Tags */}
          <div className="flex flex-wrap gap-2 mt-12">
            {tags.map((tag, index) => (
              <span 
                key={tag + index}
                className="caption px-3 py-1 rounded-full" 
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
        </div>
      </section>

      <section className="px-section pb-24 pt-24" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
            
          {/* Rich Text Content with interleaved images */}
          <div className="mt-24 prose prose-invert" style={{ color: "var(--foreground)" , fontWeight: "inherit" }}>
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