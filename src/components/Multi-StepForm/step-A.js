import RichText from "../Texts/RichText";
import StepChoice from "./step-choice";


export default function StepA({ error, handleStepProgression }) {
    const dataA = [{ value: 'Yes'}, { value: 'No' }];

    return(
        <div className="flex flex-col items-center justify-center space-y-12">
        <RichText 
            text="Are you an Indian Passport Holder?"
            className='font-ambit-regular text-deep-green text-4xl lg:text-7xl max-w-[90%] text-center'
        />
        <div className="flex flex-col items-center justify-center space-y-4">
            <ul className="space-y-4">
                {dataA.map(item => {

                    let value;
                    if(item.value === 'No') {
                        value = false;
                    } else {
                        value = true;
                    }
                    return(
                        <StepChoice key={item.value} handleStepProgression={handleStepProgression} value={value} item={item} />
                    )

                })}
            </ul>
            {error && (
                <p className="text-[#C80707] font-ambit-semibold text-lg text-center w-[30ch] leading-5">
                    <span>Non-Indian citizens can write to</span>
                    <a href="mailto:fundraise@akanksha.org" className="text-deep-green underline">&nbsp;fundraise@akanksha.org</a> <span>for donations.</span>
                </p>
            )}
        </div>
    </div>
    )
}