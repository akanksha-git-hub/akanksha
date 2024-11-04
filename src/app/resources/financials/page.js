import RichText from "@/components/Texts/RichText";
import { maxwidth } from "@/utils/helperClasses";
import Image from "next/image";


export default function Page() {

    const desc = "The Akanksha Foundation is registered under the Societies Registration Act 1860 (Reg no MAH/ 132/91/Bombay dated 13.2.91). The MOA and Rules and Regulations of the Foundation are available on request. Akanksha is registered u/s 12A of the Income Tax Act, 1961. The 80G certificate has been renewed up to 31/03/2009 DIT (E) MC/80-G/3002/2006-07 dated. 15/12/06 Akanksha is registered under the Foreign Contributions (Regulation) Act FCRA 083780558 dated 18.2.96 for the receipt of foreign donations.Our Darpan ID is MH/2017/0167739";

    return(
        <main
            className={`${maxwidth} universal-padding`}
        >
            <div className="relative w-fit md:mx-auto">
                <RichText 
                    text={'Financials'}
                    className={`text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24`}
                />
                <RichText 
                    text={desc}
                    className='font-ambit-regular text-left md:text-center text-deep-green text-base md:text-lg md:leading-7 w-[90%] md:w-[80%] md:mx-auto mt-6'
                />
                <Image 
                    className="absolute -top-[11px] left-[2%]"
                    height={60}
                    width={60}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute -top-[75px] right-0"
                    height={144}
                    width={144}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute top-[106%] md:top-full left-[20%]"
                    height={24}
                    width={24}
                    src='/triangle.svg'
                    alt="triangle"
                />
            </div>
        </main>
    )
}