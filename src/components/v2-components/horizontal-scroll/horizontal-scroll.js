"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalScrollCardA from "./horizontal-scroll-card-A";
import HorizontalScrollCardB from "./horizontal-scroll-card-B";
import HorizontalScrollCardC from "./horizontal-scroll-card-C";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ data }) {
  const [onMount, setOnMount] = useState(false);
  const component = useRef();
  const slider = useRef();

  useEffect(() => {
    if (data && !onMount) {
      setOnMount(true);
      return;
    }

    let panels = gsap.utils.toArray(".scroll-section");
    const animation = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: slider.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + slider.current.offsetWidth,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
      },
    });
    return () => animation.kill();

    // let ctx = gsap.context(() => {
    //   let panels = gsap.utils.toArray(".scroll-section");
    //   gsap.to(panels, {
    //     xPercent: -100 * (panels.length - 1),
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: slider.current,
    //       pin: true,
    //       scrub: 1,
    //       snap: 1 / (panels.length - 1),
    //       end: () => "+=" + slider.current.offsetWidth,
    //     },
    //   });
    // }, component);
    // return () => ctx.revert();
  }, [onMount]);

  // Final components to be rendered
  if (data && data?.length > 0) {
    return (
      <section className="overflow-hidden ">
        <ul ref={slider} className="flex  ">
          {data.map((item, i) => {
            let component;

            // modify components as per the index position;

            switch (i) {
              case 0:
                component = <HorizontalScrollCardA item={item} />;
                break;
              case 1:
                component = <HorizontalScrollCardB item={item} />;
                break;
              case 2:
                component = <HorizontalScrollCardC item={item} />;
                break;
            }

            return (
              <li
                className=" scroll-section flex-shrink-0 w-screen p-12  "
                key={i}
              >
                {component}
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else {
    return null;
  }
}
