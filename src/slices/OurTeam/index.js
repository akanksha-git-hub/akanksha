"use client";
import Marquee from "@/components/Marquee";
import MixedText from "@/components/Texts/MixedText";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.OurTeamSlice} OurTeamSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OurTeamSlice>} OurTeamProps
 * @param {OurTeamProps}
 */

const OurTeam = ({ slice }) => {
  const marqueeASliceEnd = Math.floor(slice.primary.team_content.length / 2);

  const feedMarqueeDataA = slice.primary.team_content.slice(
    0,
    marqueeASliceEnd
  );
  const feedMarqueeDataB = slice.primary.team_content.slice(
    marqueeASliceEnd,
    slice.primary.team_content.length
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-8"
    >
      <div className="inline-padding">
        <SliceIdentifier text={slice.primary.slice_identifier} />
      </div>
      <div className="mt-8  ">
        {/* <MixedText 
          // texts={slice.primary.slice_identifier}
          texts="Our board"
          index={1}
          className="flex items-center justify-center text-8xl text-deep-green mb-12"
          /> */}
        {/* <RichText 
          className="flex items-center justify-center text-8xl text-deep-green mb-12"
          text="Our board"
        /> */}
        <Marquee slice={feedMarqueeDataA} />
        <Marquee slice={feedMarqueeDataB} isRight />
      </div>
    </section>
  );
};

export default OurTeam;
