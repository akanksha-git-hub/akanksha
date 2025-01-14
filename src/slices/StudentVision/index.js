'use client'
import { useState } from "react";
import SliceIdentifier from "@/components/SliceIdentifier";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.StudentVisionSlice} StudentVisionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StudentVisionSlice>} StudentVisionProps
 * @param {StudentVisionProps}
 */
const StudentVision = ({ slice }) => {
  const [trackIndex, setTrackIndex] = useState(0); 

  // Navigation functions
  const swipePrev = () => {
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    }
  };

  const swipeNext = () => {
    if (trackIndex < slice.primary.description.length - 1) {
      setTrackIndex(trackIndex + 1);
    }
  };

  if (slice.variation === "withBgImage") {
     
  
      return (
        <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-8"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />

      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-8 text-7xl font-ambit-regular">{slice.primary.title}</h1>
        
       <div className="relative  flex items-center justify-center">
        <PrismicNextImage
          height={800}
          width={800}
          field={slice.primary.image}
          alt=""
        />
         <PrismicNextImage
              field={
                slice.primary.bg_image
              }
              alt="bg-image"
              fill
              className="absolute top-0 left-0 -z-10"
            />
</div>
        {/* Display current description */}
        <p className="text-center w-[50%] font-ambit-regular mt-4">
          {slice.primary.description[trackIndex].desc}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-2 mt-4">
          <SwiperArrow
            strokeColor="#37473C"
            className="rotate-180"
            onClick={swipePrev}
            isDisabled={trackIndex === 0}
          />
         <SwiperArrow
  strokeColor="#37473C"
  onClick={swipeNext}
  isDisabled={trackIndex === slice.primary.description.length - 1 ? true : false}
/>
        </div>
      </div>
    </section>
      
      );
    }
  
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-8"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />

      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-8 text-7xl font-ambit-regular">{slice.primary.title}</h1>
        
        <PrismicNextImage
          height={800}
          width={800}
          field={slice.primary.image}
          alt=""
        />

        {/* Display current description */}
        <p className="text-center w-[50%] font-ambit-regular mt-4">
          {slice.primary.description[trackIndex].desc}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-2 mt-4">
          <SwiperArrow
            strokeColor="#37473C"
            className="rotate-180"
            onClick={swipePrev}
            isDisabled={trackIndex === 0}
          />
         <SwiperArrow
  strokeColor="#37473C"
  onClick={swipeNext}
  isDisabled={trackIndex === slice.primary.description.length - 1 ? true : false}
/>
        </div>
      </div>
    </section>
  );
};

export default StudentVision;
