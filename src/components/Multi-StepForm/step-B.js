import { useCallback, useState } from "react";
import RichText from "../Texts/RichText";


export default function StepB({ handleStepProgression, data }) {

    const choices = ['Social Media', 'Website', 'Friends', 'Others'];

    const [selected, setSelected] = useState({
        values: [],
    });

    const handleSelect = useCallback((value) => {
        setSelected(prevState => {
            const foundValue = prevState.values.includes(value);
            if(foundValue) {

                const filteredData = prevState.values.filter(item => item !== value);
                handleStepProgression([...filteredData]);
                return {
                    ...prevState,
                    values: [...filteredData],
                }

            }
            handleStepProgression([...prevState.values, value]);
            return {
                ...prevState,
                values: [...prevState.values, value]
            }
        });
    }, []);

    return(
        <div className="flex flex-col items-center justify-center space-y-12">
            <RichText 
                text={<span>How did you hear about Akanksha?<sup className="text-[#C80707]">*</sup></span>}
                className='font-ambit-regular text-deep-green text-4xl lg:text-7xl max-w-[92%] text-center'
            />
            <ul className="space-y-4">
                {choices.map((item) => {
                    return(
                        <li 
                            key={item}
                            onClick={() => handleSelect(item)}
                            className={`border-[2px] border-deep-green transition-all hover:bg-bright-yellow text-deep-green hover:scale-95
                                    w-[180px] text-xl rounded-full py-2 px-6 cursor-pointer font-ambit-semibold flex items-center justify-center ${data.includes(item) && ('bg-bright-yellow')}`}
                        >
                            {item}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}