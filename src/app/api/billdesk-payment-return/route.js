import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

const APP_BASE_URL = 'https://dev.akanksha.org'; // 🔒 Hardcoded fallback base URL

export async function POST(request) {
  console.log('------------------------------------------------------');
  console.log('[BillDesk Return Handler] Received POST request at:', new Date().toISOString());

  try {
    console.log('[BillDesk Return Handler] Request Headers:', JSON.stringify(Object.fromEntries(request.headers), null, 2));

    const formData = await request.formData();
    console.log('[BillDesk Return Handler] FormData keys received:', Array.from(formData.keys()));

    const encryptedResponse = formData.get('transaction_response')?.toString();
    console.log('[BillDesk Return Handler] Raw Encrypted Response from BillDesk:', encryptedResponse ? encryptedResponse.substring(0, 100) + "..." : "NOT FOUND or EMPTY");

    if (!encryptedResponse) {
      console.error('[BillDesk Return Handler] Error: No transaction_response field received in POST body.');
      const errorUrl = new URL('/thank-you', APP_BASE_URL);
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      errorUrl.searchParams.set('error_detail', 'Transaction response field was empty or not found.');
      console.log('[BillDesk Return Handler] Redirecting due to missing data:', errorUrl.toString());
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    // ✅ Decrypt and verify JWS
    let decryptedData;
    try {
      console.log('[Decrypt Function] Attempting JWS verification...');
      const jwk = {
        kty: 'oct',
        k: Buffer.from(process.env.BILLDESK_SECRET).toString('base64url'),
      };
      const secretKey = await importJWK(jwk, 'HS256');

      const { payload, protectedHeader } = await jwtVerify(encryptedResponse, secretKey, {
        algorithms: ['HS256'],
      });

      console.log('[Decrypt Function] JWS verified. Header:', protectedHeader);
      console.log('[Decrypt Function] Decoded Payload:', payload);
      decryptedData = payload;
    } catch (err) {
      console.error('[Decrypt Function] ERROR: Failed to verify JWS:', err);
      const failUrl = new URL('/thank-you', APP_BASE_URL);
      failUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      failUrl.searchParams.set('error_detail', 'JWS decryption or validation failed.');
      return NextResponse.redirect(failUrl.toString(), { status: 303 });
    }

    // ✅ Redirect URL to Thank You
    const thankYouPageUrl = new URL('/thank-you', APP_BASE_URL);
    let appStatus = decryptedData?.payment_status_code === '0300' ? 'SUCCESS' : 'FAILURE';

    thankYouPageUrl.searchParams.set('status', appStatus);
    if (decryptedData?.bdorderid) {
      thankYouPageUrl.searchParams.set('bdorderid', decryptedData.bdorderid.toString());
    }
    if (decryptedData?.status_message) {
      thankYouPageUrl.searchParams.set('gateway_message', decryptedData.status_message.toString());
    }

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
