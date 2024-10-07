import RichText from "./Texts/RichText";

export default function SliceIdentifier({ text, className }) {

  let Text = <><span className="h-[12px] w-[12px] rounded-full bg-deep-green"></span><span>{text}</span></>

  return (
    <div className={`border-b pb-3 border-deep-green ${className}`}>
      <RichText 
        className="text-deep-green flex gap-1 font-inter font-bold items-center uppercase"
        text={Text}
      />
    </div>
  )
}
