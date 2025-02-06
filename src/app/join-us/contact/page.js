import ContactTabComponent from "@/components/Contact/ContactTabComponent";
import TabContainer from "@/components/Tab/tab-container";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";


export default async function Page() {

    const page = await fetchPrismicSingleDocument("contact");

    if(!page) return <p>No page data!</p>;



    return(
        <main
            className={`${maxwidth} universal-padding relative`}
        >
           
              <div className="flex items-center justify-center gap-2 md:gap-10 mb-10">
                        {/* Left Side Image */}
                        {page.data.left_image?.url && (
                          <PrismicNextImage  
                            field={page.data.left_image}
                            className="w-24 h-auto md:w-60"
                          />
                        )}
                      
                        {/* Title */}
                        <div className="flex flex-col">
                        <RichText 
                            text={page.data.title}
                            className="flex items-center justify-center text-black   text-2xl md:text-7xl !mt-[5rem] !mb-12  "
                          /> <RichText
                          text={page.data.sub_title}
                          className="flex items-center justify-center text-black  text-center  text-lg md:text-xl !mt-[1rem] !mb-12  "
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
            <div className="mb-32">
                <ContactTabComponent 
                    data={page.data.location_items}
                />
            </div>
        </main>
    )


}