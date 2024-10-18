'use client'

import SwiperClick from "@/components/SwiperClick";
import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * @typedef {import("@prismicio/client").Content.SliderShowcaseSlice} SliderShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SliderShowcaseSlice>} SliderShowcaseProps
 * @param {SliderShowcaseProps}
 */
const SliderShowcase = ({ slice }) => {

  const [current, setCurrent] = useState(0);
  const nextRef = useRef();
  const prevRef = useRef();

  const swipeNext = () => nextRef.current.click();
  const swipePrev = () => prevRef.current.click();


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg flex flex-col lg:flex-row items-end justify-center gap-2 w-[90%] lg:w-[80%] p-6 lg:p-12"
      >
        <Swiper 
          className="w-full lg:w-[40%] h-[400px] sm:h-[350px] 3xl:h-[400px] rounded-lg"
          onSlideChange={(e) => setCurrent(() => e.activeIndex)}
        >
          {slice.primary.items.map((item, index) => {
            return(
              <SwiperSlide className="!h-full !w-full" key={index}>
                <SwiperClick className="absolute opacity-0" text="Next" ref={nextRef} />
                <SwiperClick className="absolute opacity-0" isPrev text="Prev" ref={prevRef} />
                <PrismicNextImage 
                  className="h-full w-full object-cover"
                  field={item.image}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="flex flex-col mt-6 lg:mt-0 items-start justify-between h-full w-full lg:w-[56%] space-y-4 3xl:space-y-14 pb-6">
          <RichText 
            className='text-deep-green font-ambit-regular text-3xl opacity-reveal'
            key={slice.primary.items[current].title}
            text={slice.primary.items[current].title}
          />
          <div className="flex flex-col gap-8">
            <RichText 
              className='text-deep-green font-ambit-regular text-xl w-full lg:w-[80%] opacity-reveal'
              key={slice.primary.items[current].description}
              text={slice.primary.items[current].description}
            />
            <div className="flex items-center justify-between pr-12">
              <PrimaryCTA
                className='opacity-reveal'
                key={slice.primary.items[current].cta_text}
                text={slice.primary.items[current].cta_text || 'Know more'}
                link={slice.primary.items[current].cta_link}
              />
              <div className="flex gap-2 mt-2">
                <SwiperArrow 
                  strokeColor="#37473C" 
                  className={`${current === 0 ? "bg-[#AFB3A9]" : "bg-bright-yellow"} rotate-180`} 
                  onClick={swipePrev}
                />
                <SwiperArrow 
                  strokeColor="#37473C" 
                  className={`${current === slice.primary.items.length - 1 ? "bg-[#AFB3A9]" : "bg-bright-yellow"}`}
                  onClick={swipeNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderShowcase;
