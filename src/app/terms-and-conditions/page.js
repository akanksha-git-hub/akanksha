import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("terms_and_conditions");

  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} py-16`}>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
