'use client'
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Lottie from "lottie-react";
import DUMMYLOTTIE from "../../../public/lotties/dummyTestLottie.json"
import SliceIdentifier from "@/components/SliceIdentifier";
import Image from "next/image";
import PencilShading from "@/assets/shading-side.svg";
/**
 * @typedef {import("@prismicio/client").Content.IconShowcaseSlice} IconShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconShowcaseSlice>} IconShowcaseProps
 * @param {IconShowcaseProps}
 */
const IconShowcase = ({ slice }) => {

  if(slice.variation === 'withTitle') {
    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12"
      >
        <div className="mb-24 space-y-20">
          <SliceIdentifier 
            text={slice.primary.slice_identifier}
          />
          <RichText 
            text={slice.primary.title}
            className='font-ambit-regular text-deep-green text-5xl md:text-center flex md:items-center md:justify-center'
          />
        </div>
         {slice.primary.data && (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {slice.primary.data.map(item => {

            let LottieData = null;

            if(item.animated_icon_json_format) LottieData = JSON.parse(item.animated_icon_json_format);
            
            return (
              <li 
                key={item.title}
                className="flex flex-col items-start justify-start space-y-4"
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
    )
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding my-12"
    >
      {slice.primary.data && (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3">
          {slice.primary.data.map((item, index) => {

            let LottieData = null;

            if(item.animated_icon_json_format) LottieData = JSON.parse(item.animated_icon_json_format);

            let currentItem = index;
            
            return (
              <li 
                key={item.title}
                className={`
                  flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 
                  ${currentItem % 2 === 0 && ("bg-v2-yellow")} group relative overflow-hidden
                `}
              >
                <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                  <div className="h-full w-full">
                    <Image
                      src={PencilShading}
                      alt="img" 
                      fill
                    />
                  </div>
                </div>
                <div className="h-28 w-28 rounded-full flex items-center justify-center place-self-end">
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
