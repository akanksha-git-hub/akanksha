

export default function StepChoice({ item, handleStepProgression, value }) {

    

    return(
        <li 
            className="border-[2px] border-deep-green transition-all hover:bg-bright-yellow text-deep-green hover:scale-95
                w-[180px] text-xl rounded-full py-2 px-6 cursor-pointer font-ambit-semibold flex items-center justify-center"
            onClick={() => handleStepProgression(value)}
        >
            {item.value}
        </li>
    )
}