import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";

export default async function Freedom2hearCaseStudy() {
  // Replace with your actual Notion page ID
  const notionData = await getNotionPage('142eac4e7ae980d3b74ef291a22af62d');
  
  return (
    <CaseStudy
      title="Freedom2hear"
      subtitle="Product Design, Innovation & Growth for an Emotion AI Startup"
      tags={notionData?.properties?.tags || [""]}
      image={notionData?.coverImage || "/work/freedom2hear.png"}
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