import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('ourdonors');
    if(!page) return <p>No page data!</p>;

    return(
        <main className={`${maxwidth} universal-padding`}>
            <RichText 
                className='text-deep-green font-ambit-regular text-left text-5xl md:text-7xl'
                text={page.data.title}
            />
            <SliceZone 
                slices={page.data.slices}
                components={components}
            />
        </main>
    )

}