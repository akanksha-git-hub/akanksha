import FloatingButton from "@/components/FloatingButton";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("project_setu");
  const financialsPage = await fetchPrismicSingleDocument("financials");

  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} universal-padding`}>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ financialsPage }}
        
      />
       <FloatingButton />
    </main>
  );
}
