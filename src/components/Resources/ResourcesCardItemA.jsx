import Image from "next/image";

export default function ResourcesCardItemA({ item }) {


  return (
    <div className="grid grid-cols-3 place-content-between pb-12 border-b border-[#A3A19A] last:border-none">
        <div className="font-ambit-regular">
        <p className="text-deep-green text-2xl">11</p>
        <p className="text-deep-green text-5xl">November</p>
        </div>
        <div className="font-ambit-regular ">
        <p className="text-3xl w-[80%] text-deep-green">
            LNMPS Annual Showcase 2022-23
        </p>
        <p className="text-gray-400">
            Short Description
        </p>
        </div>
        <div className="flex justify-end">
        <div className="group transition-all hover:bg-bright-yellow hover:border-opacity-0 rounded-[10px] p-4 w-[400px] h-[250px] cursor-pointer border border-[#C2BFB7]">
            <div className="overflow-hidden rounded-[10px] h-full w-full relative">
            <Image 
                src='/testing-img.jpg'
                className="h-full w-full object-cover"
                height={1200}
                width={1200}
                alt=""
            />
            <div className="bg-black opacity-0 transition-all group-hover:opacity-35 absolute top-0 left-0 h-full w-full z-20" />
            <p className="bg-bright-yellow text-deep-green font-ambit-regular text-center py-2 px-4 text-base rounded-full opacity-0 transition-all z-20 absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 group-hover:opacity-100">
                View in Youtube
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}
