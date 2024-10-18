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
  const [sliderBIndex, setSliderBIndex] = useState(0);

  const sliderBNextRef = useRef();
  const sliderBPrevRef = useRef();

  const swipeSliderBNext = () => sliderBNextRef.current.click();
  const swipeSliderBPrev = () => sliderBPrevRef.current.click();

  const nextRef = useRef();
  const prevRef = useRef();

  const swipeNext = () => nextRef.current.click();
  const swipePrev = () => prevRef.current.click();


  return(
    <>
    {slice.variation === 'default' && (
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
    )}
    {/* Default */}
    {slice.variation === 'sliderB' && (
      <section>
        <RichText 
          text={slice.primary.title}
          className='text-deep-green text-6xl font-ambit-regular text-center flex items-center justify-center my-8'
        />
        <div className="pb-12">
          <Swiper
            breakpoints={{
              1000: {
                slidesPerView: 2.2,
                slidesOffsetBefore: 500,
                slidesOffsetAfter: 200,
              },
              100: {
                slidesPerView: 2,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 120,
                spaceBetween: 50
              }
            }}
            onSlideChange={(e) => setSliderBIndex(() => e.activeIndex)}
          >
            {slice.primary.items.map((item, index) => {

              return(
                <SwiperSlide
                  key={item.description}
                  className=""
                >
                  <SwiperClick className="absolute opacity-0" text="Next" ref={sliderBNextRef} />
                  <SwiperClick className="absolute opacity-0" isPrev text="Prev" ref={sliderBPrevRef} />
                  <div 
                    className={
                      `${sliderBIndex === index ? 'bg-bright-yellow p-4 lg:p-8 scale-100' : 'scale-90'} 
                      transition-all w-[16rem] sm:w-[16rem] lg:w-[33rem] rounded-md`
                    }
                  >
                    <div
                      className="w-full h-[14rem] sm:h-[18rem] lg:h-[30rem] rounded-md overflow-hidden"
                    >
                      <PrismicNextImage className="h-full w-full object-cover" field={item.image} />
                    </div>
                    <RichText 
                      className='text-deep-green font-ambit-regular text-lg mt-8'
                      text={item.description}
                    />
                  </div>
                </SwiperSlide>
              )

            })}
          </Swiper>
          <div className="flex items-center justify-center gap-2 mt-2 w-full py-8">
            <SwiperArrow 
              strokeColor="#FBDA1D" 
              className={`${sliderBIndex === 0 ? "bg-[#AFB3A9]" : "bg-deep-green"} rotate-180`} 
              onClick={swipeSliderBPrev}
            />
            <SwiperArrow 
              strokeColor="#FBDA1D" 
              className={`${sliderBIndex === slice.primary.items.length - 1 ? "bg-[#AFB3A9]" : "bg-deep-green"}`}
              onClick={swipeSliderBNext}
            />
          </div>
        </div>
      </section>
    )}
    </>

  )

};

export default SliderShowcase;
