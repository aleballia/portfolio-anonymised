import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";
import { title } from "process";
import SmoothCaseStudyTransition from "../../components/SmoothCaseStudyTransition";



export const metadata = {
  title: "Dragonfly | White Label Design System for Award Winning Ecommerce Agency",
  // ...other metadata fields
};

export default async function TomAndCoCaseStudy() {
  // Replace with your actual Notion page ID
  const notionData = await getNotionPage('7a52ff3c3e2b464d8e923b7d37ac35fb');
  
  console.log("Notion properties:", notionData?.properties);

  return (

      <CaseStudy
        title="Tom&Co."
        subtitle="White Label Design System for Award Winning Ecommerce Agency"
        tags={notionData?.properties?.tags || [""]}
        image={notionData?.coverImage || "/work/tomandco.png"}
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