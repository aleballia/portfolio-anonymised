import CaseStudy from "../../components/CaseStudy";
import MarkdownContent from "../../components/MarkdownContent";
import ProjectNavigation from "../../components/ProjectNavigation";
import FloatingLiveButton from "../../components/FloatingLiveButton";
import { getCaseStudyContent } from "../../../lib/content";
import { getCaseStudyById, getAllCaseStudies } from "../../../lib/caseStudies";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const caseStudy = getCaseStudyById('tomandco');
  const localContent = caseStudy?.contentFile
    ? getCaseStudyContent(caseStudy.id, caseStudy.contentFile, {
        title: caseStudy.title,
        subtitle: caseStudy.subtitle,
        liveLink: caseStudy.liveLink,
      })
    : null;

  const title = (localContent?.title || caseStudy?.title || '').trim();
  const subtitle = (localContent?.subtitle || caseStudy?.subtitle || '').trim();

  return {
    title: [title, subtitle].filter(Boolean).join(' | '),
    description: localContent?.summary || caseStudy?.subtitle || undefined,
  };
}

export default async function TomAndCoCaseStudy() {
  const caseStudy = getCaseStudyById('tomandco');
  const allCaseStudies = getAllCaseStudies();
  
  if (!caseStudy) {
    throw new Error('Case study not found');
  }

  // Load local content if available
  const localContent = caseStudy.contentFile ? getCaseStudyContent(caseStudy.id, caseStudy.contentFile, {
    title: caseStudy.title,
    subtitle: caseStudy.subtitle,
    liveLink: caseStudy.liveLink
  }) : null;
  
  return (
    <>
      <CaseStudy
        title={localContent?.title || caseStudy.title}
        subtitle={localContent?.subtitle || caseStudy.subtitle}
        tags={localContent?.tags || []}
        image={caseStudy.mainImage}
        role={localContent?.role || ""}
        company={localContent?.company || ""}
        tools={localContent?.tools || [""]}
        date={localContent?.date || ""}
        summary={localContent?.summary || ""}
      >
        {localContent ? (
          <MarkdownContent content={localContent.content} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Content not available</p>
          </div>
        )}
      </CaseStudy>
      
      <ProjectNavigation 
        currentProject={caseStudy} 
        allProjects={allCaseStudies} 
      />
      
      <FloatingLiveButton liveLink={localContent?.liveLink || caseStudy.liveLink || ''} />
    </>
  );
}