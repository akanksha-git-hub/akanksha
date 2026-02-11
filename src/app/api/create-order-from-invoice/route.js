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
    const { invoiceid, mandateid, subscription_refid,customer_refid, amount, additional_info={} ,payment = {}, device = {} } = body;

  if (
  !invoiceid ||
  !mandateid ||
  !subscription_refid ||
  !customer_refid ||
  !amount
)  {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }



    //  Build strict BillDesk SI payload
    const payload = {
  mercid: MERC_ID,
  orderid: generateOrderId(),

  subscription_refid,
  customer_refid,
  mandateid,
  invoiceid,

  amount: Number(amount).toFixed(2),
  currency: "356",
  itemcode: "DIRECT",
  txn_process_type: "si",

  additional_info: {
    additional_info1: additional_info.additional_info1 || "",
    additional_info2: additional_info.additional_info2 || "",
    additional_info3: additional_info.additional_info3 || "",
    additional_info4: additional_info.additional_info4 || "",
    additional_info5: additional_info.additional_info5 || "",
  },

  device: {
    init_channel: device.init_channel || "internet",
    ip: device.ip || "127.0.0.1",
    user_agent:
      device.user_agent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  },

  // force card for now
  // payment_method_type: "card",
};

// if (payment.payment_method_type === "card") {
//   payload.card = {
//     cardaccountid: payment.card.cardaccountid,
//      card_end:payment.card.card_end,
//   };
// }


    console.log(" Sending SI Debit Payload:", JSON.stringify(payload, null, 2));

    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

      const bdTimestamp = generateEpochTimestamp();
const bdTraceid = generateTraceId();


console.log("Debit invoice Details", {
  bdTraceid,
  bdTimestamp,
  invoiceid,
  mandateid,
  subscription_refid,
});

   const res = await fetch(BILLDESK_SI_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/jose",
    "Accept": "application/jose",
    "BD-Timestamp": bdTimestamp,
    "BD-Traceid": bdTraceid,
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
    console.log(" SI_DECODED SUCCESS:", JSON.stringify(decoded, null, 2));

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