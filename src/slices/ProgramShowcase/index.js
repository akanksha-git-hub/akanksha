'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ImageComponent from "@/components/ProgramShowcase/ImageComponent";
import QuoteComponent from "@/components/ProgramShowcase/QuoteComponent";
import StatsComponent from "@/components/ProgramShowcase/StatsComponent";
import SlideSelector from "@/components/ProgramShowcase/SlideSelector";
import { useRef, useState } from "react";
import SwiperClick from "@/components/SwiperClick";
import SwiperArrow from '@/components/UI/SwiperArrow';

/**
 * @typedef {import("@prismicio/client").Content.ProgramShowcaseSlice} ProgramShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ProgramShowcaseSlice>} ProgramShowcaseProps
 * @param {ProgramShowcaseProps}
 */
const ProgramShowcase = ({ slice }) => {

  const nextRef = useRef();
  const prevRef = useRef();
  const swiperRef = useRef();
  const selectorRef = useRef();
  const [trackIndex, setTrackIndex] = useState(0);

  const swipeNext = () => nextRef.current.click();
  const swipePrev = () => prevRef.current.click();
  
  const handleSelectorSlideClick = (i) => swiperRef.current.swiper.slideTo(i, 500);

  const handleSlideChange = (activeIndex) => {
    setTrackIndex(activeIndex);
    selectorRef.current.swiper.slideTo(activeIndex);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      {/* Swiper Component Container */}
      <div
        className="h-auto lg:h-[32.4rem] flex gap-12"
      >
        <ul 
          className="h-full hidden lg:block w-[20%] lg:w-[25%]"
        >
          <Swiper
            direction="vertical"
            className='h-full'
            slidesPerView={3}
            ref={selectorRef}
          >
            {slice.primary.program_showcase_content.map((item, index) => (
              <SwiperSlide 
                key={index}
                onClick={() => handleSelectorSlideClick(index)}
              >
                <SlideSelector 
                  key={index} name={item.name} 
                  index={index}
                  trackIndex={trackIndex}
                  short_content={item.short_content} 
                  program_name={item.program_name} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
        {/* Swiper Component */}
        <Swiper 
          ref={swiperRef}
          className="w-full lg:w-[80%] xl:w-[80%] h-full cursor-grab"
          slidesPerView={1.04}
          spaceBetween={20}
          onSlideChange={(i) => handleSlideChange(i.activeIndex)}
        >
          {slice.primary.program_showcase_content.map((item) => (
            <SwiperSlide className="!flex flex-col gap-2 md:flex-row" key={item.name}>
              <SwiperClick className="absolute opacity-0" text="Next" ref={nextRef} />
              <SwiperClick className="absolute opacity-0" isPrev text="Prev" ref={prevRef} />
              <div className='flex gap-2 md:gap-0 flex-col md:flex-row'>
                <ImageComponent image={item.image} />
                <QuoteComponent quote={item.quote} quote_by={item.quote_by} />
              </div>
              <div className="flex items-start gap-2 sm:gap-0 justify-between w-full sm:flex-col xl:mt-0 xl:w-[40%]">
                <StatsComponent 
                  description={item.stat_a_description} 
                  number={item.stat_a_number} 
                />
                <StatsComponent 
                  description={item.stat_b_description} 
                  number={item.stat_b_number} 
                />
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div 
        className='
        flex items-start mt-6 justify-between
        xl:mt-0 xl:justify-normal'
      >
        <SlideSelector 
          className="block w-3/4 lg:hidden"
          key={slice.primary.program_showcase_content[trackIndex].name}
          name={slice.primary.program_showcase_content[trackIndex].name}
          short_content={slice.primary.program_showcase_content[trackIndex].short_content}
          program_name={slice.primary.program_showcase_content[trackIndex].program_name}
          trackIndex={trackIndex}
          index={trackIndex}
        />
        <div className="flex gap-2 mt-2">
          <SwiperArrow 
            strokeColor="#37473C" 
            className={`${trackIndex === 0 ? "bg-[#AFB3A9]" : "bg-bright-yellow"} rotate-180`} 
            onClick={swipePrev}
          />
          <SwiperArrow 
            strokeColor="#37473C" 
            className={`${trackIndex === slice.primary.program_showcase_content.length - 1 ? "bg-[#AFB3A9]" : "bg-bright-yellow"}`}
            onClick={swipeNext}
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramShowcase;
