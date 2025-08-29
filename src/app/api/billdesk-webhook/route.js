// src/app/api/billdesk-webhook/route.js

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';
// Import our new database function
import { saveTransactionToDB } from '../../../lib/database';

export async function POST(req) {
  try {
    // --- Verification (your existing, working code) ---
    const rawBody = await req.text();
    const secretKey = await importJWK(
      {
        kty: "oct",
        k: Buffer.from(process.env.BILLDESK_SECRET).toString("base64url"),
      },
      "HS256"
    );
    const { payload } = await jwtVerify(rawBody, secretKey);
    console.log("✅ BillDesk Webhook Verified Payload:", payload);
      if (payload.mandate_id) {
      console.log("🎯 Mandate ID received:", payload.mandate_id);
      console.log("📌 Subscription Ref:", payload.subscription_refid);
      console.log("📌 Mandate Status:", payload.mandate_status);
    } else {
      console.log("ℹ️ No mandate_id in this payload (likely one-time).");
    }
    
    // --- Save to Database  ---


    // await saveTransactionToDB(payload);

    // --- Send Success Response ---
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("❌ Webhook processing or database save failed:", err.message);
    // It's important to return an error so BillDesk knows it failed
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}