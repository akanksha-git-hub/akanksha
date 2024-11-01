import { memo } from "react"

const Input =  memo(function Input({ className, inputClassName, name, error, label, ...props}) {
    return(
        <p className={`input-parent-state flex flex-col space-y-1 ${className}`}>
            <label className="font-ambit-regular text-lg label-state">{label}</label>
            <input 
                name={name}
                className={`${error ? 'input-error' : 'input-state'} font-ambit-regular w-full`}
                {...props}
            />
            {error && (
                <span className="font-ambit-regular flex items-center w-fit gap-1 !mt-2 ml-2">
                    <span className="h-2 w-2 rounded-full relative bottom-[2px] bg-red-500" />
                    <span className="text-red-500">{error}</span>
                </span>
            )}
        </p>
    )       
})

export default Input;