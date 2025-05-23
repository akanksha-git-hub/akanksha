// app/thank-you/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // BillDesk usually sends data as 'application/x-www-form-urlencoded'
    const formData = await request.formData();

    // --- IMPORTANT: Get the EXACT field names BillDesk uses ---
    // These are common examples, replace with actuals from BillDesk docs or test POSTs
    const status = formData.get('status') || formData.get('payment_status') || formData.get('resp_code');
    const bdorderid = formData.get('bdorderid') || formData.get('order_id') || formData.get('merchant_ref_no');
    const message = formData.get('message') || formData.get('resp_message');
    // Add any other parameters you need from BillDesk (e.g., transaction ID, checksum)

    console.log('[BillDesk POST Callback] Received data:', Object.fromEntries(formData));

    // --- TODO: SECURITY VALIDATION ---
    // If BillDesk provides a checksum/signature, YOU MUST verify it here
    // to ensure the request is authentic and data hasn't been tampered with.
    // Example (conceptual - replace with BillDesk's actual mechanism):
    // const receivedChecksum = formData.get('checksum');
    // const calculatedChecksum = calculateBillDeskChecksum(formData); // Implement this function
    // if (receivedChecksum !== calculatedChecksum) {
    //   console.error('[BillDesk POST Callback] Checksum validation failed!');
    //   // Handle invalid request - perhaps redirect to an error page or generic thank you
    //   const errorUrl = new URL('/thank-you', request.nextUrl.origin);
    //   errorUrl.searchParams.set('status', 'INVALID_DATA');
    //   return NextResponse.redirect(errorUrl.toString(), 303);
    // }

    // Construct the redirect URL for the thank-you page (which uses GET)
    // request.nextUrl.origin will give you https://dev.akanksha.org
    const thankYouPageUrl = new URL('/thank-you', request.nextUrl.origin);

    if (status) {
      // You might want to normalize the status value
      // e.g., BillDesk might send "0300" for success, "0399" for failure
      // Map these to your "SUCCESS", "FAILURE" convention
      let appStatus = 'UNKNOWN';
      if (status.toString().toUpperCase() === 'SUCCESS' || status === '0300' /* example success code */) {
        appStatus = 'SUCCESS';
      } else if (status.toString().toUpperCase() === 'FAILURE' || status === '0399' /* example fail code */) {
        appStatus = 'FAILURE';
      } else {
        appStatus = status.toString().toUpperCase(); // Or keep original if not matched
      }
      thankYouPageUrl.searchParams.set('status', appStatus);
    }
    if (bdorderid) {
      thankYouPageUrl.searchParams.set('bdorderid', bdorderid.toString());
    }
    if (message) {
      thankYouPageUrl.searchParams.set('message_from_gateway', message.toString());
    }

    console.log('[BillDesk POST Callback] Redirecting to:', thankYouPageUrl.toString());

    // Redirect to the GET-based thank-you page
    // 303 See Other is the appropriate status code for changing POST to GET after processing
    return NextResponse.redirect(thankYouPageUrl.toString(), { status: 303 });

  } catch (error) {
    console.error('[BillDesk POST Callback] Error processing POST:', error);
    // Redirect to a generic error page or the thank-you page with an error status
    const errorPageUrl = new URL('/thank-you', request.nextUrl.origin);
    errorPageUrl.searchParams.set('status', 'SERVER_ERROR');
    if (error instanceof Error) {
        errorPageUrl.searchParams.set('error_message', error.message);
    } else {
        errorPageUrl.searchParams.set('error_message', 'Error processing payment confirmation.');
    }
    return NextResponse.redirect(errorPageUrl.toString(), { status: 303 });
  }
}

// Your app/thank-you/page.js will handle GET requests to /thank-you.
// Next.js automatically routes GET requests to /thank-you to page.js
// and POST requests to /thank-you to this route.js's POST handler.