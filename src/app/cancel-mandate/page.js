"use client";

import { useState } from "react";
import Button from "@/components/v2-components/buttons/button";

export default function CancelMandatePage() {
  const [mandateId, setMandateId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResponse(null);

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

      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="max-w-md w-full p-8 ">
        
        <h1 className="text-2xl font-semibold text-black mb-6">
          Cancel Mandate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Mandate ID */}
          <input
            value={mandateId}
            onChange={(e) => setMandateId(e.target.value)}
            placeholder="Enter mandate ID"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
          </select>

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Cancelling..." : "Cancel Mandate"}
          </Button>
        </form>

        {/* Response Display */}
        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}