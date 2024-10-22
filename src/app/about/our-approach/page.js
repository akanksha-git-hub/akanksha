import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { createClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('our_approach');

    if(!page) return <p>No page data!</p>

    return(
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

// export async function generateMetadata() {
//     const client = createClient();
//     const page = await client.getSingle("our_approach");
  
//     return {
//       title: page.data.meta_title,
//       description: page.data.meta_description,
//     };
//   }