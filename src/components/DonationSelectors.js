"use client";

import { useCallback, useState, useEffect } from "react";
import RichText from "./Texts/RichText";
import CTA from "./UI/Button/CTA";
import { Modal } from "./modal";
import MultiStepForm from "./Multi-StepForm/multi-step-form";
import { useSmoothScroller } from "./LenisScrollContext";
import Button from "./v2-components/buttons/button";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

const INITIAL_STATE = {
  type: {
    index: 0,
    isOneTime: true,
  },
  amountSelector: {
    amount: null,
    amountIndex: null,
  },
  loading: false,
};

const types = ["One Time", "Monthly"];

export default function DonationSelectors({ data }) {
  const { stopScroll, startScroll, lenisRef } = useSmoothScroller();
  const [active, setActive] = useState(INITIAL_STATE);
  const [open, setOpen] = useState(false);
  const isDisabled = active.amountSelector.amount === null;

  // ✅ Modal scroll locking with SSR-safe useEffect
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (open) {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `-${scrollY}px`);
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      stopScroll();
    } else {
      const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      window.scrollTo(0, -parseInt(scrollY || "0"));
      startScroll();
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      startScroll();
    };
  }, [open, stopScroll, startScroll]);

  const handleSelectAmount = useCallback((amount, amountIndex) => {
    setActive((prevState) => ({
      ...prevState,
      amountSelector: { amount, amountIndex },
    }));
  }, []);

  const handleSelectType = useCallback((index, type) => {
    let isOneTime = type === "One Time";
    setActive({
      type: { index, isOneTime },
      amountSelector: { amount: null, amountIndex: null },
    });
  }, []);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <div className="donation-component bg-[#F7F7F7] rounded-[4px] w-full z-20 flex flex-col xl:flex-row items-center justify-between p-6 custom-shadow h-auto relative">
        <Image
          className="w-[98%] h-[15px] absolute top-0"
          src="/quote-side-up.png"
          width={1200}
          height={10}
          alt="Quote side up"
        />

        {/* Left Image */}
        <div className="mt-10 xl:mt-0 xl:block xl:w-[50%]">
          <PrismicNextImage
            field={data.image}
            alt=""
            height={1200}
            width={1200}
            className="min-h-[300px] xl:min-h-[575px] w-full object-cover z-0 rounded-md overflow-hidden"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col items-center justify-center xl:w-[50%]">
          <div className="w-[90%]">
            <RichText
              text={data.title}
              className="font-ambit-regular text-black text-xl xl:text-4xl flex items-center justify-center py-8"
            />

            {/* Type Selector */}
            <ul className="flex items-center space-y-4 xl:space-y-0 xl:gap-2 justify-between flex-wrap pb-6 w-full border-b border-gray-300">
              {types.map((type, index) => (
                <li
                  key={type}
                  onClick={() => handleSelectType(index, type)}
                  className={`flex cursor-pointer items-center justify-center w-full xl:w-[48%] gap-2 px-4 py-3 rounded-md ${
                    active.type.index === index ? "bg-bright-yellow" : "border border-black"
                  }`}
                >
                  <div
                    className={`${
                      active.type.index === index ? "bg-white" : "bg-[#D9D9D9]"
                    } h-10 w-10 rounded-full grid place-items-center text-3xl`}
                  >
                    ₹
                  </div>
                  <RichText text={type} className="font-ambit text-black text-xl" />
                </li>
              ))}
            </ul>

            {/* Amount Selector */}
            <div className="py-4">
              <RichText
                text="Donation Amount"
                className="font-ambit-regular text-gray-700 text-base"
              />
              {active.type.isOneTime ? (
                <ul className="flex flex-wrap justify-between mt-2">
                  {data.one_time_amounts.map((amount, index) => (
                    <li
                      key={amount.one_time_amount}
                      onClick={() => handleSelectAmount(amount.one_time_amount, index)}
                      className={`cursor-pointer w-[45%] xl:w-[120px] 2xl:w-[153.3px] mb-3 h-[53px] grid place-items-center rounded-md ${
                        active.amountSelector.amountIndex === index
                          ? "bg-bright-yellow"
                          : "border border-black"
                      }`}
                    >
                      <p className="text-black text-base font-ambit-regular">
                        ₹ {formatNumber(amount.one_time_amount)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-wrap justify-between mt-2">
                  <li
                    onClick={() => handleSelectAmount(100, null)}
                    className="cursor-pointer w-[45%] xl:w-[120px] 2xl:w-[153.3px] mb-3 h-[53px] grid place-items-center rounded-md bg-bright-yellow"
                  >
                    <p className="text-black text-base font-ambit-regular">₹{formatNumber(100)}</p>
                  </li>
                </ul>
              )}
            </div>

            {/* Display Amount */}
            <div className="border-2 rounded-[4px] border-[#DADCDB] w-full py-4 px-10 flex items-center justify-between">
              <p className="font-ambit-regular text-black text-2xl md:text-4xl select-none">
                ₹ {formatNumber(active.amountSelector.amount)}
              </p>
              <p className="font-ambit-regular text-black text-lg select-none">INR</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="">
            <Button
              className={` !py-4 !px-4 xl:!px-48 mt-6 !text-base md:!text-xl ${
                isDisabled &&
                "hover:opacity-60 hover:bg-black hover:text-cream hover:!scale-100 active:scale-95 cursor-not-allowed"
              }`}
              disabled={isDisabled}
              onClick={openModal}
            >
              {active.loading ? "Loading..." : "Make a Difference"}
            </Button>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/9446442831?text=I'm%20interested"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex flex-row items-center justify-center mt-6 space-x-2">
              <Image src="/whatsapp.svg" className="w-14 h-14" height={10} width={10} alt="" />
              <p className="font-ambit-regular underline text-lg">Reach out for assistance</p>
            </div>
          </a>
        </div>

        {/* Planet Image */}
        <Image
          src="/planet.svg"
          alt="Descriptive Alt Text"
          height={200}
          width={200}
          className="absolute xl:block hidden -translate-x-20 top-12"
        />
      </div>

      {/* Modal */}
      <Modal open={open}>
        <MultiStepForm closeModal={closeModal} />
      </Modal>
    </>
  );
}

const formatNumber = (num) => {
  const parsedNum = Number(num);
  return parsedNum >= 1000 ? parsedNum.toLocaleString() : num;
};
