import { useCallback, useState } from "react"
import Arrow from "../Arrow";
import StepA from "./step-A";
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
                setStepData(prevState => ({ ...prevState, stepA: { isIndian: value } }));
                setStep(prevState => prevState + 1);
            }
        }
        
        if(step === 1) {
            // console.log('1')
            // todo....
            return;
        }

        setError(() => false);
    }, [step]);

    if(step === 0) component = <StepA handleStepProgression={handleStepProgression} />

    if(step === 1) component = <StepC />
 
    return(
        <>
        {!error && (
            <div key={error} data-lenis-prevent className={`opacity-anim h-full w-full bg-cream flex flex-col items-center justify-between z-50 relative`}>
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
            <div data-lenis-prevent className="flex items-center justify-center w-full h-full z-50 relative">
                <div className="blur-bg absolute top-0 left-0 h-full w-full" />
                <div className="relative opacity-anim-b py-24 w-[90%] sm:w-auto sm:p-24 bg-white rounded-3xl z-50 flex items-center justify-center">
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