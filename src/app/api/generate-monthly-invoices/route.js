import { NextResponse } from 'next/server';
import { SignJWT, importJWK, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';

// --------------------
// Firebase init
// --------------------
if (!getApps().length) {
  let serviceAccount;

  if (process.env.NODE_ENV === 'production') {
    serviceAccount = JSON.parse(
      readFileSync(
        "/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json",
        "utf8"
      )
    );
  } else {
    const devPath = path.resolve(
      process.cwd(),
      'secrets',
      'firebaseServiceAccount.json'
    );
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }

  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// --------------------
// ENV
// --------------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const CRON_SECRET = process.env.CRON_SECRET;

const BILLDESK_INVOICE_ENDPOINT =
  'https://uat1.billdesk.com/u2/pgsi/ve1_2/invoices/create';
 


// --------------------
// Helpers
// -------------------- 
function generateEpochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateTraceId() {
  return `${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
}

function getInvoiceDates() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');

  return {
    invoice_date: `${yyyy}-${mm}-03`,
    duedate: `${yyyy}-${mm}-05`,
    debit_date: `${yyyy}-${mm}-06`,
    cycleKey: `${yyyy}-${mm}`,
  };
}

// --------------------
// POST (cron)
// --------------------
export async function POST(req) {
  try {
    // 🔐 Cron auth
    const auth = req.headers.get('authorization');
    if (!auth || auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🛑 Safety guard — only run on 3rd (FORCE ONLY FOR TESTING)
    const today = new Date().getDate();
    const FORCE_TODAY = true; // ⚠️ SET FALSE AFTER TESTING

    if (!FORCE_TODAY && today !== 3) {
      return NextResponse.json({
        success: true,
        message: 'Not invoice creation day',
      });
    }

    // 🔎 Fetch active mandates
    const mandatesSnap = await db
      .collection('dev_mandates')
      .where('status', '==', 'active')
      .get();

    if (mandatesSnap.empty) {
      return NextResponse.json({
        success: true,
        message: 'No active mandates found',
      });
    }

    const jwk = {
      kty: 'oct',
      k: Buffer.from(RAW_SECRET).toString('base64url'),
    };
    const secretKey = await importJWK(jwk, 'HS256');

    const results = [];

    for (const doc of mandatesSnap.docs) {
      const mandate = doc.data();
      const paymentMethod = mandate.raw_payload?.payment_method_type || null;

let paymentSnapshot = {
  payment_method_type: paymentMethod,
};

// 1. CARD: Absolutely need the cardaccountid
if (paymentMethod === "card") {
  paymentSnapshot.card = {
    cardaccountid: mandate.raw_payload?.card?.cardaccountid || null,
     card_end: mandate.raw_payload?.card?.masked_value?.slice(-4) || null,
  };
}

// 2. BANK / eNACH: Include the UMRN
// BillDesk doesn't require UMRN in the *request*, 
// but it's vital for reconciliation if a payment fails.
if (paymentMethod === "bankaccount") {
  paymentSnapshot.bank_umrn = mandate.raw_payload?.bank_umrn || null;
}

// 3. UPI: Nothing extra is required for the API call
// But for your own dashboard, it's nice to store the VPA
if (paymentMethod === "upi") {
  paymentSnapshot.vpa = mandate.raw_payload?.upi?.vpa || null;
}
       const donorSnapshot = {
  name: mandate.donor?.name || null,
  email: mandate.donor?.email || null,
  phone: mandate.donor?.phone || null,
  pan: mandate.donor?.pan || null,
  address: mandate.donor?.address || null,
  state: mandate.donor?.state || null,
};

      const subscription_refid = mandate.billdesk?.subscription_refid;
      const mandate_id = mandate.billdesk?.mandate_id;

      if (!subscription_refid || !mandate_id) continue;

      const { invoice_date, duedate, debit_date, cycleKey } =
        getInvoiceDates();

      // 🛑 Idempotency: one invoice per mandate per month
      const existing = await db
        .collection('dev_invoices')
        .where('subscription_refid', '==', subscription_refid)
        .where('cycleKey', '==', cycleKey)
        .limit(1)
        .get();

      if (!existing.empty) continue;

      // 🔢 Invoice numbers
      const invoice_number = `INV-${uuidv4().slice(0, 12).toUpperCase()}`;
      const invoice_display_number = `DISP-${Date.now()}`;

      // 🧾 BillDesk payload
      const payload = {
        mercid: MERC_ID,
        customer_refid: mandate.donor?.email || 'UNKNOWN',
        subscription_refid,
        mandateid: mandate_id,

        invoice_number,
        invoice_display_number, // ✅ REQUIRED BY BILLDESK

        invoice_date,
        duedate,
        debit_date,
        amount: Number(mandate.amount).toFixed(2),
        net_amount: Number(mandate.amount).toFixed(2),
        currency: '356',
        description: `Donation for ${cycleKey}`,
      };

      // 🔐 Sign JWS
      const jwtToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
        .sign(secretKey);

      // 📡 Call BillDesk
      const res = await fetch(BILLDESK_INVOICE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/jose',
          Accept: 'application/jose',
          'BD-Timestamp': generateEpochTimestamp(),
          'BD-Traceid': generateTraceId(),
        },
        body: jwtToken,
      });

      const resText = await res.text();
      const { payload: decoded } = await jwtVerify(resText, secretKey);

      // ✅ Extract REAL BillDesk invoice ID
      const billdesk_invoice_id = decoded?.invoice_id || null;

      // 💾 Save invoice (single source of truth)
      await db.collection('dev_invoices').doc(invoice_number).set({
        subscription_refid,
        mandateid: mandate_id,

        invoice_number,
        invoice_display_number,
        billdesk_invoice_id, // ✅ REAL invoice identifier
 donor: donorSnapshot,
        amount: payload.amount,
        cycleKey,
        invoice_date,
        duedate,
        debit_date,
  payment: paymentSnapshot,
        status: billdesk_invoice_id ? 'unpaid' : 'invalid',

        raw_response: decoded,
        createdAt: new Date().toISOString(),
      });

      results.push({
        subscription_refid,
        invoice_number,
        billdesk_invoice_id,
        cycleKey,
      });
    }

    return NextResponse.json({ success: true, results });

  } catch (err) {
    console.error('❌ Invoice creation failed:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
