import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";
import FloatingButton from "@/components/FloatingButton";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("impact");
  if (!page) return <p>No page data!</p>;
  const pdfUrl = page.data.pdf_link?.url || null; 
  const text = page.data.download_text || null; 

  const context = { addPadding: true };
  return (
    <main className={`${maxwidth} universal-padding`}>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={context}
      />
      
           <FloatingButton pdfUrl={pdfUrl} text={text} />
    </main>
  );
}
