// src/app/api/create-order-from-invoice/route.js
// 💳 Executes SI debit for a given invoice (BillDesk)

import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";

// ---------------- ENV ----------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL;

// BillDesk SI Debit endpoint (UAT)
const BILLDESK_SI_ENDPOINT =
  "https://uat1.billdesk.com/u2/pgsi/ve1_2/transactions/create";

// ---------------- Helpers ----------------
function generateEpochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateTraceId() {
  return `${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
}

// ---------------- POST ----------------
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      invoiceid,
      mandateid,
      subscription_refid,
      amount,
    } = body;

    // 🔐 Validate input
    if (!invoiceid || !mandateid || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🧾 Build BillDesk debit payload
    const payload = {
      mercid: MERC_ID,
      invoiceid,
      mandateid,
      subscription_refid,
      amount: Number(amount).toFixed(2),
      currency: "356",
      ru: `${APP_URL}/api/billdesk-webhook`,
    };

    // 🔐 Prepare JWS signing key
    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };
    const secretKey = await importJWK(jwk, "HS256");

    // ✍️ Sign request
    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    // 📡 Call BillDesk
    const res = await fetch(BILLDESK_SI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        Accept: "application/jose",
        "BD-Timestamp": generateEpochTimestamp(),
        "BD-Traceid": generateTraceId(),
      },
      body: jwtToken,
    });

    const resText = await res.text();

    // 🔓 Verify BillDesk response
    const { payload: decoded } = await jwtVerify(resText, secretKey);

    // ✅ Return clean JSON to cron
    return NextResponse.json({
      success: true,
      status: "DEBIT_INITIATED",
      details: decoded,
    });

  } catch (err) {
    console.error("❌ create-order-from-invoice failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
