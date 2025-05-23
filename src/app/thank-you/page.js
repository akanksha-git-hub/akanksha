export const dynamic = "force-dynamic";

export default function ThankYouPage({ searchParams }) {
  const status = searchParams?.status || null;
  const bdorderid = searchParams?.bdorderid || null;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        {!status ? (
          <div>
            <h1 className="text-2xl font-medium">Redirecting...</h1>
            <p className="text-gray-500 mt-2">Awaiting payment status from BillDesk...</p>
          </div>
        ) : status === "SUCCESS" ? (
          <div>
            <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-4 text-lg">Thank you for your donation.</p>
            {bdorderid && <p className="text-gray-600 mt-2">Order ID: {bdorderid}</p>}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
            <p className="mt-4 text-lg">Something went wrong with your payment.</p>
            {bdorderid && <p className="text-gray-600 mt-2">Order ID: {bdorderid}</p>}
            <p className="mt-2">Please try again or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}
