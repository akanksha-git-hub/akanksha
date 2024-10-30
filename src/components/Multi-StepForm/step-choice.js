

export default function StepChoice({ item, handleStepProgression, value }) {

    return(
        <li 
            className="border border-newGray transition-all hover:bg-deep-green hover:text-cream text-deep-green hover:scale-95
                w-[180px] text-2xl rounded-[10px] bg-white py-[10px] px-6 cursor-pointer font-ambit-semibold flex items-center justify-center"
            onClick={() => handleStepProgression(value)}
        >
            {item.value}
        </li>
    )
}