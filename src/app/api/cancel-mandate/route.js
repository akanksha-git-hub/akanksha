// --- START OF FILE (app/api/cancel-mandate/route.js) ---
import { NextResponse } from 'next/server';
import { SignJWT, importJWK, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import path from 'path';

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

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const CRON_SECRET = process.env.CRON_SECRET;

const BILLDESK_CANCEL_MANDATE_URL = 'https://uat1.billdesk.com/u2/pgsi/ve1_2/mandates/delete';

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

    // 🔎 Fetch mandate from Firestore
    const mandateSnap = await db.collection("dev_mandates")
      .where("mandate_id", "==", mandateid)
      .limit(1)
      .get();

    if (mandateSnap.empty) {
      return NextResponse.json({ error: "Mandate not found in Firestore" }, { status: 404 });
    }

    const mandateData = mandateSnap.docs[0].data();
    const paymentMethodType = mandateData.payment_method_type;

    if (!paymentMethodType) {
      console.error("❌ No payment_method_type found in mandate doc:", mandateid);
      return NextResponse.json({ error: "Missing payment_method_type in Firestore" }, { status: 500 });
    }

    console.log(`✅ Using payment_method_type: ${paymentMethodType}`);

    const payloadObj = {
      mercid: MERC_ID,
      mandateid,
      payment_method_type: paymentMethodType,
      reason_code
    };

    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(payloadObj)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();

    const res = await fetch(BILLDESK_CANCEL_MANDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jose',
        'Accept': 'application/jose',
        'BD-Traceid': bdTraceid,
        'BD-Timestamp': bdTimestamp,
      },
      body: jwtToken,
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
