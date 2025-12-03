// app/api/create-mandate/route.js
import { SignJWT, importJWK, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';

// Env / config (same names as your one-time file)
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const BILLDESK_MANDATE_ENDPOINT  = process.env.BILLDESK_MANDATE_ENDPOINT ;
const APP_URL = process.env.APP_URL;

// Firebase init (same pattern as your other routes)
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

// helpers (copied style)
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

  // --- Calculate 5-year mandate end date ---
const fiveYearsLater = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 5);
  return d.toISOString().split("T")[0];
})();

  try {
    const body = await req.json();
    // Expect similar payload shape: stepC, amount, payment_method_type optional, start_date, end_date, frequency
    const {
      stepC = {},
      amount,
      user_agent = 'Unknown Browser',
      payment_method_type = null,
      start_date = null,
      end_date = null,
      frequency = 'adho',
      subscription_refid = null,
      debit_day = '1',
      amount_type = 'max'
    } = body;

    // Basic validation
    if (!amount) {
      return NextResponse.json({ error: 'amount is required' }, { status: 400 });
    }

    // ip detection (copy style)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    let clientIpAddress = '127.0.0.1';
    if (forwarded) clientIpAddress = forwarded.split(',')[0].trim();
    else if (realIp) clientIpAddress = realIp.trim();
    if (clientIpAddress && clientIpAddress.startsWith('::ffff:')) {
      clientIpAddress = clientIpAddress.substring(7);
    }

    // Create an orderId to tie the pending mandate record with this request (same pattern)
    const orderId = `AKANKSHA-MANDATE-${uuidv4().slice(0, 12).toUpperCase()}`;
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();
    const orderDate = new Date().toISOString().split('.')[0] + 'Z';

    console.log("🪵 Incoming create-mandate request body:", JSON.stringify(body, null, 2));

    // Build payload mirroring the one-time style but with mandate block and mandate_required = 'Y'
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      amount: Number(amount).toFixed(2),
      order_date: orderDate,
      currency: '356',
      ru: `${APP_URL}/api/billdesk-payment-return`,
      additional_info: {
        additional_info3: stepC.first_name || 'N/A',
        additional_info4: stepC.last_name || 'N/A',
        additional_info5: stepC.city || 'N/A',
        additional_info6: stepC.address || 'N/A',
        additional_info7: stepC.pin_code || 'N/A',
        additional_info8: stepC.pan_number || 'N/A',
        additional_info9: stepC.state || 'N/A',
      },
      customer: {
        email: stepC?.email || 'test@example.com',
        mobile: stepC?.number || '9999999999',
        name: `${stepC?.first_name || 'Test'} ${stepC?.last_name || 'User'}`,
      },
      itemcode: 'DIRECT',
      mandate_required: 'Y', // force mandate
      device: {
        init_channel: 'internet',
        ip: clientIpAddress,
        user_agent,
        accept_header: 'text/html',
      },
   mandate: {
  mercid: MERC_ID,
  amount: Number(amount).toFixed(2),
  currency: "356",
  start_date: start_date || (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  })(),
  end_date: end_date || fiveYearsLater,   // ← Updated here
  frequency: frequency || "adho",
  amount_type: amount_type || "max",
  debit_day: debit_day || "1",
  subscription_desc: "Akanksha Mandate",
  subscription_refid: subscription_refid || `SUB-${orderId}`,
  customer_refid: stepC?.email || `anon-${orderId}`,
  recurrence_rule: "after"
}

    };

    console.log('🧾 Sending Mandate Payload to BillDesk:\n', JSON.stringify(jwsPayloadObject, null, 2));

    // Save pending mandate record in Firestore BEFORE redirect (so we have a local record)
    const pendingMandate = {
      status: 'pending',
      creation_flow: 'pending',
      orderid: orderId,
      payment_method_type: payment_method_type || 'unknown',
      amount: Number(amount).toFixed(2),
      start_date: jwsPayloadObject.mandate.start_date,
      end_date: jwsPayloadObject.mandate.end_date,
      frequency: jwsPayloadObject.mandate.frequency,
      debit_day: jwsPayloadObject.mandate.debit_day,
      subscription_refid: jwsPayloadObject.mandate.subscription_refid,
      customer_refid: jwsPayloadObject.mandate.customer_refid,
      raw_request: body,
      raw_payload_sent: jwsPayloadObject,
      createdAt: new Date().toISOString(),
      is_test: process.env.TEST_MODE === 'true' ? true : false
    };

    // Use doc id = orderId for easy lookup
    await db.collection('dev_mandates').doc(orderId).set(pendingMandate);

    // Sign payload (same pattern)
    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

    const billdeskResponse = await fetch(BILLDESK_MANDATE_ENDPOINT, {
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
      // store failure response on pending mandate
      await db.collection('dev_mandates').doc(orderId).set({
        creation_flow: 'failed',
        raw_response: responseText,
        last_error: `BillDesk returned status ${billdeskResponse.status}`
      }, { merge: true });

      // attempt to parse for debugging, then return same style error
      let errorData;
      try {
        errorData = responseText.trim().startsWith('{') ? JSON.parse(responseText) : { message: responseText };
      } catch (e) {
        errorData = { message: responseText };
      }

      console.error('❌ BillDesk Error (mandate create):', { status: billdeskResponse.status, body: responseText });
      return NextResponse.json({
        error: 'BillDesk API Error',
        status: billdeskResponse.status,
        details: errorData,
        raw_response: responseText,
      }, { status: billdeskResponse.status });
    }

    // decode response and find redirect link (exact same flow as one-time)
    try {
      const { payload } = await jwtVerify(responseText, secretKey, { algorithms: ['HS256'] });
      console.log('📨 Decoded Mandate Payload:', JSON.stringify(payload, null, 2));
      const redirectLink = payload?.links?.find((link) => link.rel === 'redirect' && link.method === 'POST');

      if (!redirectLink || !redirectLink.href || !redirectLink.parameters) {
        console.warn('⚠️ Missing redirect link or parameters in BillDesk payload (mandate).');
        // update pending doc to failed-to-parse
        await db.collection('dev_mandates').doc(orderId).set({
          creation_flow: 'failed',
          raw_response_payload: payload
        }, { merge: true });

        return NextResponse.json({
          error: 'Missing redirect info',
          details: payload,
        }, { status: 500 });
      }

      // success: leave pending mandate as pending; webhook will complete
      return NextResponse.json({
        redirect_url: redirectLink.href,
        parameters: redirectLink.parameters,
        mandate_order_id: orderId
      });
    } catch (verificationError) {
      console.error('❌ Verification Failed (mandate create):', verificationError.message);
      await db.collection('dev_mandates').doc(orderId).set({
        creation_flow: 'failed',
        raw_response: responseText,
        verification_error: verificationError.message
      }, { merge: true });

      return NextResponse.json({
        error: 'Verification Failed',
        details: verificationError.message,
        raw_response: responseText,
      }, { status: 500 });
    }

  } catch (err) {
    console.error('🚨 Internal Error (create-mandate):', err);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: err.message,
    }, { status: 500 });
  }
}
