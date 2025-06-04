// --- START OF FILE multi-step-form.js ---

import { useCallback, useState } from "react";
import Arrow from "../Arrow"; // Assuming this is still used elsewhere or can be removed if not
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

export default function MultiStepForm({ closeModal, donationAmount }) {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false); // This 'error' state is for the "Non-Indian" message
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null); 

  const handleStepProgression = useCallback(
    async (value, action = "next") => {
      setPaymentError(null); // Clear previous payment errors on new action

      if (action === "back") {
        setStep((s) => Math.max(0, s - 1));
        setError(false);
        return;
      }

      if (step === 0) {
        // ... (existing logic for step 0)
        if (value === null || typeof value === "undefined") {
          console.warn("No selection made for 'Are you an Indian Passport Holder?'");
          return;
        }
        if (value === false) {
          setError(true); // This sets the non-Indian error message
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
          amount: donationAmount,
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
            // Use serverResponseJson.details?.message for more specific BillDesk errors if available
            const errorMessage = serverResponseJson.error || "An error occurred with the payment gateway.";
            const detailMessage = serverResponseJson.details?.message || serverResponseJson.details || "";
            setPaymentError(`${errorMessage}${detailMessage ? " Details: " + detailMessage : ""}`);
            setLoading(false);
            return;
          }

          const redirectUrl = serverResponseJson?.redirect_url;
          const redirectParams = serverResponseJson?.parameters;

          if (redirectUrl && redirectParams) {
            // ... (existing form creation logic for redirect) ...
            const fieldMap = {
              mercid: "merchantid",
              bdorderid: "bdorderid",
              rdata: "rdata"
            };

            const form = document.createElement("form");
            form.method = "POST";
            form.action = redirectUrl;
            form.style.display = "none";

            for (const key in fieldMap) {
              if (redirectParams[key]) { // Check if param exists
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = fieldMap[key];
                input.value = redirectParams[key];
                form.appendChild(input);
              } else {
                console.warn(`Missing expected parameter '${key}' for BillDesk redirect.`);
                // Optionally handle this more gracefully, though BillDesk should always send required params
              }
            }
            document.body.appendChild(form);
            form.submit();
            // setLoading(false) is not strictly needed here as the page will navigate away
            // but if submit fails for some browser reason, it might be good to have a timeout to reset it.
          } else {
            console.error("Missing redirect info from BillDesk response", serverResponseJson);
            setPaymentError("Could not prepare payment. Required information was missing. Please try again or contact support.");
            setLoading(false);
          }
        } catch (err) {
          console.error("Request to /api/create-order-billdesk failed:", err);
          setPaymentError("A network error occurred while trying to initiate payment. Please check your connection and try again.");
          setLoading(false);
        }
        return;
      }
    },
    [step, stepData, donationAmount]
  );

  const totalSteps = 3;
  const progressPercentage = (step / (totalSteps - 1)) * 100;

  let componentToRender = null;
  if (step === 0) componentToRender = <StepA handleStepProgression={handleStepProgression} />;
  else if (step === 1) componentToRender = <StepC handleStepProgression={handleStepProgression} />;
  else if (step === 2) componentToRender = <StepB handleStepProgression={handleStepProgression} />;

  return (
    <>
      {!error && ( // This 'error' is for the non-Indian message
        <div className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-between z-50 relative">
          {/* ... (progress bar and close button) ... */}
           <Image
            onClick={closeModal}
            className="absolute top-6 right-6 sm:top-12 sm:right-12 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={30}
            width={30}
            alt="Close"
          />

          <div data-lenis-prevent className="opacity-anim h-full w-full flex items-center justify-center overflow-y-auto green-scroll-bar px-4 sm:px-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-center">
                {/* ... (loading spinner) ... */}
                 <svg className="animate-spin h-12 w-12 text-black mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-black text-xl sm:text-2xl">Connecting to payment gateway…</p>
                <p className="text-gray-600 text-sm mt-2">Please wait, do not refresh or press back.</p>
              </div>
            ) : paymentError ? ( // <<< DISPLAY PAYMENT ERROR
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Image src="/error-icon.png" alt="Error" width={60} height={60} className="mb-4" /> {/* Replace with an actual error icon */}
                <p className="text-red-600 font-semibold text-xl mb-2">Payment Error</p>
                <p className="text-gray-700 mb-6 max-w-md">{paymentError}</p>
                <Button
                  onClick={() => {
                    setPaymentError(null);
                    
                  }}
                  className="bg-gray-200 text-black"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              componentToRender
            )}
          </div>
        </div>
      )}

      {error && ( // This 'error' is for the non-Indian message
        <div data-lenis-prevent className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-center z-50 relative p-6">
         
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
            <a href="mailto:fundraise@akanksha.org" className="text-black underline ml-1">
              fundraise@akanksha.org
            </a>{" "}
            for donation inquiries.
          </p>
      
        </div>
      )}
    </>
  );
}
// --- END OF FILE multi-step-form.js ---