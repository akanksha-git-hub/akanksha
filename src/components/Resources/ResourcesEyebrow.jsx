
import { useResourcesCardContext } from './ResourcesCard';
import RichText from '../Texts/RichText';
import CTA from '../UI/Button/CTA';
import { months, years } from '@/utils/months';

export default function ResourcesEyebrow({ className, isFilter }) {

    const { 
        slice, 
        showAllReducer, 
        viewAllScroll, 
        state: { isShowAll },
        handleSetMonth,
        handleSetYear,
        currentData
    } = useResourcesCardContext();

    const viewAllFunction = () => {
        viewAllScroll();
        showAllReducer(currentData);
    }

    function handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        if(name === "month") handleSetMonth(value);
        if(name === "year") handleSetYear(value);

        return;
    }


    console.log(currentData, 'CURRENT ACTIVE DATA');


  return (
        <div className={`flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:items-center xl:justify-between ${className}`}>
            <RichText 
                text={slice.primary.title || 'Title'}
                className='text-deep-green font-ambit-semibold text-4xl w-full xl:w-[20ch]'
            />
            <div className='flex items-center gap-12'>
                {isFilter && (
                    <>
                        <select onChange={handleChange} name="month">
                            <option disabled selected value className="!text-[#A9AEB6]">
                                Month
                            </option>
                            {months.map(item => <option value={item} key={item}>{item}</option>)}
                        </select>
                        <select onChange={handleChange} name="year">
                            <option disabled selected value className="!text-[#A9AEB6]">
                                Year
                            </option>
                            {years.map(item => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </>
                )}
                <CTA 
                    disabled={isShowAll}
                    onClick={viewAllFunction}
                    className='!py-2'
                    text="View all"
                />
            </div>
        </div>  
    )
}
