// src/app/api/create-order-from-invoice/route.js

import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";

// ---------------- ENV ----------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL;

const BILLDESK_SI_ENDPOINT = "https://uat1.billdesk.com/u2/payments/ve1_2/transactions/create";

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
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { invoiceid, mandateid, subscription_refid, amount, donor,payment = {} } = body;

    if (!invoiceid || !mandateid || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const customer = {
  first_name: donor.name?.split(" ")[0] || "Donor",
  last_name: donor.name?.split(" ").slice(1).join(" ") || "User",
  mobile: donor.phone || "9999999999",
  email: donor.email || "test@example.com",
};


    // 🏗️ Build strict BillDesk SI payload
    const payload = {
  mercid: MERC_ID,
  orderid: generateOrderId(),
  amount: Number(amount).toFixed(2),
  currency: "356",
  itemcode: "DIRECT",
  txn_process_type: "si",

  // authentication_type: "3ds2",
  // "3ds_parameter": "merchant",

    payment_method_type: payment.payment_method_type,

// customer,
// device: {
//   init_channel: "internet",
//   browser_javascript_enabled: "true",
//   ip: req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1",
  
//   // FIX: Provide a fallback to a standard Chrome browser string if header is missing
//   user_agent: req.headers.get("user-agent") && !req.headers.get("user-agent").includes("node")
//     ? req.headers.get("user-agent") 
//     : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    
//   accept_header: req.headers.get("accept") || "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
// },


 
 
  mandateid,
  invoiceid,
  subscription_refid,

  // ru: `${APP_URL}/api/billdesk-webhook`
};

if (payment.payment_method_type === "card") {
  payload.card = {
    cardaccountid: payment.card.cardaccountid,
     card_end:payment.card.card_end,
  };
}


    console.log("🚀 Sending SI Debit Payload:", JSON.stringify(payload, null, 2));

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
    });

    const resText = await res.text();

    // If BillDesk returns a non-JWS error (rare but happens on 500s)
    if (!resText.includes('.')) {
        console.error("❌ BillDesk Raw Error (Not JWS):", resText);
        return NextResponse.json({ success: false, raw: resText }, { status: 500 });
    }

    const { payload: decoded } = await jwtVerify(resText, secretKey);
    console.log("✅ SI_DECODED SUCCESS:", JSON.stringify(decoded, null, 2));

    return NextResponse.json({
      success: true,
      status: "DEBIT_INITIATED",
      details: decoded,
    });

  } catch (err) {
    console.error("❌ create-order-from-invoice failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}