// --- START OF FILE route.js (for /api/billdesk-payment-return) ---

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

const APP_BASE_URL = process.env.APP_URL || 'https://www.akanksha.org';

export async function POST(request) {
  console.log('======================================================');
  console.log('[BillDesk Return Handler] HIT');
  console.log('Time:', new Date().toISOString());

  try {
    /* ----------------------------------------------------
     * 1️⃣ RAW VISIBILITY — NO ASSUMPTIONS
     * -------------------------------------------------- */

    console.log('🔹 HEADERS ↓↓↓');
    console.log(Object.fromEntries(request.headers.entries()));

    const clonedRequest = request.clone();
    const rawBody = await clonedRequest.text();
    console.log('🔹 RAW BODY ↓↓↓');
    console.log(rawBody);

    /* ----------------------------------------------------
     * 2️⃣ PARSE FORM DATA
     * -------------------------------------------------- */

    let formData = null;
    try {
      formData = await request.formData();
    } catch (e) {
      console.error('❌ Failed to parse formData:', e.message);
    }

    if (!formData) {
      const errorUrl = new URL('/thank-you', APP_BASE_URL);
      errorUrl.searchParams.set('status', 'INVALID_FORMDATA');
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    console.log('🧾 PARSED formData entries ↓↓↓');
    for (const [key, value] of formData.entries()) {
      console.log(`➡️ ${key}:`, value);
    }
    console.log('🧾 END formData dump');

    /* ----------------------------------------------------
     * 3️⃣ Decode mandate_response (if present)
     * -------------------------------------------------- */

    let decodedMandatePayload = null;

    const mandateResponse = formData.get('mandate_response')?.toString();

    if (mandateResponse) {
      try {
        const jwk = {
          kty: 'oct',
          k: Buffer.from(process.env.BILLDESK_SECRET).toString('base64url'),
        };
        const secretKey = await importJWK(jwk, 'HS256');

        const { payload } = await jwtVerify(mandateResponse, secretKey, {
          algorithms: ['HS256'],
        });

        decodedMandatePayload = payload;

        console.log('🔐 DECODED mandate_response ↓↓↓');
        console.log(JSON.stringify(payload, null, 2));
      } catch (e) {
        console.error('❌ Failed to decode mandate_response:', e.message);
      }
    }

    /* ----------------------------------------------------
     * 4️⃣ MANDATE FLOW → THANK YOU PAGE (SUCCESS)
     * -------------------------------------------------- */
/* ----------------------------------------------------
 * 4️⃣ MANDATE FLOW → THANK YOU PAGE (SUCCESS / FAILURE)
 * -------------------------------------------------- */

if (decodedMandatePayload?.mandateid) {

  const isMandateSuccess =
    decodedMandatePayload?.verification_error_type === 'success' ||
    decodedMandatePayload?.verification_error_code === 'MNNNN0000';

  const mandateUrl = new URL('/thank-you', APP_BASE_URL);

  mandateUrl.searchParams.set('type', 'mandate');
  mandateUrl.searchParams.set(
    'status',
    isMandateSuccess ? 'SUCCESS' : 'FAILURE'
  );

  mandateUrl.searchParams.set(
    'mandate_id',
    decodedMandatePayload.mandateid
  );

  mandateUrl.searchParams.set(
    'subscription_refid',
    decodedMandatePayload.subscription_refid
  );

  return NextResponse.redirect(mandateUrl.toString(), { status: 303 });
}

    /* ----------------------------------------------------
     * 5️⃣ ONE-TIME PAYMENT FLOW (UNCHANGED)
     * -------------------------------------------------- */

    const encryptedResponse =
      formData.get('transaction_response')?.toString();

    if (!encryptedResponse) {
      const errorUrl = new URL('/thank-you', APP_BASE_URL);
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    let decryptedData;
    try {
      const jwk = {
        kty: 'oct',
        k: Buffer.from(process.env.BILLDESK_SECRET).toString('base64url'),
      };

      const secretKey = await importJWK(jwk, 'HS256');
      const { payload } = await jwtVerify(encryptedResponse, secretKey, {
        algorithms: ['HS256'],
      });

      decryptedData = payload;

      console.log('🔐 DECODED transaction_response ↓↓↓');
      console.log(JSON.stringify(decryptedData, null, 2));
    } catch (err) {
      const failUrl = new URL('/thank-you', APP_BASE_URL);
      failUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      return NextResponse.redirect(failUrl.toString(), { status: 303 });
    }

    const thankYouPageUrl = new URL('/thank-you', APP_BASE_URL);
    const appStatus =
      decryptedData?.auth_status === '0300' ? 'SUCCESS' : 'FAILURE';

    thankYouPageUrl.searchParams.set('status', appStatus);

    if (decryptedData?.orderid) {
      thankYouPageUrl.searchParams.set('order_id', decryptedData.orderid);
    }

    if (decryptedData?.transactionid) {
      thankYouPageUrl.searchParams.set('transactionid', decryptedData.transactionid);
    }

    console.log('[Return Handler] Redirecting (ONE-TIME):', thankYouPageUrl.toString());
    console.log('======================================================');

    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[Return Handler] ❌ UNHANDLED ERROR:', error);

    const fallbackUrl = new URL('/thank-you', APP_BASE_URL);
    fallbackUrl.searchParams.set('status', 'HANDLER_CRASH');
    return NextResponse.redirect(fallbackUrl.toString(), { status: 303 });
  }
}

// --- END OF FILE route.js ---
