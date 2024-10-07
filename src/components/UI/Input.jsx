'use client'
import { twMerge } from "tailwind-merge"
export default function Input({ className, ...props }) {
  return(
    <input 
        className={twMerge(`text-deep-green
            border border-[#ABB2AD] 
            focus:outline-none focus:ring-2 focus:ring-deep-green transition-all 
            font-ambit-regular p-2 rounded-xl w-full`, className)}
        {...props} />
  )
}
