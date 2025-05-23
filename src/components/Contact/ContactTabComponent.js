"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RichText from "../Texts/RichText";
import ContactInput from "./ContactInput";
import Button from "../v2-components/buttons/button";

export default function ContactTabComponent({ data }) {
  const [activeValue, setActiveValue] = useState(
    data[0].location.toLowerCase().replace(/\./g, "")
  );

  const backgroundImages = {
    mumbai: "/mumbai-bg.svg",
    pune: "/bangalore-bg.svg",
    us: "/delhi-bg.png",
    uk: "/hyderabad-bg.svg",
  };

  const normalizedActiveValue = activeValue.toLowerCase().replace(/\./g, "");
  const currentBgImage = backgroundImages[normalizedActiveValue] || "/default-bg.jpg";

  const uniqueSet = [
    ...new Set(
      data.map((item) => {
        const originalValue = item.location;
        const lowerCaseValue = item.location.toLowerCase().replace(/\./g, "");
        return { originalValue, lowerCaseValue };
      })
    ),
  ];

  const tabContent = data.filter(
    (item) => item.location.toLowerCase().replace(/\./g, "") === normalizedActiveValue
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const phone = form.get("phone");
    const message = form.get("message");
    const to = tabContent[0]?.email || "default@example.com";

    const subject = encodeURIComponent("New Contact Message");
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className=" lg:block hidden absolute top-80 left-4 w-[500px] h-[500px] opacity-80 -z-10">
        <Image
          src={currentBgImage}
          width={700}
          height={700}
          objectFit="contain"
          alt="Background"
          priority
        />
      </div>

      <ul className="flex md:justify-center flex-wrap gap-12 md:gap-24 2xl:gap-56 text-nowrap whitespace-nowrap overflow-x-hidden mt-24">
        {uniqueSet.map((item) => (
          <li
            onClick={() => setActiveValue(item.lowerCaseValue)}
            key={item.originalValue}
            className={`text-black font-ambit-regular text-3xl cursor-pointer transition-all hover:opacity-100 ${
              normalizedActiveValue === item.lowerCaseValue ? "opacity-100" : "opacity-45"
            }`}
          >
            {item.originalValue}
          </li>
        ))}
      </ul>

      <div className=" mt-8 md:mt-44 flex flex-col xl:flex-row items-start justify-between">
        <ul className="bg-[#FBDA1D] w-full mb-24 xl:mb-0 xl:w-fit p-6 rounded-[10px] relative">
          {tabContent.map((item) => (
            <li
              className="space-y-4 flex items-start justify-between xl:justify-normal xl:items-baseline flex-col"
              key={item.location}
            >
             
                <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                  <Image
                    src="/location-vector.svg"
                    height={12}
                    width={12}
                    alt="location"
                    className="h-[98%] w-[98%] object-contain"
                  />
                </span>
                <span className="w-[80%] xl:w-[28ch] font-ambit-regular text-deep-green leading-5">
                  {item.address}
                </span>
              

              {item.number && (
                <>                  <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                    <Image
                      src="/phone-vector.svg"
                      height={12}
                      width={12}
                      alt="phone"
                      className="h-[98%] w-[98%] object-contain"
                    />
                  </span>
                  <span className="w-[28ch] font-ambit-regular text-deep-green leading-5">
                    {item.number}
                  </span>
                  </>

              )}

            
                <span className="bg-deep-green h-12 w-12 rounded-full flex items-center justify-center p-2">
                  <Image
                    src="/mail-vector.svg"
                    height={12}
                    width={12}
                    alt="mail"
                    className="h-[98%] w-[98%] object-contain"
                  />
                </span>
                <span className="w-[28ch] font-ambit-regular text-deep-green leading-5">
                  {item.email}
                </span>
              
            </li>
          ))}

          {/* Yellow Dot */}
          <div className="absolute top-full left-2/4 -translate-x-2/4">
            <div className="border-[16px] border-[#FBDA1D] bg-transparent border-b-transparent border-l-transparent border-r-transparent relative">
              <div className="absolute bg-[#FBDA1D] h-4 w-4 rounded-full -bottom-8 left-2/4 -translate-x-2/4 z-20">
                <div className="h-full w-full relative rounded-full grid place-items-center">
                  <div className="h-[180%] w-[180%] rounded-full bg-[#FBDA1D] opacity-70 origin-center">
                    <div className="h-full w-full grid place-items-center relative">
                      <div className="origin-center h-[180%] w-[180%] bg-[#FBDA1D] opacity-55 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>

        <form
          className="bg-white w-full xl:w-[56%] 2xl:w-[62%] 3xl:w-[62%] rounded-[10px] overflow-hidden py-4 px-12 relative drop-shadow-xl"
          onSubmit={handleSubmit}
        >
          <RichText
            className="flex items-center justify-start text-black text-6xl font-ambit-regular mt-16"
            text="Talk With us"
          />
          <div className="flex flex-col md:flex-row justify-between w-full mt-12 space-y-12 md:space-y-0">
            <ContactInput label="First Name" name="firstName" className="w-full  md:w-[45%]" placeholder="John" />
            <ContactInput label="Last Name" name="lastName" className="w-full md:w-[45%]" placeholder="Doe" />
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full mt-12 space-y-12 md:space-y-0">
            <ContactInput label="Email Id" name="email" className="w-full md:w-[45%]" placeholder="johndoe@gmail.com" />
            <ContactInput label="Phone" name="phone" className="w-full md:w-[45%]" placeholder="+911203901" />
          </div>
          <ContactInput
            label="Message"
            name="message"
            className="w-full mt-12 z-10"
            variant="message"
            placeholder="Write your message..."
          />
          <div className="mt-12 mb-60 z-10">
            <Button type="submit">Send Message</Button>
          </div>
          <div className="absolute bottom-0 right-0 -z-0">
            <Image
              src="/contact-form-sun.svg"
              height={100}
              width={100}
              className="h-full w-full"
              alt=""
            />
          </div>
        </form>
      </div>
    </div>
  );
}
