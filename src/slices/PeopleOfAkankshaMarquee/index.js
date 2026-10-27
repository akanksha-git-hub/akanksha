"use client";

import Marquee from "react-fast-marquee";
import {
  PrismicNextImage,
  PrismicNextLink,
} from "@prismicio/next";

import Button from "@/components/v2-components/buttons/button";
import SliceIdentifier from "@/components/SliceIdentifier";

/**
 * @typedef {import("@prismicio/client").Content.PeopleOfAkankshaMarqueeSlice} PeopleOfAkankshaMarqueeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PeopleOfAkankshaMarqueeSlice>} PeopleOfAkankshaMarqueeProps
 * @param {PeopleOfAkankshaMarqueeProps}
 */

const PeopleOfAkankshaMarquee = ({ slice }) => {
  const stories = slice.primary.stories || [];

  if (!stories.length) {
    return null;
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-full overflow-x-clip"
    >

      {/* SLICE IDENTIFIER */}
{slice.primary.slice_identifier && (
  <div className="universal-padding">
    <SliceIdentifier
      text={slice.primary.slice_identifier}
    />
        {slice.primary.heading && (
        <div className=" mt-8  flex justify-start space-x-6 items-center">
          <h2 className="font-ambit-regular  text-black text-5xl md:text-6xl tracking-tight  ">
            {slice.primary.heading}
          </h2>
             <div className="[&>div>button>span:first-child]:hidden">
  <Button 
    href="/people-of-akanksha"
  className="!px-3" aria-label="View all stories">
    {""}
  </Button>
</div>
        </div>
      )}
  </div>
)}
      {/* =========================================
          HEADING
          ========================================= */}

  


      {/* =========================================
          MARQUEE
          ========================================= */}

      <div className=" w-full max-w-full overflow-x-clip md:mt-14">
        <Marquee
          direction="left"
          speed={40}
          pauseOnHover
          autoFill
          gradient={false}
        >
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              story={story}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};


// =============================================
// STORY CARD
// =============================================

function StoryCard({ story }) {
  return (
    <article className="mx-3 flex h-[560px] w-[320px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-[#C2BFB7] bg-white sm:w-[380px] lg:h-[600px] lg:w-[420px]">

      {/* =========================================
          IMAGE
          ========================================= */}

      {story.image && (
        <div className="h-[220px] w-full shrink-0 overflow-hidden sm:h-[250px] lg:h-[270px]">
          <PrismicNextImage
            field={story.image}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      )}

      {/* =========================================
          CONTENT
          ========================================= */}

      <div className="flex flex-1 flex-col p-6 md:p-7">

        {/* Title */}

        {story.title && (
          <h3 className="line-clamp-2 min-h-[58px] font-ambit-semibold text-2xl leading-[1.05] tracking-[-0.02em] text-black md:text-3xl">
            {story.title}
          </h3>
        )}

        {/* Content */}

        {story.content && (
          <p className="mt-3 line-clamp-5 font-ambit-regular text-base leading-7 text-black md:text-lg md:leading-7">
            {story.content}
          </p>
        )}

        {/* Read More */}

        {story.link && (
          <div className="mt-auto pt-7">
            <PrismicNextLink field={story.link}>
              <Button>
                Read More
              </Button>
            </PrismicNextLink>
          </div>
        )}

      </div>
    </article>
  );
}

export default PeopleOfAkankshaMarquee;