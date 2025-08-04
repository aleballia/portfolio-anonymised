import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import MarkdownContent from "../../components/MarkdownContent";
import ProjectNavigation from "../../components/ProjectNavigation";
import FloatingLiveButton from "../../components/FloatingLiveButton";
import { getNotionPage } from "../../../lib/notion";
import { getCaseStudyContent } from "../../../lib/content";
import { getCaseStudyById, getAllCaseStudies } from "../../../lib/caseStudies";

export const metadata = {
  title: "MyFujifilm | Ecommerce Product Design & Development for a Global Brand",
  // ...other metadata fields
};

export default async function MyFujifilmCaseStudy() {
  const caseStudy = getCaseStudyById('myfujifilm');
  const allCaseStudies = getAllCaseStudies();
  
  if (!caseStudy) {
    throw new Error('Case study not found');
  }

  // Try to load local content first
  const localContent = caseStudy.contentFile ? getCaseStudyContent(caseStudy.id) : null;
  
  // Fallback to Notion if no local content and notionId exists
  const notionData = localContent ? null : (caseStudy.notionId ? await getNotionPage(caseStudy.notionId) : null);
  
  return (
    <>
      <CaseStudy
        title={localContent?.title || caseStudy.title}
        subtitle={localContent?.subtitle || caseStudy.subtitle}
        tags={localContent?.tags || notionData?.properties?.tags || []}
        image={notionData?.coverImage || caseStudy.mainImage}
        role={localContent?.role || notionData?.properties?.role || ""}
        company={localContent?.company || notionData?.properties?.company || ""}
        tools={localContent?.tools || notionData?.properties?.tools || [""]}
        date={localContent?.date || notionData?.properties?.date || ""}
        summary={localContent?.summary || notionData?.properties?.summary || ""}
      >
        {localContent ? (
          <MarkdownContent content={localContent.content} />
        ) : notionData?.blocks ? (
          <NotionContent blocks={notionData.blocks} />
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