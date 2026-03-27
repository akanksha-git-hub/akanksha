"use client";

import { useState } from "react";
import Button from "@/components/v2-components/buttons/button";

export default function CancelMandatePage() {
  const [mandateId, setMandateId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // actual billdesk status

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/cancel-mandate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mandateId,
          payment_method_type: paymentMethod,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      // ✅ Store exact BillDesk status
      if (data.status) {
        setStatus(data.status.toLowerCase());
      } else {
        setStatus("error");
      }

    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // 🎉 RESULT SCREEN
  if (status) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="max-w-md w-full p-8 text-center border rounded-xl shadow-sm">

          {/* Icon */}
          <div className="text-4xl mb-4">
            {status === "deleted" && "✅"}
            {status === "pending" && "⚠️"}
            {status === "error" && "❌"}
            {status !== "deleted" && status !== "pending" && status !== "error" && "ℹ️"}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">
            Status
          </h2>

          {/* Actual Status */}
          <p className="text-gray-700 mb-4 text-lg capitalize">
            {status}
          </p>

          {/* Optional Helper Text */}
          <p className="text-sm text-gray-500 mb-6">
            {status === "deleted" && "Mandate has been successfully cancelled."}
            {status === "pending" && "Action required to complete cancellation."}
            {status === "error" && "Something went wrong. Please try again."}
          </p>

          {/* Back Button */}
          <Button
            onClick={() => {
              setStatus(null);
              setMandateId("");
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // 🧾 FORM SCREEN
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="max-w-md w-full p-8 border rounded-xl shadow-sm">
        
        <h1 className="text-2xl font-semibold text-black mb-6">
          Cancel Mandate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Mandate ID */}
          <input
            value={mandateId}
            onChange={(e) => setMandateId(e.target.value)}
            placeholder="Enter mandate ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
          </select>

          {/* Submit */}
          <Button type="submit" disabled={loading}>
            {loading ? "Cancelling..." : "Cancel Mandate"}
          </Button>

        </form>
      </div>
    </div>
  );
}