"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ImageComponent from "@/components/ProgramShowcase/ImageComponent";
import QuoteComponent from "@/components/ProgramShowcase/QuoteComponent";
import StatsComponent from "@/components/ProgramShowcase/StatsComponent";
import SlideSelector from "@/components/ProgramShowcase/SlideSelector";
import { useRef, useState } from "react";
import SwiperClick from "@/components/SwiperClick";
import SwiperArrow from "@/components/UI/SwiperArrow";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import { monthsShort } from "@/utils/months";
import QuoteComponentB from "@/components/ProgramShowcase/QuoteComponentB";
import Image from "next/image";

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

  const handleSelectorSlideClick = (i) =>
    swiperRef.current.swiper.slideTo(i, 500);

  const handleSlideChange = (activeIndex) => {
    setTrackIndex(activeIndex);
    selectorRef.current.swiper.slideTo(activeIndex);
  };

  if (slice.variation === "optionB") {
    const startDate = new Date(
      slice.primary.program_showcase_content[trackIndex].start_date
    );
    const endDate = new Date(
      slice.primary.program_showcase_content[trackIndex].end_date
    );

    const startMonth = monthsShort[startDate.getMonth()];
    const startYear = startDate.getFullYear();

    const endMonth = monthsShort[endDate.getMonth()];
    const endYear = endDate.getFullYear();

    const date = {
      startMonth,
      startYear,
      endMonth,
      endYear,
    };

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-24"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <RichText
          text={slice.primary.title}
          className="text-deep-green font-ambit-regular text-6xl md:text-center flex md:items-center md:justify-center max-w-[40ch] mt-16"
        />
        {/* Swiper Component Container */}

        <div className="h-auto lg:h-[32.4rem] flex gap-12 mt-16">
          <ul className="h-full hidden lg:block w-[20%] lg:w-[25%] border-red-400">
            <Swiper
              direction="vertical"
              className="h-full"
              slidesPerView={3}
              ref={selectorRef}
            >
              {slice.primary.program_showcase_content
                .sort((a, b) => {
                  const dateA = new Date(a.start_date);
                  const dateB = new Date(b.start_date);

                  const dateC = dateB - dateA;

                  return dateC;
                })
                .map((item, index) => {
                  const startDate = new Date(item.start_date);
                  const endDate = new Date(item.end_date);
                  const startMonth = monthsShort[startDate.getMonth()];
                  const startYear = startDate.getFullYear();

                  const endMonth = monthsShort[endDate.getMonth()];
                  const endYear = endDate.getFullYear();

                  const truncatedText = `${item.short_content.substring(0, 180)}...`;

                  return (
                    <SwiperSlide
                      key={index}
                      onClick={() => handleSelectorSlideClick(index)}
                    >
                      <li
                        className={`
                      border-t border-[#D7D7CD] min-h-[10.8rem] overflow-hidden flex flex-col justify-between
                      p-4 cursor-pointer transition-all 
                      ${trackIndex === index ? "opacity-100" : "opacity-55"}
                    `}
                      >
                        <p className="font-ambit-semibold text-deep-green uppercase">
                          <span>
                            {startMonth}
                            {startYear}
                          </span>
                          &nbsp;-&nbsp;
                          <span>
                            {endMonth}
                            {endYear}
                          </span>
                        </p>
                        <p className="text-deep-green font-ambit-regular text-base">
                          {truncatedText}
                        </p>
                      </li>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </ul>
          {/* Swiper Component */}
          <Swiper
            ref={swiperRef}
            className="w-full lg:w-[80%] xl:w-[80%] h-full cursor-grab "
            slidesPerView={1}
            spaceBetween={20}
            onSlideChange={(i) => handleSlideChange(i.activeIndex)}
          >
            {slice.primary.program_showcase_content.map((item) => (
              <SwiperSlide
                className="!flex flex-col md:flex-row border- "
                key={item.name}
              >
                <SwiperClick
                  className="absolute opacity-0"
                  text="Next"
                  ref={nextRef}
                />
                <SwiperClick
                  className="absolute opacity-0"
                  isPrev
                  text="Prev"
                  ref={prevRef}
                />
                <div className="flex gap-2 md:gap-0 flex-col md:flex-row w-full">
                  <ImageComponent
                    className="w-full xl:w-[40%]"
                    image={item.image}
                  />
                  <QuoteComponentB
                    className="xl:w-[60%]"
                    texts={item.card_rich_text}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className="
          flex items-start mt-6 justify-between
          xl:mt-0 xl:justify-normal "
        >
          <SlideSelector
            className="block border w-[98%] sm:w-3/4 lg:hidden "
            date={date}
            isOptionB
            key={slice.primary.program_showcase_content[trackIndex].name}
            name={slice.primary.program_showcase_content[trackIndex].name}
            short_content={
              slice.primary.program_showcase_content[trackIndex].short_content
            }
            program_name={
              slice.primary.program_showcase_content[trackIndex].program_name
            }
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
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      {/* Swiper Component Container */}
      <div className="h-auto xl:h-[32.4rem] flex gap-12  ">
        <ul className="h-full hidden xl:block w-[20%] xl:w-[25%] ">
          <Swiper
            direction="vertical"
            className="h-full"
            slidesPerView={3}
            ref={selectorRef}
          >
            {slice.primary.program_showcase_content.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleSelectorSlideClick(index)}
              >
                <SlideSelector
                  key={index}
                  name={item.name}
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
        <div className="relative w-full xl:w-[70%]  h-full cursor-grab  ">
          <div className="absolute h-[120%] w-full -top-8 -left-8 hidden xl:block">
            <div className="relative h-full w-full">
              <Image src="/bg-page.png" fill className="mix-blend-hard-light" />
            </div>
          </div>
          <Swiper
            ref={swiperRef}
            className="w-full  h-full cursor-grab"
            slidesPerView={1.04}
            spaceBetween={20}
            onSlideChange={(i) => handleSlideChange(i.activeIndex)}
          >
            {slice.primary.program_showcase_content.map((item) => (
              <SwiperSlide
                className="!flex flex-col gap-2 xl:flex-row"
                key={item.name}
              >
                <SwiperClick
                  className="absolute opacity-0"
                  text="Next"
                  ref={nextRef}
                />
                <SwiperClick
                  className="absolute opacity-0"
                  isPrev
                  text="Prev"
                  ref={prevRef}
                />

                <div className="flex gap-2 xl:gap-0 flex-col xl:flex-row ">
                  <ImageComponent
                    className="w-full xl:w-[42%]"
                    image={item.image}
                  />
                  <QuoteComponent quote={item.quote} quote_by={item.quote_by} />
                </div>
                <div className="flex items-start gap-2 xl:gap-0 justify-between w-full xl:flex-col xl:mt-0 xl:w-[40%] ">
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
      </div>
      <div
        className="
        flex items-start mt-6 justify-between
        xl:mt-0 xl:justify-normal "
      >
        <SlideSelector
          className="block w-3/4 xl:hidden"
          key={slice.primary.program_showcase_content[trackIndex].name}
          name={slice.primary.program_showcase_content[trackIndex].name}
          short_content={
            slice.primary.program_showcase_content[trackIndex].short_content
          }
          program_name={
            slice.primary.program_showcase_content[trackIndex].program_name
          }
          trackIndex={trackIndex}
          index={trackIndex}
        />
        <div className="flex gap-2 mt-24 mx-auto">
          <SwiperArrow
            isDisabled={trackIndex === 0}
            className="rotate-180"
            onClick={swipePrev}
          />

          <SwiperArrow
            isDisabled={
              trackIndex === slice.primary.program_showcase_content.length - 1
            }
            onClick={swipeNext}
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramShowcase;
