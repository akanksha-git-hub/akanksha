// --- START OF FILE (app/api/mandate-sync/route.js) ---
import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import path from 'path';
import { SignJWT, importJWK, jwtVerify } from 'jose';

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
const BILLDESK_RETRIEVE_MANDATE_URL = 'https://uat1.billdesk.com/u2/pgsi/ve1_2/mandates/get';

// --- Helper functions ---
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
  return `${dateTimePart}-${Math.random().toString(36).substring(2, 10)}`;
}

export async function POST(req) {
  try {
    // 🔐 Protect API with CRON_SECRET
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🔎 Fetch all mandates
    const mandatesSnap = await db.collection('dev_mandates').get();
    if (mandatesSnap.empty) {
      return NextResponse.json({ success: true, message: 'No mandates found' });
    }

    const results = [];

    // Prepare HS256 key
    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    for (const doc of mandatesSnap.docs) {
      const mandate = doc.data();
      if (!mandate.mandate_id) {
        console.warn(`⚠️ Skipping mandate doc ${doc.id} — no mandate_id`);
        continue;
      }

      const bdTimestamp = generateEpochTimestampString();
      const bdTraceid = generateTraceId();

      // 🔑 Payload
      const payload = {
        mercid: MERC_ID,
        mandateid: mandate.mandate_id,
      };

      // 🔐 Sign JWS
      const jwtToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
        .sign(secretKey);

      // 📡 Call BillDesk
      const res = await fetch(BILLDESK_RETRIEVE_MANDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/jose',
          Accept: 'application/jose',
          'BD-Traceid': bdTraceid,
          'BD-Timestamp': bdTimestamp,
        },
        body: jwtToken,
      });

      const responseText = await res.text();
      console.log('📡 Raw BillDesk response (JWS):', responseText);

      let resJson;
      try {
        const { payload: verified } = await jwtVerify(responseText, secretKey, {
          algorithms: ['HS256'],
        });
        resJson = verified;
        console.log("✅ Decoded BillDesk response:", JSON.stringify(resJson, null, 2));
      } catch (err) {
        console.warn("❌ Could not decode BillDesk response:", err.message);
        resJson = { status: 'unknown', raw: responseText };
      }

      // Safely parse status
      let newStatus = '';
      if (typeof resJson?.status === 'string') {
        newStatus = resJson.status.toLowerCase();
      } else {
        console.warn("⚠️ Unexpected status type from BillDesk:", resJson?.status);
        newStatus = String(resJson?.status || '').toLowerCase();
      }

      if (newStatus === 'deleted' || newStatus === 'cancelled') {
        // 🗑️ Delete mandate doc
        await db.collection('dev_mandates').doc(doc.id).delete();
        results.push({
          mandate_id: mandate.mandate_id,
          status: newStatus,
          action: 'deleted_from_firestore',
        });
      } else {
        // 🔄 Update mandate doc
        await db.collection('dev_mandates').doc(doc.id).set(
          {
            status: resJson?.status || 'unknown',
            last_synced: new Date().toISOString(),
            raw_retrieve_response: resJson,
          },
          { merge: true }
        );
        results.push({
          mandate_id: mandate.mandate_id,
          status: resJson?.status,
          action: 'updated',
        });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('❌ Error in mandate sync:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
// --- END OF FILE ---

