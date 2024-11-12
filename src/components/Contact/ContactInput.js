
export default function ContactInput({label, variant="default", className, ...props}) {
  return (
    <p className={`flex flex-col input-parent-state ${className}`}>
        <label className="contact-label text-xl font-ambit-regular text-deep-green label-state">
            {label}
        </label>
        {
            variant === "message" ?
            <textarea 
                {...props}
                className={`outline-none border-0 border-b py-2 font-ambit-regular text-deep-green text-lg contact-input-state`}
            />
            :
            <input
                {...props} 
                className={`outline-none border-0 border-b py-2 font-ambit-regular text-deep-green text-lg contact-input-state`}
            /> 
        }
    </p>
  )
}
