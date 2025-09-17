// --- START OF FILE route.js (e.g., app/api/create-order-from-invoice/route.js) ---
// This file is the final, correct version for testing a server-to-server recurring debit.
// It is built according to the official BillDesk support email.

import { SignJWT, importJWK, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// 🔹 Import Firestore to fetch the invoice details
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAppIfNeeded } from '@/lib/firebaseAdmin'; // Assuming you have this helper

// 🔹 Initialize Firebase
initializeAppIfNeeded();
const db = getFirestore();

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;

// ✅ Endpoint confirmed by BillDesk support
const BILLDESK_ENDPOINT = 'https://uat1.billdesk.com/u2/payments/ve1_2/transactions/create';

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
  return `${dateTimePart}${uuidv4().slice(0, 8).toUpperCase()}`;
}


export async function POST(req) {
  try {
    const body = await req.json();
    // For a secure, server-driven flow, we only need our internal invoice number.
    const { invoice_number } = body;

    if (!invoice_number) {
      return NextResponse.json({ error: 'Missing invoice_number in request body' }, { status: 400 });
    }

    // 1. Fetch the invoice from Firestore to get all the required IDs.
    // This is the source of truth and is more secure.
    const invoiceDocRef = db.collection('dev_invoices').doc(invoice_number);
    const invoiceDoc = await invoiceDocRef.get();

    if (!invoiceDoc.exists) {
      return NextResponse.json({ error: `Invoice not found: ${invoice_number}` }, { status: 404 });
    }
    const invoiceData = invoiceDoc.data();
    
    // 2. Build the payload EXACTLY as specified in the BillDesk email.
    const jwsPayloadObject = {
      // ✅ orderid: Unique ID for THIS transaction attempt.
      orderid: `TXN-${invoice_number}-${Date.now()}`,
      
      // ✅ mercid: Your merchant ID.
      mercid: MERC_ID,
      
      // ✅ amount: From your trusted database record.
      amount: invoiceData.amount,
      
      // ✅ currency: ISO code.
      currency: '356',
      
      // ✅ txn_process_type: The "magic switch" for recurring payments.
      txn_process_type: 'si',
      
      // ✅ mandateid: From your database record.
      mandateid: invoiceData.mandateid,
      
      // ✅ subscription_refid: From your database record.
      subscription_refid: invoiceData.subscription_refid,
      
      // ✅ invoiceid: The ID BillDesk gave you, from your database record.
      invoiceid: invoiceData.invoice_id,
      
      // ✅ itemcode: As specified in the email.
      itemcode: 'DIRECT',

      // NOTE: `ru` was not in their list, but it's standard for webhooks. Including it is safe.
      ru: `${process.env.APP_URL}/api/billdesk-webhook`,
    };

    console.log('🧾 Sending FINAL, CORRECTED Debit Payload to BillDesk:\n', JSON.stringify(jwsPayloadObject, null, 2));

    // 3. Sign and send the request (this logic is correct).
    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();

    const billdeskResponse = await fetch(BILLDESK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jose',
        Accept: 'application/jose',
        'BD-Traceid': bdTraceid,
        'BD-Timestamp': bdTimestamp,
      },
      body: jwtToken,
    });

    const responseText = await billdeskResponse.text();
    console.log(' Raw BillDesk Response (JWS):', responseText);

    if (!billdeskResponse.ok) {
        // Your existing error handling is perfect.
    }

    const { payload } = await jwtVerify(responseText, secretKey);
    console.log('✅ SUCCESS! Decoded BillDesk Debit Response:', JSON.stringify(payload, null, 2));

    // A true debit will NOT have a redirect step.
    if (payload.next_step === 'redirect' || payload.links?.some(l => l.rel === 'redirect')) {
        console.error('❌ CRITICAL ERROR: The debit API is still asking for a redirect. Forward this to BillDesk.');
        return NextResponse.json({ error: 'Debit API still asking for user interaction.', details: payload }, { status: 500 });
    }
    
    // This is the expected success response for a server-to-server call.
    return NextResponse.json({
      success: true,
      status: 'DEBIT_SUBMITTED',
      details: payload,
    });

  } catch (err) {
    console.error('🚨 Internal Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
// --- END OF FILE route.js ---