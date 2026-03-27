"use client";

import { useState } from "react";
import Button from "@/components/v2-components/buttons/button";

export default function CancelMandatePage() {
  const [mandateId, setMandateId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | pending | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);
    setMessage("");

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

      // ✅ Handle response properly
      if (data.status === "deleted") {
        setStatus("success");
        setMessage("Mandate cancelled successfully ✅");
      } else if (data.status === "pending") {
        setStatus("pending");
        setMessage("Mandate cancellation pending approval ⚠️");
      } else {
        setStatus("error");
        setMessage("Something went wrong ❌");
      }

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🎉 SUCCESS / RESULT SCREEN
  if (status) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="max-w-md w-full p-8 text-center border rounded-xl shadow-sm">

          {/* Icon */}
          <div className="text-4xl mb-4">
            {status === "success" && "✅"}
            {status === "pending" && "⚠️"}
            {status === "error" && "❌"}
          </div>

          {/* Message */}
          <h2 className="text-xl font-semibold mb-2">
            {status === "success" && "Success"}
            {status === "pending" && "Pending"}
            {status === "error" && "Error"}
          </h2>

          <p className="text-gray-600 mb-6">{message}</p>

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

  // 🧾 FORM
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