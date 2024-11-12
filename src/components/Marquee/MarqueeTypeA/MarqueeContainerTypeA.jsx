import PartnerLogo from "@/components/PartnerLogo";

export default function MarqueeContainerTypeA({ items }) {


    return(
        <div className="overflow-hidden py-2 whitespace-nowrap">
            <div className="marquee-container">
                <div className="marquee-items">
                    <div className="marquee-items-slide marquee-items-slide-left">
                        {items.map((logo, index) => {
                            return(
                                <PartnerLogo 
                                    image={logo.partner_logo}
                                    key={index}
                                    imageClassName="h-[70%] w-[70%] object-contain"
                                    className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[4rem] w-2/4 sm:h-[8rem] md:w-[30%] lg:w-[20%]"              
                                />
                            )
                        })}
                    </div>
                    <div className="marquee-items-slide marquee-items-slide-left">
                        {items.map((logo, index) => {
                            return(
                                <PartnerLogo 
                                    image={logo.partner_logo}
                                    key={index}
                                    imageClassName="h-[70%] w-[70%] object-contain"
                                    className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[4rem] w-2/4 sm:h-[8rem] md:w-[30%] lg:w-[20%]"              
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}