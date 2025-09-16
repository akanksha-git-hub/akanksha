// --- START OF FILE route.js (e.g., app/api/create-order-from-invoice/route.js) ---

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
    const { invoice_number, user_agent = 'Unknown Browser' } = body;

    if (!invoice_number) {
      return NextResponse.json(
        { error: 'Missing invoice_number in request body' },
        { status: 400 }
      );
    }

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
    const orderDate = new Date().toISOString().split('.')[0] + 'Z';

    console.log('🪵 Incoming invoice debit request:', JSON.stringify(body, null, 2));

    // --- Core payload for invoice-based debit ---
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      amount: Number(body?.amount || invoice.amount).toFixed(2),
      invoice_number, // 🔑 Instead of amount / mandate
      order_date: orderDate,
      currency: '356',
      ru: `${process.env.APP_URL}/api/billdesk-payment-return`,
      customer: {
        email: body?.email || 'invoice@test.com',
        mobile: body?.mobile || '9999999999',
         
        name: body?.name || 'Invoice Debit Test',
      },
      device: {
        init_channel: 'internet',
        ip: clientIpAddress,
        user_agent,
        accept_header: 'text/html',
      },
    };

    console.log('🧾 Sending Invoice Debit Payload to BillDesk:\n', JSON.stringify(jwsPayloadObject, null, 2));

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
    console.log(' Raw BillDesk Response (JWS):', responseText);

    try {
      const decodedSuccess = await jwtVerify(responseText, secretKey, {
        algorithms: ['HS256'],
      });
      console.log('✅ Decoded BillDesk Payload:', JSON.stringify(decodedSuccess.payload, null, 2));
    } catch (decodeErr) {
      console.warn('❌ Could not decode BillDesk JWS (Success Case):', decodeErr.message);
    }

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
        console.error('🪵 Decoded BillDesk Error:', JSON.stringify(decodedError.payload, null, 2));
      } catch (decodeErr) {
        console.warn('Unable to decode BillDesk error JWS:', decodeErr.message);
      }

      return NextResponse.json(
        {
          error: 'BillDesk API Error',
          status: billdeskResponse.status,
          details: errorData,
          raw_response: responseText,
        },
        { status: billdeskResponse.status }
      );
    }

    try {
      const { payload } = await jwtVerify(responseText, secretKey, {
        algorithms: ['HS256'],
      });

      console.log('📨 Decoded Payload:', JSON.stringify(payload, null, 2));

      const redirectLink = payload?.links?.find(
        (link) => link.rel === 'redirect' && link.method === 'POST'
      );

      if (!redirectLink || !redirectLink.href || !redirectLink.parameters) {
        console.warn('⚠️ Missing redirect link or parameters in BillDesk payload.');
        return NextResponse.json(
          { error: 'Missing redirect info', details: payload },
          { status: 500 }
        );
      }

      console.log('🔗 Redirect URL:', redirectLink.href);
      console.log('📦 Redirect Parameters:', JSON.stringify(redirectLink.parameters, null, 2));

      return NextResponse.json({
        redirect_url: redirectLink.href,
        parameters: redirectLink.parameters,
      });
    } catch (verificationError) {
      console.error('❌ Verification Failed:', verificationError.message);
      return NextResponse.json(
        {
          error: 'Verification Failed',
          details: verificationError.message,
          raw_response: responseText,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('🚨 Internal Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}

// --- END OF FILE route.js ---
