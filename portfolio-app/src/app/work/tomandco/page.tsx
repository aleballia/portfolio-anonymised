import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";
import { getCaseStudyById } from "../../../lib/caseStudies";

export const metadata = {
  title: "Tom&Co. | White Label Design System for Award Winning Ecommerce Agency",
  // ...other metadata fields
};

export default async function TomAndCoCaseStudy() {
  const caseStudy = getCaseStudyById('tomandco');
  
  if (!caseStudy) {
    throw new Error('Case study not found');
  }

  // Replace with your actual Notion page ID
  const notionData = await getNotionPage(caseStudy.notionId);
  
  console.log("Notion properties:", notionData?.properties);

  return (
    <CaseStudy
      title={caseStudy.title}
      subtitle={caseStudy.subtitle}
      tags={notionData?.properties?.tags || []}
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