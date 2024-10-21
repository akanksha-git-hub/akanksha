import { twMerge } from "tailwind-merge";

export default function RichText({ text, className, ...props }) {
  return (
    <p className={twMerge(className)} {...props}>
      {text}  
    </p>
  )
}
