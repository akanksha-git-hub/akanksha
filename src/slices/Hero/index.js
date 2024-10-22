'use client'

import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import RichText from "@/components/Texts/RichText";
import StoryCircle from "@/components/UI/Story/StoryCircle";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param {HeroProps}
 */
const Hero = ({ slice }) => {
  
  let timer = 5000;
  const [loadingState, setLoadingState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(timer);
  const loaderA = useRef(null);
  const loaderB = useRef(null);
  const loaderC = useRef(null);

  const checkPointA = Math.floor(timer - (timer / 3));
  const checkPointB = Math.floor(checkPointA - (timer / 3));

  if(remainingTime === 0) {
    loaderA.current.classList.remove("final-load-state");
    loaderB.current.classList.remove("final-horizontal-load-state");
    loaderC.current.classList.remove("final-load-state");
    setRemainingTime(timer);
    setCurrentIndex(prevState => {
      if(prevState === slice.primary.hero_content.length - 1) return 0;

      if(slice.primary.hero_content.length !== prevState) return prevState + 1;
    });
  }


  if((remainingTime < (timer - 10)) && (remainingTime > 0)) loaderA.current.classList.add("final-load-state");

  if((remainingTime <= checkPointA) && (remainingTime > 0)) loaderB.current.classList.add("final-horizontal-load-state");

  if((remainingTime <= checkPointB) && (remainingTime > 0)) loaderC.current.classList.add("final-load-state");

  function handleStory(i) {
    setCurrentIndex(i);
    setRemainingTime(timer);
    loaderA.current.classList.remove("final-load-state");
    loaderB.current.classList.remove("final-horizontal-load-state");
    loaderC.current.classList.remove("final-load-state");
  }


  // useEffect(() => {

  //   setTimeout(() => setLoadingState(true), 1000);

  //   if((slice.primary.hero_content.length >= 1) && loadingState) {
  //     const interval = setInterval(() => {
  //       setRemainingTime(prevTime => prevTime - 100);
  //     }, 100);
  
  //     return () => clearInterval(interval);
  //   }
  // }, [loadingState]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding relative flex flex-col-reverse h-auto 2xl:min-h-[45rem] 3xl:min-h-[55rem] lg:flex-col pb-[1000px] items-center justify-center lg:items-baseline lg:justify-normal"
    >
      <div className="mt-6 lg:mt-12 w-full lg:w-auto">
        {/* TODO add gradient to right for fade effect */}
        {slice.primary.hero_content.length !== 0 && (
          <ul className="overflow-x-scroll pb-2 custom-scroll-bar flex items-start justify-start w-full lg:w-[400px] xl:w-[500px] mx-auto lg:mx-0">
            <Swiper className="w-[90%] sm:w-screen flex items-start" 
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
              {slice.primary.hero_content.map(({ image }, index) => (
                <SwiperSlide key={index}>
                  <StoryCircle 
                    className="story-circle" 
                    height={105} width={105} key={index} 
                    index={index} currentIndex={currentIndex} 
                    image={image} onClick={() => handleStory(index)} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        )}
        {slice.primary.hero_content.length !== 0 && (
          <div className="flex w-full mx-auto sm:w-auto items-center justify-center flex-col lg:items-baseline lg:justify-normal mt-6 lg:mt-12">
            <RichText 
              key={slice.primary.hero_content[currentIndex].story_name}
              className="font-inter font-bold text-deep-green uppercase text-sm sm:text-xl xl:text-2xl"
              text={slice.primary.hero_content[currentIndex].story_name}
            />
            <RichText 
              key={slice.primary.hero_content[currentIndex].title}
              className="font-ambit-regular text-deep-green 
              mt-6 w-full text-center
              text-4xl
              sm:text-6xl 
              lg:w-[46%] lg:text-left
              xl:text-7xl 
              3xl:w-[48rem] 3xl:text-8xl"
              text={slice.primary.hero_content[currentIndex].title}
            />
            <RichText 
              key={slice.primary.hero_content[currentIndex].description}
              className="font-inter font-normal text-deep-green 
              text-base leading-[20.2px]
              sm:text-xl mt-3 lg:mt-8 w-5/6 text-center 
              lg:w-[40%] lg:text-left
              2xl:w-[34rem] 3xl:text-2xl"
              text={slice.primary.hero_content[currentIndex].description}
            />
            <PrimaryCTA 
              key={slice.primary.hero_content[currentIndex].cta_link}
              text={slice.primary.hero_content[currentIndex].cta_text}
              link={slice.primary.hero_content[currentIndex].cta_link}
              className="mt-6"
            />
          </div>
        )}
      </div>
      {/* Render collection of image here */}
      {slice.primary.hero_content.length !== 0 && (
        <div 
          className="lg:absolute lg:top-10 lg:-right-28 bg-bright-yellow
          h-[56vh] w-full
          sm:h-[34.1rem] sm:w-[40rem]
          xl:h-[39.1rem] xl:w-[50rem] 
          3xl:h-[49.1rem] 3xl:w-[60rem]"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <div ref={loaderA} className="bg-none lg:bg-none initial-load-state story-loader-A" />
            <div ref={loaderB} className="bg-none lg:bg-none initial-load-state story-loader-B" />
            <div ref={loaderC} className="bg-none lg:bg-none initial-load-state story-loader-C" />
            <PrismicNextImage 
              height={500}
              width={500}
              loading="eager"
              field={slice.primary.hero_content[currentIndex].image}
              className="h-[88%] w-[88%] lg:h-[95%] lg:w-[95%] object-cover"
              alt=""
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
