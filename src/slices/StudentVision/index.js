"use client";
import { useState, useRef, useEffect } from "react";
import SliceIdentifier from "@/components/SliceIdentifier";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import FinancialsAccordion from "@/components/financials-accordion";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.StudentVisionSlice} StudentVisionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StudentVisionSlice>} StudentVisionProps
 * @param {StudentVisionProps}
 */
const StudentVision = ({ slice, context }) => {
   const { show_identifier, slice_identifier } = slice.primary;
    
      const RenderIdentifier = () =>
        show_identifier && <SliceIdentifier text={slice_identifier} />;
  const [trackIndex, setTrackIndex] = useState(0);
  const swiperRef = useRef(null);
  const images = slice?.primary.images || [];
  const [activeIndex, setActiveIndex] = useState(1);
  const financialsPage = context?.financialsPage;
  useEffect(() => {
    console.log("Financials Page Data:", financialsPage);
  }, [financialsPage]); // ✅ Log when financialsPage is available

  // Navigation functions
  const swipePrev = () => {
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    }
  };

  const swipeNext = () => {
    if (trackIndex < slice.primary.description.length - 1) {
      setTrackIndex(trackIndex + 1);
    }
  };

  if (slice.variation === "withBgImage") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding mt-8"
      >
        <RenderIdentifier />

        <div className="flex flex-col justify-center items-center">
          <h1 className="mt-8 text-5xl md:text-7xl font-ambit-regular">
            {slice.primary.title}
          </h1>

          <div className="relative h-full w-full flex items-center justify-center">
            <PrismicNextImage
              field={slice.primary.bg_image}
              alt="bg-image"
              fill
              className="absolute top-0 left-0 -z-10"
            />
            <PrismicNextImage
              height={500}
              width={500}
              field={slice.primary.image}
              alt=""
            />
          </div>
          <p className="text-center w-[50%] font-ambit-regular mt-4">
            {slice.primary.description[trackIndex].desc}
          </p>

          <div className="flex gap-2 mt-4">
            <SwiperArrow
              strokeColor="#37473C"
              className="rotate-180"
              onClick={swipePrev}
              isDisabled={trackIndex === 0}
            />
            <SwiperArrow
              strokeColor="#37473C"
              onClick={swipeNext}
              isDisabled={trackIndex === slice.primary.description.length - 1}
            />
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "simple") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" mt-10"
      >
        <RenderIdentifier />

        <div className="flex flex-col justify-center items-center relative md:mt-10">
          <h1 className="  text-3xl  md:text-6xl text-left md:text-center md:w-[18ch] font-ambit-regular mt-10 ">
            {slice.primary.title}
          </h1>
          <p className="md:text-center md:w-[65%] xl:w-[40%] font-ambit-regular text-left text-xl mt-8 md:mt-10">
            {slice.primary.description}
          </p>
          <PrismicNextImage
            field={slice.primary.asset_1}
            alt="left-asset"
            height={220}
            width={220}
            className="absolute hidden md:block md:-right-[2%] md:top-[28%] xl:top-[18%] xl:right-[12%] -z-10 md:h-40 md:w-40 lg:h-56 lg:w-56 xl:h-56 xl:w-56"
          />
          <PrismicNextImage
            field={slice.primary.asset_2}
            alt="right-asset"
            height={120}
            width={120}
            className="absolute hidden md:block md:-right-[10%] md:top-[39%] xl:top-[30%] xl:right-[6%] -z-10 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44"
          />
          <PrismicNextImage
            field={slice.primary.asset_1}
            alt="left-asset"
            height={220}
            width={220}
            className="absolute hidden xl:block md:top-[50%] md:-left-[12%] xl:top-[50%] xl:left-[5%] -z-10 md:h-40 md:w-40 lg:h-56 lg:w-56 xl:h-56 xl:w-56"
          />
          <PrismicNextImage
            field={slice.primary.asset_2}
            alt="right-asset"
            height={120}
            width={120}
            className="absolute hidden lg:block xl:top-[64%] xl:left-[18%] -z-10"
          />
          <div className="relative h-full w-full flex items-center justify-center">
            <PrismicNextImage
              height={700}
              width={700}
              field={slice.primary.image}
              alt=""
            />
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "gallery") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative mt-14"
      >
        <RenderIdentifier />
        <div className="flex justify-center items-center relative mt-20">
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            centeredSlides={true}
            loop={true}
            speed={700}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 20,
              modifier: 2,
              scale: 0.8,
            }}
            breakpoints={{
              0: { slidesPerView: 1 }, // 1 slide for mobile (sm and below)
              640: { slidesPerView: 1 }, // 1 slide for sm screens
              768: { slidesPerView: 3 }, // 3 slides from md screens and above
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-[500px]"
          >
            {images.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-transparent transition-transform ease-in-out w-full h-full"
              >
                <PrismicNextImage
                  field={item.image}
                  className={`w-full h-full object-cover rounded-lg transition-transform ease-in-out ${
                    index === activeIndex ? "scale-100" : ""
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex items-center mt-14 justify-between  xl:justify-normal">
          <div className="flex gap-2 mx-auto">
            <SwiperArrow
              className="rotate-180"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SwiperArrow onClick={() => swiperRef.current?.slideNext()} />
          </div>
        </div>
        <div>
          {financialsPage && (
            <div className="mt-8">
              <RenderIdentifier />
              <div className="relative w-fit md:mx-auto">
                <RichText
                  text={financialsPage.data.title}
                  className={`text-black font-ambit-regular  text-5xl md:text-7xl text-left md:text-center w-full pt-24`}
                />
              </div>
              <div className="mt-8">
                <FinancialsAccordion item={financialsPage.data} />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-8"
    >
      <RenderIdentifier />

      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-8 text-5xl md:text-7xl font-ambit-regular">
          {slice.primary.title}
        </h1>

        <PrismicNextImage
          height={800}
          width={800}
          field={slice.primary.image}
          alt=""
        />

        <div
          className={`text-center w-[80%] md:w-[50%] font-ambit-regular mt-4 p-4 rounded-lg transition-all duration-300`}
          style={{
            backgroundColor:
              slice.primary.description[trackIndex]?.bg_color || "transparent",
          }}
        >
          {slice.primary.description[trackIndex].desc}
        </div>

        <div className="flex gap-2 mt-4">
          <SwiperArrow
            strokeColor="#37473C"
            className="rotate-180"
            onClick={swipePrev}
            isDisabled={trackIndex === 0}
          />
          <SwiperArrow
            strokeColor="#37473C"
            onClick={swipeNext}
            isDisabled={trackIndex === slice.primary.description.length - 1}
          />
        </div>
      </div>
    </section>
  );
};

export default StudentVision;
