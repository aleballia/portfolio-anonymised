import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";

export default async function MyFujifilmCaseStudy() {
  // Replace with your actual Notion page ID
  const notionData = await getNotionPage('12ceac4e7ae980fd9d45fc49c9a47d19');
  
  return (
    <CaseStudy
      title="MyFujifilm"
      subtitle="Ecommerce Product Design & Development for a Global Brand"
      tags={notionData?.properties?.tags || [""]}
      image={notionData?.coverImage || "/work/myfujifilm.png"}
      role={notionData?.properties?.role || ""}
      company={notionData?.properties?.company || ""}
      tools={notionData?.properties?.tools || [""]}
      date={notionData?.properties?.date || ""}
      summary={notionData?.properties?.Summary || ""}
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