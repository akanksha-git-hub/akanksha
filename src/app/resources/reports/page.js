import FinancialsAccordion from "@/components/financials-accordion";
import RichText from "@/components/Texts/RichText";
import { components } from "@/slices";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("reports");

  if (!page) return <p>No page data</p>;

  return (
    <main className={`${maxwidth} universal-padding`}>
      <div className="flex flex-row justify-center items-center  ">
        {/* Left Image */}
       
        <div className="flex flex-col items-center text-black">
          <RichText
            text={page.data.title}
            className={` font-ambit-regular text-3xl md:text-6xl text-left md:text-center w-full pt-2`}
          />
          <RichText
            text={page.data.description}
            className="font-ambit-regular text-left md:text-center  text-base md:text-lg md:leading-7 w-[90%] md:w-[80%] md:mx-auto mt-10"
          />
        </div>
      
      </div>
     
       <SliceZone
                      slices={page.data.slices}
                      components={components}
                      
                
                  />
    </main>
  );
}
