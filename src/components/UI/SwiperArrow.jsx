import Image from "next/image";
import Arrow from "@/assets/button-arrow.svg";
import PencilShading from "@/assets/pencil-shading.svg";

export default function SwiperArrow({
  onClick,
  className,
  isDisabled = false,
  ...props
}) {
  const isRotated = className?.includes("rotate-180");

  return (
    <div
      className={`relative group flex items-center justify-center active:scale-95 cursor-pointer ${className} select-none`}
      onClick={onClick}
      {...props}
    >
      {/* Arrow Button */}
      <div
        className={`
          ${isDisabled ? "bg-white" : "bg-v2-orange"}
          border border-black text-black
          rounded-full h-[4.1rem] w-[4.8rem] flex items-center
          justify-center relative z-[2] group-hover:opacity-95 group-hover:right-[2px]
          transition-all`}
      >
        <div className="relative h-4 w-6">
          <Image alt="arrow" src={Arrow} fill />
        </div>
      </div>

      {/* Pencil Shading Background */}
      <div
        className={`w-full h-full absolute top-0 left-0 rounded-full overflow-hidden 
          opacity-0 group-hover:opacity-100 
          ${isRotated ? "group-hover:top-[-7px]" : "group-hover:top-[7px]"}
          z-[1] custom-bezier pointer-events-none`}
      >
        <div className="h-full w-full relative">
          <Image
            alt="pencil-shading"
            className="object-cover"
            src={PencilShading}
            fill
          />
        </div>
      </div>
    </div>
  );
}
