'use client'
import Lottie from "lottie-react"
import { useEffect, useRef, useState } from "react";

export default function LottieContainer({ lottieData, className }) {

    const [onMount, setOnMount] = useState(false);
    const root = useRef();
    const lRef = useRef();

    let LottieData = null;
    if(lottieData) LottieData = JSON.parse(lottieData);

    useEffect(() => {

        if(!onMount) {
            setOnMount(() => true);
            return;
        }
        lRef.current.stop();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    lRef.current.play();
                    observer.disconnect(root.current);
                }
            })
        }, { threshold: 0.5 });
        observer.observe(root.current);

    }, [onMount]);

  return (
        <div ref={root}>
            <Lottie 
                lottieRef={lRef}
                className={className}
                animationData={LottieData}
                loop={false}
            />
        </div>
  )
}
