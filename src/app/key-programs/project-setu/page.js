import FloatingButton from "@/components/FloatingButton";
import { fetchPrismicSingleDocument, fetchPrismicAllDocuments } from "@/lib/prismicDb"; 
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  // Fetch Prismic slices
  const page = await fetchPrismicSingleDocument("project_setu");
  

  // Fetch all financial documents separately
  

  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} universal-padding`}>
      <SliceZone
        slices={page.data.slices}
        components={components}
      
      />
      <FloatingButton />
    </main>
  );
}
