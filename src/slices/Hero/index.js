"use client";

import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/v2-components/buttons/button";
import StoryCircle from "@/components/v2-components/story-circle/story-circle";

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param {HeroProps}
 */

let timer = 12000;
const INITIAL = {
  currentIndex: 0,
  remainingTime: timer,
};

const Hero = ({ slice }) => {
  const [loadingState, setLoadingState] = useState(false);
  const [intervalState, setIntervalState] = useState(INITIAL);
  const [onMount, setOnMount] = useState(false);

  function handleClick(i) {
    if (i !== intervalState.currentIndex) {
      setIntervalState(() => ({ currentIndex: i, remainingTime: timer }));
      setLoadingState((prevState) => !prevState);
    }
  }

  function circleAnim() {
    let progress = document.querySelectorAll(".circle__progress--fill");
    let radius = progress[intervalState.currentIndex].r.baseVal.value;
    let circ = 2 * Math.PI * radius;

    progress.forEach((item, i) => {
      item.style.setProperty("--initialStroke", circ);

      if (i === intervalState.currentIndex) {
        item.style.setProperty("--transitionDuration", `${timer}ms`);
        item.style.strokeDashoffset = circ;
      } else {
        item.style.strokeDashoffset = 0;
        item.style.removeProperty("--transitionDuration");
      }
    });
  }

  useEffect(() => {
    if (!onMount) {
      setOnMount(() => true);
      return;
    }

    if (slice.primary.hero_content.length >= 1) {
      const interval = setInterval(() => {
        setIntervalState((prevState) => {
          if (prevState.currentIndex === slice.primary.hero_content.length - 1)
            return { ...prevState, currentIndex: 0 };

          return { ...prevState, currentIndex: prevState.currentIndex + 1 };
        });
      }, intervalState.remainingTime);

      return () => clearInterval(interval);
    }
  }, [onMount, loadingState]);

  useEffect(() => {
    if (!onMount) return setOnMount(() => true);

    circleAnim();
  }, [onMount, intervalState.currentIndex, loadingState]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding relative flex flex-col-reverse h-auto 2xl:min-h-[45rem] 3xl:min-h-[55rem] xl:flex-col pb-[1000px] items-center justify-center lg:items-baseline lg:justify-normal"
    >
      <div className="mt-6 lg:mt-12 w-full lg:w-auto">
        {slice.primary.hero_content.length !== 0 && (
          <ul className="pb-2 flex items-start justify-start w-full lg:w-[400px] xl:w-[500px] mx-auto lg:mx-0">
            <Swiper
              className="w-[90%] sm:w-screen flex items-start !py-3 !pl-2"
              breakpoints={{
                2500: { slidesPerView: 4 },
                1200: { slidesPerView: 4 },
                600: { slidesPerView: 3 },
                10: { slidesPerView: 3 },
              }}
            >
              {slice.primary.hero_content.map(({ image }, index) => (
                <SwiperSlide key={index}>
                  <StoryCircle
                    index={index}
                    onClick={handleClick}
                    image={image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        )}

        {slice.primary.hero_content.length !== 0 && (
          <div className="flex w-full mx-auto sm:w-auto items-center justify-center flex-col lg:items-baseline lg:justify-normal mt-6 lg:mt-2">
            <RichText
              key={slice.primary.hero_content[intervalState.currentIndex].title}
              className="font-ambit-regular opacity-anim text-black 
              mt-6 w-full text-4xl sm:text-6xl xl:w-[46%] text-left xl:text-7xl 
              3xl:w-[48rem] 3xl:text-8xl"
              text={
                slice.primary.hero_content[intervalState.currentIndex].title
              }
            />
            <RichText
              key={
                slice.primary.hero_content[intervalState.currentIndex]
                  .description
              }
              className="font-ambit-regular opacity-anim font-normal text-black 
              text-base leading-[20.2px] sm:text-xl mt-3 lg:mt-8 md:w-5/6 
              xl:w-[40%] text-left 2xl:w-[34rem] 3xl:text-2xl"
              text={
                slice.primary.hero_content[intervalState.currentIndex]
                  .description
              }
            />

            {/* CTA Buttons */}
            <div className="flex flex-row space-x-2 justify-center items-center">
              <Button
                prismicLink={
                  slice.primary.hero_content[intervalState.currentIndex]
                    .cta_link
                }
                className="mt-6"
              >
                <p
                  className="opacity-anim"
                  key={
                    slice.primary.hero_content[intervalState.currentIndex]
                      .cta_link
                  }
                >
                  {
                    slice.primary.hero_content[intervalState.currentIndex]
                      .cta_text
                  }
                </p>
              </Button>

              {/* Render second button only if cta_text_2 exists */}
              {slice.primary.hero_content[intervalState.currentIndex]
                .cta_text_2 && (
                <Button
                  prismicLink={
                    slice.primary.hero_content[intervalState.currentIndex]
                      .cta_link_2
                  }
                  className="mt-6"
                >
                  <p
                    className="opacity-anim"
                    key={
                      slice.primary.hero_content[intervalState.currentIndex]
                        .cta_link_2
                    }
                  >
                    {
                      slice.primary.hero_content[intervalState.currentIndex]
                        .cta_text_2
                    }
                  </p>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Render Background Image */}
      {slice.primary.hero_content.length !== 0 && (
        <div
          className="xl:absolute xl:top-20 xl:right-10 
          h-[56vh] sm:h-[80vh] w-full xl:h-[34.1rem] xl:w-[40rem] 
          3xl:h-[49.1rem] 3xl:w-[60rem]"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <PrismicNextImage
              field={
                slice.primary.hero_content[intervalState.currentIndex].bg_image
              }
              alt="bg-image"
              fill
              className="absolute top-0 left-0 -z-10"
            />
            <div
              key={
                slice.primary.hero_content[intervalState.currentIndex].image.url
              }
              className="opacity-anim transition-all h-[78%] w-[78%] lg:h-[80%] lg:w-[80%]"
            >
              <PrismicNextImage
                height={500}
                width={500}
                loading="eager"
                field={
                  slice.primary.hero_content[intervalState.currentIndex].image
                }
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
