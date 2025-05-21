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
        return;
      }

      // Step 0 — Indian?
      if (step === 0) {
        if (!value) {
          setError(true);
          return;
        }
        setStepData((prev) => ({ ...prev, stepA: { isIndian: value } }));
        setStep(1);
        return;
      }

      // Step 1 — Contact Details
      if (step === 1) {
        setStepData((prev) => ({ ...prev, stepC: value }));
        setStep(2);
        return;
      }

      // Step 2 — Final Questions + Submit
      if (step === 2) {
        setStepData((prev) => ({ ...prev, stepB: value }));

        const payload = { ...stepData, stepB: value };

        try {
          setLoading(true);

          const res = await fetch("/api/create-order-billdesk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const json = await res.json();
          console.log("[BillDesk] response:", json);

          const jwt = json?.jwt;

          if (jwt) {
            // ✅ Auto-redirect to BillDesk using JWT
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://uat1.billdesk.com/u2/web/v1.2/embeddedsdk";

            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "msg";
            input.value = jwt;

            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
          } else {
            alert("BillDesk did not return a JWT token. Check console.");
          }

        } catch (err) {
          console.error("❌ BillDesk request failed:", err);
          alert("Something went wrong while creating the payment order.");
        } finally {
          setLoading(false);
        }
        return;
      }
    },
    [step, stepData]
  );

  const totalSteps = 3;
  const progressPercentage = (step / (totalSteps - 1)) * 100;

  let component = null;
  if (step === 0) {
    component = (
      <StepA
        handleStepProgression={handleStepProgression}
        currentStep={step + 1}
        totalSteps={3}
      />
    );
  } else if (step === 1) {
    component = (
      <StepC
        handleStepProgression={handleStepProgression}
        currentStep={step + 1}
        totalSteps={3}
      />
    );
  } else if (step === 2) {
    component = (
      <StepB
        handleStepProgression={handleStepProgression}
        currentStep={step + 1}
        totalSteps={3}
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
          <div className="w-[60%] flex flex-col items-center p-6 mt-24">
            <div className="relative w-full bg-gray-300 h-1 rounded-full">
              <div
                className="absolute top-0 left-0 bg-black h-1 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                {["Indian", "Contact Details", "Final Question"].map(
                  (label, idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <span
                        className={`absolute -top-16 md:text-xl text-lg text-center ${
                          step >= idx ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full ${
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
            className="absolute top-12 right-12 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={30}
            width={30}
            alt="Close"
          />

          <div className="opacity-anim h-full w-full flex items-center justify-center overflow-y-auto green-scroll-bar">
            {loading ? (
              <p className="text-black text-2xl">Creating order…</p>
            ) : (
              component
            )}
          </div>
        </div>
      )}

      {error && (
        <div
          data-lenis-prevent
          className="opacity-anim h-full w-full bg-white flex flex-col items-center justify-center z-50 relative"
        >
          <Image
            onClick={closeModal}
            className="absolute top-6 right-6 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
            src="/close.svg"
            height={20}
            width={20}
            alt="Close"
          />
          <p className="text-black font-ambit-semibold text-4xl text-center sm:w-[30ch]">
            Non-Indian citizens can write to
            <a
              href="mailto:fundraise@akanksha.org"
              className="text-deep-green underline"
            >
              &nbsp;fundraise@akanksha.org
            </a>{" "}
            for donations.
          </p>
        </div>
      )}
    </>
  );
}
