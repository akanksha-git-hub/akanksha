import { twMerge } from "tailwind-merge";

const { forwardRef } = require("react");


const Input = forwardRef(function Input({ className, ...props }, ref) {

    return(
        <input 
            className={twMerge(`font-ambit-regular text-[#ABB2AD] 
                    border border-[#D9D9D9] rounded-lg px-4 py-3 
                    focus:outline-none focus:ring-2 focus:ring-v2-orange transition-all`, className)}
            ref={ref}
            {...props}
        />
    )

});


export default Input;