import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { createClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("donor_page");
  const context = { addPadding: true };

  if (!page) return null;

  return (
    <main className={`${maxwidth}`}>
      {/* 🔔 Donation Disabled Banner */}
     
      <SliceZone
        components={components}
        slices={page.data.slices}
        context={context}
      />
    </main>
  );
}
