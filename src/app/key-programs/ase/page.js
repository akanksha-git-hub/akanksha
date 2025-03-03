import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument("ase");

    if(!page) return <p>No page data!</p>;

    return(
        <main 
        
        >
            <SliceZone 
                slices={page.data.slices}
                components={components}
                context={{addUniversalPadding:true}}
            />
        </main>
    )

}