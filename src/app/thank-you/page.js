import Button from "@/components/v2-components/buttons/button";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ThankYouPage({ searchParams }) {
  // Common Params
  const status = searchParams?.status || null;
  const gatewayMessage = searchParams?.gateway_message || null;
  const errorDetail = searchParams?.error_detail || null;
  const type = searchParams?.type || 'onetime'; // 'onetime' or 'mandate'

  // One-Time Params
  const order_id = searchParams?.order_id || null;
  const transactionid = searchParams?.transactionid || null; // BillDesk Transaction ID

  // Mandate Params
  const sub_id = searchParams?.sub_id || null; // Subscription Reference
  const mandate_id = searchParams?.mandate_id || null; // Mandate ID

  // --- 1. System/Server Error States ---
  if (status === 'SERVER_CONFIG_ERROR' || status === 'CALLBACK_PROCESSING_ERROR' || status === 'GENERAL_SERVER_ERROR' || status === 'HANDLER_CRASH') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">System Error 😕</h1>
          <p className="mt-4 text-lg">We encountered a problem processing your payment confirmation.</p>
          {status && <p className="text-gray-500 mt-2">Error Code: {status}</p>}
          {errorDetail && <p className="text-gray-500 mt-1">Details: {errorDetail}</p>}
          
          {/* Debug Info for User */}
          {order_id && <p className="text-gray-500 mt-1">Order Ref: {order_id}</p>}
          {sub_id && <p className="text-gray-500 mt-1">Sub Ref: {sub_id}</p>}
          
          <p className="mt-2">Please contact support if this issue persists.</p>
        </div>
      </div>
    );
  }

  // --- 2. Missing Data State ---
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
    <div className="flex items-center justify-center mt-10">
      <div className="text-center w-full">
        
        {/* --- 3. Loading / Initial State --- */}
        {!status ? (
          <div>
            <h1 className="text-2xl font-medium">Processing...</h1>
            <p className="text-gray-500 mt-2">Awaiting final status...</p>
          </div>
        ) : status === "SUCCESS" ? (
          
          // --- 4. SUCCESS UI (Both Mandate & One-Time) ---
          <div className="flex flex-col items-center justify-center px-4 text-left sm:text-center">
            {/* Top Decorative Images + Thank You */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="hidden sm:block">
                <Image src="/b-left.png" alt="Decorative icon left" width={280} height={280} className="object-contain" />
              </div>
              <h1 className="text-6xl sm:text-8xl text-black font-ambit-regular">Thank You</h1>
              <div className="hidden sm:block">
                <Image src="/r-right.png" alt="Decorative icon right" width={150} height={150} className="object-contain" />
              </div>
            </div>

            <p className="mt-4 text-4xl font-ambit-regular">
              {type === 'mandate' ? "for your monthly pledge." : "for your donation."}
            </p>

            {/* --- CONDITIONAL DETAILS --- */}
            <div className="mt-4 space-y-1">
              {type === 'mandate' ? (
                // Mandate Details
                <>
                   {sub_id && <p className="text-gray-600 text-base sm:text-lg">Subscription Reference: <span className="font-semibold">{sub_id}</span></p>}
                   {mandate_id && <p className="text-gray-600 text-base sm:text-lg">Mandate ID: <span className="font-semibold">{mandate_id}</span></p>}
                   <p className="text-deep-green mt-2 font-medium">Your monthly support has been successfully activated.</p>
                </>
              ) : (
                // One-Time Details
                <>
                  {order_id && <p className="text-gray-600 text-base sm:text-lg">Your Order ID: <span className="font-semibold">{order_id}</span></p>}
                  {transactionid && <p className="text-gray-600 text-base sm:text-lg">Payment Transaction ID: <span className="font-semibold">{transactionid}</span></p>}
                </>
              )}
            </div>

            {/* Gateway Message (if any) */}
            {gatewayMessage && (
              <p className="text-gray-500 mt-2 text-sm italic">
                Note: {gatewayMessage}
              </p>
            )}

            <Image
              src="/children.png"
              alt="Children image"
              width={800}
              height={800}
              className="object-contain mx-auto w-full max-w-[400px] sm:max-w-[800px] mt-6"
            />

            <div className="w-full flex justify-center">
              <Link href="/">
                <Button className="border border-b-2 border-black rounded-full py-2 px-4 mt-8">
                  Back to home
                </Button>
              </Link>
            </div>
          </div>

        ) : ( 
          
          // --- 5. FAILURE UI (Both Mandate & One-Time) ---
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-start justify-center w-full flex-wrap sm:flex-nowrap">

              {/* Left rain image – only on desktop */}
              <div className="hidden sm:flex">
                <Image src="/left-rain.png" alt="Decorative icon left" width={250} height={250} className="object-contain" />
              </div>

              {/* Center content */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="mt-10 w-[90%] sm:w-[60%] text-left sm:text-center">

                  {/* Left sad face */}
                  <div className="flex justify-center">
                    <Image src="/left-sad-face.svg" alt="Sad face left" width={100} height={100} className="object-contain ml-auto" />
                  </div>

                  <h1 className="mt-2 text-4xl sm:text-7xl text-black mx-auto font-ambit-regular">
                    Something went wrong
                  </h1>

                  {/* Error Message */}
                  {gatewayMessage ? (
                     <p className="text-red-500 mt-4 text-lg sm:text-2xl font-ambit-regular">
                       Reason: {gatewayMessage}
                     </p>
                  ) : (
                    <p className="text-gray-500 mt-4 text-lg sm:text-xl font-ambit-regular">
                       We couldn&apos;t process your request.
                    </p>
                  )}

                  {/* --- CONDITIONAL DETAILS (Fail) --- */}
                  <div className="mt-4 space-y-1">
                    {type === 'mandate' ? (
                       <>
                         {sub_id && <p className="text-gray-600 text-base sm:text-xl font-ambit-regular">Subscription Ref: {sub_id}</p>}
                         {mandate_id && <p className="text-gray-500 text-base sm:text-xl font-ambit-regular">Mandate ID: {mandate_id}</p>}
                       </>
                    ) : (
                       <>
                         {order_id && <p className="text-gray-600 text-base sm:text-xl font-ambit-regular">Order ID: {order_id}</p>}
                         {transactionid && <p className="text-gray-500 text-base sm:text-xl font-ambit-regular">Transaction ID: {transactionid}</p>}
                       </>
                    )}
                  </div>

                  {/* Top sad face */}
                  <div className="flex justify-center mt-2">
                    <Image src="/top-sad-face.svg" alt="Sad face top" width={100} height={100} className="object-contain mr-auto" />
                  </div>
                </div>

                <div className="mt-12 mb-8 w-full flex justify-start sm:justify-center px-4">
                  <Link href="/donate">
                    <Button>Try Again</Button>
                  </Link>
                </div>
              </div>

              {/* Right rain image – only on desktop */}
              <div className="hidden sm:flex">
                <Image src="/right-rain.svg" alt="Decorative icon right" width={250} height={250} className="object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}