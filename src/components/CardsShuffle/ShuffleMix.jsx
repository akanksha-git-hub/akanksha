'use client'
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardA from "@/components/v2-components/impact-card-shuffle/CardA";

import CardB from "@/components/v2-components/impact-card-shuffle/CardB";

// gsap.registerPlugin(ScrollTrigger);

// export default function ShufleMix({ data }) {
//   const [onMount, setOnMount] = useState({ firstMount: false, secondMount: false });
//   const [cards, setCards] = useState(data);
//   const root = useRef(null);
//   const frameCount = 1400;
//   let travelPixel;
//   travelPixel = (cards.length * 542);

//   useEffect(() => {
//     if (!onMount.firstMount) {
//       setOnMount((prevState) => ({ ...prevState, firstMount: true }));
//       return;
//     }

//     if (!onMount.secondMount) {
//         setCards((prevState) => {
//       const totalLength = prevState.length;
//       const occupyFramesPerItem = frameCount / totalLength;

//       let currentFrame = 0;
//       const newData = prevState.map((item, index) => {
//         const startFrame = currentFrame;
//         const endFrame = currentFrame + occupyFramesPerItem;

//         currentFrame = endFrame;

//         return {
//           ...item,
//           id: `card-${index + 1}`,
//           startFrame,
//           endFrame,
//         };
//       });

     
//       setOnMount((prevState) => ({ ...prevState, secondMount: true }));
//       return newData;
//         });
//     }
//     if (onMount.secondMount ) {
      

//       gsap.set('.pin-wrapper', { height: 'auto' });

//       cards.forEach((card, index) => {
//         if(index !== 0) {
//             if(index === 1) {
//                 gsap.set(`#${card.id}`, { translateY: '10%', translateZ: '100px', scale: 0.9});
//             } else {
//                 gsap.set(`#${card.id}`, { translateY: '10%', translateZ: '90px', scale: 0.9});
//             }
//         } else {
//             gsap.set(`#${card.id}`, { translateY: '0%', translateZ: '120px' });
//         }
//     });

//       let ctx = gsap.context(() => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: root.current,
//             scrub: 2,
//             start: 'top top',
//             end: `+=${travelPixel} center`,
//             pin: true,
//             pinSpacing: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//             scroller: 'body',
//             markers:true,
//           },
//         });

//         cards.forEach((card, i) => {
//           const currentCard = i + 1;
//           const cardLength = cards.length;

//           tl.to(currentCard !== cardLength &&`#${card.id}`, { translateY: '-86%', translateZ: '120px', duration: 3.5, ease: 'sine.in' })
//           .to(currentCard !== cardLength &&`#${card.id}`, { scale: 0.9, duration: 3.5, ease: 'sine.in' })
//           .to(currentCard !== cardLength &&`#${card.id}`, { translateZ: '-100px' })
//           .to((currentCard !== cardLength) && (currentCard <= cardLength) && `#card-${i + 2}`, { translateZ: '130px' })
//           .to((currentCard !== cardLength) && (currentCard < cardLength) && `#card-${i + 3}`, { translateZ: '120px' })
//           .to((currentCard !== cardLength) && (currentCard <= cardLength) && `#card-${i+ 2}`, { translateY: '10%', scale: 1, duration: 3.5, ease: 'sine.in' })
//           .to((currentCard !== cardLength) &&`#${card.id}`, { translateY: '10%', duration: 3.5, scale: 0.9, ease: 'sine.in' })

//       });

//         ScrollTrigger.refresh();
//       });

//       return () => ctx.revert();
//     }
//   }, [onMount.firstMount, onMount.secondMount, cards]);

//   return (
//     <div className="pin-wrapper">
//       <div ref={root}>
//         <ul className="card-container mx-auto">
//           {data.map((item, index) => (
//             <li key={index} id={`card-${index + 1}`} className="pers-cards">
//               {index % 2 === 0 ? ( // Render A for even indices, B for odd
//                 <CardA item={item} />
//               ) : (
//                 <CardB item={item} />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import CardsShuffle from './CardsShuffle';

export default function ShuffleMix({ slice }) {

  
  return (
    
    <CardsShuffle slice={slice}>
        <CardsShuffle.ItemContainer 
            itemsContainerClassName="card-container mx-auto"
            itemClassName='pers-cards'
            itemKeyFn={(item, index) => index}
        >
            {(item, index) => {

              let component;

              if(index===0){

                component = <CardA item ={item}/>
    
              }
            else{

              component = <CardB item ={item}/>
            
            }
            return component;
            }
             
        
            
            }
        </CardsShuffle.ItemContainer>
    </CardsShuffle>
  )
}
