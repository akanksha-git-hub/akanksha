"use client";
import { useCallback, useState } from "react";
import RichText from "./Texts/RichText";
import Link from "next/link";
import CTA from "./UI/Button/CTA";
import {
  createCashFreeOrder,
  createSubscription,
} from "@/services/cashfree/action";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter } from "next/navigation";
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
  // const router = useRouter();
  const { stopScroll, startScroll, lenisRef } = useSmoothScroller();
  const [active, setActive] = useState(INITIAL_STATE);
  const [open, setOpen] = useState(false);
  const isDisabled = active.amountSelector.amount === null;

  const openModal = () => {
    setOpen(() => true);
    document.body.style.overflow = "hidden";
    stopScroll();
  };
  const closeModal = () => {
    setOpen(() => false);
    if (lenisRef) startScroll();
    document.body.style.overflow = "none";
  };

  // Memoized amount selector
  const handleSelectAmount = useCallback((amount, amountIndex) => {
    setActive((prevState) => ({
      ...prevState,
      amountSelector: { amount, amountIndex },
    }));
  }, []);

  // Memoized type selector
  const handleSelectType = useCallback((index, type) => {
    setActive((prevState) => {
      let isOneTime = type === "One Time";
      return {
        ...prevState,
        type: { index, isOneTime },
        amountSelector: { amount: null, amountIndex: null }, // Reset amount when type changes
      };
    });
  }, []);

  // One-time donation handler
  // const handleDonateOneTime = useCallback(async (e) => {
  //     e.preventDefault();

  //     if (active.amountSelector.amount === null) return; // Handle null amount

  //     const cashFreeResponse = await createCashFreeOrder(active.amountSelector.amount);

  //     if (cashFreeResponse) {
  //         const cashfree = await load({ mode: 'sandbox' });

  //         let checkoutOptions = {
  //             paymentSessionId: cashFreeResponse.paymentSessionId,
  //             redirectTarget: '_blank',
  //             paymentMethod: cashFreeResponse.paymentMethod
  //         }

  //         cashfree.checkout(checkoutOptions).then((result) => {
  //             if(result.error){
  //                 // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
  //                 console.log("User has closed the popup or there is some payment error, Check for Payment Status");
  //                 console.log(result.error);
  //             }
  //             if(result.redirect){
  //                 // This will be true when the payment redirection page couldnt be opened in the same window
  //                 // This is an exceptional case only when the page is opened inside an inAppBrowser
  //                 // In this case the customer will be redirected to return url once payment is completed
  //                 console.log("Payment will be redirected");
  //             }
  //             if(result.paymentDetails){
  //                 // This will be called whenever the payment is completed irrespective of transaction status

  //                 // router.push(`${cashFreeOrderData.returnUrl}?order_id=${cashFreeOrderData?.orderId}`);
  //                 console.log("Payment has been completed, Check for Payment Status");
  //                 console.log(result.paymentDetails.paymentMessage);
  //             }
  //         });
  //     }
  // }, [active.amountSelector.amount]);

  // // Monthly donation handler
  // const handleDonateMonthly = useCallback(async (e) => {
  //     e.preventDefault();
  //     setActive((prevState) => ({ ...prevState, loading: true }));

  //     const response = await createSubscription(100); // Default to ₹100 for monthly
  //     if (response) router.push(response.data.authLink);
  // }, [router]);

  return (
    <>
      <div className="donation-component bg-[#F7F7F7] rounded-[4px] w-full   z-20 flex flex-col xl:flex-row items-center justify-between p-6 custom-shadow h-auto relative  ">
        <Image
          className="w-[98%] h-[15px] absolute top-0 "
          src="/quote-side-up.png"
          width={1200}
          s
          height={10}
          alt="Quote side up"
        />
 <div className="mt-10 xl:mt-0 xl:block xl:w-[50%] ">
          <PrismicNextImage
            field={data.image}
            alt=""
            height={1200}
            width={1200}
            className="min-h-[300px] xl:min-h-[575px] w-full object-cover z-0 rounded-md overflow-hidden "
          />
        </div>
        <div className="flex flex-col items-center justify-centerxl:w-[50%]  ">
          <div className="w-[90%]">
            {/* Title */}
            <RichText
              text={data.title}
              className="font-ambit-regular text-black text-xl xl:text-4xl flex items-center justify-center py-8"
            />
            {/* Selector */}
            <ul className="flex items-center space-y-4 xl:space-y-0 xl:gap-2 justify-between flex-wrap pb-6 w-full border-b border-gray-300">
              {types.map((type, index) => {
                return (
                  <li
                    key={type}
                    onClick={() => handleSelectType(index, type)}
                    className={`flex cursor-pointer items-center justify-center w-full xl:w-[48%] gap-2 px-4 py-3 rounded-md ${active.type.index === index ? "bg-bright-yellow" : "border border-black"} custom-bezier`}
                  >
                    <div
                      className={`${active.type.index === index ? "bg-white" : "bg-[#D9D9D9]"} custom-bezier h-10 w-10 rounded-full items-center justify-center flex flex-col text-3xl`}
                    >₹</div>
                    <RichText
                      text={type}
                      className="font-ambit text-black text-xl"
                    />
                  </li>
                );
              })}
            </ul>
            {/* Donation Selector */}
            <div className="py-4">
              <RichText
                text="Donation Amount"
                className="font-ambit-regular text-gray-700 text-base"
              />
              {/* Amount Selector */}
              {active.type.isOneTime ? (
                data.one_time_amounts && (
                  <ul className="flex flex-wrap justify-between mt-2">
                    {data.one_time_amounts.map((amount, index) => {
                      return (
                        <li
                          key={amount.one_time_amount}
                          onClick={() =>
                            handleSelectAmount(amount.one_time_amount, index)
                          }
                          className={`cursor-pointer w-[45%] xl:w-[120px] 2xl:w-[153.3px] mb-3 h-[53px] grid place-items-center hover:opacity-90 active:scale-95 rounded-md custom-bezier ${active.amountSelector.amountIndex === index ? "bg-bright-yellow" : "border border-black"}`}
                        >
                          <p className="text-black text-base font-ambit-regular">
                            ₹ {formatNumber(amount.one_time_amount)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )
              ) : (
                <ul className="flex flex-wrap justify-between mt-2">
                  <li
                    onClick={() => handleSelectAmount(100, null)}
                    className={`cursor-pointer w-[45%] xl:w-[120px] 2xl:w-[153.3px] mb-3 h-[53px] grid place-items-center hover:opacity-90 active:scale-95 rounded-md custom-bezier bg-bright-yellow`}
                  >
                    <p className="text-black text-base font-ambit-regular">
                      ₹{formatNumber(100)}
                    </p>
                  </li>
                </ul>
              )}
            </div>
            {/* Amount Display */}
            <div className="border-2 rounded-[4px] border-[#DADCDB] w-full py-4 px-10 flex items-center justify-between">
              <p className="font-ambit-regular text-black text-4xl select-none">
                ₹ {formatNumber(active.amountSelector.amount)}
              </p>
              <p className="font-ambit-regular text-black text-lg select-none">
                INR
              </p>
            </div>
            {/* <CTA 
                text={active.loading ? 'Loading...' : "Donate and Support"}
                className={`w-full !text-xl !py-6 mt-6 font-ambit-regular ${isDisabled && ('hover:opacity-60 hover:bg-deep-green hover:text-cream hover:!scale-100 active:scale-95 opacity-60')}`}
                disabled={isDisabled}
                // onClick={
                //     active.type.isOneTime ? handleDonateOneTime : handleDonateMonthly
                // }
                onClick={openModal}
            /> */}

            {/* <div className="mt-2">
                <Link href="">
                    <p className="relative text-[#9A9A9A] font-ambit-regular w-fit mx-auto flex items-center justify-center hover:opacity-85 custom-bezier active:scale-95">
                        <u>Are you a foreign citizen?</u>
                    </p>
                </Link>
                </div> */}
          </div>

          <div className="">
            <Button
              className={` !py-6 !px-6 xl:!px-48 mt-6  !text-base md:!text-xl ${
                isDisabled &&
                "hover:opacity-60 hover:bg-black hover:text-cream hover:!scale-100 active:scale-95 cursor-not-allowed"
              }`}
              disabled={isDisabled}
              onClick={openModal}
            >
              {active.loading ? "Loading..." : "Make a Difference"}
            </Button>
          </div>
          {/* Whatsapp Link */}
           <a href=" https://wa.me/9446442831?text=I'm%20interested" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-row items-center justify-center mt-6 space-x-2">
           
            <Image src="/whatsapp.svg" className="w-14 h-14" 
            height={10}
            width={10}
            />
          <p className="font-ambit-regular underline text-lg " >Reach out for assistance</p>
          
          </div>
          </a>
        </div>
        <div>

        <Image
  src="/planet.svg" 
  alt="Descriptive Alt Text"
  height={200}
  width={200}
  className="absolute xl:block hidden -translate-x-20 top-12"
/>
          </div>
       
      </div>
      <Modal open={open}>
        <MultiStepForm closeModal={closeModal} />
      </Modal>
    </>
  );
}

const formatNumber = (num) => {
  // Ensure the input is a number
  const parsedNum = Number(num);

  // Check if the parsed number is greater than or equal to 1000
  if (parsedNum >= 1000) {
    return parsedNum.toLocaleString();
  }
  return num; // If less than 1000, return the original number
};
