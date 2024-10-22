import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { createClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('vision_mission');

    if(!page) return <p>No page data</p>;

    return (
        <main className={`${maxwidth}`}>
            <SliceZone 
                components={components}
                slices={page.data.slices}
            />
        </main>
    )

}

export async function generateMetadata() {
    const client = createClient();
    const page = await client.getSingle("vision_mission");
  
    return {
      title: page.data.meta_title,
      description: page.data.meta_description,
    };
  }