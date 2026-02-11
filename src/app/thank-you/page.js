import Button from "@/components/v2-components/buttons/button";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ThankYouPage({ searchParams }) {
  const type = searchParams?.type || null; // mandate | null
  const status = searchParams?.status || null;

  // 🔹 Mandate-only params
  const mandate_id = searchParams?.mandate_id || null;
  const subscription_refid = searchParams?.subscription_refid || null;

  // 🔹 One-time params (UNCHANGED)
  const order_id = searchParams?.order_id || null;
  const bdorderid = searchParams?.bdorderid || null;
  const transactionid = searchParams?.transactionid || null;
  const gatewayMessage = searchParams?.gateway_message || null;
  const errorDetail = searchParams?.error_detail || null;

  /* -----------------------------
   * SYSTEM / SERVER ERRORS
   * ----------------------------- */
  if (
    status === "SERVER_CONFIG_ERROR" ||
    status === "CALLBACK_PROCESSING_ERROR" ||
    status === "GENERAL_SERVER_ERROR" ||
    status === "HANDLER_CRASH"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">System Error 😕</h1>
          <p className="mt-4 text-lg">
            We encountered a problem processing your payment confirmation.
          </p>
          {status && <p className="text-gray-500 mt-2">Error Code: {status}</p>}
          {errorDetail && (
            <p className="text-gray-500 mt-1">Details: {errorDetail}</p>
          )}
          {order_id && (
            <p className="text-gray-500 mt-1">Our Order Ref: {order_id}</p>
          )}
          {transactionid && (
            <p className="text-gray-500 mt-1">
              Payment Ref: {transactionid}
            </p>
          )}
          <p className="mt-2">Please contact support if this issue persists.</p>
        </div>
      </div>
    );
  }

  /* -----------------------------
   * MISSING CALLBACK DATA
   * ----------------------------- */
  if (status === "MISSING_CALLBACK_DATA") {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Information Missing
          </h1>
          <p className="mt-4 text-lg">
            We did not receive complete information from the payment gateway.
          </p>
          {order_id && (
            <p className="text-gray-500 mt-1">Our Order Ref: {order_id}</p>
          )}
          {transactionid && (
            <p className="text-gray-500 mt-1">
              Payment Ref: {transactionid}
            </p>
          )}
          <p className="mt-2">Please contact support.</p>
        </div>
      </div>
    );
  }

  /* -----------------------------
   * MAIN VIEW
   * ----------------------------- */
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="text-center">
        {!status ? (
          /* -----------------------------
           * PENDING STATE
           * ----------------------------- */
          <div>
            <h1 className="text-2xl font-medium">Processing Payment...</h1>
            <p className="text-gray-500 mt-2">
              Awaiting final payment status...
            </p>
            {order_id && (
              <p className="text-gray-400 mt-1 text-sm">
                Tracking Order: {order_id}
              </p>
            )}
          </div>
        ) : status === "SUCCESS" ? (
          /* -----------------------------
           * SUCCESS STATE
           * ----------------------------- */
          <div className="flex flex-col items-center justify-center px-4 text-left sm:text-center">
            {/* Decorative Header */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="hidden sm:block">
                <Image
                  src="/b-left.png"
                  alt="Decorative icon left"
                  width={280}
                  height={280}
                />
              </div>

              <h1 className="text-6xl sm:text-8xl text-black font-ambit-regular">
                Thank You
              </h1>

              <div className="hidden sm:block">
                <Image
                  src="/r-right.png"
                  alt="Decorative icon right"
                  width={150}
                  height={150}
                />
              </div>
            </div>

            <p className="mt-4 text-4xl font-ambit-regular">
              for your donation.
            </p>

            {/* 🔹 MANDATE SUCCESS (NEW, SAFE) */}
            {type === "mandate" && mandate_id && subscription_refid && (
              <div className="mt-4 text-gray-700 text-base sm:text-lg space-y-1">
                <p>
                  <span className="font-medium">Mandate ID:</span>{" "}
                  {mandate_id}
                </p>
                <p>
                  <span className="font-medium">Subscription ID:</span>{" "}
                  {subscription_refid}
                </p>
              </div>
            )}

            {/* 🔹 ONE-TIME SUCCESS (UNCHANGED) */}
            {type !== "mandate" && order_id && (
              <p className="text-gray-600 mt-2 text-base sm:text-lg">
                Your Order ID: {order_id}
              </p>
            )}
            {type !== "mandate" && transactionid && (
              <p className="text-gray-600 mt-1 text-base sm:text-lg">
                Payment Transaction ID: {transactionid}
              </p>
            )}
            {gatewayMessage && (
              <p className="text-gray-500 mt-1 text-base sm:text-lg">
                Message: {gatewayMessage}
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
          /* -----------------------------
           * FAILURE STATE (UNCHANGED)
           * ----------------------------- */
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-start justify-center w-full flex-wrap sm:flex-nowrap">
              <div className="hidden sm:flex">
                <Image
                  src="/left-rain.png"
                  alt="Decorative icon left"
                  width={250}
                  height={250}
                />
              </div>

              <div className="relative flex flex-col items-center justify-center">
                <div className="mt-10 w-[90%] sm:w-[60%] text-left sm:text-center">
                  <div className="flex justify-center">
                    <Image
                      src="/left-sad-face.svg"
                      alt="Decorative icon sad face left"
                      width={100}
                      height={100}
                    />
                  </div>

                  <h1 className="mt-2 text-4xl sm:text-7xl text-black mx-auto font-ambit-regular">
                    Something went wrong
                  </h1>

                  {gatewayMessage && (
                    <p className="text-gray-500 mt-4 text-lg sm:text-2xl">
                      Message: {gatewayMessage}
                    </p>
                  )}
                  {order_id && (
                    <p className="text-gray-600 mt-2 text-base sm:text-xl">
                      Your Order ID: {order_id}
                    </p>
                  )}
                  {transactionid && (
                    <p className="text-gray-500 mt-1 text-base sm:text-xl">
                      Payment Transaction ID: {transactionid}
                    </p>
                  )}

                  <div className="flex justify-center mt-2">
                    <Image
                      src="/top-sad-face.svg"
                      alt="Decorative icon sad face top"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>

                <div className="mt-12 mb-8 w-full flex justify-start sm:justify-center px-4">
                  <Link href="/donate">
                    <Button>Try Again</Button>
                  </Link>
                </div>
              </div>

              <div className="hidden sm:flex">
                <Image
                  src="/right-rain.svg"
                  alt="Decorative icon right"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
