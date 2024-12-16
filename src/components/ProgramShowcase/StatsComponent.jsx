import RichText from "../Texts/RichText";

export default function StatsComponent({ description, number }) {
  return (
    <div
      className="rounded-lg p-4 
      bg-soft-white h-[15.6rem] flex flex-col items-start justify-between w-2/4 sm:w-full  "
    >
      <RichText
        className="font-ambit-regular text-deep-green text-sm w-[90%] xl:w-[70%]"
        text={description}
      />
      <RichText
        className="font-ambit-semibold text-deep-green mt-12 sm:mt-0 text-3xl sm:text-6xl xl:text-8xl"
        text={number}
      />
    </div>
  );
}
