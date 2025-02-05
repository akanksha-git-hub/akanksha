import RichText from "../Texts/RichText";

export default function StatsComponent({ description, number }) {
  return (
    <div
      className="rounded-lg p-4 
      bg-soft-white h-[15.6rem] flex flex-col items-start justify-between xl:min-w-[250px]  "
    >
      <RichText
        className="font-ambit-regular text-black text-sm w-full"
        text={description}
      />
      <RichText
        className="font-ambit-semibold text-black mt-12 sm:mt-0 text-5xl sm:text-6xl xl:text-8xl"
        text={number}
      />
    </div>
  );
}
