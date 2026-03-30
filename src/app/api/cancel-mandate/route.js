import { SignJWT, importJWK, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;

const BILLDESK_DELETE_URL =
  "https://api.billdesk.com/pgsi/ve1_2/mandates/delete";

function generateTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

// ✅ Trace ID
function generateTraceId() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds()) +
    uuidv4().slice(0, 6)
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { mandateId, payment_method_type = "upi" } = body;

    if (!mandateId) {
      return NextResponse.json(
        { error: "mandateId is required" },
        { status: 400 }
      );
    }

    // ✅ Payload
    const payload = {
      mercid: MERC_ID,
      mandateid: mandateId,
      payment_method_type,
    };

    console.log("🧾 Delete Mandate Payload:", payload);

    // 🔐 JOSE key
    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };

    const secretKey = await importJWK(jwk, "HS256");

    // 🔐 Sign JWT
    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
        clientid: CLIENT_ID,
      })
      .sign(secretKey);

    const traceId = generateTraceId();
    const timestamp = generateTimestamp();

    console.log("🧠 Headers:", { traceId, timestamp });

    // 🚀 Call BillDesk
    const response = await fetch(BILLDESK_DELETE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        Accept: "application/jose",
        "BD-Traceid": traceId,
        "BD-Timestamp": timestamp,
      },
      body: jwtToken,
    });

    const responseText = await response.text();

    console.log("📦 Raw Response:", responseText);
    console.log("📡 HTTP Status:", response.status);

    // ✅ Decode response
    try {
      const { payload: decoded } = await jwtVerify(responseText, secretKey, {
        algorithms: ["HS256"],
      });

      console.log("✅ Decoded Response:", decoded);

      return NextResponse.json(decoded);
    } catch (err) {
      console.error("❌ Decode failed:", err.message);

      return NextResponse.json({
        error: "Decode failed",
        raw_response: responseText,
        status: response.status,
      });
    }

  } catch (err) {
    console.error("🚨 Internal Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}