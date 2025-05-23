// app/thank-you/route.js
import { NextResponse } from 'next/server';

// Placeholder for BillDesk decryption utility - you'll need to implement this
// or use a library provided by BillDesk.
async function decryptBillDeskResponse(encryptedString) {
    // --- THIS IS WHERE YOUR ACTUAL DECRYPTION LOGIC GOES ---
    // This will involve secret keys and specific crypto algorithms from BillDesk.
    console.log("Attempting to decrypt (placeholder):", encryptedString);
    // Example: If BillDesk uses a simple pipe-separated format after decryption
    // const decrypted = actualDecryptFunction(encryptedString, process.env.BILLDESK_SECRET_KEY);
    // const parts = decrypted.split('|');
    // return {
    //   bdorderid: parts[0], // Fictional mapping
    //   status_code: parts[1],
    //   message: parts[2],
    // };

    // For now, as a placeholder until decryption is implemented:
    // If you can get ANY unencrypted field from BillDesk (e.g., if they also send an unencrypted order ID)
    // use it. Otherwise, you'll have to pass placeholders.
    // The log ONLY shows transaction_response, so decryption is key.
    return {
        status_message: 'DECRYPTION_PENDING',
        bdorderid: 'FROM_ENCRYPTED_DATA', // This needs to come from decrypted data
        // BillDesk might return a status code like '0300' for success
        payment_status_code: 'UNKNOWN', // e.g., '0300' for success, '0399' for failure
    };
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const encryptedResponse = formData.get('transaction_response')?.toString();

    console.log('[BillDesk POST Callback] Received form data keys:', Array.from(formData.keys()));
    console.log('[BillDesk POST Callback] Received encrypted transaction_response:', encryptedResponse);

    if (!encryptedResponse) {
      console.error('[BillDesk POST Callback] No transaction_response received.');
      const errorPageUrl = new URL('/thank-you', process.env.APP_BASE_URL || 'https://dev.akanksha.org');
      errorPageUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      return NextResponse.redirect(errorPageUrl.toString(), { status: 303 });
    }

    // --- DECRYPTION AND VALIDATION ---
    let decryptedData;
    try {
      decryptedData = await decryptBillDeskResponse(encryptedResponse);
      console.log('[BillDesk POST Callback] Decrypted Data (placeholder):', decryptedData);
      // TODO: Add checksum validation here if BillDesk uses it, based on decrypted or raw data.
    } catch (decryptionError) {
      console.error('[BillDesk POST Callback] Decryption/Validation failed:', decryptionError);
      const errorPageUrl = new URL('/thank-you', process.env.APP_BASE_URL || 'https://dev.akanksha.org');
      errorPageUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      if (decryptionError instanceof Error) {
        errorPageUrl.searchParams.set('error_detail', decryptionError.message);
      }
      return NextResponse.redirect(errorPageUrl.toString(), { status: 303 });
    }

    // Construct the redirect URL
    const appBaseUrl = process.env.APP_BASE_URL;
    if (!appBaseUrl) {
        console.error("CRITICAL: APP_BASE_URL environment variable is not set!");
        const errorPageUrl = new URL('/thank-you', 'https://dev.akanksha.org');
        errorPageUrl.searchParams.set('status', 'SERVER_CONFIG_ERROR');
        return NextResponse.redirect(errorPageUrl.toString(), { status: 303 });
    }
    const thankYouPageUrl = new URL('/thank-you', appBaseUrl);

    // Map BillDesk status to your application's status
    let appStatus = 'UNKNOWN';
    // This mapping depends on the fields in `decryptedData` from BillDesk
    const billdeskStatusCode = decryptedData.payment_status_code; // Example field name
    if (billdeskStatusCode === '0300') { // Common BillDesk success code
      appStatus = 'SUCCESS';
    } else if (billdeskStatusCode) { // Any other code might be a failure or pending
      appStatus = 'FAILURE'; // Or more specific based on the code
    } else {
      appStatus = 'UNKNOWN_STATUS_FROM_GATEWAY';
    }
    thankYouPageUrl.searchParams.set('status', appStatus);

    if (decryptedData.bdorderid) {
      thankYouPageUrl.searchParams.set('bdorderid', decryptedData.bdorderid.toString());
    }
    if (decryptedData.status_message) { // Or whatever field contains a human-readable message
      thankYouPageUrl.searchParams.set('gateway_message', decryptedData.status_message.toString());
    }

    console.log('[BillDesk POST Callback] Correctly Redirecting To:', thankYouPageUrl.toString());
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[BillDesk POST Callback] Outer error processing POST:', error);
    const appBaseUrl = process.env.APP_BASE_URL || 'https://dev.akanksha.org';
    const errorPageUrl = new URL('/thank-you', appBaseUrl);
    errorPageUrl.searchParams.set('status', 'GENERAL_SERVER_ERROR');
    if (error instanceof Error) {
        errorPageUrl.searchParams.set('error_detail', error.message);
    }
    return NextResponse.redirect(errorPageUrl.toString(), { status: 303 });
  }
}