'use client'

import { useState } from "react"

export default function Floating({ floatData }) {

    const [active, setActive] = useState(false);

    const handleToggle = () => setActive(prevState => !prevState);

    const handleClick = (e) => {
        e.preventDefault();
        document.querySelector('.donation-component').scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <div onClick={handleToggle} className={`fixed bottom-36 right-2 md:right-12 flex items-center custom-shadow custom-bezier ${active ? 'w-[320px] bg-white justify-end h-[100px]' : 'w-[80px] h-[120px] justify-center bg-bright-yellow'} rounded-md cursor-pointer overflow-hidden active:scale-95 z-20`}>
        {
            active ? 
            <>
                <div className="flex items-center gap-2 floating-border-A opacity-anim border-r-2 border-gray-300 h-full">
                    <p className="text-3xl">❤️</p>
                    <p className="w-[15ch] leading-4 font-ambit-regular">{floatData.text}</p>
                </div>
                <div className="font-ambit-regular space-y-2 opacity-anim text-nowrap">
                    <p onClick={handleClick} className="border-b-2 border-gray-300 w-full py-2 pl-2">{floatData.text_yes}</p>
                    <p className="py-2 pl-2 pr-2">{floatData.text_no}</p>
                </div>
            </>
            :
            <p className="text-4xl opacity-anim">❤️</p>            
        }
    </div>
  )
}
