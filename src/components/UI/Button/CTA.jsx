export default function CTA({text, className, ...props}) {
    return(
        <button 
            {...props}
            className={
                `bg-deep-green text-cream border border-black transition-all hover:bg-bright-yellow hover:text-deep-green hover:scale-95
                hover:border-black hover:border-solid cursor-pointer
                w-fit text-sm rounded-full py-3 px-8 ${className}`}
        >
            {text}
      </button>
    )
}