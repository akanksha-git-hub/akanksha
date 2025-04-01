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
const IconShowcase = ({ slice, context }) => {
  const { show_identifier, slice_identifier } = slice.primary;

  const RenderIdentifier = () =>
    show_identifier && <SliceIdentifier text={slice_identifier} />;

  if (slice.variation === "withTitle") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative"
      >
        <div className="hidden md:block absolute -right-80 -bottom-60 xl:top-[150px] xl:-left-[280px] h-[1000px] w-[1000px] -z-10">
          <PrismicNextImage
            field={slice.primary.asset}
            className="h-full w-full object-contain xl:-scale-x-[-1] md:scale-x-[-1]"
            height={1800}
            width={1800}
          />
        </div>
        <RenderIdentifier />
        <div className="mb-12 space-y-8 mt-12">
          <RichText
            text={slice.primary.title}
            className="font-ambit-regular text-black text-5xl md:text-7xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto"
          />
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-black text-xl md:text-2xl md:text-left flex md:items-center md:justify-left lg:w-[70%]"
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
                  className={`flex flex-col items-start justify-start space-y-4 w-full md:max-w-[300px] ${
                    isFirstRow
                      ? index === 0
                        ? "xl:col-span-1 xl:col-start-2"
                        : "xl:col-start-3 xl:col-span-1"
                      : ""
                  }`}
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
                      className="text-black font-ambit-semibold text-3xl md:text-4xl"
                    />
                    <RichText
                      text={item.description}
                      className="text-black font-ambit-regular text-md md:text-lg"
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
  if (slice.variation === "iconShowcaseV2") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative"
      >
        <div className="absolute -left-6 top-[500px]  md:-left-24 md:top-[380px] xl:-left-12  xl:top-[700px]">
      <PrismicNextImage
        field={slice.primary.asset_1}
        className="h-full w-[120px] md:w-[200px] xl:w-[300px] object-cover"
        height={1800}
        width={1800}
      />
    </div>
    <div className="absolute -right-24 top-[750px] md:-right-20 md:bottom-[1000px] xl:-right-12 xl:bottom-[470px]">
      <PrismicNextImage
        field={slice.primary.asset_2}
        className="h-full w-[200px] xl:w-[250px] object-cover"
        height={1800}
        width={1800}
      />
      </div>
        <RenderIdentifier />
        <div className="mb-12 space-y-8 mt-12">
          <RichText
            text={slice.primary.title}
            className="font-ambit-regular  text-black text-5xl md:text-7xl md:text-center flex md:items-center md:justify-center md:w-[15ch] mx-auto "
          />
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-black text-xl md:text-2xl md:text-center flex md:items-center md:justify-center lg:w-[65%] mx-auto"
          />
        </div>
        <div className="mt-16">
          <PrismicNextImage
            field={slice.primary.image}
            className=" object-contain mx-auto "
            height={600}
            width={600}
          />  
          
        </div>
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-10 w-full md:max-w-[1000px] mx-auto mt-16 ">
            {slice.primary.data.map((item, index) => {
             
              let LottieData = null;
              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }
              return (
                <li
                  key={item.title}
                  className="flex flex-col items-start justify-start space-y-4   "
                     
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
                      className="text-black font-ambit-semibold text-3xl md:text-4xl w-[13ch]"
                    />
                    <RichText
                      text={item.description}
                      className="text-black font-ambit-regular text-md md:text-lg"
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
        className="relative"
      >
        <div className="md:space-y-10 space-y-8">
          <RenderIdentifier />
          <RichText
            text={slice.primary.title}
            className="font-ambit-regular text-black text-3xl md:text-6xl text-left xl:text-center flex xl:items-left xl:justify-left md:w-[15ch] xl:mx-auto pt-8"
          />
        </div>
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-8 justify-center items-start mt-10">
            {slice.primary.data.map((item, index) => {
              let LottieData = null;
              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }
              return (
                <li
                  key={item.title}
                  className="flex flex-col items-left justify-center space-y-4 w-full md:max-w-[360px]"
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
        <div className="hidden md:block absolute md:-bottom-36 -right-44 xl:-bottom-52 xl:-right-52 h-[600px] w-[600px] xl:h-[900px] xl:w-[900px] -z-10">
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
        } my-12 pt-12`}
      >
        <RenderIdentifier />
        <RichText
          text={slice.primary.title}
          className="font-ambit-regular text-black md:text-6xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto text-3xl sm:text-5xl xl:w-[46%] text-left xl:text-5xl 3xl:w-[48rem] 3xl:text-6xl mt-14"
        />
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 mt-14 gap-4">
            {slice.primary.data.map((item, index) => {
              let LottieData = null;
              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }
              return (
                <li
                  key={item.title}
                  className={`flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 ${
                    index % 2 === 0 && "bg-v2-yellow"
                  } group relative overflow-hidden`}
                >
                  <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                    <div className="h-full w-full">
                      <Image src={PencilShading} alt="img" fill />
                    </div>
                  </div>
                  <div className="h-32 w-32 xl:h-28 xl:w-28 rounded-full flex items-center justify-start">
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
if (slice.variation === "withTitleDefault") {
    const { removePagePadding } = context;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${
          removePagePadding ? " " : "universal-padding"
        } my-12 pt-12`}
      >
        <RenderIdentifier />
        <RichText
          text={slice.primary.title}
          className="font-ambit-regular text-black md:text-6xl md:text-left flex md:items-center md:justify-left md:w-[15ch] md:mr-auto text-3xl sm:text-5xl xl:w-[46%] text-left xl:text-5xl 3xl:w-[48rem] 3xl:text-6xl mt-14"
        />
        {slice.primary.data && (
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 mt-14 gap-4">
            {slice.primary.data.map((item, index) => {
              let LottieData = null;
              if (item.animated_icon_json_format) {
                LottieData = JSON.parse(item.animated_icon_json_format);
              }
              return (
                <li
                  key={item.title}
                  className={`flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 ${
                    index % 2 === 0 && "bg-v2-yellow"
                  } group relative overflow-hidden`}
                >
                  <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                    <div className="h-full w-full">
                      <Image src={PencilShading} alt="img" fill />
                    </div>
                  </div>
                  <div className="h-32 w-32 xl:h-28 xl:w-28 rounded-full flex items-center justify-start">
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
      className="universal-padding"
    >
      <RenderIdentifier />
      {slice.primary.data && (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 my-12 gap-4">
          {slice.primary.data.map((item, index) => {
            let LottieData = null;
            if (item.animated_icon_json_format) {
              LottieData = JSON.parse(item.animated_icon_json_format);
            }
            return (
              <li
                key={item.title}
                className={`flex flex-col items-start justify-start space-y-4 border rounded-3xl p-8 ${
                  index % 2 === 0 && "bg-[#58BCD4]"
                } group relative overflow-hidden`}
              >
                <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
                  <div className="h-full w-full">
                    <Image src={PencilShading} alt="img" fill />
                  </div>
                </div>
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
