// File: src/app/api/billdesk-payment-return/route.js
// (Or src/app/billdesk-return/route.js if you changed the path)

import { NextResponse } from 'next/server';

// --- IMPORTANT: Placeholder for your ACTUAL BillDesk decryption utility ---
// You MUST implement this function with your BillDesk secret key and their decryption algorithm.
async function decryptBillDeskResponse(encryptedString) {
    console.log('[Decrypt Function] Received to decrypt:', encryptedString ? encryptedString.substring(0, 60) + "..." : "null or undefined");

    if (!encryptedString || typeof encryptedString !== 'string' || encryptedString.trim() === "") {
        console.error('[Decrypt Function] Error: Encrypted string is invalid or empty.');
        throw new Error("Encrypted string is invalid or empty for decryption.");
    }

    // --- YOUR ACTUAL DECRYPTION LOGIC USING BILLDESK KEYS/ALGORITHMS GOES HERE ---
    // Example of what the decrypted data might look like:
    // const decryptedPayloadString = actualBillDeskDecrypt(encryptedString, process.env.BILLDESK_DECRYPTION_KEY);
    // const decryptedData = parseDecryptedString(decryptedPayloadString); // e.g. split by '|' or parse JSON
    // return decryptedData;

    // For now, using a MOCK placeholder until real decryption is implemented.
    // This allows testing the rest of the flow.
    // In a real scenario, if decryption fails, it should throw an error.
    console.warn('[Decrypt Function] WARNING: Using MOCK decrypted data. Implement actual decryption!');
    return {
      payment_status_code: '0300', // Example: '0300' for BillDesk success
      bdorderid: 'MOCK_ORDER_' + Date.now(),
      status_message: 'Payment Processed (MOCK Decryption)',
      // Add other fields BillDesk might return after decryption
    };

    // If you want to test decryption failure, uncomment this:
    // throw new Error("Simulated Decryption Failure!");
}

export async function POST(request) {
  console.log('------------------------------------------------------');
  console.log('[BillDesk Return Handler] Received POST request at:', new Date().toISOString());
  console.log('[BillDesk Return Handler] Initial process.env.APP_BASE_URL =', process.env.APP_BASE_URL);

  let appBaseUrl = process.env.APP_BASE_URL;
  const SAFE_FALLBACK_BASE = 'https://dev.akanksha.org'; // Define a safe, hardcoded fallback

  if (!appBaseUrl || typeof appBaseUrl !== 'string' || !appBaseUrl.startsWith('http')) {
      console.error(`[BillDesk Return Handler] CRITICAL: APP_BASE_URL is invalid or not set (value: "${appBaseUrl}"). Using fallback: ${SAFE_FALLBACK_BASE}`);
      appBaseUrl = SAFE_FALLBACK_BASE;
  }
  console.log('[BillDesk Return Handler] Effective appBaseUrl =', appBaseUrl);

  try {
    console.log('[BillDesk Return Handler] Request Headers:', JSON.stringify(Object.fromEntries(request.headers), null, 2));
    
    const formData = await request.formData();
    console.log('[BillDesk Return Handler] FormData keys received:', Array.from(formData.keys()));

    const encryptedResponse = formData.get('transaction_response')?.toString(); // Standard BillDesk field name
    console.log('[BillDesk Return Handler] Raw Encrypted Response from BillDesk:', encryptedResponse ? encryptedResponse.substring(0,100) + "..." : "NOT FOUND or EMPTY");

    if (!encryptedResponse) {
      console.error('[BillDesk Return Handler] Error: No transaction_response field received in POST body.');
      const errorUrl = new URL('/thank-you', appBaseUrl); // Use validated appBaseUrl
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      errorUrl.searchParams.set('error_detail', 'Transaction response field was empty or not found.');
      console.log('[BillDesk Return Handler] Redirecting due to missing data:', errorUrl.toString());
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    let decryptedData;
    try {
      console.log('[BillDesk Return Handler] Attempting decryption...');
      decryptedData = await decryptBillDeskResponse(encryptedResponse);
      console.log('[BillDesk Return Handler] Decrypted Data:', JSON.stringify(decryptedData, null, 2));
      // TODO: Implement BillDesk Checksum Validation here if applicable, based on decryptedData or raw data.
      // If checksum fails, throw an error or redirect to a failure page.
    } catch (decryptionOrValidationError) {
      console.error('[BillDesk Return Handler] Error during Decryption or Validation:', decryptionOrValidationError);
      const errorUrl = new URL('/thank-you', appBaseUrl); // Use validated appBaseUrl
      errorUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      errorUrl.searchParams.set('error_detail', `Decryption/Validation: ${decryptionOrValidationError.message}`);
      console.log('[BillDesk Return Handler] Redirecting due to decryption/validation error:', errorUrl.toString());
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    // Construct the redirect URL for the actual thank-you page (GET request)
    console.log('[BillDesk Return Handler] Constructing thankYouPageUrl with base:', appBaseUrl, 'and path: /thank-you');
    const thankYouPageUrl = new URL('/thank-you', appBaseUrl); // appBaseUrl is now guaranteed to be valid

    let appStatus = 'UNKNOWN_GATEWAY_STATUS'; // Default if status code is missing or not recognized
    // BillDesk '0300' is typically success. Other codes might indicate failure, pending, etc.
    // Consult BillDesk documentation for their full list of response codes.
    if (decryptedData && typeof decryptedData.payment_status_code === 'string') {
        if (decryptedData.payment_status_code === '0300') {
          appStatus = 'SUCCESS';
        } else {
          appStatus = 'FAILURE'; // Or map specific BillDesk codes to more granular statuses
          // You might want to log the specific failure code from BillDesk
          console.log(`[BillDesk Return Handler] Payment not successful. BillDesk status code: ${decryptedData.payment_status_code}`);
        }
    } else if (decryptedData) {
        console.warn('[BillDesk Return Handler] payment_status_code missing or not a string in decryptedData.');
    } else {
        console.error('[BillDesk Return Handler] decryptedData is null or undefined after decryption attempt.');
    }
    thankYouPageUrl.searchParams.set('status', appStatus);

    if (decryptedData?.bdorderid) {
      thankYouPageUrl.searchParams.set('bdorderid', decryptedData.bdorderid.toString());
    }
    if (decryptedData?.status_message) {
      thankYouPageUrl.searchParams.set('gateway_message', decryptedData.status_message.toString());
    }
    // You might want to add other relevant info from decryptedData to the URL if needed by the thank-you page

    console.log('[BillDesk Return Handler] Successfully processed. Redirecting to (GET):', thankYouPageUrl.toString());
    console.log('------------------------------------------------------');
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) { // Catch-all for any truly unexpected errors in the main try block
    console.error('[BillDesk Return Handler] !!! UNHANDLED CRITICAL ERROR IN POST FUNCTION !!!:', error);
    // Fallback redirect to a generic error page
    const criticalErrorUrl = new URL('/thank-you', appBaseUrl); // appBaseUrl should be defined and validated by now
    criticalErrorUrl.searchParams.set('status', 'HANDLER_UNEXPECTED_CRASH');
    criticalErrorUrl.searchParams.set('error_detail', error.message ? error.message.substring(0,150) : 'Unknown critical error in handler.');
    console.log('[BillDesk Return Handler] Redirecting due to critical handler error:', criticalErrorUrl.toString());
    console.log('------------------------------------------------------');
    return NextResponse.redirect(criticalErrorUrl.toString(), { status: 303 });
  }
}