import { PrismicNextImage } from '@prismicio/next';

export default function CardWithHeadingStatIcon({ heading, stat, iconField }) {
  return (
    <div className="flex flex-col items-start justify-between border-[0.15rem] mt-4 md:min-h-[400px]  h-full  border-black md:hover:bg-v2-yellow p-6   ">
      <h2 className="font-ambit-regular text-black text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="font-ambit-regular text-black text-xl md:text-2xl ">
        {stat}
      </p>
      <div className="relative w-10 h-10 md:w-14 md:h-14">
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
