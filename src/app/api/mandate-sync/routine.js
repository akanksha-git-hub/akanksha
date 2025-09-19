// --- START OF FILE (app/api/mandate-sync/route.js) ---
import { NextResponse } from 'next/server';
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
const MERC_ID = process.env.BILLDESK_MERC_ID;
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
    // 🔐 Auth check
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

    for (const doc of mandatesSnap.docs) {
      const mandate = doc.data();
      if (!mandate.mandate_id) {
        console.warn(`⚠️ Skipping mandate doc ${doc.id} — no mandate_id`);
        continue;
      }

      const bdTimestamp = generateEpochTimestampString();
      const bdTraceid = generateTraceId();

      // Build request
      const payload = {
        mercid: MERC_ID,
        mandateid: mandate.mandate_id,
      };

      const res = await fetch(BILLDESK_RETRIEVE_MANDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'BD-Traceid': bdTraceid,
          'BD-Timestamp': bdTimestamp,
        },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      const newStatus = resJson?.status?.toLowerCase();

      if (newStatus === 'deleted' || newStatus === 'cancelled') {
        // 🗑️ Delete the mandate doc
        await db.collection('dev_mandates').doc(doc.id).delete();

        results.push({
          mandate_id: mandate.mandate_id,
          status: newStatus,
          action: 'deleted_from_firestore',
        });
      } else {
        // 🔄 Update Firestore with latest status
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
