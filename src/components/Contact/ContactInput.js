
export default function ContactInput({label, variant="default", className, ...props}) {
  return (
    <p className={`flex flex-col ${className}`}>
        <label className="contact-label text-xl font-ambit-regular text-deep-green">
            {label}
        </label>
        {
            variant === "message" ?
            <textarea 
                {...props}
                className={`outline-none border-0 border-b py-2 font-ambit-regular text-deep-green text-lg`}
            />
            :
            <input
                {...props} 
                className={`outline-none border-0 border-b py-2 font-ambit-regular text-deep-green text-lg`}
            /> 
        }
    </p>
  )
}
