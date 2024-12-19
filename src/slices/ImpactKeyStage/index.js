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
      className="universal-padding mt-0"
    >
      <div className="relative flex items-center justify-center py-8 ">
        <div className="flex flex-col md:flex-row items-start ">
          {/* Item 1 */}
          <div className="relative flex flex-col items-start md:items-center  pt-4 md:pt-0">
            <h1 className="text-lg mb-4 text-left md:text-center font-ambit-bold">
              {slice.primary.heading1}
            </h1>
            <div className="md:mt-[22rem] md:ml-40 md:pr-10">
              <p className="mb-2 text-left md:text-center font-ambit-light">
                {slice.primary.subheading1}
              </p>
              <p className="text-left md:text-center md:w-[30ch] font-ambit-regular text-sm">
                {slice.primary.desciption1}
              </p>
            </div>
            <div className="hidden md:block absolute right-0 top-0 transform translate-x-44 translate-y-2">
              <Image
                src="/vector1.png"
                alt="Vector connecting Heading 1 to Subtitle 1"
                width={350}
                height={350}
                className=""
              />
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative flex flex-col items-start md:items-center  pt-4 md:pt-0 ">
            <h1 className="text-lg mb-4 text-left md:text-center font-ambit-bold">
              {slice.primary.heading2}
            </h1>
            <div className="md:mt-[22rem] md:mr-40 md:pl-10">
              <p className="mb-2 text-left md:text-center font-ambit-light">
                {slice.primary.subheading2}
              </p>
              <p className="text-left md:text-center md:w-[30ch] font-ambit-regular text-sm">
                {slice.primary.desciption2}
              </p>
            </div>
            <div className="hidden md:block absolute left-0 top-0 transform -translate-x-44 translate-y-2">
              <Image
                src="/vector2.png"
                alt="Vector connecting Heading 2 to Subtitle 2"
                width={350}
                height={350}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactKeyStage;
