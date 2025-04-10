  "use client";

  import { useEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import ProductCard from "@/components/afa/ProductCard";
import { PrismicNextImage } from "@prismicio/next";

  gsap.registerPlugin(ScrollTrigger);

  /**
   * @typedef {import("@prismicio/client").Content.ProductAfaSlice} ProductAfaSlice
   * @typedef {import("@prismicio/react").SliceComponentProps<ProductAfaSlice>} ProductAfaProps
   * @param {ProductAfaProps}
   */
  const ProductAfa = ({ slice }) => {
    const sectionRef = useRef();

    useEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            toggleActions: "play none none none",
          },
        });

        tl.from(".product-card", {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        });
      }, sectionRef);

      return () => ctx.revert();
    }, []);

    return (
      <section ref={sectionRef} className="w-full py-32 px-6 bg-white text-black">
        
        <div className="flex flex-col " >
        <div className="flex flex-row justify-around relative " >
        <h2 className="text-5xl md:text-7xl font-ambit-regular ">
            {slice.primary.title}
          </h2>
           <PrismicNextImage field={slice.primary.insta_asset} className="  w-36 h-10 " />
        
           <div className="absolute right-32 -top-6 rotate-6 border pr-4 pl-2 pb-4 bg-black border-black rounded-xl z-0 ">
  {/* Bottom background card layer */}
  <div className="absolute bottom-1 right-1 bg-white w-full h-full rounded-xl border-2 border-black z-10"></div>

 
  <div className="relative z-20 flex flex-col justify-center items-center">
    <PrismicNextImage field={slice.primary.insta_image} className=" -rotate-12 w-16" />
    <p className="text-xs font-ambit-regular" >See more here</p>
  </div>
</div>

        </div>
        <div className="flex flex-row justify-end items-start relative  " >
        
        <PrismicNextImage field={slice.primary.main_asset} className="  absolute -left-8 -top-48 w-[400px]  " />
          
          <div className="w-[75%]  p-10" >
          <p className="text-sm md:text-lg font-ambit-regular">
            {slice.primary.description}
          </p>
          </div>
       
        </div>
         
          
          </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto mt-10">
          {slice.primary.items.map((item, index) => (
            <ProductCard
              key={index}
              ctaLink={item.cta_link.url}
              image={item.product_image.url}
              title={item.cta_text}
              tagPosition="top-left"
              tagRotation={-20}
              tagScale={0.8}
              tagOffset={{ top: "-32px", left: "-55px" }}
              cardScale={0.8}
              className="product-card wiggle
"
            />
          ))}
        </div>
      </section>
    );
  };

  export default ProductAfa;
