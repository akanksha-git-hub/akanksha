
import { useResourcesCardContext } from './ResourcesCard';
import RichText from '../Texts/RichText';
import CTA from '../UI/Button/CTA';
import { months, years } from '@/utils/months';
import FilterSelector from './FilterSelector';
import { useCallback } from 'react';

export default function ResourcesEyebrow({ className, isFilter }) {

    const { 
        slice, 
        showAllReducer, 
        viewAllScroll, 
        state: { isShowAll },
        handleSetMonth,
        handleSetYear,
        currentData,
        filterValues: { year, month }
    } = useResourcesCardContext();

    const viewAllFunction = () => {
        viewAllScroll();
        showAllReducer(currentData);
    }

    const handleChange = useCallback((name, value) => {
        if(name === "month") handleSetMonth(value);
        if(name === "year") handleSetYear(value);
        return;
    }, []);


  return (
        <div className={`flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:items-center xl:justify-between ${className}`}>
            <RichText 
                text={slice.primary.title || 'Title'}
                className='text-deep-green font-ambit-semibold text-4xl w-full xl:w-[20ch]'
            />
            <div className='flex items-center gap-12'>
                {isFilter && (
                    <FilterSelector 
                        handleChange={handleChange}
                        data={{months, years}}
                    />
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
