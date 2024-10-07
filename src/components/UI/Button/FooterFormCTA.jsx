import ThinArrow from "@/components/ThinArrow";
import { twMerge } from "tailwind-merge";

export default function FooterFormCTA({ className, ...props }) {
  return (
    <button
      className={twMerge(`bg-deep-green flex items-center justify-center p-3 rounded-sm`, className)}
      {...props}
    >
      <ThinArrow 
        dimension={"30"}
        strokeColor="#FBDA1D"
      />
    </button>
  )
}
