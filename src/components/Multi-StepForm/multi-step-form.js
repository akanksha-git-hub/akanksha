// --- START OF FILE multi-step-form.js ---

import { useCallback, useState } from "react";
import Arrow from "../Arrow"; // Assuming this path is correct
import StepA from "./step-A";
import StepC from "./step-C";
import StepB from "./step-B";
import Image from "next/image";
import Button from "../v2-components/buttons/button"; // Assuming this path is correct

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
  // amount: "299.00", // Default or could be set by user
};

export default function MultiStepForm({ closeModal }) {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false); // For non-Indian citizen error
  const [loading, setLoading] = useState(false);

  const handleStepProgression = useCallback(
    async (value, action = "next") => {
      if (action === "back") {
        setStep((s) => Math.max(0, s - 1));
        setError(false);
        return;
      }

      if (step === 0) {
        if (value === null || typeof value === 'undefined') {
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
        setStepData((prev) => ({ ...prev, stepB: finalStepBData }));

        const payloadToYourBackend = {
          stepA: stepData.stepA,
          stepC: stepData.stepC,
          stepB: finalStepBData,
          // Assuming 'amount' is fixed for now as per your backend default
          // If amount is dynamic, get it from state:
          // amount: stepData.amount || '299.00',
          user_agent: navigator.userAgent,
        };
        
        console.log("[Frontend] Payload to be sent to /api/create-order-billdesk:", payloadToYourBackend);

        try {
          setLoading(true);

          const res = await fetch("/api/create-order-billdesk", { // Your backend API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadToYourBackend),
          });

          const serverResponseJson = await res.json();
          console.log("[Frontend] Response from our server (/api/create-order-billdesk):", serverResponseJson);

          if (!res.ok) {
            console.error("Error from our server:", serverResponseJson);
            alert(`Error: ${serverResponseJson.error} - ${serverResponseJson.details?.message || serverResponseJson.details || 'Unknown error from server'}`);
            setLoading(false);
            return;
          }
          
          const originalRequestJwt = serverResponseJson?.jwt; // The JWS your server created
          const billdeskOrderData = serverResponseJson?.billdesk_response; // The decoded payload from BillDesk's response

          if (originalRequestJwt && billdeskOrderData && billdeskOrderData.next_step === 'redirect' && billdeskOrderData.links) {
            const redirectLinkInfo = billdeskOrderData.links.find(
              (link) => link.rel === 'redirect' && link.method === 'POST'
            );

            if (redirectLinkInfo && redirectLinkInfo.href) {
              console.log("[Frontend] Preparing to POST to BillDesk embeddedsdk.");
              console.log("[Frontend] Redirect Link Info from BillDesk:", redirectLinkInfo);

              const form = document.createElement("form");
              form.method = redirectLinkInfo.method; // Should be 'POST'
              form.action = redirectLinkInfo.href;   // BillDesk redirect URL
              form.style.display = 'none';           // Hide the form

              // 1. Add the primary JWS token (original request JWS)
              const jwtInput = document.createElement("input");
              jwtInput.type = "hidden";
              // Parameter name for the JWS token itself, usually 'bdpg_request_jwt'
              // VERIFY THIS NAME if issues persist. The BillDesk sample or docs might clarify.
              jwtInput.name = "bdpg_request_jwt";
              jwtInput.value = originalRequestJwt;
              form.appendChild(jwtInput);
              console.log(`[Frontend] Added to form: name=bdpg_request_jwt, value=${originalRequestJwt.substring(0,30)}...`);


              // 2. Add any additional parameters provided by BillDesk in redirectLinkInfo.parameters
              if (redirectLinkInfo.parameters && typeof redirectLinkInfo.parameters === 'object' && Object.keys(redirectLinkInfo.parameters).length > 0) {
                console.log("[Frontend] Adding additional parameters to form from BillDesk response:", redirectLinkInfo.parameters);
                for (const key in redirectLinkInfo.parameters) {
                  if (Object.hasOwnProperty.call(redirectLinkInfo.parameters, key)) {
                    const paramInput = document.createElement('input');
                    paramInput.type = 'hidden';
                    paramInput.name = key; // Use the key from BillDesk's parameters object
                    paramInput.value = redirectLinkInfo.parameters[key];
                    form.appendChild(paramInput);
                    console.log(`[Frontend] Added to form: name=${key}, value=${redirectLinkInfo.parameters[key]}`);
                  }
                }
              } else {
                console.log("[Frontend] No additional parameters received from BillDesk for the embeddedsdk POST.");
              }

              document.body.appendChild(form);

              // 3. Handle potential custom headers suggested by BillDesk
              // Standard HTML form submissions (form.submit()) CANNOT send custom HTTP headers.
              // If BillDesk *requires* custom headers for this POST to embeddedsdk,
              // this `form.submit()` approach will fail to send them.
              if (redirectLinkInfo.headers && typeof redirectLinkInfo.headers === 'object' && Object.keys(redirectLinkInfo.headers).length > 0) {
                console.warn("[Frontend] BillDesk response suggests custom headers for the embeddedsdk POST:", redirectLinkInfo.headers);
                console.warn("[Frontend] Standard HTML form submission cannot set these custom headers. If the redirect fails or the BillDesk page errors, this could be the reason. You might need to switch to an AJAX (fetch) POST if these headers are mandatory, which would require further clarification from BillDesk on how their SDK should be initialized after an AJAX call.");
                // For now, we will proceed with form.submit() and see if BillDesk handles it gracefully or if these headers were optional/informational.
              } else {
                 console.log("[Frontend] No custom headers suggested by BillDesk for the embeddedsdk POST.");
              }
              
              console.log("[Frontend] Submitting form to BillDesk:", form.action);
              form.submit();
              // setLoading(false) might not be reached if submit is successful and page unloads.
              // This is usually fine for a redirect.
            } else {
              console.error("BillDesk redirect link (POST) or href not found in server response:", billdeskOrderData);
              alert("Could not process BillDesk redirect. Information missing. Please try again.");
              setLoading(false);
            }
          } else {
            let alertMessage = "Payment initiation failed. ";
            if (!originalRequestJwt) alertMessage += "Required token (originalRequestJwt) missing from server response. ";
            if (!billdeskOrderData) alertMessage += "BillDesk order data (billdesk_response) missing. ";
            else if (billdeskOrderData.next_step !== 'redirect') alertMessage += "BillDesk did not indicate a redirect. ";
            else if (!billdeskOrderData.links) alertMessage += "BillDesk redirect links missing. ";
            
            alert(alertMessage + "Check console for details.");
            console.error("Problem with data for BillDesk redirect. Server Response:", serverResponseJson);
            setLoading(false);
          }

        } catch (err) {
          console.error("❌ Request to /api/create-order-billdesk failed:", err);
          alert("Something went wrong while creating the payment order. Please check your connection and try again.");
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
  if (step === 0) {
    componentToRender = (
      <StepA
        handleStepProgression={handleStepProgression}
        currentStepData={stepData.stepA}
      />
    );
  } else if (step === 1) {
    componentToRender = (
      <StepC
        handleStepProgression={handleStepProgression}
        currentStepData={stepData.stepC}
      />
    );
  } else if (step === 2) {
    componentToRender = (
      <StepB
        handleStepProgression={handleStepProgression}
        currentStepData={stepData.stepB}
      />
    );
  }

  return (
    <>
      {!error && (
        <div
          data-lenis-prevent
          className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-between z-50 relative"
        >
          <div className="w-[90%] sm:w-[70%] md:w-[60%] flex flex-col items-center p-6 mt-16 sm:mt-24">
            <div className="relative w-full bg-gray-300 h-1 rounded-full">
              <div
                className="absolute top-0 left-0 bg-black h-1 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                {["Indian?", "Contact Details", "Final Question"].map(
                  (label, idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <span
                        className={`absolute -top-12 sm:-top-16 text-sm sm:text-lg md:text-xl text-center transition-colors duration-300 ${
                          step >= idx ? "text-black font-semibold" : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-300 ${
                          step >= idx ? "bg-black" : "bg-gray-300"
                        }`}
                      />
                    </div>
                  )
                )}
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
                <p className="text-black text-xl sm:text-2xl">
                  Connecting to payment gateway…
                </p>
                <p className="text-gray-600 text-sm mt-2">Please wait, do not refresh or press back.</p>
              </div>
            ) : (
              componentToRender
            )}
          </div>
        </div>
      )}

      {error && (
        <div
          data-lenis-prevent
          className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-center z-50 relative p-6"
        >
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
            <a
              href="mailto:fundraise@akanksha.org"
              className="text-deep-green underline ml-1"
            >
              fundraise@akanksha.org
            </a>
             for donation inquiries.
          </p>
           <Button 
            onClick={() => {
                setError(false); 
                // setStep(0); // Optionally reset
                // setStepData(INITIAL_STATE); // Optionally reset
            }}
            className="mt-8 bg-gray-200 text-black"
            >
            Go Back
           </Button>
        </div>
      )}
    </>
  );
}
// --- END OF FILE multi-step-form.js ---