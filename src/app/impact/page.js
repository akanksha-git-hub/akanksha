import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";
import FloatingButton from "@/components/FloatingButton";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("impact");
  if (!page) return <p>No page data!</p>;
  const context = { addPadding: true };
  return (
    <main className={`${maxwidth}`}>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={context}
      />
      <FloatingButton />
    </main>
  );
}
