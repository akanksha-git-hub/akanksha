import Button from "@/components/v2-components/buttons/button";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ThankYouPage({ searchParams }) {
  const status = searchParams?.status || null;
  const bdorderid = searchParams?.bdorderid || null;
  const gatewayMessage = searchParams?.gateway_message || null; // If you add this from route.js
  const errorDetail = searchParams?.error_detail || null; // If you add this from route.js

  // You can add more sophisticated loading/error display based on status
  if (status === 'SERVER_CONFIG_ERROR' || status === 'CALLBACK_PROCESSING_ERROR' || status === 'GENERAL_SERVER_ERROR') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">System Error 😕</h1>
          <p className="mt-4 text-lg">We encountered a problem processing your payment confirmation.</p>
          {status && <p className="text-gray-500 mt-2">Error Code: {status}</p>}
          {errorDetail && <p className="text-gray-500 mt-1">Details: {errorDetail}</p>}
          <p className="mt-2">Please contact support if this issue persists.</p>
        </div>
      </div>
    );
  }

  if (status === 'MISSING_CALLBACK_DATA') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Information Missing</h1>
          <p className="mt-4 text-lg">We did not receive complete information from the payment gateway.</p>
          <p className="mt-2">Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center  mt-10">
      <div className="text-center">
        {!status ? (
          <div>
            <h1 className="text-2xl font-medium">Processing Payment...</h1>
            <p className="text-gray-500 mt-2">Awaiting final payment status...</p>
            
          </div>
        ) : status === "SUCCESS" ? (
          <div>
            <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-4 text-lg">Thank you for your donation.</p>
            {bdorderid && <p className="text-gray-600 mt-2">Order ID: {bdorderid}</p>}
            {gatewayMessage && <p className="text-gray-500 mt-1">Message: {gatewayMessage}</p>}
          </div>
        ) : ( // Covers "FAILURE" and any other non-success, non-specific error statuses
          
            <div className="flex flex-col items-center   ">
              <div className="flex flex-row items-start justify-center  w-full">
                    <div className="flex"> {/* pt-5 to roughly align with text baseline if needed, adjust */}
                <Image
                  src="/left-rain.png" // Replace with your actual image path
                  alt="Decorative icon left"
                  width={250} // Adjusted size for example
                  height={250}
                  className="object-contain"
                />
              </div>
                    <div className="relative flex flex-col  items-center justify-center ">
                      <div className="mt-10  w-[60%]">
                         <Image
                  src="/left-sad-face.svg" // Replace with your actual image path
                  alt="Decorative icon right"
                  width={100} // Adjusted size for example
                  height={100}
                  className="ml-auto object-contain"
                />
                        <h1 className=" mt-2 text-7xl  text-black mx-auto   font-ambit-regular">Something went wrong </h1>
           {bdorderid && <p className="text-gray-600 mt-4 text-2xl font-ambit-regular">Order ID: {bdorderid}</p>}
            {gatewayMessage && <p className="text-gray-500 mt-4 text-2xl font-ambit-regular">Message: {gatewayMessage}</p>}
           <Image
                  src="/top-sad-face.svg" // Replace with your actual image path
                  alt="Decorative icon right"
                  width={100} // Adjusted size for example
                  height={100}
                  className="mr-auto object-contain"
                />
            </div>
             <div className="mt-20">
              <Link href="/donate  ">
            <Button>Retry Again</Button>
            </Link>
            </div>
            </div>
                  <div className="flex"> {/* pt-5 to roughly align with text baseline if needed, adjust */}
                <Image
                  src="/right-rain.svg" // Replace with your actual image path
                  alt="Decorative icon right"
                  width={250} // Adjusted size for example
                  height={250}
                  className="object-contain"
                />
              </div>
                </div>
                </div>
        
            
           
          
        )}
      </div>
    </div>
  );
}