import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('core_values');
    if(!page) return <p>No Page Data!</p>;

    return (
        <main 
            className={`${maxwidth}`}
        >
            <SliceZone 
                slices={page.data.slices}
                components={components}
            />
        </main>
    )

}

export async function generateMetadata() {
    const client = createClient();
    const page = await client.getSingle("core_values");
  
    return {
      title: page.data.meta_title,
      description: page.data.meta_description,
    };
  }