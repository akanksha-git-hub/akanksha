import { useCallback, useState } from "react";
import Arrow from "../Arrow";
import StepA from "./step-A";
import StepC from "./step-C";
import StepB from "./step-B";
import Image from "next/image";
import Button from "../v2-components/buttons/button";

const INITIAL_STATE = {
  stepA: {
    isIndian: null,
  },
  stepB: {},
};

export default function MultiStepForm({ closeModal }) {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);

  let component;
  const totalSteps = 3; // Total number of steps in the form
  const progressPercentage = (step / (totalSteps - 1)) * 100;
  const handleStepProgression = useCallback(
    (value, action = "next") => {
      if (action === "back") {
        // Logic for going back a step
        if (step > 0) {
          setStep((prevState) => prevState - 1);
        }
        return; // Exit early for "back" action
      }

      // Logic for moving forward a step
      if (step === 0) {
        if (!value) {
          setError(() => true);
          return;
        } else {
          setStepData((prevState) => ({
            ...prevState,
            stepA: { isIndian: value },
          }));
          setStep((prevState) => prevState + 1);
        }
      }

      if (step === 1) {
        setStep((prevState) => prevState + 1);
        // todo logic for step 1...
        return;
      }

      setError(() => false);
    },
    [step]
  );

  if (step === 0) {
    component = (
      <StepA
        handleStepProgression={handleStepProgression}
        currentStep={step + 1} // Add 1 to make it 1-based
        totalSteps={3} // Update this to reflect the total number of steps
      />
    );
  }

  if (step === 1) {
    component = (
      <StepC
        currentStep={step + 1}
        totalSteps={3}
        handleStepProgression={handleStepProgression}
      />
    );
  } else if (step === 2) {
    component = (
      <StepB
        handleStepProgression={handleStepProgression}
        data={stepData.stepB.heardAbout}
        currentStep={step + 1} // Current step (1-based indexing)
        totalSteps={3} // Total steps in the form
      />
    );
  }
  return (
    <>
      {!error && (
        <div
          key={error}
          data-lenis-prevent
          className={`opacity-anim h-full w-full bg-white flex flex-col items-center justify-between z-50 relative`}
        >
          {/* <button
              className="  border bg-gray-400 text-black border-black transition-all 
                                     text-3xl rounded-full !py-6 !px-16"
            >
              Back
            </button> */}
          <div className="w-[60%] flex flex-col items-center p-6 mt-24">
            {/* Progress Bar */}
            <div className="relative w-full bg-gray-300 h-1 rounded-full">
              <div
                className="absolute top-0 left-0 bg-black h-1 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              ></div>

              {/* Dots and Labels */}
              <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
                {["Indian", "Contact Details", "Final Question"].map(
                  (label, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center  "
                    >
                      {/* Label */}
                      <span
                        className={`absolute -top-16 md:text-xl  text-lg text-center  ${
                          step >= index ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                      {/* Dot */}
                      <div
                        className={`w-4 h-4 rounded-full ${
                          step >= index ? "bg-black" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <Image
            onClick={closeModal}
            className="absolute top-12 right-12 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={30}
            width={30}
            alt="Close"
          />
          <div
            key={step}
            className={`opacity-anim h-full w-full flex items-center justify-center overflow-y-auto green-scroll-bar`}
          >
            {component}
          </div>
        </div>
      )}
      {error && (
        <div
          key={error}
          data-lenis-prevent
          className={`opacity-anim h-full w-full bg-white flex flex-col items-center justify-center z-50 relative`}
        >
          <Image
            onClick={closeModal}
            className="absolute top-6 right-6 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={20}
            width={20}
            alt="Close"
          />
          <p className="text-black font-ambit-semibold text-4xl text-center sm:w-[30ch] ">
            <span>Non-Indian citizens can write to</span>
            <a
              href="mailto:fundraise@akanksha.org"
              className="text-deep-green underline"
            >
              &nbsp;fundraise@akanksha.org
            </a>{" "}
            <span>for donations.</span>
          </p>
        </div>
      )}
    </>
  );
}

// abi.cherian@pumexinfotech.com
