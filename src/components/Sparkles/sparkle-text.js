import { useRef, useEffect } from "react";
import gsap  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SparkleMedium from "./sparkle-medium";
import SparkleSmall from "./sparkle-small";
import RichText from "../Texts/RichText";
import SparkleBig from "./sparkle-big";

gsap.registerPlugin(ScrollTrigger);
export default function SparkleText({ slice, isRight,onContentChange  }) {

    


useEffect(()=>{

    gsap.fromTo(
        ".image-trigger",
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".image-trigger",
            start: "top 80%",
          },
        }
      );
  

gsap.fromTo(".sparkle-big" ,{
    yPercent: 50, opacity: 0 

},{
   
     yPercent: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".sparkle-big",
        
        
      },

})
gsap.fromTo(
    ".sparkle-medium",
    { yPercent: 50, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2, 
      scrollTrigger: {
        trigger: ".sparkle-medium",
        start: "top 85%",
      },
    }
  );
  gsap.fromTo(
    ".sparkle-small",
    { yPercent: 50, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
      scrollTrigger: {
        trigger: ".sparkle-small",
        start: "top 85%",
      },
    }
  );

},[])

    const text_b_modified = slice.text_b.replace(/\+/g, '').trim();
   
    const handleClick = () => {
        
        
        const title = isRight ? "The "+ text_b_modified : "The " + `${slice.text_a}` ;
        const description = isRight
          ? `${slice.vision_description}`
          : `${slice.mission_description}`;
    
        onContentChange(title, description);
      };
    let content = 
        <>
            <RichText 
                text={slice.text_a}
                className='font-playfair-display italic text-7xl text-deep-green'  onClick={handleClick} 
            />
            {slice.image_a.url ? 
                <p>Image from Prismic</p>
                :
                <div className="w-full 950px:w-[40%] h-auto relative">
                    <Image 
                        className=" image-trigger rounded-2xl w-full h-full"
                        src='/dummy_img.png'
                        alt=""
                        height={200}
                        width={200}
                        
                    />
                    <SparkleBig  
                        className=" sparkle-big absolute hidden 950px:block top-2/4 -translate-y-2/4 -right-[30%] 2xl:-right-56 2xl:h-24"
                    />
                    <SparkleMedium 
                        className=' sparkle-medium absolute hidden 950px:block -top-8 h-12 -right-[26%] 2xl:-right-40'
                    />
                    <SparkleSmall 
                        className='sparkle-small absolute bottom-44 right-12 950px:block 2xl:bottom-0 950px:-right-[22%] 2xl:-right-32'
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
                            className=" image-trigger rounded-2xl h-full w-full"
                            src='/dummy_img.png'
                            alt=""
                            height={200}
                            width={200}
                        />
                        <SparkleMedium 
                            className=' sparkle-medium absolute hidden 950px:block top-2/4 -translate-y-2/4 950px:-left-[28%] 2xl:-left-40'
                        />
                        <SparkleSmall 
                            className=' sparkle-small absolute -top-16 left-12 950px:top-0 2xl:top-1/4 -translate-y-2/4 950px:-left-[40%] 2xl:-left-44'
                        />
                    </div>
                    }
                <RichText 
                    text= {slice.text_b}
                    className='font-playfair-display italic text-7xl text-deep-green flex justify-end md:justify-normal'
                    onClick={handleClick}  />
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