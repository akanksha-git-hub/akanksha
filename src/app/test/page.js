'use client'
import Dummy from '@/components/dummy';

export default function Page() {




    return(
        // <main className='pers'>
        //     {/* <Dummy 
        //     /> */}
        //     <div className='flex flex-col items-center justify-center target border border-red-500'>
        //         {/* <p className='font-ambit-regular text-white'>
        //             MAIN SECTION
        //         </p> */}
        //         {/* <div className='cube relative h-[250px] w-[250px] border border-white'>
        //             <div 
        //                 className='front-side grid place-items-center'
        //             >
        //                 FRONT SIDE
        //             </div>
        //         </div> */}
        //         <div className='h-[250px] w-[250px] bg-blue-400 test-B'>

        //         </div>
        //         <div className='test-z h-[250px] w-[250px] bg-red-500'>

        //         </div>
        //     </div>
        //     <div className='h-[200vh]'>

        //     </div>
        // </main>
        <main className='h-screen grid place-items-center'> 
             <div className='cube relative h-[250px] w-[250px] border border-white'>
                     <div 
                        className='front-side grid place-items-center'
                    >
                        FRONT SIDE
                    </div>
                </div> 
        </main>
    )
}