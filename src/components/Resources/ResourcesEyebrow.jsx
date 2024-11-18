
import { useResourcesCardContext } from './ResourcesCard';
import RichText from '../Texts/RichText';
import CTA from '../UI/Button/CTA';

export default function ResourcesEyebrow({ className }) {

    const { slice, showAllReducer } = useResourcesCardContext();

  return (
        <div className={`flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:items-center xl:justify-between ${className}`}>
            <RichText 
                text={slice.primary.title || 'Title'}
                className='text-deep-green font-ambit-semibold text-4xl w-full xl:w-[20ch]'
            />
            <CTA 
                onClick={() => showAllReducer(slice.primary.card_items)}
                className='!py-2'
                text={slice.primary.cta_text}
            />
        </div>  
    )
}
