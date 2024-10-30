import { useCallback, useState } from "react"
import Arrow from "../Arrow";
import StepA from "./step-A";
import StepB from "./step-B";
import StepC from "./step-C";
import Image from "next/image";

const INITIAL_STATE = {
    stepA: {
        isIndian: null
    },
    stepB: { }
}

export default function MultiStepForm({ closeModal }) {

    const [step, setStep] = useState(0);
    const [stepData, setStepData] = useState(INITIAL_STATE);
    const [error, setError] = useState(false);

    let component;

    const handleStepProgression = useCallback((value) => {

        if(step === 0) {
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
            return;
        }

        setError(() => false);
    }, [step]);

    if(step === 0) component = <StepA handleStepProgression={handleStepProgression} />

    if(step === 1) component = <StepC />
 
    return(
        <>
        {!error && (
            <div key={error} className={`opacity-anim h-full w-full bg-cream flex flex-col items-center justify-between z-50 relative`}>
                <Image 
                    onClick={closeModal}
                    className="absolute top-12 right-12 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
                    src='/close.svg'
                    height={30}
                    width={30}
                    alt="Close"
                />
                <div key={step} className={`opacity-anim h-full w-full flex items-center justify-center overflow-y-auto green-scroll-bar`}>
                    {component}
                </div>
            </div>
        )}
        {error && (
            <div className="opacity-anim flex items-center justify-center w-full h-full">
                <div className="relative p-24 bg-white rounded-3xl">
                    <Image 
                        onClick={closeModal}
                        className="absolute top-6 right-6 cursor-pointer z-50 transition-all hover:opacity-55 active:scale-90"
                        src='/close.svg'
                        height={20}
                        width={20}
                        alt="Close"
                    />
                    <p className="text-[#C80707] font-ambit-semibold text-lg text-center w-[30ch] leading-5">
                        <span>Non-Indian citizens can write to</span>
                        <a href="mailto:fundraise@akanksha.org" className="text-deep-green underline">&nbsp;fundraise@akanksha.org</a> <span>for donations.</span>
                    </p>
                </div>
            </div>
        )}
        </>
    )
}






















// abi.cherian@pumexinfotech.com