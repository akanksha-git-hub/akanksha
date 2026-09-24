"use client";

import Marquee from "react-fast-marquee";
import {
  PrismicNextImage,
  PrismicNextLink,
} from "@prismicio/next";

import Button from "@/components/v2-components/buttons/button";

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
      className="w-full overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* =========================================
          HEADING
          ========================================= */}

      {slice.primary.heading && (
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
          <h2 className="font-ambit-regular text-4xl leading-[1.05] tracking-[-0.025em] text-black sm:text-5xl md:text-6xl lg:text-7xl">
            {slice.primary.heading}
          </h2>
        </div>
      )}

      {/* =========================================
          MARQUEE
          ========================================= */}

      <div className="mt-10 md:mt-14">
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
              <Button >
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