import SliceIdentifier from "@/components/SliceIdentifier";
import TestimonialSingle from "@/components/Testimonials/testimonial-single";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.TestimonialSlice} TestimonialSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialSlice>} TestimonialProps
 * @param {TestimonialProps}
 */
const Testimonial = ({ slice }) => {

  if(slice.variation === 'optionC') {

    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}        
      >
      <SliceIdentifier className='mb-12' text={slice.primary.slice_identifier} />
      <div className="min-h-[800px] relative flex flex-col items-center justify-center">
            <div className="single-test-bg absolute top-[60%] -translate-y-2/4 left-2/4 -translate-x-2/4 h-[400px] rounded-full w-full" />
            <div 
                className="
                    bg-white py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-52 -rotate-[2deg] z-20"
            >
              <div className="min-h-[28rem] flex flex-col justify-between ">
                <div>
                  <Image 
                      src='/quote.svg'
                      alt=""
                      height={80}
                      width={80}
                  />
                  <RichText 
                    text={slice.primary.quote}
                    className='font-ambit-regular text-4xl text-deep-green mt-12'
                  />
                </div>
                <p className="flex w-[50%] sm:w-full">
                  <span className="text-deep-green font-ambit-regular text-lg">{slice.primary.name}</span>,<br /><span className="text-[#9DA59F] font-ambit-regular text-lg">{slice.primary.designation}</span>
                </p>
              </div>
            </div>
            <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[53%] -translate-x-1/4 top-[30%] rotate-[4deg] z-20">
                <PrismicNextImage 
                    field={slice.primary.image}
                    alt=""
                    className="h-full w-full object-cover rounded-[20px]"
                />
            </div>
        </div>
      </section>
    )

  }

  if(slice.variation === 'optionD') {

    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}  className="mt-12"      
      >
       
       <h1 class="text-7xl text-center font-ambit-regular w-[8ch]  mx-auto">
  {slice.primary.title}
</h1>
      <div className="min-h-[800px] relative flex flex-col items-center justify-center">
            <div className="single-test-bg absolute top-[60%] -translate-y-2/4 left-2/4 -translate-x-2/4 h-[400px] rounded-full w-full" />
            <div 
                className="
                    bg-white py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-52 -rotate-[2deg] z-20"
            >
              <div className="min-h-[28rem] flex flex-col justify-between ">
                <div>
                  <Image 
                      src='/quotes-new.png'
                      alt=""
                      height={80}
                      width={80}
                  />
                  <RichText 
                    text={slice.primary.quote}
                    className='font-ambit-regular text-4xl text-deep-green mt-12'
                  />
               
                </div>
               <p className="flex w-[50%] sm:w-full">
                  <span className="text-deep-green font-ambit-regular text-lg">{slice.primary.name}</span>,<br /><span className="text-[#9DA59F] font-ambit-regular text-lg">{slice.primary.designation}</span>
                </p>
               
              </div>
            </div>
            <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[53%] -translate-x-1/4 top-[30%] rotate-[4deg] z-20">
                <PrismicNextImage 
                    field={slice.primary.image}
                    alt=""
                    className="h-full w-full object-cover rounded-[20px]"
                />
            </div>
        </div>
      </section>
    )

  }
  

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <SliceIdentifier className='mb-12' text={slice.primary.slice_identifier} />
      {slice.variation === 'single' && (<TestimonialSingle slice={slice} />)}
    </section>
  );
};

export default Testimonial;
