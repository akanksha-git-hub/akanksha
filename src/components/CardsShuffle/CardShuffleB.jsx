import { cardProps } from "@/utils/helperClasses";
import { useCardsShuffleContext } from "./CardsShuffle";
import RichText from "../Texts/RichText";
import LottieContainerB from "../LottieContainer/LottieContainerB";

export default function CardShuffleB({ item, index }) {

    const { lottieRefs } = useCardsShuffleContext();

    let trackIndex = index;
    const selectIndex = trackIndex % cardProps.length;
    
  return (
    <div 
        className={
            `
            bg-deep-green h-full rounded-[10px] pt-4 ${index === 2 ? undefined : 'pr-4'} pl-4 lg:pt-0 lg:pr-0 lg:pl-0
            `
        }
        style={{background: `${cardProps[selectIndex].bg}`}}
    >
        <div 
            className="flex flex-col lg:flex-row items-start justify-between h-full relative">
            <div className="w-full lg:w-[80%] lg:h-full flex flex-col justify-between z-20 lg:p-8">
                <div className="font-ambit-regular space-y-1 lg:space-y-2">
                    <RichText
                        className='leading-3 text-xl lg:text-5xl' 
                        style={{color: `${cardProps[selectIndex].mainTitle}`}}
                        text={item.main_title}
                    />
                    <RichText 
                        className='text-xl'
                        style={{color: `${cardProps[selectIndex].smallTitle}`}}
                        text={item.small_title}
                    />
                </div>
                <RichText 
                    className='font-ambit-regular text-sm lg:text-xl max-w-[40ch]'
                    style={{color: `${cardProps[selectIndex].description}`}}
                    text={item.description}
                />
            </div>
            <div className={
                `
                 ${
                    index === 3 ? 'h-[200px] w-full' :
                    index === 2 ? 'h-[250px] w-[80%] place-self-end' : 'h-[250px] w-full' 
                } 
                    lg:absolute lg:right-0 lg:bottom-0 lg:h-full lg:w-[500px] lg:z-10 border border-red-500
                `
            }>
                <LottieContainerB 
                    ref={lottieRefs.current[index]}
                    loop={false}
                    className='h-full w-full'
                    lottieData={item.animated_icon_json_format}
                />
            </div>
        </div>
    </div>
  )
}