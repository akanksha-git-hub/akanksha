'use client'
import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import StoryCircle from "@/components/UI/Story/StoryCircle";
import { PrismicNextImage } from "@prismicio/next";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';


/**
 * @typedef {import("@prismicio/client").Content.BlogHighlightSlice} BlogHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogHighlightSlice>} BlogHighlightProps
 * @param {BlogHighlightProps}
 */
const BlogHighlight = ({ slice }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(i) {
    setActiveIndex(() => i);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8"
    >
      <RichText 
        text={slice.primary.title}
        className='text-deep-green font-ambit-semibold text-4xl w-[20ch]'
      />
      <div 
        className="flex flex-col xl:flex-row justify-center"
      >
        <div className="bg-bright-yellow flex items-center justify-center w-full h-[520px] xl:h-auto xl:w-[45%]">
          <PrismicNextImage 
            className="h-[99.4%] w-[99.4%] object-cover"
            field={slice.primary.items[activeIndex].image}
          />
        </div>
        <div className="bg-white pl-12 pr-1 py-8 w-full xl:w-[45%]">
          {/* Selectors */}
          <ul>
            <Swiper  
              breakpoints={{
                2500: {
                  slidesPerView: 5.6
                },
                1600: {
                  slidesPerView: 5.4
                },
                1200: {
                  slidesPerView: 4.4
                },
                600: {
                  slidesPerView: 3.4
                },
                300: {
                  slidesPerView: 3.4
                },
                10: {
                  slidesPerView: 2.4
                }
              }}
            >
              {slice.primary.items.map(({image}, index) => {

                return(
                  <SwiperSlide key={index}>
                    <StoryCircle 
                      className="story-circle" 
                      currentIndex={activeIndex}
                      onClick={() => handleClick(index)}
                      index={index}
                      image={image}
                    />
                  </SwiperSlide>
                )

              })}
            </Swiper>
          </ul>
          {/* Selectors End */}
          <div className="flex flex-col space-y-6 mt-12">
            <div className="space-y-4">
              <RichText 
                text={slice.primary.items[activeIndex].date}
                className='font-ambit-regular text-2xl text-deep-green'
              />
              <RichText 
                text={slice.primary.items[activeIndex].title}
                className='font-ambit-semibold text-4xl text-deep-green'
              />
              <RichText 
                text={slice.primary.items[activeIndex].description}
                className='font-ambit-regular text-deep-green'
              />
            </div>
            <PrimaryCTA 
              link={slice.primary.items[activeIndex].cta_link}
              text={slice.primary.cta_text}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
