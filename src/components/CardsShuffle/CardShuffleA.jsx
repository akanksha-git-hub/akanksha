import RichText from "../Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import TextCTA from "../UI/Button/TextCTA";
import { cardProps } from "@/utils/helperClasses";
import Button from "../v2-components/buttons/button";
import Image from "next/image";

export default function CardShuffleA({ item, index }) {
  let trackIndex = index;
  const selectIndex = trackIndex % cardProps.length;

  return (
    <div
      className="bg-deep-green p-4 lg:p-8 h-full rounded-[10px]"
      style={{ background: `${cardProps[selectIndex].bg}` }}
    >
      <div className="absolute top-0  w-[97%]  ">
              <div className="relative w-full h-[20px] ">
                                <Image src="/quote-side-up.png" alt="Top Shading" fill  />
                              </div>
       </div>
    
      <div className="flex flex-col lg:flex-row items-start justify-between h-full relative">
      
        <div className="w-full lg:w-[52%] lg:h-full flex flex-col justify-between">
          <div className="font-ambit-regular space-y-1 lg:space-y-6">
            <RichText
              className="text-2xl text-black"
           
              text={item.small_title}
            />
            <RichText
              className="leading-3 text-2xl text-black lg:text-5xl"
           
              text={item.main_title}
            />
            <RichText
              className="font-ambit-regular text-black text-sm lg:text-xl max-w-full"
            
              text={item.description}
            />
          </div>
          {/* <div className="flex flex-col mt-4 lg:mt-0 space-y-2">
            <Button  link={item.cta_link}
            
            strokeColor={`${cardProps[selectIndex].link}`}
            bgColor={`${selectIndex === 0 ? "bg-[#FBDA1D]" : selectIndex === 1 ? "bg-[#37473C]" : "bg-[#FFFBF1]"}`}>
           
          About Us</Button>
            <TextCTA
              link={item.cta_link}
              hasUnderLine
              text="Read Story"
              style={{ color: `${cardProps[selectIndex].link}` }}
              strokeColor={`${cardProps[selectIndex].link}`}
              bgColor={`${selectIndex === 0 ? "bg-[#FBDA1D]" : selectIndex === 1 ? "bg-[#37473C]" : "bg-[#FFFBF1]"}`}
            />
          </div> */}
        </div>
        <div className="w-full h-[550px] mt-6 lg:mt-0 lg:w-[36%] md:h-full rounded overflow-hidden">
          <PrismicNextImage
            field={item.image}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
