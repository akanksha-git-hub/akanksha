'use client'
import PartnerLogo from "@/components/PartnerLogo";
import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import WeirdText from "@/components/Texts/WeirdText";
import Lottie from "lottie-react";
import LottieData from "../../../public/akanksha_sun.lottie.json";
// import TestLottieData from "../../../public/we-collaborate.lottie.json";
import TestLottieData from "../../../public/lotties/give-respect.lottie.json"
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.OurPartnersSlice} OurPartnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OurPartnersSlice>} OurPartnersProps
 * @param {OurPartnersProps}
 */

let isInitial = true;

const OurPartners = ({ slice }) => {

  const [onMounted, setOnMounted] = useState(false)

  const ref = useRef();
  const root = useRef();

  useEffect(() => {
    
    ref.current.stop();

    if(!onMounted) {
      setOnMounted(true);
      return;
    }

    ref.current.setSpeed(2);

    const lottiePlay = () => ref.current.play();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        onEnter: lottiePlay
      }
    });

    const killRoot = root.current

    return () => {
      ScrollTrigger.getById(killRoot)?.kill();
      tl.kill();
    }



  }, [onMounted]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-12"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div 
        className="mt-12 flex flex-col"
      >
        <WeirdText 
          className="mt-6 flex flex-col"
          texts={slice.primary.title}
        />
      </div>
      <div className="space-y-12 mt-12 lg:space-y-32 lg:mt-32">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-end xl:mr-6">
          <div 
          ref={root}
          className="
            w-full
            md:w-[45%]
            lg:w-[24rem] lg:h-[18rem]
            3xl:w-[30rem] 3xl:h-[24rem]
            "
          >
            {/* <PrismicNextImage 
              field={slice.primary.image}
              height={500}
              width={500}
              alt=""
              className="h-full w-full"
            /> */}
            <Lottie 
              animationData={LottieData}
              lottieRef={ref}
              loop={false}
            />
          </div>
          <div className="space-y-4 flex flex-col w-full md:w-[45%] lg:w-[60ch] 3xl:w-[70ch]">
            <RichText 
              text={slice.primary.description}
              className="text-deep-green font-inter text-base lg:text-xl leading-6 xl:text-2xl xl:leading-8"
            />
            <PrimaryCTA 
              text={slice.primary.cta_text || "Know more"}
            />
          </div>
        </div>
        <ul className="mt-12 flex items-center justify-center flex-wrap">
          {slice.primary.partner_logos.map((logo, index) => (
            <PartnerLogo 
              image={logo.partner_logo}
              key={index}
              imageClassName="h-[70%] w-[70%] object-contain"
              className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[4rem] w-2/4 sm:h-[8rem] md:w-[30%] lg:w-[20%]"              
            />
          ))}
        </ul>
      </div>
      {/* <Lottie 
        className="border border-red-500 h-[200px] w-[200px]"
        animationData={TestLottieData}
        loop
      /> */}
    </section>
  );
};

export default OurPartners;
