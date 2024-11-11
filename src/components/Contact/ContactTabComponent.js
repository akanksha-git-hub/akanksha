'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RichText from "../Texts/RichText";
import ContactInput from "./ContactInput";
import CTA from "../UI/Button/CTA";

export default function ContactTabComponent({ data }) {


    const [activeValue, setActiveValue] = useState(data[0].location.toLowerCase());

    const uniqueSet = [...new Set(data.map(item => {

        const originalValue = item.location;
        const lowerCaseValue = item.location.toLowerCase();
        
        return { originalValue, lowerCaseValue };
    }))];

    const tabContent = data
                        .filter(item =>  {
                            const lowerCaseValue = item.location.toLowerCase();
                            const matchData = lowerCaseValue === activeValue;
                            return matchData;
                        });


  return (
    <div>
        <ul
            className="flex md:justify-center md:flex-wrap gap-24 2xl:gap-56 text-nowrap whitespace-nowrap overflow-x-scroll md:overflow-x-hidden mt-24"
        >
            {uniqueSet.map(item => (
                <li 
                    onClick={() => setActiveValue(() => item.lowerCaseValue)}
                    key={item.originalValue}
                    className={`text-deep-green font-ambit-regular text-3xl cursor-pointer transition-all hover:opacity-100 ${activeValue === item.lowerCaseValue ? 'opacity-100' : 'opacity-45'}`}
                >
                    {item.originalValue}
                </li>
            ))}
        </ul>
        <div className="mt-44 flex flex-col xl:flex-row items-start justify-between">
            <ul className="bg-white w-full xl:w-fit p-6 rounded-[10px] space-y-4">
                {tabContent.map((item) => {

                    return(
                        <li
                            className="space-y-4" 
                            key={item.location}
                        >
                            <Link className="flex items-center gap-4" href='https://google.com/' target="_blank">
                                <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                                    <Image 
                                        src='/location-vector.svg'
                                        height={12}
                                        width={12}
                                        alt="location"
                                        className="h-[98%] w-[98%] object-contain"
                                    />
                                </span>
                                <span className="w-[28ch] font-ambit-regular text-deep-green leading-5">
                                    {item.address}
                                </span>
                            </Link>
                            {item.number && (
                                <Link className="flex items-center gap-4" href='https://google.com/' target="_blank">
                                    <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                                        <Image 
                                            src='/phone-vector.svg'
                                            height={12}
                                            width={12}
                                            alt="location"
                                            className="h-[98%] w-[98%] object-contain"
                                        />
                                    </span>
                                    <span className="w-[28ch] font-ambit-regular text-deep-green leading-5">
                                        {item.number}
                                    </span>
                                </Link>
                            )}
                            <Link className="flex items-center gap-4" href='https://google.com/' target="_blank">
                                <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                                    <Image 
                                        src='/mail-vector.svg'
                                        height={12}
                                        width={12}
                                        alt="location"
                                        className="h-[98%] w-[98%] object-contain"
                                    />
                                </span>
                                <span className="w-[28ch] font-ambit-regular text-deep-green leading-5">
                                    {item.email}
                                </span>
                            </Link>
                        </li>       
                    )
                })}
            </ul>
            <form className="bg-white w-full xl:w-[56%] 2xl:w-[52%] 3xl:w-[62%] rounded-[10px] overflow-hidden py-4 px-12 relative">
                <RichText 
                    className='flex items-center justify-start text-deep-green text-6xl font-ambit-regular mt-16'
                    text="Let's talk with us"
                />
                <div className="flex justify-between w-full mt-12">
                    <ContactInput 
                        label='First Name'
                        className='w-[45%]'
                        placeholder='John'
                    />
                    <ContactInput 
                        label='Last Name'
                        className='w-[45%]'
                        placeholder='Doe'
                    />
                </div>
                <div className="flex justify-between w-full mt-12">
                    <ContactInput 
                        label='Email Id'
                        className='w-[45%]'
                        placeholder="johndoe@gmail.com"
                    />
                    <ContactInput 
                        label='Phone'
                        className='w-[45%]'
                        placeholder="+911203901"
                    />
                </div>
                <ContactInput 
                    label='Message'
                    className='w-full mt-12 z-10'
                    variant="message"
                    placeholder="Write your message..."
                />
                <div className="mt-12 mb-60 z-10">
                    <CTA 
                        text='Send message'
                    />
                </div>
                <div className="absolute bottom-0 right-0 -z-0">
                    <Image 
                        src='/contact-form-sun.svg'
                        height={100}
                        width={100}
                        className="h-full w-full"
                        alt=""
                    />
                </div>
            </form>
        </div>
    </div>
  )
}
