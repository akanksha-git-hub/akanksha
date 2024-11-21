import React from 'react'
import RichText from './Texts/RichText'
import Image from 'next/image'
import { PrismicNextImage } from '@prismicio/next'
import PlayButtonLogo from "../../public/assets/play-symbol.svg"

export default function VideoModal({ slice, className, descriptionText }) {
  return (
    <div className={`w-2/4 relative ${className}`}>
        <PrismicNextImage 
            height={800}
            width={800}
            field={slice.primary.video_thumbnail_image}
            className="w-full h-auto object-cover z-0 rounded-md overflow-hidden"
            alt=""
        />
        <div className="absolute p-4 sm:p-8 flex items-end image-bg top-0 left-0 h-full w-full z-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-85 transition-all">
            <div className="flex items-center w-full justify-between">
                <div className='w-[70%]'>
                    <RichText 
                        className="text-white text-3xl 2xl:text-6xl w-[100%] font-ambit-regular"
                        text={slice.primary.video_thumbnail_title}
                    />
                    {descriptionText && (
                        <RichText 
                            className='text-white text-xl w-[80%] font-ambit-regular'
                            text={descriptionText}
                        />
                    )}
                </div>
                <div className="bg-bright-yellow h-[50px] w-[50px] sm:h-[90px] sm:w-[90px] flex items-center justify-center rounded-full">
                    <Image 
                        height={200}
                        width={200}
                        src={PlayButtonLogo}
                        alt=""
                        className="h-[50%] w-[50%] relative left-[2px] sm:left-1"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
