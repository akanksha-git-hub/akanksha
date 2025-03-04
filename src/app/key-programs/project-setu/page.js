import FloatingButton from "@/components/FloatingButton";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb"; 
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  // Fetch Prismic document
  const page = await fetchPrismicSingleDocument("project_setu");

  if (!page) return <p>No page data!</p>;

 
  const pdfUrl = page.data.pdf_link?.url || null; 
  const text = page.data.download_text || null; 

  return (
    <main className={`${maxwidth} universal-padding`}>
      <SliceZone slices={page.data.slices} components={components} />
      
      
      <FloatingButton pdfUrl={pdfUrl} text={text} />
    </main>
  );
}
