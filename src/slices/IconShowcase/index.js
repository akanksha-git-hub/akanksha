'use client'
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Lottie from "lottie-react";

/**
 * @typedef {import("@prismicio/client").Content.IconShowcaseSlice} IconShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconShowcaseSlice>} IconShowcaseProps
 * @param {IconShowcaseProps}
 */
const IconShowcase = ({ slice }) => {


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      {slice.primary.data && (
        <ul className="flex flex-wrap justify-center gap-8">
          {slice.primary.data.map(item => {

            let LottieData = null;

            if(item.animated_icon_json_format) LottieData = JSON.parse(item.animated_icon_json_format);
            
            return (
              <li 
                key={item.title}
                className="flex flex-col items-start justify-start w-full sm:w-[500px] space-y-4"
              >
                <div className="h-28 w-28 rounded-full bg-bright-yellow flex items-center justify-center">
                  {
                    item.isanimatedicon ? 
                    <div className="h-[80%] w-[80%]">
                      <Lottie 
                        animationData={LottieData}
                        className="h-full w-full"
                      />
                    </div>
                    :
                    <div className="h-[82%] w-[82%]">
                      <PrismicNextImage 
                        field={item.image}
                        height={60}
                        width={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  }
                </div>
                <div className="space-y-2">
                  <RichText 
                    text={item.title}
                    className='text-deep-green font-ambit-semibold text-2xl'
                    />
                  <RichText 
                    text={item.description}
                    className='text-deep-green font-ambit-regular text-lg'
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  );
};

export default IconShowcase;
