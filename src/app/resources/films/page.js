import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('films');

    if(!page) return <p>No page data</p>;
    


    return(
        <main className={`${maxwidth} universal-padding mt-28 `}>
        <div className="flex flex-row justify-center items-center gap-2 ">
            {/* Left Image */}
            <PrismicNextImage 
                field={page.data.left_image} 
                alt="Left Image"
                className="hidden md:block md:w-60 -translate-y-12" // Adjust size as needed
            />
    
            {/* Text Container - Column Layout */}
            <div className="flex flex-col items-center text-black">
                <RichText 
                    text={page.data.title}
                    className="font-ambit-regular text-7xl md:text-center"
                />
                <RichText 
                    text={page.data.sub_title}
                    className="text-2xl font-playfair-display md:text-center"
                />
            </div>
    
            {/* Right Image */}
            <PrismicNextImage 
                field={page.data.right_image} 
                alt="Right Image"
                className="hidden md:block md:w-40 -translate-y-12 " 
            />
        </div>
    
        {/* SliceZone */}
        <SliceZone 
            components={components}
            slices={page.data.slices}
        />
    </main>
    
    )

}