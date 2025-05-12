import { useCallback, useState } from "react";
import RichText from "../Texts/RichText";
import Button from "../v2-components/buttons/button";
import Arrow from "@/assets/button-arrow.svg";
import Image from "next/image";

export default function StepB({
  handleStepProgression, // (data, "back"?) -> void
  currentStep,
  totalSteps,
}) {
  const [form, setForm] = useState({
    donate_to: "",
    heard_from: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onProceed = useCallback(
    (e) => {
      e.preventDefault();
      handleStepProgression({ ...form });
    },
    [form, handleStepProgression]
  );

  const heardData = ["Social Media", "Website", "Friends", "Other"];
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <form
      onSubmit={onProceed}
      className="flex flex-col items-center w-full justify-center space-y-6 mt-52"
    >
      <div className="flex md:flex-row flex-col justify-center md:justify-start md:items-baseline items-center mt-96 sm:mt-0">
        <div className="md:w-[30%] w-full md:p-10">
          <button
            type="button"
            className="bg-gray-400 text-black border-black transition-all
                       text-xl rounded-full !py-6 !px-8 flex items-center gap-2"
            onClick={() => handleStepProgression(null, "back")}
          >
            <Image
              src={Arrow}
              alt="Left Arrow"
              width={20}
              height={20}
              className="rotate-180"
            />
            Back
          </button>
        </div>
        <div className="md:w-[50%] w-full mt-8">
          <RichText
            text="Final Question"
            className="font-ambit-regular text-black text-3xl lg:text-7xl text-center"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-6 pb-6 w-[60%]">
        <label className="input-parent-state flex flex-col space-y-1 w-full">
          <span className="font-ambit-regular text-lg label-state">
            We&rsquo;d love to know who you are donating to
          </span>
          <select
            name="donate_to"
            value={form.donate_to}
            onChange={handleChange}
            required
            className="input-state"
          >
            <option value="" disabled>
              I&rsquo;m donating to&hellip;
            </option>
            <option>Uninterrupted learning for students and alumni</option>
          </select>
        </label>

        <label className="input-parent-state flex flex-col space-y-1 w-full mt-4">
          <span className="font-ambit-regular text-lg label-state">
            How did you hear about Akanksha?
          </span>
          <select
            name="heard_from"
            value={form.heard_from}
            onChange={handleChange}
            required
            className="input-state"
          >
            <option value="" disabled>
              Others&hellip;
            </option>
            {heardData.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        {/* <Button
          type="submit"
          className="bg-deep-green text-black border-black transition-all
                     md:!text-3xl rounded-full !py-6 !px-24"
        >
          Proceed

        </Button> */}
        <Button disabled className="opacity-60 cursor-not-allowed">
  Payment temporarily unavailable
</Button>

        <p className="text-black font-ambit-regular text-lg w-full sm:w-[90%] text-left md:text-center">
          Akanksha provides an Online Payment Gateway through BillDesk to make
          your donation to us easy, secure and efficient. The BillDesk Payment
          Gateway uses 128-bit SSL encrypted, highly secure transmission
          protocols and has been Verisign certified. This ensures that your
          payment is processed securely.
        </p>
        <p className="text-black font-ambit-regular text-lg w-full sm:w-[90%] text-left md:text-center">
          By sharing your details, you agree to receive stories and updates from
          Akanksha via mobile,&nbsp;Whatsapp, landline, email and post. If you&rsquo;d like
          to change this, please send us an email on&nbsp;
          <a
            className="underline transition-all hover:opacity-40"
            href="mailto:fundraise@akanksha.org"
          >
            fundraise@akanksha.org
          </a>
        </p>
      </div>
    </form>
  );
}
