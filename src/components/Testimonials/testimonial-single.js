import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import RichText from "../Texts/RichText";


export default function TestimonialSingle({ slice }) {

    return(
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
                    <RichText 
                        text={slice.primary.name}
                        className='text-deep-green font-ambit-regular text-2xl w-[50%] sm:w-full'
                    />
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
    )
}