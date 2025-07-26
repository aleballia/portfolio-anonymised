import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";
import { getCaseStudyById } from "../../../lib/caseStudies";

export const metadata = {
  title: "Oliver Bonas | Ecommerce design for an independent British brand",
  // ...other metadata fields
};

export default async function OliverBonasCaseStudy() {
  const caseStudy = getCaseStudyById('oliverbonas');
  
  if (!caseStudy) {
    throw new Error('Case study not found');
  }

  const notionData = await getNotionPage(caseStudy.notionId);
  
  return (
    <CaseStudy
      title={caseStudy.title}
      subtitle={caseStudy.subtitle}
      tags={notionData?.properties?.tags || caseStudy.tags}
      image={notionData?.coverImage || caseStudy.mainImage}
      role={notionData?.properties?.role || ""}
      company={notionData?.properties?.company || ""}
      tools={notionData?.properties?.tools || [""]}
      date={notionData?.properties?.date || ""}
      summary={notionData?.properties?.summary || ""}
    >
      {notionData?.blocks ? (
        <NotionContent blocks={notionData.blocks} />
      ) : (
        <>
        </>
      )}
    </CaseStudy>
  );
} 