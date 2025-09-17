// --- START OF FILE (app/api/cron/debit-invoices/route.js) ---
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

// --- Auth Secret for Cron ---
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(req) {
  try {
    // 🔐 Auth check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🔎 Find invoices due today & unpaid
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const invoicesSnap = await db.collection('dev_invoices')
      .where('status', '==', 'unpaid')
      .where('debit_date', '==', today)
      .get();

    if (invoicesSnap.empty) {
      return NextResponse.json({ success: true, message: 'No invoices due today' });
    }

    const results = [];

    for (const doc of invoicesSnap.docs) {
      const invoice = doc.data();

      // Build request payload for /api/create-order-from-invoice
      const payload = {
        mandateid: invoice.mandateid,
        subscription_refid: invoice.subscription_refid,
        invoiceid: doc.id, // Firestore doc ID = invoice_id
        amount: invoice.amount,
      };

      console.log('➡️ Triggering debit for invoice:', payload);

      // Call internal debit API
      const res = await fetch(`${process.env.APP_URL}/api/create-order-from-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      results.push({
        invoiceid: payload.invoiceid,
        status: res.status,
        response: resJson,
      });
    }

    return NextResponse.json({ success: true, results });

  } catch (err) {
    console.error('❌ Error in debit cron:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
// --- END OF FILE ---
