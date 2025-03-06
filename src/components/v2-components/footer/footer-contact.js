import Input from "@/components/v2-components/input/input";
import Arrow from "@/assets/button-arrow-md.svg";
import PencilShading from "@/assets/pencil-shading.svg";
import Image from "next/image";

export default function FooterContact() {
  return (
<div className="flex flex-row space-x-6">
    {/* LinkedIn */}
    <a href="https://www.linkedin.com/company/theakankshafoundation/" target="_blank" rel="noopener noreferrer" className="h-8 w-8">
        <Image 
            src="/linkedin.svg" 
            alt="LinkedIn"
            width={32} 
            height={32} 
            className="h-8 w-8"
        />
    </a>

    {/* Instagram */}
    <a href="https://www.instagram.com/theakankshafoundation?igsh=d2I1ZzEyYWN6YW9j" target="_blank" rel="noopener noreferrer" className="h-8 w-8">
        <Image 
            src="/instagram.svg" 
            alt="Instagram"
            width={32} 
            height={32} 
            className="h-8 w-8"
        />
    </a>

    {/* YouTube */}
    <a href="https://youtube.com/@theakankshafoundation6454?si=OU7En5iCu66_Jh8X" target="_blank" rel="noopener noreferrer" className="h-8 w-8">
        <Image 
            src="/youtube.svg" 
            alt="YouTube"
            width={32} 
            height={32} 
            className="h-8 w-8"
        />
    </a>

    {/* Facebook */}
    <a href="https://www.facebook.com/share/1Qi4iA5tNu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="h-8 w-8">
        <Image 
            src="/facebook.svg" 
            alt="Facebook"
            width={32} 
            height={32} 
            className="h-8 w-8"
        />
    </a>

    {/* Twitter (X) */}
    <a href="https://x.com/akanksha_india?s=21" target="_blank" rel="noopener noreferrer" className="h-8 w-8">
        <Image 
            src="/twitter.svg" 
            alt="Twitter (X)"
            width={32} 
            height={32} 
            className="h-8 w-8"
        />
    </a>
</div>

    // <form className="w-full flex justify-start md:justify-center gap-2 ">
    //   <Input
    //     name="email"
    //     type="email"
    //     id="email"
    //     placeholder="Your email"
    //     className=" md:w-[40%] md:min-w-[250px] py-4 focus:ring-v2-blue text-deep-green"
    //   />
    //   <div className="relative group active:scale-95 flex items-center justify-center">
    //     <button
    //       className="bg-v2-orange transition-all right-0 
    //                 flex items-center font-inter font-bold 
    //                 w-fit text-sm rounded-full p-4 relative 
    //                 z-[1] group-hover:opacity-95 group-hover:right-[2px] "
    //     >
    //       <span className="relative h-6 w-6">
    //         <Image alt="arrow" src={Arrow} fill />
    //       </span>
    //     </button>

    //     {/* Background effect that stays behind */}
    //     <div
    //       className="
    //                     w-full h-full absolute top-0 left-0 rounded-full
    //                     overflow-hidden opacity-0 group-hover:opacity-100
    //                     group-hover:top-[7px] z-[0]
    //                     custom-bezier pointer-events-none
    //                 "
    //     >
    //       <div className="h-full w-full relative">
    //         <Image
    //           alt="pencil-shading"
    //           className="object-cover"
    //           src={PencilShading}
    //           fill
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </form>
  );
}
