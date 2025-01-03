'use client'

import SliceIdentifier from "@/components/SliceIdentifier";
import SwiperClick from "@/components/SwiperClick";
import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import StoryCircle from "@/components/UI/Story/StoryCircle";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
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
  const storyRef = useRef(null);
  const mainRef = useRef(null)

  function handleStory(i) {
    setCurrent(i);
    mainRef.current.swiper.slideTo(i);
  }

  if(slice.variation === "sliderE") {
    return(
      <section>
        <SliceIdentifier 
          text={slice.primary.slice_identifier}
        />
        <RichText 
          text={slice.primary.title}
          className='text-deep-green text-6xl font-ambit-regular text-center flex items-center justify-center my-24'
        />
        <div className="pb-12">
          <Swiper
            initialSlide={1}
            breakpoints={{
              1900: {
                slidesPerView: 2.4,
                slidesOffsetBefore: 710,
                slidesOffsetAfter: 400
              },
              1700: {
                slidesPerView: 2.4,
                slidesOffsetBefore: 680,
                slidesOffsetAfter: 400
              },
              1400: {
                slidesPerView: 2.2,
                slidesOffsetBefore: 500,
                slidesOffsetAfter: 300,
              },
              1000: {
                slidesOffsetBefore: 350,
                slidesOffsetAfter: 200,
                slidesPerView: 2
              },
              800: {
                slidesPerView: 2,
                slidesOffsetBefore: 250,
                slidesOffsetAfter: 100
              },
              500: {
                slidesPerView: 1.7,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 70,
                spaceBetween: 30
              },
              10:{
                slidesPerView: 1.2,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 70,
                spaceBetween: 10
              }
            }}
            onSlideChange={(e) => setSliderBIndex(() => e.activeIndex)}
          >
            {slice.primary.items.map((item, index) => {
              return(
                <SwiperSlide
                  key={item.description}
                >
                  <SwiperClick className="absolute opacity-0" text="Next" ref={sliderBNextRef} />
                  <SwiperClick className="absolute opacity-0" isPrev text="Prev" ref={sliderBPrevRef} />
                  <div 
                    className={
                      `${sliderBIndex === index ? 'bg-bright-yellow p-4 lg:p-8 scale-100' : 'p-4 lg:p-8 scale-90'} 
                      transition-all w-[16rem] sm:w-[24rem] lg:w-[33rem] rounded-md`
                    }
                  >
                    <div
                      className="w-full h-[14rem] sm:min-h-[18rem] lg:min-h-[24rem] rounded-md overflow-hidden"
                    >
                      <PrismicNextImage className="h-full w-full object-cover" field={item.image} />
                    </div>
                    <RichText 
                      className='text-deep-green font-ambit-bold text-lg mt-8'
                      text={item.title}
                    />
                    <RichText 
                      className='text-deep-green font-ambit-regular text-lg'
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
    )
  }

  if(slice.variation === "sliderD") {
    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12"
      >
        <SliceIdentifier 
          text={slice.primary.slice_identifier}
        />
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between my-12">
          <div className="flex flex-col w-full xl:w-[42%] space-y-5">
            <RichText 
              text={slice.primary.title}
              className='font-ambit-regular text-deep-green text-5xl w-full'
              />
            <RichText 
              text={slice.primary.description}
              className='font-ambit-regular text-deep-green text-xl w-full'
            />
          </div>
          <div className="bg-white rounded-[10px] p-6 lg:p-12 min-h-[550px] w-full xl:w-[50%] mt-12 xl:mt-0">
            <ul className="flex items-start justify-start w-full xl:w-[500px] mx-auto lg:mx-0 mb-6">
              <Swiper 
                ref={storyRef}
                className="w-[100%] sm:w-screen flex items-start" 
                breakpoints={{
                  2500: {
                    slidesPerView: 5.6
                  },
                  1400: {
                    slidesPerView: 5.3
                  },
                  1000: {
                    slidesPerView: 5.3
                  },
                  780: {
                    slidesPerView: 5.2
                  },
                  600: {
                    slidesPerView: 3.2
                  },
                  10: {
                    slidesPerView: 3
                  }
                }}
              >
                {slice.primary.items.map(({ image }, index) => (
                  <SwiperSlide key={index}>
                    <StoryCircle 
                      className="story-circle-B" 
                      height={105} width={105} key={index} 
                      index={index} currentIndex={current} 
                      image={image} onClick={() => handleStory(index)} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
            <Swiper 
                ref={mainRef}
                className="w-full h-[400px] xl:h-[240px] rounded-lg"
                onActiveIndexChange={(swiper) => {
                  setCurrent(current)
                  storyRef.current.swiper.slideTo(current - 1)
                }}
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
            <div className="flex flex-col mt-8">
              <div className="flex flex-col md:flex-row items-start justify-between">
                <RichText 
                  className='text-deep-green font-ambit-regular text-xl opacity-reveal w-full mb-6 md:mb-0 md:w-[80%]'
                  key={slice.primary.items[current].text}
                  text={slice.primary.items[current].text}
                />
                <div className="flex gap-2">
                  <SwiperArrow 
                    strokeColor="#37473C" 
                    className={`${current === 0 ? "bg-[#AFB3A9]" : "bg-bright-yellow"} rotate-180 !h-[2.4rem] !w-[2.4rem]`} 
                    onClick={swipePrev}
                  />
                  <SwiperArrow 
                    strokeColor="#37473C" 
                    className={`${current === slice.primary.items.length - 1 ? "bg-[#AFB3A9]" : "bg-bright-yellow"} !h-[2.4rem] !w-[2.4rem]`}
                    onClick={swipeNext}
                  />
                </div>
              </div>
              <PrimaryCTA
                className='mt-12'
                text={slice.primary.cta_text} 
                link={slice.primary.items[current].cta_link}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if(slice.variation === 'sliderC') {

    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-24"
      >
        <div>
          <SliceIdentifier 
            text={slice.primary.slice_identifier}
          />
          <RichText 
            text={slice.primary.title}
            className='font-ambit-regular text-deep-green py-20 md:text-center max-w-[30ch] text-5xl mx-auto'
          />
        </div>
        <div
          className="rounded-lg flex flex-col lg:flex-row items-center justify-center gap-16 w-full"
        >
          <div className="w-full lg:w-[50%] ">
            <ul className="pb-2 flex items-start justify-start w-full lg:w-[400px] xl:w-[600px] mx-auto lg:mx-0 mb-6">
              <Swiper 
                ref={storyRef}
                className="w-[90%] sm:w-screen flex items-start" 
                breakpoints={{
                  2500: {
                    slidesPerView: 5.6
                  },
                  1200: {
                    slidesPerView: 4.3
                  },
                  600: {
                    slidesPerView: 3
                  },
                  10: {
                    slidesPerView: 2.2
                  }
                }}
              >
                {slice.primary.items.map(({ image }, index) => (
                  <SwiperSlide key={index}>
                    <StoryCircle 
                      className="story-circle" 
                      height={105} width={105} key={index} 
                      index={index} currentIndex={current} 
                      image={image} onClick={() => handleStory(index)} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
            <Swiper 
                ref={mainRef}
                className="w-full h-[400px] sm:h-[420px] 3xl:h-[500px] rounded-lg"
                onActiveIndexChange={(swiper) => {
                  setCurrent(current)
                  storyRef.current.swiper.slideTo(current - 1)
                }}
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
          </div>
        <div className="flex flex-col lg:mt-24 items-start justify-between h-full w-full lg:w-[40%] space-y-4 3xl:space-y-14">
          <RichText 
            className='text-deep-green font-ambit-regular text-3xl opacity-reveal'
            key={slice.primary.items[current].title}
            text={slice.primary.items[current].title}
          />
          <div className="flex flex-col gap-8">
            <RichText 
              className='text-[#9C9C9C] font-ambit-regular text-base w-full lg:w-[94%] opacity-reveal'
              key={slice.primary.items[current].description}
              text={slice.primary.items[current].description}
            />
            <div>
              <div className="flex gap-2">
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
    )

  }

  return(
    <>
    {slice.variation === 'default' && (
      <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 flex items-center justify-center relative"
    >
      <PrismicNextImage
        field={slice.primary.background_image} 
        alt=""
        className="absolute top-3/4 -translate-y-2/4 right-0 -z-10"
        height={200}
        width={200}
      />
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
          className='text-deep-green text-6xl font-ambit-regular text-center flex items-center justify-center my-24'
        />
        <div className="pb-12">
          <Swiper
            initialSlide={1}
            breakpoints={{
              1900: {
                slidesPerView: 2.4,
                slidesOffsetBefore: 710,
                slidesOffsetAfter: 400
              },
              1700: {
                slidesPerView: 2.4,
                slidesOffsetBefore: 680,
                slidesOffsetAfter: 400
              },
              1400: {
                slidesPerView: 2.2,
                slidesOffsetBefore: 500,
                slidesOffsetAfter: 300,
              },
              1000: {
                slidesOffsetBefore: 350,
                slidesOffsetAfter: 200,
                slidesPerView: 2
              },
              800: {
                slidesPerView: 2,
                slidesOffsetBefore: 250,
                slidesOffsetAfter: 100
              },
              500: {
                slidesPerView: 1.7,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 70,
                spaceBetween: 30
              },
              10:{
                slidesPerView: 1.2,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 70,
                spaceBetween: 10
              }
            }}
            onSlideChange={(e) => setSliderBIndex(() => e.activeIndex)}
          >
            {slice.primary.items.map((item, index) => {
              return(
                <SwiperSlide
                  key={item.description}
                >
                  <SwiperClick className="absolute opacity-0" text="Next" ref={sliderBNextRef} />
                  <SwiperClick className="absolute opacity-0" isPrev text="Prev" ref={sliderBPrevRef} />
                  <div 
                    className={
                      `${sliderBIndex === index ? 'bg-bright-yellow p-4 lg:p-8 scale-100' : 'p-4 lg:p-8 scale-90'} 
                      transition-all w-[16rem] sm:w-[24rem] lg:w-[33rem] rounded-md`
                    }
                  >
                    <div
                      className="w-full h-[14rem] sm:min-h-[18rem] lg:min-h-[24rem] rounded-md overflow-hidden"
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
