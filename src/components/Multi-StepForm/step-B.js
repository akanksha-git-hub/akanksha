import { useCallback, useState } from "react";
import RichText from "../Texts/RichText";
import Button from "../v2-components/buttons/button";
import Arrow from "@/assets/button-arrow.svg";
import Image from "next/image";

export default function StepB({
  handleStepProgression,
  data,
  currentStep,
  totalSteps,
}) {
  const choices = ["Social Media", "Website", "Friends", "Others"];
  const heardData = ["Social Media", "Website", "Friends", "Other"];

  const [selected, setSelected] = useState({
    values: [],
  });

  const handleChange = useCallback((e) => {
    let name = e.target.name;
    let value = e.target.value;
  }, []);

  const handleSelect = useCallback((value) => {
    setSelected((prevState) => {
      const foundValue = prevState.values.includes(value);
      if (foundValue) {
        const filteredData = prevState.values.filter((item) => item !== value);
        handleStepProgression([...filteredData]);
        return {
          ...prevState,
          values: [...filteredData],
        };
      }
      handleStepProgression([...prevState.values, value]);
      return {
        ...prevState,
        values: [...prevState.values, value],
      };
    });
  }, []);

  // Calculate progress percentage
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col items-center  h-full w-full justify-center space-y-6 ">
      <div className="flex md:flex-row flex-col justify-center md:justify-start md:items-baseline items-center  h-full w-full ">
        <div className="md:w-[30%]  w-full md:p-10  ">
          <button
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
        <div className="md:w-[50%] w-full ">
          <RichText
            text="Final Question"
            className="font-ambit-regular text-deep-green text-6xl lg:text-7xl  text-center mb-12 mt-36"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-6 pb-6 w-[60%] justify-center items-center">
        <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
          <label className="font-ambit-regular text-lg label-state">
            {`We'd love to know who you are donating to`}
          </label>
          <select className="input-state" name="donate_to">
            <option disabled selected value className="!text-[#A9AEB6]">
              {`I'm donating to..`}
            </option>
            <option>Uninterrupted learning for students and alumni</option>
          </select>
        </p>
        <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
          <label className="font-ambit-regular text-lg label-state">
            {`How did you hear about Akanksha?`}
          </label>

          <select
            onChange={handleChange}
            className="input-state w-full"
            name="heard_from"
          >
            <option disabled selected value className="!text-[#A9AEB6]">
              {`Others..`}
            </option>
            {heardData.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </p>
        <Button
          type="submit"
          className=" bg-deep-green text-black  border-black transition-all 
                                     md:!text-3xl rounded-full !py-6 !px-24 
                                     
                                      "
        >
          Proceed
        </Button>
        <p className="text-deep-green font-ambit-semibold text-lg w-full sm:w-[90%] text-center">
          Akanksha provides an Online Payment Gateway through BillDesk to make
          your donation to us easy, secure and efficient. The BillDesk Payment
          Gateway uses 128-bit SSL encrypted, highly secure transmission
          protocols and has been Verisign certified. This ensures that your
          payment is processed securely.
        </p>
        <p className="text-deep-green font-ambit-semibold text-lg w-full sm:w-[90%] text-center">
          By sharing your details, you agree to receive stories and updates from
          Akanksha via mobile,  Whatsapp, landline, email and post. If you’d
          like to change this, please send us an email on &nbsp;
          <a
            className="underline transition-all hover:opacity-40"
            href="mailto:fundraise@akanksha.org"
          >
            fundraise@akanksha.org
          </a>
        </p>
      </div>
    </div>
  );
}
