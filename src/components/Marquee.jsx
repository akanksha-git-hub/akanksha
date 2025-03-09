'use client'
import { useCallback, useState } from "react";
import MarqueeItem from "./MarqueeItem";


const INITIAL_VALUE = {
  A: null,
  B: null,
  C: null
}

export default function Marquee({ slice, isRight, className, noHoverEffect }) {

  const [trackIndex, setTrackIndex] = useState(INITIAL_VALUE);

  const mouseEnter = useCallback(function mouseEnter(value, index) {
    switch (value) {
      case "A":
        setTrackIndex(prevState => {
          return {
            ...prevState,
            A: index
          }
        });
        break;
      case "B":
        setTrackIndex(prevState => {
          return {
            ...prevState,
            B: index
          }
        });
      case "C":
        setTrackIndex(prevState => {
          return {
            ...prevState,
            C: index
          }
        });
      default:
        break;
    }
  }, []);

  const mouseLeave = () => setTrackIndex(INITIAL_VALUE);

  return (
    <div className={`overflow-hidden py-2 whitespace-nowrap  ${className}`}>
        <div className="marquee-container">
            <div className="marquee-items">
              <div className={`marquee-items-slide ${isRight ? 'marquee-items-slide-right' : 'marquee-items-slide-left'}`}>
                {slice.map((item, index) => (
                    <MarqueeItem 
                      key={index}
                      mouseEnter={mouseEnter}
                      mouseLeave={mouseLeave}
                      trackIndexValue="A"
                      trackIndex={trackIndex.A}
                      index={index}
                      item={item}
                      noHoverEffect={noHoverEffect}
                    />
                  ))}
              </div>
              <div className={`marquee-items-slide ${isRight ? 'marquee-items-slide-right' : 'marquee-items-slide-left'}`}>
                {slice.map((item, index) => (
                  <MarqueeItem 
                    key={index}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                    trackIndexValue="B"
                    trackIndex={trackIndex.B}
                    index={index}
                    item={item}
                    noHoverEffect={noHoverEffect}
                  />
                ))}
              </div>
              <div className={`marquee-items-slide ${isRight ? 'marquee-items-slide-right' : 'marquee-items-slide-left'}`}>
                {slice.map((item, index) => (
                  <MarqueeItem 
                    key={index}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                    trackIndexValue="C"
                    trackIndex={trackIndex.C}
                    index={index}
                    item={item}
                    noHoverEffect={noHoverEffect}
                  />
                ))}
              </div>
            </div>
        </div>
    </div>
  );
}
