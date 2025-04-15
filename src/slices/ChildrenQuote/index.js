"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PrismicRichText } from "@prismicio/react";
import "swiper/css";
import ProductCard from "@/components/afa/ProductCard";
import CTABtn from "@/components/afa/CTABtn";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ChildrenQuoteSlice} ChildrenQuoteSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ChildrenQuoteSlice>} ChildrenQuoteProps
 * @param {ChildrenQuoteProps}
 */
const ChildrenQuote = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const quotes = slice?.primary?.quotes || [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full px-4 py-20">
      <div className="max-w-6xl mx-auto relative">
        {/* Title */}
        <h2 className="text-6xl font-ambit-regular mb-12">
          {slice.primary.title}
        </h2>

        {/* Top Asset */}
        {slice.primary.top_asset?.url && (
          <div className="absolute right-0 -top-10 h-[120px] w-[120px]">
            <PrismicNextImage
              field={slice.primary.top_asset}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        )}

        {/* Layout Wrapper */}
        <div className={`flex flex-col ${isMobile ? "" : "md:flex-row"} gap-12 items-start pt-12`}>
          {/* Left Column */}
          <div
            className={`w-full ${
              isMobile ? "flex flex-col" : "md:w-[60%] h-[430px]"
            } relative`}
          >
            {/* Blur overlays (desktop only) */}
            {!isMobile && (
              <>
                <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-20" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />
              </>
            )}

            {/* Arrow Buttons for Desktop */}
            {!isMobile && (
              <div className="absolute -bottom-10 left-4 z-30 flex flex-row gap-4">
                <div onClick={() => swiperRef.current?.slidePrev()} className="cursor-pointer">
                  <CTABtn variant="arrow-only" direction="left" />
                </div>
                <div onClick={() => swiperRef.current?.slideNext()} className="cursor-pointer">
                  <CTABtn variant="arrow-only" direction="right" />
                </div>
              </div>
            )}

            {/* Swiper */}
            <Swiper
              direction={isMobile ? "horizontal" : "vertical"}
              slidesPerView={isMobile ? 1.1 : 1.4}
              spaceBetween={20}
              loop={true}
              centeredSlides={true}
              className={`z-10 w-full ${isMobile ? "h-auto" : "h-full"}`}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {quotes.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col justify-center items-center w-full">
                    <div className="relative w-[90%] md:w-[70%] mx-auto z-0">
                      {/* Yellow background */}
                      <div className="absolute top-2 right-2 w-full h-full bg-[#FBDA1D] rounded-xl border-2 border-black -z-10" />

                      {/* Quote Card */}
                      <div className="bg-white p-6 border-2 border-black rounded-xl w-full md:h-[300px] flex items-center justify-center">
                        <div className="text-xl font-ambit-regular text-black flex flex-col justify-center items-start text-left w-full max-w-md">
                          <PrismicRichText field={item.quote} />
                          <p className="mt-4 text-sm font-ambit-regular">{item.authur}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Buttons */}
                    {isMobile && (
                      <div className="flex flex-row justify-center gap-4 mt-6">
                        <div onClick={() => swiperRef.current?.slidePrev()} className="cursor-pointer">
                          <CTABtn variant="arrow-only" direction="left" />
                        </div>
                        <div onClick={() => swiperRef.current?.slideNext()} className="cursor-pointer">
                          <CTABtn variant="arrow-only" direction="right" />
                        </div>
                      </div>
                    )}

                    {/* Mobile ProductCard (Below Buttons) */}
                    {isMobile && (
                      <div className="mt-20 w-[80%] flex justify-center">
                        <ProductCard
                          image={item?.image?.url}
                          tagPosition="top-left"
                          tagRotation={-20}
                          tagScale={0.8}
                          tagOffset={{ top: "-32px", left: "-55px" }}
                          variant="image-only"
                          cardRotation={3}
                          cardScale={1.2}
                        />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop ProductCard */}
          {!isMobile && (
            <div className="w-full md:w-[40%] flex justify-center relative">
              <ProductCard
                image={quotes[activeIndex]?.image?.url}
                tagPosition="top-left"
                tagRotation={-20}
                tagScale={0.8}
                tagOffset={{ top: "-32px", left: "-55px" }}
                variant="image-only"
                cardRotation={3}
                cardScale={1.2}
              />

              {/* W Asset */}
              {slice.primary.w_image?.url && (
                <div className="absolute left-0 -bottom-20 h-[80px] w-[80px]">
                  <PrismicNextImage
                    field={slice.primary.w_image}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChildrenQuote;
