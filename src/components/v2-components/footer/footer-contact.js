import Input from "@/components/v2-components/input/input";
import Arrow from "@/assets/button-arrow-md.svg";
import PencilShading from "@/assets/pencil-shading.svg";
import Image from "next/image";

export default function FooterContact() {
  return (
    <form className="w-full flex justify-start md:justify-center gap-2">
      <Input
        name="email"
        type="email"
        id="email"
        placeholder="Your email"
        className=" md:w-[40%] md:min-w-[250px] py-4 focus:ring-v2-blue text-deep-green"
      />
      <div className="relative group active:scale-95 flex items-center justify-center">
        <button
          className="bg-v2-orange transition-all right-0 
                    flex items-center font-inter font-bold 
                    w-fit text-sm rounded-full p-4 relative 
                    z-[1] group-hover:opacity-95 group-hover:right-[2px] "
        >
          <span className="relative h-6 w-6">
            <Image alt="arrow" src={Arrow} fill />
          </span>
        </button>

        {/* Background effect that stays behind */}
        <div
          className="
                        w-full h-full absolute top-0 left-0 rounded-full
                        overflow-hidden opacity-0 group-hover:opacity-100
                        group-hover:top-[7px] z-[0]
                        custom-bezier pointer-events-none
                    "
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
    </form>
  );
}
