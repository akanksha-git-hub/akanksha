import Image from "next/image";
import CloudWall from "@/assets/cloud-wall.svg";

export default function FooterImage() {
  return (
    <>
      <div className="absolute -right-12  top-2/4 -translate-y-1/4 md:-translate-y-2/4 h-[50rem] sm:w-[24vw] w-[44vw] ">
        <div className="relative h-full w-full">
          <Image src={CloudWall} alt="image" fill />
        </div>
      </div>
      <div className=" hidden md:block absolute -left-12 top-2/4 -translate-y-2/4 h-[50rem] w-[24vw] rotate-180">
        <div className="relative h-full w-full">
          <Image src={CloudWall} alt="image" fill />
        </div>
      </div>
    </>
  );
}
