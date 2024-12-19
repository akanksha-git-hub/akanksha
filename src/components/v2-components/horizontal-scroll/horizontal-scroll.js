'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalScrollCardA from "./horizontal-scroll-card-A";
import HorizontalScrollCardB from "./horizontal-scroll-card-B";
import HorizontalScrollCardC from "./horizontal-scroll-card-C";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ data }) {

    
    // Final components to be rendered
    // if(data && data?.length > 0) {
    //     return(
    //         <section
    //             className="overflow-hidden"
    //         >
    //             <ul className="flex">
    //                 {data.map((item, i) => {

    //                     let component;

    //                     // modify components as per the index position;

    //                     switch(i) {
    //                         case 0:
    //                             component = <HorizontalScrollCardA item={item} />;
    //                             break;
    //                         case 1:
    //                             component = <HorizontalScrollCardB item={item} />;
    //                             break;
    //                         case 2:
    //                             component = <HorizontalScrollCardC item={item} />;
    //                             break;
    //                     }

    //                     return(
    //                         <li
    //                             className="p-12" 
    //                             key={i}
    //                         >
    //                             {component}
    //                         </li>    
    //                     )

    //                 })}
    //             </ul>
    //         </section>
    //     )
    // } else {
    //     return null;
    // } 


    // Horizontal scroll playground
    // attempt with 3 or 4 empty divs to get just the horizontal scroll effect


    const dummyData = [0, 1, 2, 3];

    return(
        <p>
            Attempt h-scroll here before using the above final component
        </p>
    )


}
