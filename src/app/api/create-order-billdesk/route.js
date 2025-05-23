// --- START OF FILE multi-step-form.js ---

import { useCallback, useState } from "react";
import Arrow from "../Arrow";
import StepA from "./step-A";
import StepC from "./step-C";
import StepB from "./step-B";
import Image from "next/image";
import Button from "../v2-components/buttons/button";

const INITIAL_STATE = {
  stepA: { isIndian: null },
  stepC: {
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    pin_code: "",
    pan_number: "",
  },
  stepB: { donate_to: "", heard_from: "" },
};

export default function MultiStepForm({ closeModal }) {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStepProgression = useCallback(
    async (value, action = "next") => {
      if (action === "back") {
        setStep((s) => Math.max(0, s - 1));
        setError(false);
        return;
      }

      if (step === 0) {
        if (value === null || typeof value === "undefined") {
          console.warn("Step 0: No selection made for 'Are you an Indian Passport Holder?'");
          return;
        }
        if (value === false) {
          setError(true);
          return;
        }
        setStepData((prev) => ({ ...prev, stepA: { isIndian: value } }));
        setError(false);
        setStep(1);
        return;
      }

      if (step === 1) {
        setStepData((prev) => ({ ...prev, stepC: value }));
        setStep(2);
        return;
      }

      if (step === 2) {
        const finalStepBData = value;
        const currentStepData = { ...stepData, stepB: finalStepBData };
        setStepData(currentStepData);

        const payloadToYourBackend = {
          stepA: currentStepData.stepA,
          stepC: currentStepData.stepC,
          stepB: currentStepData.stepB,
          user_agent: navigator.userAgent,
        };

        try {
          setLoading(true);
          const res = await fetch("/api/create-order-billdesk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadToYourBackend),
          });

          const serverResponseJson = await res.json();

          if (!res.ok) {
            alert(`Error from server: ${serverResponseJson.error}`);
            setLoading(false);
            return;
          }

          const redirectUrl = serverResponseJson?.redirect_url;
          const redirectParams = serverResponseJson?.parameters;

          if (redirectUrl && redirectParams) {
            const form = document.createElement("form");
            form.method = "POST";
            form.action = redirectUrl;
            form.style.display = "none";

            for (const key in redirectParams) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = redirectParams[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
          } else {
            console.error("Redirect URL or parameters missing:", serverResponseJson);
            alert("Could not proceed to payment. Please try again.");
            setLoading(false);
          }
        } catch (err) {
          console.error("Request to /api/create-order-billdesk failed:", err);
          alert("Something went wrong. Please try again.");
          setLoading(false);
        }
        return;
      }
    },
    [step, stepData]
  );

  const totalSteps = 3;
  const progressPercentage = (step / (totalSteps - 1)) * 100;

  let componentToRender = null;
  if (step === 0) componentToRender = <StepA handleStepProgression={handleStepProgression} />;
  else if (step === 1) componentToRender = <StepC handleStepProgression={handleStepProgression} />;
  else if (step === 2) componentToRender = <StepB handleStepProgression={handleStepProgression} />;

  return (
    <>
      {!error && (
        <div className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-between z-50 relative">
          <div className="w-[90%] sm:w-[70%] md:w-[60%] flex flex-col items-center p-6 mt-16 sm:mt-24">
            <div className="relative w-full bg-gray-300 h-1 rounded-full">
              <div className="absolute top-0 left-0 bg-black h-1 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progressPercentage}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                {["Indian?", "Contact Details", "Final Question"].map((label, idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    <span className={`absolute -top-12 sm:-top-16 text-sm sm:text-lg md:text-xl text-center transition-colors duration-300 ${step >= idx ? "text-black font-semibold" : "text-gray-400"}`}>{label}</span>
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-300 ${step >= idx ? "bg-black" : "bg-gray-300"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Image
            onClick={closeModal}
            className="absolute top-6 right-6 sm:top-12 sm:right-12 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={30}
            width={30}
            alt="Close"
          />

          <div className="opacity-anim h-full w-full flex items-center justify-center overflow-y-auto green-scroll-bar px-4 sm:px-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-center">
                <svg className="animate-spin h-12 w-12 text-deep-green mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-black text-xl sm:text-2xl">Connecting to payment gateway…</p>
                <p className="text-gray-600 text-sm mt-2">Please wait, do not refresh or press back.</p>
              </div>
            ) : (
              componentToRender
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-center z-50 relative p-6">
          <Image
            onClick={closeModal}
            className="absolute top-6 right-6 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={20}
            width={20}
            alt="Close"
          />
          <p className="text-black font-ambit-semibold text-2xl sm:text-3xl md:text-4xl text-center max-w-xl sm:max-w-2xl">
            Non-Indian passport holders, please write to
            <a href="mailto:fundraise@akanksha.org" className="text-deep-green underline ml-1">fundraise@akanksha.org</a>
            for donation inquiries.
          </p>
          <Button onClick={() => setError(false)} className="mt-8 bg-gray-200 text-black">Go Back</Button>
        
        </div>
      )}
    </>
  );
}
// --- END OF FILE multi-step-form.js ---
