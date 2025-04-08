import { PrismicImage, PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.InceptionAfaSlice} InceptionAfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InceptionAfaSlice>} InceptionAfaProps
 * @param {InceptionAfaProps}
 */
const InceptionAfa = ({ slice }) => {
  return (
    <section className="relative w-full mt-96  h-[900px] overflow-hidden">
      {/* 🔳 Background Grid Pattern & Blurred Blob */}
      <div className="curves">
       
      </div>
        <div className="absolute inset-0 -z-10 w-full bg-[#F6AC27] bg-[linear-gradient(to_right,#7a4e0e33_1px,transparent_1px),linear-gradient(to_bottom,#7a4e0e33_1px,transparent_1px)] bg-[size:44px_78px]">
          
        </div>

      <div className="flex flex-row gap-6 mt-56 ">
        <div className="flex w-[50%] justify-center items-center " >
        <PrismicImage field={slice.primary.asset} className="h-[500px] w-[500px]" />
        </div>
        <div className="flex w-[50%] justify-start  p-10 max-h-[375px] max-w-[500px]   items-start rotate-6 bg-white font-ambit-regular relative  border-black border-2 rounded-xl " >
       <div className="w-[70%] text-lg">
        <PrismicRichText  field={slice.primary.info_description} />
        </div>
        <PrismicImage field={slice.primary.box_asset} className="absolute bottom-12 right-12  w-20  " />
        </div>
        
      </div>
    </section>
  );
};

export default InceptionAfa;
