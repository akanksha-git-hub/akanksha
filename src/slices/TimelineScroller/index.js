'use client'
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useDebouncedResize from "@/hooks/useDebouncedResize";
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
  const [onMount, setOnMount] = useState(false);
  const [mobIndex, setMobIndex] = useState(0);
  let plotPoints = [""];
  let i = 0;

  if(slice.primary.items) {
    for(i; i < slice.primary.items.length; i++) {
      plotPoints[i] = {
        milestone: slice.primary.items[i].milestone
      };
    }
  }

  const timeline = useRef(null);
  const root = useRef(null);
  const swiperRef = useRef(null);
  const swipMobRef = useRef();

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

  const handleMobileUpdateSlideIndex = (i) => {

    const length = (totalSlides - 1);
    const currentIndex = i;
    const percentage = (currentIndex / length) * 100;


    setMobIndex(() => i);
    

    setSlideIndex((prevState) => {

      if(prevState.prev === null) {
        return {
          ...prevState,
          prev: 0,
          current: i,
          next: i + 1,
          progressBar: 0,
          plotPoints: i
        }
      }
      
      return {
        ...prevState,
        prev: i - 1,
        current: i,
        next: i + 1,
        progressBar: percentage,
        plotPoints: i
      }

    });
  }

  const handleMobileUpdateActiveIndex = (i) => {

    const length = (totalSlides - 1);
    const currentIndex = i;
    const percentage = (currentIndex / length) * 100;


    setMobIndex(() => i);
    

    setSlideIndex((prevState) => {

      if(prevState.prev === null) {
        return {
          ...prevState,
          prev: 0,
          current: i,
          next: i + 1,
          progressBar: 0,
          plotPoints: i
        }
      }
      
      return {
        ...prevState,
        prev: i - 1,
        current: i,
        next: i + 1,
        progressBar: percentage,
        plotPoints: i
      }

    });

    if(i !== swipMobRef.current.swiper.activeIndex) swipMobRef.current.swiper.slideTo(i);

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

  const { width } = useDebouncedResize();

  useEffect(() => {

    if(!onMount) {
      setOnMount(() => true);
      return;
    }

      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `-24px top`,
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

  }, [totalSlides, width, onMount]);


    return (
      <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="hidden 1000pixel:block mb-52 mt-36 950px:h-[1000px] 950px:overflow-hidden pt-12"
        ref={root}
      >
        <div className="w-full relative 950px:h-[600px]">
          <div className="orange-gradient absolute top-[80%] left-2/4 -translate-x-2/4 -translate-y-2/4 -z-20 h-[80%] w-[80%]"></div>
          <div 
            className="w-1 hidden 1000pixel:block bg-[#D2D1CD] h-[664px] absolute right-12 xl:right-24 3xl:top-0 z-20 rounded-full"
          >
            <div 
              className={`w-full rounded-full custom-bezier relative h-full`}
            >
              <p className="text-deep-green text-base font-ambit-regular absolute -left-[94%] -translate-x-2/4 -top-8">1991</p>
              <div 
                className={`bg-deep-green w-full custom-bezier relative h-full rounded-full`}
                style={{
                    height: `${slideIndex.progressBar}%`
                  }}
              />
              {slice.primary.items.length > 0 && (
                <ul className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-between">
                  {plotPoints.map((point, i) => {

                    if(point.milestone) {
                      return(
                        <li 
                        key={i} 
                        onClick={() => handleUpdateActiveIndex(i)} 
                        className={`rounded-full !h-[14px] !w-[14px] slow-bezier cursor-pointer relative bg-bright-yellow`} 
                      >
                        <span className={`
                            absolute bottom-[50%] translate-y-2/4 -left-[120%] translate-x-2/4 h-[170%] w-[170%] 
                            border-[2.4px] border-[#FBDA1D] 
                            rounded-full slow-bezier
                          `} 
                        />
                        <span className={`
                            absolute bottom-[50%] translate-y-2/4 -left-[200%] translate-x-2/4 h-[250%] w-[250%] 
                            border-[2px] border-[#FBDA1D] ${i <= slideIndex.plotPoints ? 'opacity-100' : 'opacity-40'}
                            rounded-full slow-bezier
                          `} 
                        />
                      </li>
                      )
                    }

                    return (
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
                    )

                  }  
                  )}
                </ul>
              )}
            <p className="text-deep-green text-base font-ambit-regular absolute -left-[94%] -translate-x-2/4 -bottom-8">2024</p>
            </div>
          </div>
          <Swiper 
            className="rotate-0 950px:rotate-[20deg] relative bottom-0 right-0 1000pixel:right-36 xl:right-28 3xl:-bottom-24"
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
              950: {
                slidesPerView: 2.9,
                slidesOffsetBefore: 300
              },
              100: {
                slidesPerView: 1,
                spaceBetween: 20,
                slidesOffsetBefore: 0
              }
            }}
          >
            {slice.primary.items && (
              slice.primary.items.map((item, i) => {
                return (
                  <SwiperSlide 
                    key={item.year}
                    className="rotate-0 950px:rotate-[-20deg] !flex !items-center !justify-center py-24"
                  >
                    <div className={
                      `${slideIndex.current === i ? 
                        `slow-bezier rounded-xl
                        3xl:h-[33.13rem] 3xl:w-[50rem]
                        xl:h-[28rem] xl:w-[44rem]
                        lg:h-[24rem] lg:w-[39rem]
                        950px:h-[24rem] 950px:w-[48rem]
                        w-[90%] h-[50vh]
                        `
                        : 
                        `transition-all rounded-md
                        3xl:h-[21.8rem] 3xl:w-[16.1rem]
                        xl:h-[16rem] xl:w-[10rem]
                        950px:h-[14rem] 950px:w-[10rem]
                        w-[90%] h-[50vh]
                        `
                      } 
                        mx-auto transition-all overflow-hidden relative`
                      }
                    >
                      {slideIndex.current === i && (
                        <div className="h-full p-6 flex flex-col justify-end gap-2 z-20 opacity-reveal">
                          <RichText 
                            text={item.year}
                            className='font-ambit-regular text-[#FFFBF1] text-5xl xl:text-7xl z-20'
                            />
                          <RichText 
                            text={item.description}
                            className='font-ambit-regular text-[#FFFBF1] xl:text-2xl z-20'
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
      {/* Mobile */}
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mb-52 1000pixel:hidden mt-24 pt-12"
      >
      <div className="relative">
        <div className="absolute -bottom-12 left-2/4 -translate-x-2/4 w-[76%] md:w-[80%] h-2 rounded-full z-20 bg-[#D2D1CD]">
          <p className="text-deep-green text-base font-ambit-regular absolute -left-12 bottom-2/4 translate-y-[58%]">1991</p>
          <div className="w-full h-full rounded-full custom-bezier relative">
            <div 
              className={`bg-deep-green custom-bezier relative h-full rounded-full`}
              style={{
                width: `${mobIndex === 0 ? '0' : slideIndex.progressBar}%`
              }}
            />
            {slice.primary.items.length > 0 && (
                <ul className="absolute top-0 left-0 h-full w-full flex items-center justify-between">
                  {plotPoints.map((point, i) => {

                  if(point.milestone) {
                    return(
                      <li 
                      key={i} 
                      onClick={() => handleMobileUpdateActiveIndex(i)} 
                      className={`rounded-full !h-[12px] !w-[12px] slow-bezier cursor-pointer relative bg-bright-yellow`} 
                    >
                      <span className={`
                          absolute bottom-[50%] translate-y-2/4 -left-[130%] translate-x-2/4 h-[180%] w-[180%] 
                          border-[2.4px] border-[#FBDA1D] 
                          rounded-full slow-bezier
                        `} 
                      />
                      <span className={`
                          absolute bottom-[50%] translate-y-2/4 -left-[200%] translate-x-2/4 h-[140%] w-[140%] 
                          border-[2px] border-[#FBDA1D] ${i <= slideIndex.plotPoints ? 'opacity-0' : 'opacity-0'}
                          rounded-full slow-bezier
                        `} 
                      />
                    </li>
                    )
                  }

                    return(
                        <li 
                          key={i} 
                          onClick={() => handleMobileUpdateActiveIndex(i)} 
                          className={`${ i <= slideIndex.plotPoints ? 'bg-deep-green' : 'bg-[#CFCFCF]'} rounded-full !h-[12px] !w-[12px] slow-bezier cursor-pointer relative`} 
                        >
                          <span className={`
                              absolute bottom-[50%] translate-y-2/4 -left-[130%] translate-x-2/4 h-[180%] w-[180%] scale-105 
                              border-[2px] ${ i <= slideIndex.plotPoints ? 'border-[#FBDA1D]' : 'border-[#B6B6B6]'} 
                              rounded-full slow-bezier
                            `} 
                          />
                        </li>
                    )
                  }
                  )}
                </ul>
              )}
          <p className="text-deep-green text-base font-ambit-regular absolute -right-12 bottom-2/4 translate-y-[58%]">2024</p>
          </div>
        </div>
        <Swiper
          ref={swipMobRef}
          slidesPerView={1.8}
          slidesOffsetBefore={200}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              slidesOffsetBefore: 200,
              slidesOffsetAfter: 200,
              spaceBetween: 50
            },
            10: {
              slidesPerView: 1.4,
              slidesOffsetBefore: 70,
              slidesOffsetAfter: 70,
              spaceBetween: 10
            }
          }}
          spaceBetween={50}
          onSlideChange={(e) => handleMobileUpdateSlideIndex(e.activeIndex)}
        >
          {slice.primary.items && (
            slice.primary.items.map((item, i) => {
              return(
                <SwiperSlide 
                  key={item.year}
                  className="!flex !items-center !justify-center"
                >
                  <div
                    className={`relative rounded-md transition-all ${slideIndex.current === i ? 'scale-100' : 'scale-90'} w-[33rem] h-[30rem] sm:w-[33rem] sm:h-[33rem]`}
                  >
                    {slideIndex.current === i && (
                      <div className="h-full p-6 flex flex-col justify-end gap-2 z-20">
                        <RichText 
                          text={item.year}
                          className='font-ambit-regular text-[#FFFBF1] text-5xl z-20'
                          />
                        <RichText 
                          text={item.description}
                          className='font-ambit-regular text-[#FFFBF1] z-20'
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
      </>
    );
};

export default TimelineScroller;
