'use client'
import { forwardRef } from "react";
import { useSwiper } from "swiper/react";

const SwiperClick = forwardRef(function SwiperClick({text, isPrev, className}, ref) {
    
  const swiper = useSwiper();

  return (
    <p className={className} onClick={() => isPrev ? swiper.slidePrev() : swiper.slideNext()} ref={ref}>
      {text}
    </p>
  )
});

export default SwiperClick;
