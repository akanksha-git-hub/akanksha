import Image from "next/image";
import SparkleMedium from "./sparkle-medium";
import SparkleSmall from "./sparkle-small";
import RichText from "../Texts/RichText";
import SparkleBig from "./sparkle-big";


export default function SparkleText({ slice, isRight }) {

    let content = 
        <>
            <RichText 
                text={slice.text_a}
                className='font-playfair-display italic text-7xl text-deep-green'
            />
            {slice.image_a.url ? 
                <p>Image from Prismic</p>
                :
                <div className="w-full 950px:w-[40%] h-auto relative">
                    <Image 
                        className="rounded-2xl w-full h-full"
                        src='/dummy_img.png'
                        alt=""
                        height={200}
                        width={200}
                    />
                    <SparkleBig 
                        className="absolute hidden 950px:block top-2/4 -translate-y-2/4 -right-[30%] 2xl:-right-56 2xl:h-24"
                    />
                    <SparkleMedium 
                        className='absolute hidden 950px:block -top-8 h-12 -right-[26%] 2xl:-right-40'
                    />
                    <SparkleSmall 
                        className='absolute bottom-44 right-12 950px:block 2xl:bottom-0 950px:-right-[22%] 2xl:-right-32'
                    />
                </div>
            }
        </>

    if(isRight) {
        content =
            <>
                {slice.image_b.url ? 
                    <p>Image from Prismic</p>
                    :
                    <div className="w-full 950px:w-[40%] h-auto relative">
                        <Image 
                            className="rounded-2xl h-full w-full"
                            src='/dummy_img.png'
                            alt=""
                            height={200}
                            width={200}
                        />
                        <SparkleMedium 
                            className='absolute hidden 950px:block top-2/4 -translate-y-2/4 950px:-left-[28%] 2xl:-left-40'
                        />
                        <SparkleSmall 
                            className='absolute -top-16 left-12 950px:top-0 2xl:top-1/4 -translate-y-2/4 950px:-left-[40%] 2xl:-left-44'
                        />
                    </div>
                    }
                <RichText 
                    text={slice.text_b}
                    className='font-playfair-display italic text-7xl text-deep-green flex justify-end md:justify-normal'
                />
            </>
    }


    return (
        <div 
            className={`flex ${isRight ? 'flex-col-reverse' : 'flex-col'} 950px:flex-row 950px:justify-center 950px:items-center gap-8 w-full`}
        >
            {content}
        </div>
    )



}