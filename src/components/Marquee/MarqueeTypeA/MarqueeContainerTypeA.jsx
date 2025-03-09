import PartnerLogo from "@/components/PartnerLogo";

export default function MarqueeContainerTypeA({ items, direction }) {

    return(
        <div className="overflow-hidden py-2 whitespace-nowrap">
            <div className="marquee-container">
                <div className="marquee-items">
                <div className={`marquee-items-slide ${isRight ? 'marquee-items-slide-right' : 'marquee-items-slide-left'}`}>
                        {items.map((logo, index) => {
                            return(
                                <PartnerLogo 
                                    image={logo.partner_logo}
                                    key={index}
                                    imageClassName="h-[70%] w-[70%] object-contain"
                                    className="flex items-center justify-center border border-[#DCDCDC] mb-0 h-[8rem] w-[30%]"              
                                />
                            )
                        })}
                    </div>
                    <div className={`marquee-items-slide ${isRight ? 'marquee-items-slide-right' : 'marquee-items-slide-left'}`}>
                        {items.map((logo, index) => {
                            return(
                                <PartnerLogo 
                                    image={logo.partner_logo}
                                    key={index}
                                    imageClassName="h-[70%] w-[70%] object-contain"
                                    className="flex items-center justify-center border border-[#DCDCDC] mb-0 h-[8rem] w-[30%]"              
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}