// src/app/billdesk-payment-return/route.js
import { NextResponse } from 'next/server';

// --- Include your BillDesk decryption utility here ---
// async function decryptBillDeskResponse(encryptedString) { /* ... */ }

export async function POST(request) {
  console.log('[BillDesk Browser Return POST] Received request');
  try {
    const formData = await request.formData();
    const encryptedResponse = formData.get('transaction_response')?.toString(); // Or whatever BillDesk calls it

    if (!encryptedResponse) {
      console.error('[BillDesk Browser Return POST] No transaction_response received.');
      // Redirect to thank-you page with an error
      const errorUrl = new URL('/thank-you', process.env.APP_BASE_URL);
      errorUrl.searchParams.set('status', 'MISSING_CALLBACK_DATA');
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    console.log('[BillDesk Browser Return POST] Encrypted Response:', encryptedResponse);

    // --- DECRYPTION & VALIDATION (Your existing logic) ---
    let decryptedData;
    try {
      // decryptedData = await decryptBillDeskResponse(encryptedResponse);
      // For now, using placeholder as decryption needs to be implemented:
      decryptedData = {
        payment_status_code: '0300', // Example: '0300' for success, '0399' for failure
        bdorderid: formData.get('bdorderid') || 'ORDER_ID_FROM_SOMEWHERE', // If BillDesk sends it unencrypted too
        status_message: 'Payment Processed (Placeholder)'
      };
      console.log('[BillDesk Browser Return POST] Decrypted Data (placeholder):', decryptedData);
      // TODO: Add actual decryption and checksum validation
    } catch (decryptionError) {
      console.error('[BillDesk Browser Return POST] Decryption/Validation failed:', decryptionError);
      const errorUrl = new URL('/thank-you', process.env.APP_BASE_URL);
      errorUrl.searchParams.set('status', 'CALLBACK_PROCESSING_ERROR');
      if (decryptionError instanceof Error) {
        errorUrl.searchParams.set('error_detail', decryptionError.message);
      }
      return NextResponse.redirect(errorUrl.toString(), { status: 303 });
    }

    // Construct the redirect URL for the actual thank-you page (GET request)
    const thankYouPageUrl = new URL('/thank-you', process.env.APP_BASE_URL);

    let appStatus = 'UNKNOWN';
    if (decryptedData.payment_status_code === '0300') { // BillDesk success code
      appStatus = 'SUCCESS';
    } else if (decryptedData.payment_status_code) {
      appStatus = 'FAILURE';
    }
    thankYouPageUrl.searchParams.set('status', appStatus);

    if (decryptedData.bdorderid) {
      thankYouPageUrl.searchParams.set('bdorderid', decryptedData.bdorderid.toString());
    }
    if (decryptedData.status_message) {
      thankYouPageUrl.searchParams.set('gateway_message', decryptedData.status_message.toString());
    }

    console.log('[BillDesk Browser Return POST] Redirecting to (GET):', thankYouPageUrl.toString());
    // 303 See Other is appropriate for changing POST to GET after processing
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[BillDesk Browser Return POST] Error processing:', error);
    const errorUrl = new URL('/thank-you', process.env.APP_BASE_URL);
    errorUrl.searchParams.set('status', 'GENERAL_SERVER_ERROR');
    if (error instanceof Error) {
        errorUrl.searchParams.set('error_detail', error.message);
    }
    return NextResponse.redirect(errorUrl.toString(), { status: 303 });
  }
}