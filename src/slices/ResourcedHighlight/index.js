'use client'
import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import StoryCircle from "@/components/UI/Story/StoryCircle";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { months } from "@/utils/months";
import Button from "@/components/v2-components/buttons/button";



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

  const date = new Date(slice.primary.items[activeIndex].date);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8"
    >
      <RichText 
        text={slice.primary.title}
        className='text-black font-ambit-semibold text-4xl w-full xl:w-[20ch]'
      />
      <div 
        className="flex flex-col xl:flex-row justify-center "
      >
        <div className="relative h-[520px] xl:h-auto xl:w-[60%] flex items-center justify-center ">
            
            <div
              key={slice.primary.items[activeIndex].image}
              className="opacity-anim transition-all h-[78%] w-[78%] lg:h-[85%] lg:w-[85%]"
            >
              <PrismicNextImage
                height={1200}
                width={1200}
                loading="eager"
                field={slice.primary.items[activeIndex].image}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>
        {/* <div className="bg-bright-yellow flex items-center justify-center w-full h-[520px] xl:h-auto xl:w-[45%]">
          <PrismicNextImage 
            className="h-[99.4%] w-[99.4%] object-cover"
            field={slice.primary.items[activeIndex].image}
          />
        </div> */}
        <div className="bg-white  xl:pl-12 xl:pr-1  md:py-8 w-full xl:w-[40%] ">
          {/* Selectors */}
          <ul>
            <Swiper  
              breakpoints={{
                2500: {
                  slidesPerView: 5
                },
                1600: {
                  slidesPerView: 5
                },
                1200: {
                  slidesPerView: 5
                },
                600: {
                  slidesPerView: 5
                },
                300: {
                  slidesPerView: 3.7
                },
                10: {
                  slidesPerView: 3.4
                }
              }}
            >
              {slice.primary.items.map(({image}, index) => {

                return(
                  <SwiperSlide key={index}>
                    <StoryCircle 
                      className="story-circle " 
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
                text={`${month}-${year}`}
                className='font-ambit-regular text-2xl text-black'
              />
              <RichText 
                text={slice.primary.items[activeIndex].title}
                className='font-ambit-semibold text-4xl text-black'
              />
              {/* <RichText 
                text={slice.primary.items[activeIndex].description}
                className='font-ambit-regular text-black'
              /> */}
              <p    className='font-ambit-regular line-clamp-5 ... text-black'>
                {slice.primary.items[activeIndex].description}
              </p>
            </div>
            {/* <PrimaryCTA 
              link={slice.primary.items[activeIndex].cta_link}
              text={slice.primary.cta_text}
            /> */}
           <PrismicNextLink field={slice.primary.items[activeIndex].cta_link}>
  <Button>
    {slice.primary.cta_text}
  </Button>
</PrismicNextLink>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
