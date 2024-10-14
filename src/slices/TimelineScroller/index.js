'use client'
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
/**
 * @typedef {import("@prismicio/client").Content.TimelineScrollerSlice} TimelineScrollerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TimelineScrollerSlice>} TimelineScrollerProps
 * @param {TimelineScrollerProps}
 */

let INITIAL_STATE = {
  prev: null,
  current: 0,
  next: null,
  progressBar: 5,
  plotPoints: 0,
  resetProgress: null
}

const TimelineScroller = ({ slice }) => {

  const [slideIndex, setSlideIndex] = useState(INITIAL_STATE);
  let plotPoints = [""];
  let i = 0;

  if(slice.primary.items) {
    for(i; i < slice.primary.items.length; i++) {
      plotPoints[i] = "";
    }
  }

  const timeline = useRef(null);
  const root = useRef(null);
  const swiperRef = useRef(null);

  const totalSlides = slice.primary.items.length;

  const handleUpdateSlideIndex = (i) => {

    setSlideIndex((prevState) => {

      if(prevState.prev === null) {
        return {
          ...prevState,
          prev: 0,
          current: i,
          next: i + 1
        }
      }
      
      return {
        ...prevState,
        prev: i - 1,
        current: i,
        next: i + 1
      }

    });

  }

  const handleUpdateActiveIndex = (i) => { // onClick plotPoints

    const progressHeight = (i /(totalSlides - 1)) * 100;

    setSlideIndex(prevState => ({ ...prevState, progressBar: i === 0 ? 5 : progressHeight, plotPoints: i, resetProgress: i }));
    if(i !== swiperRef.current.activeIndex) swiperRef.current.swiper.slideTo(i);

    // Calculate the corresponding scroll position and move the scroll
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetProgress = i / (totalSlides - 1); // Normalize progress to range 0 - 1
    const targetScrollPosition = targetProgress * scrollHeight;


    // Use GSAP to scroll to the target position
    gsap.to(window, {
      scrollTo: { y: targetScrollPosition },  // Scroll to the calculated scroll position
      duration: 1,
      ease: 'power2.out',        
    });
  }


  useEffect(() => {

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: `-74px top`,
        end: `${totalSlides * 400}px`,
        scrub: 0.15,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {

          const swiperInstance = swiperRef.current.swiper;
          const progress = self.progress * (totalSlides - 1);  // Ranges from 0 - 1 with the total slides
          const activeIndex = Math.round(progress); // Gives whole number

          const progressHeight= (activeIndex/(totalSlides - 1)) * 100; // Calculate progress in percentage

          if(swiperInstance && activeIndex !== swiperRef.current.activeIndex) swiperRef.current.swiper.slideTo(activeIndex);

          setSlideIndex(prevState => ({ ...prevState, progressBar: activeIndex === 0 ? 5 : progressHeight, plotPoints:activeIndex }));

        }
      }
    });

    return () => {
      if(timeline.current) {
        timeline.current.scrollTrigger.kill();
        timeline.current.kill();
      }
    }

  }, [totalSlides]);


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-52 mt-36"
      ref={root}
    >
      <div className="w-full relative h-[600px]">
        <div 
          className="w-1 hidden 1000pixel:block bg-[#D2D1CD] h-[554px] absolute right-12 xl:right-24 3xl:top-0 z-20 rounded-full"
        >
          <div 
            className={`w-full rounded-full custom-bezier relative h-full`}
          >
            <div 
              className={`bg-deep-green w-full custom-bezier relative h-full rounded-full`}
              style={{
                  height: `${slideIndex.progressBar}%`
                }}
            />
            {slice.primary.items.length > 0 && (
              <ul className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-between">
                {plotPoints.map((_, i) => (
                  <li 
                    key={i} 
                    onClick={() => handleUpdateActiveIndex(i)} 
                    className={`${ i <= slideIndex.plotPoints ? 'bg-deep-green' : 'bg-[#CFCFCF]'} rounded-full !h-[14px] !w-[14px] slow-bezier cursor-pointer relative`} 
                  >
                    <span className={`
                        absolute bottom-[50%] translate-y-2/4 -left-[130%] translate-x-2/4 h-[180%] w-[180%] 
                        border-[2px] ${ i <= slideIndex.plotPoints ? 'border-[#FBDA1D]' : 'border-[#B6B6B6]'} 
                        rounded-full slow-bezier
                      `} 
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Swiper 
          className="rotate-[20deg] relative bottom-0 right-0 1000pixel:right-36 xl:right-28 3xl:-bottom-24"
          ref={swiperRef}
          onSlideChange={(e) => handleUpdateSlideIndex(e.activeIndex)}
          breakpoints={{
            1536: {
              spaceBetween: 0,
              slidesOffsetBefore: 600,
              slidesOffsetAfter: 600,
              slidesPerView: 2.9
            },
            1200: {
              spaceBetween: 0,
              slidesOffsetBefore: 500,
              slidesOffsetAfter: 800,
              slidesPerView: 3
            },
            1000: {
              slidesPerView: 3.2,
              slidesOffsetBefore: 450
            },
            500: {
              slidesPerView: 2.9,
              slidesOffsetBefore: 300
            }
          }}
        >
          {slice.primary.items && (
            slice.primary.items.map((item, i) => {
              return (
                <SwiperSlide 
                  key={item.year}
                  className="rotate-[-20deg] !flex !items-center !justify-center py-24"
                >
                  <div className={
                    `${slideIndex.current === i ? 
                      `slow-bezier rounded-xl
                      3xl:h-[33.13rem] 3xl:w-[50rem]
                      xl:h-[28rem] xl:w-[44rem]
                      lg:h-[24rem] lg:w-[39rem]
                      h-[24rem] w-[48rem]
                      `
                      : 
                      `transition-all rounded-md
                      3xl:h-[21.8rem] 3xl:w-[16.1rem]
                      xl:h-[16rem] xl:w-[10rem]
                      h-[14rem] w-[10rem]
                      `
                    } 
                      mx-auto transition-all overflow-hidden relative`
                    }
                  >
                    {slideIndex.current === i && (
                      <div className="h-full p-6 flex flex-col justify-between z-20 opacity-reveal">
                        <RichText 
                          text={item.year}
                          className='font-ambit-regular text-[#FFFBF1] text-5xl xl:text-7xl z-20'
                          />
                        <RichText 
                          text={item.description}
                          className='font-ambit-regular text-[#FFFBF1] xl:text-xl z-20'
                        />
                      </div>
                    )}
                    <PrismicNextImage 
                      className="h-full w-full object-cover absolute top-0 left-0 -z-10"
                      field={item.image}
                      alt=""
                      height={800}
                      width={800}
                    />
                    {slideIndex.current === i && (
                      <div 
                        className="green-gradient absolute bottom-0 left-0 h-full w-full -z-10 opacity-anim"
                      />
                    )}
                  </div>
                </SwiperSlide>
              )

            })
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default TimelineScroller;
