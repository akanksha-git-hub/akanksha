import { useCallback, useState } from "react"
import Arrow from "../Arrow";
import StepA from "./step-A";
import StepB from "./step-B";
import StepC from "./step-C";
import { useSmoothScroller } from "../LenisScrollContext";

const INITIAL_STATE = {
    stepA: {
        isIndian: null
    },
    stepB: {
        referralSource: []
    },
    stepC: {

    }
}

export default function MultiStepForm({ closeModal }) {

    const [step, setStep] = useState(0);
    const [stepData, setStepData] = useState(INITIAL_STATE);
    const [error, setError] = useState(false);

    const handleBack = useCallback(() => {
        if(step <= 0) {
            setStepData(INITIAL_STATE);
            closeModal();
            return;
        }
        if(step === 1) {
            setStep(prevState => prevState - 1);
            setStepData(INITIAL_STATE);
            return;
        }

        setStep(prevState => prevState - 1);
    }, [step])

    const handleNext = () => setStep(prevState => prevState + 1);

    const handleStepProgression = useCallback((value) => {
        console.log(value, 'VALUE')
        if(step === 0) {
            console.log('0')
            if(!value) {
                setError(() => true);
                return;
            } else {
                setStepData(prevState => ({ ...prevState, stepA: { isIndian: value }}));
                setStep(prevState => prevState + 1);
            }
        }
        
        if(step === 1) {
            console.log('1')
            setStepData(prevState => ({ ...prevState, stepB: { referralSource: [...value] } }))
            return;
        }

        setError(false);
    }, [step]);

    let component;

    if(step === 0) component = <StepA handleStepProgression={handleStepProgression} error={error} />

    if(step === 1) component = <StepB data={stepData.stepB.referralSource} handleStepProgression={handleStepProgression} />
    if(step === 2) component = <StepC />
 
    return(
        <div data-lenis-prevent className={`h-full w-full bg-cream flex flex-col items-center justify-between z-50`}>
           <div key={step} className={`opacity-anim h-full w-full flex items-center justify-center ${step === 2 && ('overflow-y-scroll green-scroll-bar')}`}>
                {component}
           </div>
           <div className="flex items-center justify-between w-full p-[2rem]">
             <button
                onClick={handleBack} 
                className="bg-deep-green text-[#FFFBF1] border border-black transition-all hover:bg-bright-yellow hover:text-deep-green hover:scale-95
                            hover:border-black hover:border-solid
                            w-[140px] text-lg rounded-full py-3 px-2 flex items-center justify-center gap-2 primary-btn"
             >
                <Arrow className="arrow-hovered transition-all rotate-180" dimension={20} /> Back
             </button>
             {stepData.stepB.referralSource.length > 0 && step !== 2 && (
                <button
                    onClick={handleNext} 
                    className="bg-deep-green text-[#FFFBF1] border border-black transition-all hover:bg-bright-yellow hover:text-deep-green hover:scale-95
                                hover:border-black hover:border-solid
                                w-[140px] text-lg rounded-full py-3 px-2 flex items-center justify-center gap-2 primary-btn"
                >
                    Next <Arrow className="arrow-hovered transition-all" dimension={20} /> 
                </button>
             )}
           </div>
        </div>
    )
}






















// abi.cherian@pumexinfotech.com