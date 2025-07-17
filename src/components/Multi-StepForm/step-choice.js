

export default function StepChoice({ item, handleStepProgression, value }) {

    return(
        <li 
            className="border border-black transition-all hover:bg-black hover:text-white text-black hover:scale-95
                w-[180px] text-2xl rounded-[10px] bg-white py-[10px] px-6 cursor-pointer font-ambit-semibold flex items-center justify-center"
            onClick={() => handleStepProgression(value)}
        >
            {item.value}
        </li>
    )
}