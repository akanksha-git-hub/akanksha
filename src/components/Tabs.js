import { PrismicNextImage } from "@prismicio/next";
import RichText from "./Texts/RichText";

export default function Tabs({ slice, handleClick, tabState }) {
    const TABS = [
      
        {
            text: slice.primary.tab_b_text,
            description: slice.primary.tab_b_description,
            icon: slice.primary.tab_b_icon
        },
        {
            text: slice.primary.tab_c_text,
            description: slice.primary.tab_c_description,
            icon: slice.primary.tab_c_icon
        },
    ];

    return (
        <ul className="flex flex-wrap gap-6 md:gap-24 md:flex-nowrap text-nowrap md:whitespace-nowrap overflow-x-hidden">
            {TABS.map((item) => (
                <li 
                    onClick={() => handleClick({ text: item.text, description: item.description })}
                    key={item.text}
                    className={`
                        flex items-center gap-2 
                        ${tabState.text === item.text ? 'opacity-100' : 'opacity-55'} 
                        transition-all cursor-pointer`
                    }
                >
                    <div className="h-[40px] w-[40px]">
                        <PrismicNextImage 
                            field={item.icon}
                            height={60}
                            width={60}
                            className="h-full w-full"
                        />
                    </div>
                    <RichText 
                        className="text-deep-green text-xl md:text-3xl font-ambit-regular font-medium"
                        text={item.text}
                    />
                </li>
            ))}
        </ul>
    );
}
