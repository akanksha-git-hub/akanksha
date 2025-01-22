import RichText from "../Texts/RichText";
import StepChoice from "./step-choice";

export default function StepA({
  handleStepProgression,
  currentStep,
  totalSteps,
}) {
  const dataA = [{ value: "Yes" }, { value: "No" }];
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-12 px-12">
        <RichText
          text="Are you an Indian Passport Holder?"
          className="font-ambit-regular text-deep-green text-4xl lg:text-7xl max-w-[90%] text-center"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <ul className="flex items-center justify-center flex-wrap gap-8">
            {dataA.map((item) => {
              let value;
              if (item.value === "No") {
                value = false;
              } else {
                value = true;
              }
              return (
                <StepChoice
                  key={item.value}
                  handleStepProgression={handleStepProgression}
                  value={value}
                  item={item}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
