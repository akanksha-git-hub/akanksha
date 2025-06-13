// --- START OF FILE route.js (e.g., app/api/create-order-billdesk/route.js) ---

import { SignJWT, importJWK, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const BILLDESK_ENDPOINT = process.env.BILLDESK_ENDPOINT;


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
    const { stepC = {}, stepB = {}, amount , user_agent = 'Unknown Browser', type = true  } = body;

    // Get CLIENT IP Address from request headers
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    let clientIpAddress = '127.0.0.1'; // Default fallback

    if (forwarded) {
      clientIpAddress = forwarded.split(',')[0].trim();
    } else if (realIp) {
      clientIpAddress = realIp.trim();
    }
    if (clientIpAddress && clientIpAddress.startsWith('::ffff:')) {
        clientIpAddress = clientIpAddress.substring(7);
    }

    const orderId = `AKANKSHA-${uuidv4().slice(0, 12).toUpperCase()}`;
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();
    const orderDate = new Date().toISOString().split('.')[0] + 'Z'; // Used for one-time payment

    // --- START: Sanitize Mobile Number ---
    let rawMobileFromStepC = stepC?.number || '';
    let sanitizedMobileNumber = rawMobileFromStepC.replace(/\D/g, '');

    if (sanitizedMobileNumber.startsWith('91') && sanitizedMobileNumber.length === 12) {
      sanitizedMobileNumber = sanitizedMobileNumber.substring(2);
    } else if (sanitizedMobileNumber.startsWith('0') && sanitizedMobileNumber.length === 11) {
      sanitizedMobileNumber = sanitizedMobileNumber.substring(1);
    }

    if (sanitizedMobileNumber.length !== 10) {
      console.warn(`Mobile number from stepC ("${rawMobileFromStepC}") resulted in an invalid sanitized number ("${sanitizedMobileNumber}"). Falling back to default.`);
      // If stepC.number was empty and rawMobileFromStepC defaulted to '', sanitizedMobileNumber could be ''
      // Ensure fallback if it's not 10 digits for any reason.
      sanitizedMobileNumber = '9999999999'; // Your BillDesk test default
    }
    // --- END: Sanitize Mobile Number ---

    let jwsPayloadObject;

    if (type) { // ONE-TIME PAYMENT (This logic remains as per your working code)
      jwsPayloadObject = {
        mercid: MERC_ID,
        orderid: orderId,
        amount: Number(amount).toFixed(2),
        order_date: orderDate, // Uses orderDate
        currency: '356',
        ru: `${process.env.APP_URL}/api/billdesk-payment-return`,
        additional_info: {
          additional_info1: stepB?.donate_to || 'General Donation',
          additional_info2: stepB?.heard_from || 'Website',
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
          mobile: sanitizedMobileNumber, // Use sanitized number
          name: `${stepC?.first_name || 'Test'} ${stepC?.last_name || 'User'}`,
        },
        itemcode:'DIRECT',
        // mandate_required: undefined, // Not 'Y' for one-time
        device: {
          init_channel: 'internet',
          ip: clientIpAddress,
          user_agent,
          accept_header: 'text/html',
        },
        // No 'mandate' object for one-time payments
      };
    } else { // RECURRING PAYMENT (MANDATE TOKEN CREATION - RESTRUCTURED)
      jwsPayloadObject = {
        // Top-level fields based on the createmandatetoken example and your data:
        mercid: MERC_ID,
        customer_refid: stepC?.email || `CUST-${orderId.substring(8)}`, // Using email or a generated ID based on orderId
        subscription_refid: `SUB-${orderId}`, // Your unique mandate ID
        subscription_desc: "Monthly Akanksha Donation",
        currency: '356',
        amount: Number(amount).toFixed(2), // This is the mandate amount
        ru: `${process.env.APP_URL}/api/billdesk-payment-return`,

        customer: {
          first_name: stepC?.first_name || 'Test',
          last_name: stepC?.last_name || 'User',
          mobile: sanitizedMobileNumber, // Use sanitized number
          email: stepC?.email || 'test@example.com',
        },
        device: {
          init_channel: 'internet',
          ip: clientIpAddress,
          user_agent,
          accept_header: 'text/html',
        },

        // Mandate specific fields - NOW AT TOP LEVEL
        frequency: "mnth",        // As per example and your previous code
        amount_type: "max",       // As per the example JSON you provided for createmandatetoken.
                                  // Double-check createmandatetoken docs if "maximum" is preferred.
        start_date: new Date().toISOString().split('T')[0], // Today's date (server time)
        end_date: "2030-12-31",
        recurrence_rule: "after",
        debit_day: "1",

        // Fields like 'orderid', 'order_date', 'additional_info', 'itemcode', 'mandate_required', 'mandate_auth_mode'
        // are omitted here as they are not typically in a flat createmandatetoken request structure,
        // or their purpose is covered by other fields (e.g., subscription_refid, start_date).
        // If createmandatetoken docs specifically require them, they should be added.
      };
    }

    console.log(`🧾 Sending ${type ? 'One-Time' : 'Recurring'} Payload to BillDesk (Mobile: ${jwsPayloadObject.customer.mobile}):\n`, JSON.stringify(jwsPayloadObject, null, 2));

    const jwk = { kty: 'oct', k: Buffer.from(RAW_SECRET).toString('base64url') };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

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

    if (!billdeskResponse.ok) {
      let errorData;
      try {
        errorData = responseText.trim().startsWith('{')
          ? JSON.parse(responseText)
          : { message: responseText };
      } catch (e) {
        errorData = { message: responseText };
      }

      console.error('❌ BillDesk Error:', {
        status: billdeskResponse.status,
        headers: Object.fromEntries(billdeskResponse.headers.entries()),
        body: responseText,
        parsedErrorData: errorData,
      });

      try {
        const decodedError = await jwtVerify(errorData.message, secretKey, {
          algorithms: ['HS256'],
        });
        console.error("🪵 Decoded BillDesk Error:", JSON.stringify(decodedError.payload, null, 2));
      } catch (decodeErr) {
        // console.warn("Unable to decode BillDesk error JWS:", decodeErr.message); // Kept original comment style
      }

      return NextResponse.json({
        error: 'BillDesk API Error',
        status: billdeskResponse.status,
        details: errorData,
        raw_response: responseText,
      }, { status: billdeskResponse.status });
    }

    try {
      const { payload } = await jwtVerify(responseText, secretKey, { // Removed unused protectedHeader
        algorithms: ['HS256'],
      });

      const redirectLink = payload?.links?.find(
        (link) => link.rel === 'redirect' && link.method === 'POST'
      );

      if (!redirectLink || !redirectLink.href || !redirectLink.parameters) {
        console.warn('⚠️ Missing redirect link or parameters in BillDesk payload.');
        return NextResponse.json({
          error: 'Missing redirect info',
          details: payload,
        }, { status: 500 });
      }

      console.log('🔗 Redirect URL:', redirectLink.href);

      return NextResponse.json({
        redirect_url: redirectLink.href,
        parameters: redirectLink.parameters,
      });

    } catch (verificationError) {
      console.error('❌ Verification Failed:', verificationError.message);
      return NextResponse.json({
        error: 'Verification Failed',
        details: verificationError.message,
        raw_response: responseText,
      }, { status: 500 });
    }

  } catch (err) {
    console.error('🚨 Internal Error:', err);
    return NextResponse.json({
      error: 'Internal ServerError',
      details: err.message,
    }, { status: 500 });
  }
}
// --- END OF FILE route.js ---