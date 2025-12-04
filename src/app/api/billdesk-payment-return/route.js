import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";

const SECRET_KEY_STRING = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL || "http://localhost:3000";

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Check for Mandate Response vs Transaction Response
    const transactionResponse = formData.get("transaction_response");
    const mandateResponse = formData.get("mandate_response");
    const rawResponse = transactionResponse || mandateResponse;

    if (!rawResponse) {
      console.error("❌ Return Handler: No payload found.");
      return NextResponse.redirect(`${APP_URL}/?status=error&reason=no_payload`, 303);
    }

    // --- Decode & Verify JWS ---
    // We still verify to ensure a hacker isn't faking a success redirect
    const secretKey = await importJWK(
      { kty: "oct", k: Buffer.from(SECRET_KEY_STRING).toString("base64url") },
      "HS256"
    );
    const { payload } = await jwtVerify(rawResponse, secretKey);
    console.log("✅ Verified BillDesk Return Payload");

    const { status, auth_status, orderid } = payload;

    // --- Identify Flow Type & Success ---
    let success = false;
    let redirectParams = new URLSearchParams();

    // 1. IS MANDATE? (Recurring)
    if (payload.mandateid || payload.objectid === "mandate") {
      
      // Mandate Success Criteria
      success = status === "active" || status === "success" || payload.verification_error_type === "success";

      // Set Params for UI
      redirectParams.set("type", "mandate");
      redirectParams.set("sub_id", payload.subscription_refid || "NA");
      redirectParams.set("mandate_id", payload.mandateid || "NA");

    } else {
      // 2. IS ONE-TIME? (Donation)
      
      // Payment Success Criteria
      success = auth_status === "0300";

      // Set Params for UI
      redirectParams.set("type", "onetime");
      redirectParams.set("order_id", orderid || "NA");
      redirectParams.set("txn_id", payload.transactionid || "NA");
    }

    // --- Redirect to Frontend ---
    redirectParams.set("status", success ? "success" : "failed");
    
    // URL will look like: 
    // https://site.com/?status=success&type=mandate&sub_id=...&mandate_id=...
    return NextResponse.redirect(`${APP_URL}/?${redirectParams.toString()}`, 303);

  } catch (err) {
    console.error("🔥 Return Handler Error:", err.message);
    return NextResponse.redirect(`${APP_URL}/?status=error&reason=exception`, 303);
  }
}