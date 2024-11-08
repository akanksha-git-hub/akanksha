import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('films');

    if(!page) return <p>No page data</p>;
    


    return(
        <main className={`${maxwidth} universal-padding mt-12 bg-off-white`}>
            <div className="text-deep-green">
                <RichText 
                    text={page.data.title}
                    className='md:grid md:place-content-center font-ambit-regular text-7xl md:text-center'
                />
                <RichText 
                    text={page.data.sub_title}
                    className='text-2xl font-playfair-display md:grid md:place-content-center md:text-center'
                />
            </div>
            <SliceZone 
                components={components}
                slices={page.data.slices}
            />
        </main>
    )

}