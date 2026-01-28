// --- START OF FILE route.js (for /api/billdesk-payment-return) ---

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

// Ensure this uses process.env.APP_URL
const APP_BASE_URL = process.env.APP_URL || 'https://www.akanksha.org'; // Fallback to prod URL for safety

export async function POST(request) {
  console.log('------------------------------------------------------');
  console.log('[BillDesk Return Handler] Received POST request at:', new Date().toISOString());

  try {
    const formData = await request.formData();
    // 🔹 FIRST: detect mandate return (no transaction_response in mandate flow)
const mandateTokenId =
  formData.get('mandateTokenId') || formData.get('mandate_tokenid');

if (mandateTokenId) {
  console.log('[BillDesk Mandate Return] Mandate authorized:', mandateTokenId);

  const mandateUrl = new URL('/thank-you', APP_BASE_URL);
  mandateUrl.searchParams.set('type', 'mandate');
  mandateUrl.searchParams.set('status', 'AUTHORIZED');
  mandateUrl.searchParams.set('mandate_tokenid', mandateTokenId.toString());

  console.log('[BillDesk Mandate Return] Redirecting to:', mandateUrl.toString());
  return NextResponse.redirect(mandateUrl.toString(), { status: 303 });
}
    const encryptedResponse = formData.get('transaction_response')?.toString();

    if (!encryptedResponse) {
      console.error('[BillDesk Return Handler] Error: No transaction_response field received in POST body.');
      const errorUrl = new URL('/thank-you', APP_BASE_URL);
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      errorUrl.searchParams.set('error_detail', 'Transaction response field was empty or not found.');
      console.log('[BillDesk Return Handler] Redirecting due to missing data:', errorUrl.toString());
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
      console.log(
  '[BillDesk Return Payload]',
  JSON.stringify(decryptedData, null, 2)
);

    } catch (err) {
      console.error('[Decrypt Function] ERROR: Failed to verify JWS:', err);
      const failUrl = new URL('/thank-you', APP_BASE_URL);
      failUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      failUrl.searchParams.set('error_detail', 'JWS decryption or validation failed.');
      return NextResponse.redirect(failUrl.toString(), { status: 303 });
    }

    const thankYouPageUrl = new URL('/thank-you', APP_BASE_URL);
    let appStatus = decryptedData?.auth_status === '0300' ? 'SUCCESS' : 'FAILURE';

    thankYouPageUrl.searchParams.set('status', appStatus);
    if (decryptedData?.orderid) { // This is YOUR order ID
      thankYouPageUrl.searchParams.set('order_id', decryptedData.orderid.toString());
    }
    if (decryptedData?.bdorderid) { // BillDesk's Order ID for your order
      thankYouPageUrl.searchParams.set('bdorderid', decryptedData.bdorderid.toString());
    }
    // Check your decryptedData payload structure.
    // Based on S2S logs, it's likely `transactionid` (lowercase).
    if (decryptedData?.transactionid) { // BillDesk's Transaction ID
      thankYouPageUrl.searchParams.set('transactionid', decryptedData.transactionid.toString());
    }
    if (decryptedData?.status_message) { // This is often the same as transaction_error_desc
      thankYouPageUrl.searchParams.set('gateway_message', decryptedData.status_message.toString());
    }
    // You might also want your own order ID if it's in decryptedData.orderid
    // Usually, decryptedData.orderid IS your original order ID.

    console.log('[BillDesk Return Handler] Redirecting to:', thankYouPageUrl.toString());
    console.log('------------------------------------------------------');
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[BillDesk Return Handler] ❌ UNHANDLED ERROR:', error);
    const fallbackUrl = new URL('/thank-you', APP_BASE_URL);
    fallbackUrl.searchParams.set('status', 'HANDLER_CRASH');
    fallbackUrl.searchParams.set('error_detail', error.message?.substring(0, 150) || 'Unknown error');
    return NextResponse.redirect(fallbackUrl.toString(), { status: 303 });
  }
}
// --- END OF FILE route.js ---