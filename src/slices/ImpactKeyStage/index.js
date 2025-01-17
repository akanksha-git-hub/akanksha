import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.ImpactKeyStageSlice} ImpactKeyStageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactKeyStageSlice>} ImpactKeyStageProps
 * @param {ImpactKeyStageProps}
 */
const ImpactKeyStage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-10"
    >
      <h1 className="md:text-8xl text-6xl md:text-center font-ambit-regular text-[#333333] md:mx-auto ">
            {slice.primary.main_heading}
          </h1>
      <div className="relative flex items-center justify-center py-8 mt-10">

        <div className="flex flex-col md:flex-row items-start ">
          {/* Item 1 */}
          <div className="relative flex flex-col items-start md:items-center  pt-4 md:pt-0">
            <h1 className="text-2xl mb-4 text-left md:text-center font-ambit-semibold">
              {slice.primary.heading1}
            </h1>
            <div className="md:mt-[22rem] md:ml-40 md:pr-10">
              <p className="mb-2 text-left md:text-center font-ambit-regular text-3xl">
                {slice.primary.subheading1}
              </p>
              <p className="text-left md:text-center md:w-[30ch] font-ambit-regular text-md">
                {slice.primary.desciption1}
              </p>
            </div>
            <div className="hidden md:block absolute right-0 top-0 transform translate-x-48 translate-y-3 ">
              <Image
                src="/vector1.png"
                alt="Vector connecting Heading 1 to Subtitle 1"
                width={370}
                height={370}
                className=""
              />
               <div className="absolute w-5 h-5 bg-[#FE6600] rounded-full top-[33%] right-1/3 transform -translate-x-1/2 -translate-y-1/2 z-40"></div>
               
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative flex flex-col items-start md:items-center  pt-4 md:pt-0 ">
            <h1 className="text-2xl mb-4 text-left md:text-center font-ambit-semibold">
              {slice.primary.heading2}
            </h1>
            <div className="md:mt-[22rem] md:mr-40 md:pl-10">
              <p className="mb-2 text-left md:text-center font-ambit-regular text-3xl">
                {slice.primary.subheading2}
              </p>
              <p className="text-left md:text-center md:w-[30ch] font-ambit-regular text-md">
                {slice.primary.desciption2}
              </p>
            </div>
            <div className="hidden md:block absolute left-0 top-0 transform -translate-x-48 translate-y-3">
              <Image
                src="/vector2.png"
                alt="Vector connecting Heading 2 to Subtitle 2"
                width={370}
                height={370}
                className=""
              />
                <div className="absolute w-5 h-5 bg-[#55BBD3] rounded-full top-[95%] left-[4.5%] transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactKeyStage;
