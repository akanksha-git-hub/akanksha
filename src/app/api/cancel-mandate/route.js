// --- START OF FILE (app/api/cancel-mandate/route.js) ---
// Cancel a mandate in BillDesk UAT (for testing purposes only)

import { NextResponse } from 'next/server';
import { SignJWT, importJWK, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import path from 'path';

// --- Firebase Init ---
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === 'production') {
    serviceAccount = JSON.parse(
      readFileSync("/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json", "utf8")
    );
  } else {
    const devPath = path.resolve(process.cwd(), 'secrets', 'firebaseServiceAccount.json');
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

// --- Config ---
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const CRON_SECRET = process.env.CRON_SECRET;

// Endpoint (UAT for testing)
const BILLDESK_CANCEL_MANDATE_URL = 'https://uat1.billdesk.com/u2/pgsi/ve1_2/mandates/delete';

// --- Helper Functions ---
function generateEpochTimestampString() {
  return Math.floor(Date.now() / 1000).toString();
}
function generateTraceId() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const dateTimePart =
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());
  return `${dateTimePart}-${uuidv4().slice(0, 8).toUpperCase()}`;
}

export async function POST(req) {
  try {
    // 🔐 Auth check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { mandateid, reason_code = "USER_CANCELLED" } = body;

    if (!mandateid) {
      return NextResponse.json({ error: "mandateid is required" }, { status: 400 });
    }

    console.log(`➡️ Cancelling mandate: ${mandateid}`);

    // 🔎 Look up mandate in Firestore to fetch payment_method_type
    const mandateSnap = await db.collection("dev_mandates")
      .where("mandate_id", "==", mandateid)
      .limit(1)
      .get();

    if (mandateSnap.empty) {
      return NextResponse.json({ error: "Mandate not found in Firestore" }, { status: 404 });
    }

    const mandateData = mandateSnap.docs[0].data();
    const paymentMethodType = mandateData.payment_method_type || "upi"; // default fallback

    // Build payload
    const payloadObj = {
      mercid: MERC_ID,
      mandateid,
      payment_method_type: paymentMethodType, // ✅ required
      reason_code
    };

    // Sign with BillDesk secret
    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(payloadObj)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();

    // Call BillDesk Cancel Mandate API
    const res = await fetch(BILLDESK_CANCEL_MANDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jose',
        'Accept': 'application/jose',
        'BD-Traceid': bdTraceid,
        'BD-Timestamp': bdTimestamp,
      },
      body: jwtToken, // ✅ send the signed JWT as the body
    });

    const responseText = await res.text();
    console.log("Raw BillDesk Cancel Response:", responseText);

    let decoded;
    try {
      ({ payload: decoded } = await jwtVerify(responseText, secretKey));
    } catch (err) {
      console.error("❌ Failed to decode BillDesk cancel response:", responseText);
      return NextResponse.json({ error: "Failed to decode response", raw: responseText }, { status: 500 });
    }

    // Update Firestore mandate
    await mandateSnap.docs[0].ref.set({
      status: decoded?.status || "cancelled",
      cancelled_at: new Date().toISOString(),
      raw_cancel_response: decoded
    }, { merge: true });

    return NextResponse.json({
      success: true,
      details: decoded
    });
  } catch (err) {
    console.error("🚨 Cancel Mandate Error:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
// --- END OF FILE ---
