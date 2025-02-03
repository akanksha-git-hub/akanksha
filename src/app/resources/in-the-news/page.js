import ClientSliceZoneContext from "@/components/ClientSliceZone/ClientSliceZoneContext";
import ClientSliceZoneItem from "@/components/ClientSliceZone/ClientSliceZoneItem";
import TagsContextWrapper from "@/components/Tags/TagsContextWrapper";
import TagsItems from "@/components/Tags/TagsItems";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";


export default async function Page() {

    const page = await fetchPrismicSingleDocument("news_letter");

    if(!page) return <p>No page data!</p>;

    return(
        <main className={`${maxwidth} universal-padding `}>
            <div className="flex flex-row justify-center items-center gap-2 pt-24 ">
                       {/* Left Image */}
                       <PrismicNextImage 
                           field={page.data.left_image} 
                           alt="Left Image"
                           className="hidden md:block md:w-44" // Adjust size as needed
                       />
               
                       {/* Text Container - Column Layout */}
                       <div className="flex flex-col items-center text-black">
                           <RichText 
                               text={page.data.title}
                               className="font-ambit-regular text-7xl md:text-center"
                           />
                           <RichText 
                               text={page.data.description}
                               className="text-2xl font-playfair-display md:text-center"
                           />
                       </div>
               
                       {/* Right Image */}
                       <PrismicNextImage
                           field={page.data.right_image} 
                           alt="Right Image"
                           className="hidden md:block md:w-40 -translate-y-16 " 
                       />
                   </div>
            <TagsContextWrapper className='mt-12'>
                <TagsItems  
                    tags={page.data.categories}
                />
                <ClientSliceZoneContext
                    slices={page.data.slices}
                >
                    <ClientSliceZoneItem 
                        className='mt-12 space-y-12'
                    />
                </ClientSliceZoneContext>
            </TagsContextWrapper>
        </main>
    )


} 