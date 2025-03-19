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

  const { show_identifier, slice_identifier } = slice.primary;

  const RenderIdentifier = () =>
    show_identifier && <SliceIdentifier text={slice_identifier} />;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-12"
    >
      <div className="inline-padding">
        <RenderIdentifier />
      </div>
      <div className="mt-8 ">
        <Marquee slice={feedMarqueeDataA} />
        <Marquee slice={feedMarqueeDataB} isRight />
      </div>
    </section>
  );
};

export default OurTeam;
