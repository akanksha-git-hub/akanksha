

export default function Input({ className, label, ...props}) {
    return(
        <p className={`input-parent-state flex flex-col space-y-1 ${className}`}>
            <label className="font-ambit-regular text-lg label-state">{label}</label>
            <input 
                className={`input-state font-ambit-regular w-full`}
                {...props}
            />
        </p>
    )       
}