'use client'

import { PrismicNextImage } from "@prismicio/next";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * @typedef {import("@prismicio/client").Content.RotatingCarouselSlice} RotatingCarouselSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RotatingCarouselSlice>} RotatingCarouselProps
 * @param {RotatingCarouselProps}
 */
const RotatingCarousel = ({ slice }) => {

  const [activeSlide, setActiveSlide] = useState(1);
  const [prevActiveSlide, setPrevActiveSlide] = useState(0);
  const [nextActiveSlide, setNextActiveSlide] = useState(2);

  const handleTest = (i) => {

    setActiveSlide(prevState => prevState + 1);
    setPrevActiveSlide(prevState => prevState + 1);
    setNextActiveSlide(prevState => prevState + 1);

  }
  
  const handleTestB = (i) => {

    setActiveSlide(prevState => prevState - 1);
    setPrevActiveSlide(prevState => prevState - 1);
    setNextActiveSlide(prevState => prevState - 1);

  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* <div className="w-full border border-red-500 overflow-hidden h-[800px] mt-12">
      SWIPERJS DOES NOT ALLOW A ROTATIONAL CONFIG [Multiple attempts made], DRAG TO SEE
        <Swiper
          slidesPerView={2.86}
          initialSlide={0.5}
          spaceBetween={20}
          onSlideNextTransitionStart={(e) => handleTest(e.activeIndex)}
          onSlidePrevTransitionStart={(e) => handleTestB(e.activeIndex)}

          className="border border-red-500 w-full !py-12"
        >
          {slice.primary.carousel_items.map((item, index) => {

            let rightCard = "rotate-[12deg] relative -bottom-12";
            let leftCard = "rotate-[-12deg] relative -bottom-12";
            let cardDive = "rotate-[-180deg] relative -bottom-24";

            return(
              <SwiperSlide 
                key={index}>
                <div className={`h-[504px] w-[380px] border border-red-500 custom-bezier
                  ${index === prevActiveSlide && leftCard}
                  ${index === nextActiveSlide && rightCard}
                  `}>
                  {item.carousel_title}{index}
                </div>
              </SwiperSlide>
            )

          })}
        </Swiper>
      </div> */}

      <div className="w-full overflow-hidden mt-12">
      {/* SWIPERJS TRAVELS ON THE X-AXIS FOR TRANSITION (or straight line following the div), DRAG TO SEE */}
        <Swiper
          initialSlide={0.5}
          spaceBetween={20}
          breakpoints={{
            1700: {
              slidesPerView: 3.01
            },
            1200: {
              slidesPerView: 2.86
            },
            900: {
              slidesPerView: 2.66
            },
            600: {
              slidesPerView: 2.46
            },
            10: {
              slidesPerView: 1.3
            }
          }}
          className="w-full !py-12"
        >
          {slice.primary.carousel_items.map((item, index) => {
            return(
              <SwiperSlide 
                className="cursor-grab active:cursor-grabbing"
                key={index}
              >
                <div className={`h-[320px] xl:h-[504px] xl:w-[400px] 2xl:w-[450px] 3xl:w-[550px] bg-[#D9D9D9] py-4 px-4 flex items-end custom-bezier relative overflow-hidden rounded-xl`}>
                  <PrismicNextImage 
                    field={item.carousel_image}
                    className="h-full w-full object-cover custom-bezier absolute top-0 left-0 hover:opacity-25"
                    alt=""
                  />
                  <div>
                    <p className="font-ambit-semibold text-xl">
                    {item.carousel_title}
                    </p>
                    <p className="font-ambit-regular leading-5 w-[90%] text-sm">
                      {item.carousel_description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            )

          })}
        </Swiper>
      </div>
    </section>
  );
};

export default RotatingCarousel;
