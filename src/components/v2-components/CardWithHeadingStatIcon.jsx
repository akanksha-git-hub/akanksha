import { PrismicNextImage } from '@prismicio/next';

export default function CardWithHeadingStatIcon({ heading, stat, iconField }) {
  return (
    <div className="flex flex-col border-[0.15rem] mt-4 2xl:min-h-[400px] h-full border-black 2xl:hover:bg-v2-yellow p-6">
      <div className="flex  items-start space-x-4 2xl:hidden ">
  {/* Icon */}
  <div className="relative w-12 h-12 2xl:w-28 2xl:h-28">
    {iconField?.url ? (
      <PrismicNextImage
        field={iconField}
        fill
        style={{ objectFit: 'contain' }}
        alt={iconField?.alt || 'Icon'}
      />
    ) : (
      <div className="h-full w-full bg-black rounded-full" />
    )}
  </div>

  {/* Heading */}
  <div>
    <h2 className="font-ambit-regular text-black text-4xl md:text-5xl">
      {heading}
    </h2>
  </div>
</div>

      
  <div className="flex flex-col space-y-2">
   
    <h2 className="font-ambit-regular text-black text-4xl md:text-5xl 2xl:block hidden ">
      {heading}
    </h2>
    <p className="font-ambit-regular text-black text-xl md:text-2xl">
      {stat}
    </p>
  </div>
  <div className="relative w-10 h-10 2xl:w-28 2xl:h-28 mt-auto 2xl:block hidden">
    {iconField?.url ? (
      <PrismicNextImage
        field={iconField}
        fill
        style={{ objectFit: 'contain' }}
        alt={iconField?.alt || 'Icon'}
      />
    ) : (
      <div className="h-full w-full bg-black rounded-full" />
    )}
  </div>
</div>

  );
}
