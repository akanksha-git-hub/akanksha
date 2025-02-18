"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/v2-components/buttons/button";
import StoryCircle from "@/components/v2-components/story-circle/story-circle";

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param {HeroProps}
 */

const TIMER_DURATION = 12000; // full duration in ms

const Hero = ({ slice }) => {
  const content = slice.primary.hero_content;
  const [state, setState] = useState({
    currentIndex: 0,
    remainingTime: TIMER_DURATION,
    isPaused: false,
  });
  const [loadingState, setLoadingState] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const onMount = useRef(false);

  // Function to start the timer using the current remainingTime
  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      // When time expires, move to the next slide and reset the timer
      setState((prev) => {
        const nextIndex = (prev.currentIndex + 1) % content.length;
        return {
          currentIndex: nextIndex,
          remainingTime: TIMER_DURATION,
          isPaused: false,
        };
      });
    }, state.remainingTime);
  };

  // useEffect to (re)start the timer whenever we’re not paused and the slide changes
  useEffect(() => {
    if (!onMount.current) {
      onMount.current = true;
      return;
    }

    // Clear any existing timer
    clearTimeout(timerRef.current);

    if (!state.isPaused && content.length > 0) {
      startTimer();
    }

    return () => clearTimeout(timerRef.current);
  }, [state.isPaused, state.currentIndex]);

  // Function to toggle pause/resume when clicking the active story circle.
  const togglePause = () => {
    // If currently paused, resume
    if (state.isPaused) {
      setState((prev) => ({ ...prev, isPaused: false }));
    } else {
      // Pause: clear the timeout and calculate the remaining time
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      setState((prev) => ({
        ...prev,
        remainingTime: prev.remainingTime - elapsed,
        isPaused: true,
      }));
    }
  };

  // When clicking a story circle:
  // • If the clicked index is the current one, toggle pause/resume.
  // • If it’s a different one, switch immediately (resetting the timer).
  const handleClick = (i) => {
    if (i === state.currentIndex) {
      togglePause();
    } else {
      clearTimeout(timerRef.current);
      setState({
        currentIndex: i,
        remainingTime: TIMER_DURATION,
        isPaused: true, // start paused; user can tap again to resume.
      });
      // This extra state update forces a re-render for the animation.
      setLoadingState((prev) => !prev);
    }
  };

  // Update the circle animation. We use CSS variables to pass the remaining time.
  // We also add a CSS property to pause the animation when needed.
  const circleAnim = () => {
    let progress = document.querySelectorAll(".circle__progress--fill");
    if (!progress[state.currentIndex]) return;
    let radius = progress[state.currentIndex].r.baseVal.value;
    let circ = 2 * Math.PI * radius;

    progress.forEach((item, i) => {
      item.style.setProperty("--initialStroke", circ);
      if (i === state.currentIndex) {
        item.style.setProperty("--transitionDuration", `${state.remainingTime}ms`);
        // When paused, we want to pause the CSS transition.
        item.style.animationPlayState = state.isPaused ? "paused" : "running";
        item.style.strokeDashoffset = circ;
      } else {
        item.style.strokeDashoffset = 0;
        item.style.removeProperty("--transitionDuration");
        item.style.animationPlayState = "running";
      }
    });
  };

  // Run the circle animation update when the slide or pause state changes.
  useEffect(() => {
    if (!onMount.current) return;
    circleAnim();
  }, [state.currentIndex, state.remainingTime, state.isPaused, loadingState]);

  return (
    <section className="universal-padding relative flex flex-col-reverse h-auto 2xl:min-h-[45rem] 3xl:min-h-[55rem] xl:flex-col pb-[1000px] items-center justify-center lg:items-baseline lg:justify-normal">
      <div className="mt-6 lg:mt-12 w-full lg:w-auto">
        {content.length !== 0 && (
          <ul className="pb-2 flex items-start justify-start w-full lg:w-[400px] xl:w-[500px] mx-auto lg:mx-0">
            <Swiper
              className="w-[90%] sm:w-screen flex items-start !py-3 !pl-2"
              breakpoints={{
                2500: { slidesPerView: 4 },
                1200: { slidesPerView: 4 },
                600: { slidesPerView: 3 },
                10: { slidesPerView: 2.2 },
              }}
            >
              {content.map(({ image }, index) => (
                <SwiperSlide key={index}>
                  <StoryCircle
                    index={index}
                    currentIndex={state.currentIndex}
                    onClick={handleClick}
                    image={image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        )}

        {content.length !== 0 && (
          <div className="flex w-full mx-auto sm:w-auto items-center justify-center flex-col lg:items-baseline lg:justify-normal mt-6 lg:mt-2">
            <RichText
              key={content[state.currentIndex].title}
              className="font-ambit-regular opacity-anim text-black 
              mt-6 w-full text-4xl sm:text-6xl xl:w-[46%] text-left xl:text-7xl 
              3xl:w-[48rem] 3xl:text-8xl"
              text={content[state.currentIndex].title}
            />
            <RichText
              key={content[state.currentIndex].description}
              className="font-ambit-regular opacity-anim font-normal text-black 
              text-base leading-[20.2px] sm:text-xl mt-3 lg:mt-8 md:w-5/6 
              xl:w-[40%] text-left 2xl:w-[34rem] 3xl:text-2xl"
              text={content[state.currentIndex].description}
            />

            {/* CTA Buttons */}
            <div className="flex flex-row space-x-2 justify-center items-center">
              <Button
                prismicLink={content[state.currentIndex].cta_link}
                className="mt-6"
              >
                <p className="opacity-anim">
                  {content[state.currentIndex].cta_text}
                </p>
              </Button>

              {content[state.currentIndex].cta_text_2 && (
                <Button
                  prismicLink={content[state.currentIndex].cta_link_2}
                  className="mt-6"
                >
                  <p className="opacity-anim">
                    {content[state.currentIndex].cta_text_2}
                  </p>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {content.length !== 0 && (
        <div
          className="xl:absolute xl:top-20 xl:right-10 
          h-[56vh] sm:h-[80vh] w-full xl:h-[34.1rem] xl:w-[40rem] 
          3xl:h-[49.1rem] 3xl:w-[60rem]"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <PrismicNextImage
              field={content[state.currentIndex].bg_image}
              alt="bg-image"
              fill
              className="absolute top-0 left-0 -z-10"
            />
            <div
              key={content[state.currentIndex].image.url}
              className="opacity-anim transition-all h-[78%] w-[78%] lg:h-[80%] lg:w-[80%]"
            >
              <PrismicNextImage
                height={500}
                width={500}
                loading="eager"
                field={content[state.currentIndex].image}
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
