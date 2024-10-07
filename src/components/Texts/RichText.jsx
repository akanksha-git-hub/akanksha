import { twMerge } from "tailwind-merge";

export default function RichText({ text, className }) {
  return (
    <p className={twMerge(className)}>
      {text}  
    </p>
  )
}
