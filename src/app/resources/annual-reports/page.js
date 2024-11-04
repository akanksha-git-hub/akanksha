import { maxwidth } from "@/utils/helperClasses";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";

export default function Page() {

    const DATA = [
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
        {
            text: '2022-2023',
            download_link: '/dummy.pdf'
        },
    ];

    const totalLength = DATA.length - 1;

    return(
        <main className={`${maxwidth} universal-padding`}>
            <div className="relative w-fit md:mx-auto">
                <RichText 
                    text={'Annual Reports'}
                    className={`text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24`}
                />
                <Image 
                    className="absolute -top-[11px] -left-[160px]"
                    height={60}
                    width={60}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute -bottom-[11px] -right-[160px]"
                    height={44}
                    width={44}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute -top-[11px] left-0"
                    height={24}
                    width={24}
                    src='/triangle.svg'
                    alt="triangle"
                />
            </div>
            <div className="mt-12">
                <ul className="grid grid-cols-2 gap-x-12">
                    {DATA.map((item, index) => {

                        const lastItem = index === totalLength;
                        const secondLastItem = index === (totalLength - 1);

                    return (
                        <li 
                            key={index} 
                            className={`border border-[#DCDCDC] border-b-0 ${lastItem && ('!border-b')} ${secondLastItem && ('!border-b')}`}
                        >
                            <a 
                                download='ITEM'
                                className="flex items-center justify-between p-4 opacity-55 transition-all hover:opacity-100"
                                href={item.download_link}
                            >
                                <span className="font-ambit-semibold text-2xl text-deep-green hover:text-black transition-all">{item.text}</span>
                                <span>
                                    <Image  
                                        className=""
                                        height={18}
                                        width={18}
                                        src='/download.svg'
                                        alt="download"
                                    />
                                </span>
                            </a>
                        </li>
                    )})}
                </ul>
            </div>
        </main>
    )

}