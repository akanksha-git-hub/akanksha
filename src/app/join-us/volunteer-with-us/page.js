import IconScrollShowcase from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseDefault";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default async function Page() {

    const page = await fetchPrismicSingleDocument('volunteer_with_us');
    if(!page) return <p>No page</p>
    const removePagePadding = true
    return(
        <main className={`${maxwidth} universal-padding mt-16`}>
           <div className="flex items-center justify-center gap-2 md:gap-10 mb-10 ">
            {/* Left Side Image */}
            {page.data.left_image?.url && (
              <PrismicNextImage  
                field={page.data.left_image}
                className="w-24 h-auto md:w-60"
              />
            )}
          
            {/* Title */}
            <div className="flex flex-col ">
            <RichText 
                text={page.data.title}
                className="flex items-center justify-center text-black  text-center   md:text-7xl  !mb-12
                text-4xl
              sm:text-6xl 
              
              xl:text-7xl 
              3xl:text-8xl  "
              /> <RichText 
              text={page.data.sub_title}
              className="flex items-center justify-center text-black text-center  text-lg md:text-3xl  !mb-12  "
            />
            </div>
            {/* Right Side Image */}
            {page.data.right_image?.url && (
              <PrismicNextImage 
                field={page.data.right_image}
                className="w-24 h-auto md:w-60"
              />
            )}
          </div>
           
            <SliceZone
                             slices={page.data.slices}
                             components={components}
                             context={{ removePagePadding }}
                           />
        </main>
    )

}