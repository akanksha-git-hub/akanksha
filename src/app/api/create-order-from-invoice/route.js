// src/app/api/create-order-from-invoice/route.js

import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";

// ---------------- ENV ----------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL;

// Using the PGSI endpoint for invoice-based debits
const BILLDESK_SI_ENDPOINT = "https://uat1.billdesk.com/u2/pgsi/ve1_2/transactions/create";

// ---------------- Helpers ----------------
function generateEpochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

/**
 * BillDesk Order IDs MUST be <= 20 characters.
 * 'S' (1) + 10 digits timestamp + 4 digits random = 15 chars (Safe)
 */
function generateOrderId() {
  const ts = Date.now().toString().slice(-10);
  const rand = Math.floor(1000 + Math.random() * 9000); 
  return `S${ts}${rand}`;
}

function generateTraceId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // donor object should contain: { name, email, phone }
    const { invoiceid, mandateid, subscription_refid, amount, donor } = body;

    if (!invoiceid || !mandateid || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (invoiceid, mandateid, or amount)" },
        { status: 400 }
      );
    }

    const orderDate = new Date().toISOString().split('.')[0] + 'Z';

    // 🏗️ Build payload based on BillDesk "Subsequent Charge" requirements
    const payload = {
      mercid: MERC_ID,
      orderid: generateOrderId(),
      order_date: orderDate,
      amount: Number(amount).toFixed(2),
      currency: "356",
      ru: `${APP_URL}/api/billdesk-webhook`,
      itemcode: "DIRECT",

      // 💳 SI Process Type Fields (REQUIRED)
      txn_process_type: "si",
      authentication_type: "3ds2",
      "3ds_parameter": "merchant",
      payment_method_type: "card",

      // 📜 Mandate & Invoice Linkage
      // Note: Documentation specifically uses 'invoice_id' with underscore
      invoice_id: invoiceid, 
      mandateid: mandateid,
      subscription_refid: subscription_refid,

      // 👤 Full Customer Object (REQUIRED)
      customer: {
        first_name: donor?.name?.split(' ')[0] || "Donor",
        last_name: donor?.name?.split(' ').slice(1).join(' ') || "User",
        mobile: donor?.phone || "9999999999",
        email: donor?.email || "test@example.com",
      },

      // 📱 Device block from your documentation screenshot
      device: {
        init_channel: "internet",
        ip: "127.0.0.1",
        user_agent: "AkankshaServer/1.0",
        browser_javascript_enabled: "true",
        accept_header: "text/html"
      }
    };

    console.log("🚀 Sending SI Debit Payload to BillDesk:\n", JSON.stringify(payload, null, 2));

    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    const res = await fetch(BILLDESK_SI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        "Accept": "application/jose",
        "BD-Timestamp": generateEpochTimestamp(),
        "BD-Traceid": generateTraceId(),
      },
      body: jwtToken,
      cache: 'no-store'
    });

    const resText = await res.text();

    // Check if response is JWS or plain text error
    if (!resText.includes('.')) {
        console.error("❌ BillDesk Non-JWS Error:", resText);
        return NextResponse.json({ success: false, error: "BillDesk Gateway Error", raw: resText }, { status: 500 });
    }

    const { payload: decoded } = await jwtVerify(resText, secretKey);
    
    console.log("✅ BillDesk SI Response Decoded:", JSON.stringify(decoded, null, 2));

    // Even if success, check the auth_status
    // 0300 = Success, 0399 = Pending/Initiated, 0398 = Authorization Failed
    return NextResponse.json({
      success: true,
      auth_status: decoded.auth_status,
      details: decoded,
    });

  } catch (err) {
    console.error("🚨 SI Debit Exception:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}