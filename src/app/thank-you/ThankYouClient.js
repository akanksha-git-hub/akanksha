"use client";
import { useSearchParams } from "next/navigation";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const bdorderid = searchParams.get("bdorderid");

  if (!status) return <p>Redirecting...</p>;

  return (
    <div className="text-center">
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
