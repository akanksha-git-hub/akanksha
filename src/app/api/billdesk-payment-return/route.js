// --- START OF FILE route.js (for /api/billdesk-payment-return) ---

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

// Ensure this uses process.env.APP_URL
const APP_BASE_URL = process.env.APP_URL || 'https://www.akanksha.org';

export async function POST(request) {
  console.log('------------------------------------------------------');
  console.log('[BillDesk Return Handler] Received POST request at:', new Date().toISOString());

  try {
    const formData = await request.formData();
    
    // Check for either One-Time (transaction_response) or Mandate (mandate_response)
    const transactionResponse = formData.get('transaction_response')?.toString();
    const mandateResponse = formData.get('mandate_response')?.toString();
    const encryptedResponse = transactionResponse || mandateResponse;

    if (!encryptedResponse) {
      console.error('[BillDesk Return Handler] Error: No payload received.');
      const errorUrl = new URL('/thank-you', APP_BASE_URL);
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    // --- Decryption ---
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
      console.log("✅ Decoded Payload:", JSON.stringify(decryptedData, null, 2));
    } catch (err) {
      console.error('[Decrypt Function] ERROR: Failed to verify JWS:', err);
      const failUrl = new URL('/thank-you', APP_BASE_URL);
      failUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      return NextResponse.redirect(failUrl.toString(), { status: 303 });
    }

    // --- Logic for Mandate vs One-Time ---
    const thankYouPageUrl = new URL('/thank-you', APP_BASE_URL);
    
    let appStatus = 'FAILURE'; // Default
    let isMandate = false;

    // Check if it's a Mandate based on ID presence or object type
    if (decryptedData.mandateid || decryptedData.objectid === 'mandate') {
        isMandate = true;
        thankYouPageUrl.searchParams.set('type', 'mandate');

        // MANDATE Success Logic: Status is 'active', 'success', or verification success
        if (
            decryptedData.status === 'active' || 
            decryptedData.status === 'success' || 
            decryptedData.verification_error_type === 'success'
        ) {
            appStatus = 'SUCCESS';
        }

        // Add Mandate Specific Params
        if (decryptedData.subscription_refid) {
            thankYouPageUrl.searchParams.set('sub_id', decryptedData.subscription_refid);
        }
        if (decryptedData.mandateid) {
            thankYouPageUrl.searchParams.set('mandate_id', decryptedData.mandateid);
        }

    } else {
        isMandate = false;
        thankYouPageUrl.searchParams.set('type', 'onetime');

        // ONE-TIME Success Logic: auth_status must be '0300'
        if (decryptedData.auth_status === '0300') {
            appStatus = 'SUCCESS';
        }

        // Add One-Time Specific Params
        if (decryptedData.transactionid) {
            thankYouPageUrl.searchParams.set('transactionid', decryptedData.transactionid);
        }
        if (decryptedData.orderid) {
            thankYouPageUrl.searchParams.set('order_id', decryptedData.orderid);
        }
    }

    // Common Params
    thankYouPageUrl.searchParams.set('status', appStatus);
    
    // Add Gateway Message if available (Error description or Status message)
    const msg = decryptedData.transaction_error_desc || decryptedData.verification_error_desc || decryptedData.status_message;
    if (msg) {
        thankYouPageUrl.searchParams.set('gateway_message', msg);
    }

    console.log(`[BillDesk Return Handler] Redirecting to (${appStatus}):`, thankYouPageUrl.toString());
    console.log('------------------------------------------------------');
    
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[BillDesk Return Handler] ❌ UNHANDLED ERROR:', error);
    const fallbackUrl = new URL('/thank-you', APP_BASE_URL);
    fallbackUrl.searchParams.set('status', 'HANDLER_CRASH');
    return NextResponse.redirect(fallbackUrl.toString(), { status: 303 });
  }
}
// --- END OF FILE route.js ---