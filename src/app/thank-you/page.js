"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const bdorderid = searchParams.get("bdorderid");

  if (!status) return <p className="p-8">Redirecting...</p>;

  return (
    <div className="p-12 text-center">
      {status === "SUCCESS" ? (
        <div>
          <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p className="mt-4">Your Donation ID: {bdorderid}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
          <p className="mt-4">Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
}
