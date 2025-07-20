import CaseStudy from "../../components/CaseStudy";
import NotionContent from "../../components/NotionContent";
import { getNotionPage } from "../../../lib/notion";
import { title } from "process";

export const metadata = {
  title: "MyFujifilm| Ecommerce Product Design & Development for a Global Brand",
  // ...other metadata fields
};

export default async function MyFujifilmCaseStudy() {
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