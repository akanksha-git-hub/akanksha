

export default function Input({ className, ...props}) {
    return(
        <input 
            className={`py-4 px-4 border-2 text-deep-green font-ambit-semibold border-deep-green focus:rounded-none focus:outline-none bg-cream ${className}`}
            {...props}
        />
    )       
}