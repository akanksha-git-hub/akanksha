// --- START OF FILE route.js (e.g., app/api/create-order-from-invoice/route.js) ---
// This file is a dedicated test for triggering a server-to-server recurring debit.

import { SignJWT, importJWK, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;

// ✅ We are using the main Create Order endpoint, as it's likely the universal one.
const BILLDESK_ENDPOINT = process.env.BILLDESK_ENDPOINT;

// --- Helper Functions (no changes needed) ---
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
    // 🔹 Step 1: Get the required IDs for a recurring debit from the request body.
    const { mandateid, customer_refid, amount } = body;

    if (!mandateid || !customer_refid || !amount) {
      return NextResponse.json(
        { error: 'Request body must contain mandateid, customer_refid, and amount' },
        { status: 400 }
      );
    }

    const orderId = `AK-DEBIT-${uuidv4().slice(0, 12).toUpperCase()}`;
    const orderDate = new Date().toISOString().split('.')[0] + 'Z';

    console.log('🪵 Incoming server-to-server debit request:', JSON.stringify(body, null, 2));

    // 🔹 Step 2: Build the payload for a RECURRING DEBIT.
    // This is different from a new order. It references existing IDs and has no user info.
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      order_date: orderDate,
      
      // --- The most important fields for a recurring debit ---
      mandate: {
        mandateid: mandateid,
      },
      customer_refid: customer_refid,
      // --- End of important fields ---

      amount: Number(amount).toFixed(2),
    itemcode: 'DIRECT',

      currency: '356',
      ru: `${process.env.APP_URL}/api/billdesk-webhook`, // Webhook for final status
      description: `Test debit for mandate ${mandateid}`,
      // ❗ NOTE: We have intentionally REMOVED the 'device' and 'customer' objects
      // because there is no user present for a server-to-server call.
    };

    console.log('🧾 Sending RECURRING DEBIT Payload to BillDesk:\n', JSON.stringify(jwsPayloadObject, null, 2));

    // 🔹 Step 3: Sign and send the request (same as before)
    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS265');

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

    // Error handling (same as before)
    if (!billdeskResponse.ok) {
        // ... (This error handling block is good, no changes needed)
        console.error('❌ BillDesk API returned an error.');
         try {
            const { payload: decodedError } = await jwtVerify(responseText, secretKey);
            console.error('🪵 Decoded BillDesk Error:', JSON.stringify(decodedError, null, 2));
             return NextResponse.json({ error: 'BillDesk API Error', details: decodedError }, { status: billdeskResponse.status });
         } catch (e) {
             console.error('Could not decode error response.');
             return NextResponse.json({ error: 'BillDesk API Error', raw_response: responseText }, { status: billdeskResponse.status });
         }
    }

    // 🔹 Step 4: Handle the SUCCESS response.
    // We expect a status object, NOT a redirect link.
    const { payload } = await jwtVerify(responseText, secretKey);

    console.log('✅ SUCCESS! Decoded BillDesk Debit Response:', JSON.stringify(payload, null, 2));

    if (payload.next_step === 'redirect') {
        console.warn('⚠️ BillDesk requested a redirect. This is NOT a successful server-to-server debit.');
        return NextResponse.json({
            warning: 'This was not a true debit. BillDesk is asking for user interaction.',
            details: payload,
        }, { status: 200 });
    }

    // This is the ideal successful response
    return NextResponse.json({
      success: true,
      status: 'DEBIT_INITIATED',
      details: payload,
    });

  } catch (err) {
    console.error('🚨 Internal Server Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}

// --- END OF FILE route.js ---