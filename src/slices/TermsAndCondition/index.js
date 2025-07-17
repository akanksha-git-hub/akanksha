// --- START OF FILE index.js ---

import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.TermsAndConditionSlice} TermsAndConditionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TermsAndConditionSlice>} TermsAndConditionProps
 * @param {TermsAndConditionProps}
 */
const TermsAndCondition = ({ slice }) => {
  return (
  
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-12 md:px-8 lg:px-16" 
    >
    <div className=" flex flex-col items-center">
     {/* Heading */}
{slice.primary.heading && (
 
  <div className="font-ambit-regular text-black text-left md:text-center text-3xl md:text-6xl max-w-[15ch]">
    <PrismicRichText field={slice.primary.heading} />
  </div>
)}

    
     {/* Description */}
{slice.primary.description && (
 
  <div className="font-ambit-regular text-black sm:text-center w-full max-w-[42ch] mt-8 text-[1.35rem] md:pt-14 xl:pt-0">
    <PrismicRichText field={slice.primary.description} />
  </div>

)}
</div>

 <div
          className="hidden lg:block absolute -top-[10%] -left-[15px] md:-top-[8%] xl:top-[10%] md:left-[120px] 
          h-[100px] w-[80px] sm:h-[200px] sm:w-[200px]  -z-10"
        >
          <Image
            
            src="/asset-t.png"
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>

        <div
          className="block absolute bottom-[250px] -right-[190px]
          h-[160px] w-[120px] sm:h-[180px] sm:w-[140px] md:h-[260px] md:w-[300px] xl:h-[400px] xl:w-[500px] -z-10"
        >
          <Image
            src="/asset-t.png"
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>
     
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-20 max-w-[90rem] mx-auto mt-12 md:mt-20">
        
       
        <aside className="hidden md:block bg-[#F6AC27] p-6 font-ambit-regular space-y-4 sticky top-24 h-fit relative ">
          <Image
    src="/quote-side 4.png" 
    alt=""
    
    objectFit="cover"
    width={40} 
            height={500} 
    className="absolute top-0 left-0 h-full w-auto object-cover z-0"
  />
          {slice.primary.terms_section.map((item, index) => (
            <a
              key={index}
              href={`#${item.section_id}`}
              className="flex items-center text-black text-xl hover:underline"
            >
              <Image
                src="/bullet.svg"
                alt=""
                width={12}
                height={12}
                className="mr-3"
              />
              {item.title[0]?.text}
            </a>
          ))}
        </aside>

        {/* Terms Sections List */}
        <div className="space-y-12 font-ambit-regular">
          {slice.primary.terms_section.map((item, index) => (
            <div key={index} id={item.section_id} className="scroll-mt-24">
              {/* Section Title */}
            
              <div className="flex items-baseline gap-3 text-2xl md:text-4xl font-ambit-regular">
                <span>{index + 1}.</span>
                <PrismicRichText field={item.title} />
              </div>

              {/* Section Content */}
              {item.content && (
       
        <div className=" text-black  font-ambit-regular [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:ml-2">
          <PrismicRichText field={item.content_1} />
        </div>
      )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndCondition;