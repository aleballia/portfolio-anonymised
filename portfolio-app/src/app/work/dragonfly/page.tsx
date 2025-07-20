import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";

export default async function DragonflyCaseStudy() {
  // Replace with your actual Notion page ID
  const notionData = await getNotionPage('7a52ff3c3e2b464d8e923b7d37ac35fb');
  
  console.log("Notion properties:", notionData?.properties);

  return (
    <CaseStudy
      title="Dragonfly"
      subtitle="White Label Design System for Award Winning Ecommerce Agency"
      tags={notionData?.properties?.tags || [""]}
      image={notionData?.coverImage || "/work/dragonfly.png"}
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