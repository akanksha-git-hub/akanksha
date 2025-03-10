"use client";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Lottie from "lottie-react";
import DUMMYLOTTIE from "../../../public/lotties/dummyTestLottie.json";
import SliceIdentifier from "@/components/SliceIdentifier";
import Image from "next/image";
import PencilShading from "@/assets/shading-side.svg";
/**
 * @typedef {import("@prismicio/client").Content.IconShowcaseSlice} IconShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconShowcaseSlice>} IconShowcaseProps
 * @param {IconShowcaseProps}
 */
const IconShowcase = ({ slice,context }) => {
  if (slice.variation === "withTitle") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12 relative"
      >
        <div className="hidden xl:block absolute top-[150px] -left-[280px]  xl:h-[1000px] xl:w-[1000px] -z-10">
          <PrismicNextImage
            field={slice.primary.asset}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>
        <div className="mb-24 space-y-20">
          <SliceIdentifier text={slice.primary.slice_identifier} />
          <RichText
            text={slice.primary.title}
            className="font-ambit-regular text-black text-5xl md:text-7xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto"
          />{" "}
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-black text-xl md:text-2xl md:text-left flex md:items-center md:justify-left lg:w-[70%] "
          />
        </div>
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-8">
            {slice.primary.data.map((item, index) => {
              const isFirstRow = index < 2;
              let LottieData = null;

              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }

              return (
                <li
                  key={item.title}
                  className={`flex flex-col items-start justify-start space-y-4 w-full md:max-w-[300px]  ${isFirstRow ? (index === 0 ? "xl:col-span-1 xl:col-start-2 " : "xl:col-start-3 xl:col-span-1") : ""} `}
                >
                  <div className="h-28 w-28 rounded-full flex items-center justify-center">
                    {item.isanimatedicon ? (
                      <div className="h-[80%] w-[80%]">
                        <Lottie
                          animationData={LottieData}
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div className="h-[82%] w-[82%]">
                        <PrismicNextImage
                          field={item.icon}
                          height={60}
                          width={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-6 p-4">
                    <RichText
                      text={item.title}
                      className="text-black font-ambit-semibold text-4xl"
                    />
                    <RichText
                      text={item.description}
                      className="text-black font-ambit-regular text-lg"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }

  if (slice.variation === "titleAndSubtitle") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12 relative"
      >
        <div className="mb-24 md:space-y-10 space-y-8">
          <SliceIdentifier text={slice.primary.slice_identifier} />
          <RichText
            text={slice.primary.small_title}
            className="font-ambit-regular text-black  md:text-8xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto mt-20 text-4xl sm:text-6xl xl:w-[46%] text-left xl:text-7xl 3xl:w-[48rem] 3xl:text-8xl"
          />
          <RichText
            text={slice.primary.title}
            className="font-ambit-regular text-black text-3xl md:text-6xl md:text-center flex md:items-center md:justify-center md:w-[15ch] md:mx-auto"
          />
        </div>
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-8 justify-center  items-start">
            {slice.primary.data.map((item, index) => {
              let LottieData = null;

              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }

              return (
                <li
                  key={item.title}
                  className="flex flex-col items-left justify-center space-y-4 w-full md:max-w-[360px] "
                >
                  <div className="h-28 w-28 rounded-full flex items-center justify-center">
                    {item.isanimatedicon ? (
                      <div className="h-[80%] w-[80%]">
                        <Lottie
                          animationData={LottieData}
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div className="h-[82%] w-[82%]">
                        <PrismicNextImage
                          field={item.icon}
                          height={60}
                          width={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-6 p-4">
                    <RichText
                      text={item.title}
                      className="text-black font-ambit-semibold text-4xl"
                    />
                    <RichText
                      text={item.description}
                      className="text-black font-ambit-regular text-lg"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="hidden xl:block absolute -bottom-64 -right-48  xl:h-[900px] xl:w-[900px] -z-10">
          <PrismicNextImage
            field={slice.primary.asset}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>
      </section>
    );
  }

  if (slice.variation === "withTitleDefault") {
    const { removePagePadding } = context;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${
          removePagePadding ? " " : "universal-padding"
        } my-12`}
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <RichText
          text={slice.primary.title}
          className="font-ambit-regular text-black  md:text-6xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto mt-20 text-3xl sm:text-5xl xl:w-[46%] text-left xl:text-4xl 3xl:w-[48rem] 3xl:text-6xl"
        />
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 mt-10">
            {slice.primary.data.map((item, index) => {
              let LottieData = null;

              if (item.animated_icon_json_format)
                LottieData = JSON.parse(item.animated_icon_json_format);

              let currentItem = index;

              return (
                <li
                  key={item.title}
                  className={`
                    flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 
                    ${currentItem % 2 === 0 && "bg-v2-yellow"} group relative overflow-hidden
                  `}
                >
                  <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                    <div className="h-full w-full">
                      <Image src={PencilShading} alt="img" fill />
                    </div>
                  </div>
                  <div className="h-28 w-28 rounded-full flex items-center justify-center place-self-end">
                    {item.isanimatedicon ? (
                      <div className="h-[80%] w-[80%]">
                        <Lottie
                          animationData={LottieData}
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div className="h-[82%] w-[82%]">
                        <PrismicNextImage
                          field={item.icon}
                          height={60}
                          width={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <RichText
                      text={item.title}
                      className="text-black font-ambit-semibold text-2xl"
                    />
                    <RichText
                      text={item.description}
                      className="text-black font-ambit-regular text-lg"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding "
    >
      {/* <SliceIdentifier text={slice.primary.slice_identifier}  /> */}
      {slice.primary.data && (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 my-12">
          {slice.primary.data.map((item, index) => {
            let LottieData = null;

            if (item.animated_icon_json_format)
              LottieData = JSON.parse(item.animated_icon_json_format);

            let currentItem = index;

            return (
              <li
                key={item.title}
                className={`
                  flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 
                  ${currentItem % 2 === 0 && "bg-[#58BCD4]"} group relative overflow-hidden
                `}
              >
                <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                  <div className="h-full w-full">
                    <Image src={PencilShading} alt="img" fill />
                  </div>
                </div>
                <div className="h-28 w-28 rounded-full flex items-center justify-center place-self-end">
                  {item.isanimatedicon ? (
                    <div className="h-[80%] w-[80%]">
                      <Lottie
                        animationData={LottieData}
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="h-[82%] w-[82%]">
                      <PrismicNextImage
                        field={item.image}
                        height={60}
                        width={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <RichText
                    text={item.title}
                    className="text-black font-ambit-semibold text-2xl"
                  />
                  <RichText
                    text={item.description}
                    className="text-black font-ambit-regular text-lg"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default IconShowcase;
