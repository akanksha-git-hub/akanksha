
import Image from 'next/image';
/**
 * @typedef {import("@prismicio/client").Content.BoxArrowSectionSlice} BoxArrowSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BoxArrowSectionSlice>} BoxArrowSectionProps
 * @param {BoxArrowSectionProps}
 */

  

   


const BoxArrowSection = ({ slice }) => {
  
  const boxRows = [];
  for (let i = 0; i < slice.primary.box.length; i += 3) {
    boxRows.push(slice.primary.box.slice(i, i + 3));
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full mt-32"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden lg:block ">
          {boxRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center gap-6 mb-6 ">
              {row.map((item, itemIndex) => (
                <>
                  {/* Box */}
                  <div  key={`box-${rowIndex}-${itemIndex}`}
                    className="relative text-black p-6 flex flex-col justify-center w-[300px] md:h-[380px] xl:h-[320px] "
                    style={{ backgroundColor: item.hex_color }}
                >
                    <h2 className="text-5xl font-ambit-regular mb-4">{item.heading}</h2>
                    <p className="text-[1.35rem] font-ambit-regular">{item.description}</p>
                    <div className="absolute  top-1/2 -translate-y-1/2 left-0 z-10 ">
                    <Image
                      src="/quote-left.png" 
                      alt="quote icon"
                      width={14}
                      height={60}
                      className="object-cover h-auto"
                    />
                            </div>
                  </div>

                  {/* ➡️ Arrow (only between boxes) */}
                  {itemIndex !== row.length - 1 && (
                    <Image
                      src="/arrow.png"
                      alt="arrow"
                      width={44}
                      height={44}
                    />
                  )}
                </>
              ))}
            </div>
          ))}
          
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {slice.primary.box.map((item, index) => (
            <div
              key={index}
              className="relative text-black p-6 flex flex-col justify-between w-full min-h-[320px]"
              style={{ backgroundColor: item.hex_color }}
            >
              <h2 className="text-5xl font-ambit-regular mb-4">{item.heading}</h2>
              <p className="text-lg font-ambit-regular">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default BoxArrowSection;
