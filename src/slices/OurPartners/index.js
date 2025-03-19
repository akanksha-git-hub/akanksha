"use client";
import PartnerLogo from "@/components/PartnerLogo";
import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import WeirdText from "@/components/Texts/WeirdText";
import Lottie from "lottie-react";
import Marquee from "@/components/Marquee";
import LottieData from "../../../public/akanksha_sun.lottie.json";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeTypeA from "@/components/Marquee/MarqueeTypeA/MarqueeTypeA";
import PartnerMarquee from "@/components/Marquee/MarqueeTypeA/MarqueeContainerTypeA";
import { PrismicNextLink } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.OurPartnersSlice} OurPartnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OurPartnersSlice>} OurPartnersProps
 * @param {OurPartnersProps}
 */

const OurPartners = ({ slice }) => {
  const { show_identifier, slice_identifier } = slice.primary;

  const RenderIdentifier = () =>
    show_identifier && <SliceIdentifier text={slice_identifier} />;

  if (slice.variation === "withOutSliceIdentifier") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=""
      >
        <div className="universal-padding">
          <PrismicNextLink field={slice.primary.title_link}>
            <RichText
              text={slice.primary.title}
              className="select-none text-black font-ambit-regular text-2xl sm:text-3xl md:text-5xl w-full text-left mt-8"
            />
          </PrismicNextLink>
        </div>

        <Marquee slice={slice.primary.partner_logos} noHoverEffect />
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-12"
    >
      <div className="universal-padding">
        <RenderIdentifier />
        <PrismicNextLink field={slice.primary.title_link}>
          <RichText
            text={slice.primary.title}
            className="select-none text-black font-ambit-regular text-2xl sm:text-3xl md:text-5xl w-full text-left mt-8"
          />
        </PrismicNextLink>
      </div>

      <Marquee slice={slice.primary.partner_logos} isRight noHoverEffect />
    </section>
  );
};

export default OurPartners;
