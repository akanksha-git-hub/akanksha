
import { SignJWT, importJWK, jwtVerify } from 'jose'; // Added jwtVerify
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
    const { stepC = {}, stepB = {}, amount = '299.00', user_agent = 'Unknown Browser' } = body;

    // Fetch Public IP
    let ipAddress = '127.0.0.1';
    try {
      const ipRes = await fetch('https://api.ipify.org/?format=json');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      }
    } catch (ipError) { // Catch specific error
      console.warn('Failed to fetch public IP, using fallback IP. Error:', ipError.message);
    }

    const orderId = `AKANKSHA-${uuidv4().slice(0, 12).toUpperCase()}`;
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();
    
    const orderDate = new Date().toISOString().split('.')[0] + 'Z';


    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      amount: amount.toString(),
      order_date: orderDate,
      currency: '356',
      ru: 'https://akanksha.org/', // Make sure this is your actual return URL
      additional_info: {
        additional_info1: stepB?.donating_to || 'General Donation',
        additional_info2: stepB?.heard_from || 'Website',
      },
      customer: {
        email: stepC?.email || 'test@example.com',
        mobile: stepC?.number || '9999999999',
        name: `${stepC?.first_name || 'Test'} ${stepC?.last_name || 'User'}`,
      },
      itemcode: 'DIRECT',
      device: {
        init_channel: 'internet',
        ip: ipAddress,
        user_agent,
        accept_header: 'text/html',
      },
    };

    // Optional: Log final payload
    console.log('🔍 Final JWS Payload Sent to BillDesk:\n', JSON.stringify(jwsPayloadObject, null, 2));

    const jwk = {
      kty: 'oct',
      k: Buffer.from(RAW_SECRET).toString('base64url'),
    };
    const secretKey = await importJWK(jwk, 'HS256');

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: 'HS256', clientid: CLIENT_ID })
      .sign(secretKey);

    const billdeskResponse = await fetch(BILLDESK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jose',
        Accept: 'application/jose', // We are expecting a JWS response
        'BD-Traceid': bdTraceid,
        'BD-Timestamp': bdTimestamp,
      },
      body: jwtToken,
    });

    const responseText = await billdeskResponse.text(); // This will be a JWS string or error JSON/text

    if (!billdeskResponse.ok) {
      let errorData;
      try {
        // Attempt to parse as JSON if it looks like it, otherwise treat as text
        errorData = responseText.trim().startsWith('{') && responseText.trim().endsWith('}')
          ? JSON.parse(responseText)
          : { message: responseText };
      } catch (e) {
        errorData = { message: responseText }; // Fallback if JSON parsing fails
      }

      console.error('BillDesk API Error Response:', {
        status: billdeskResponse.status,
        headers: Object.fromEntries(billdeskResponse.headers.entries()), // Log response headers
        body: responseText,
        parsedErrorData: errorData,
      });

      return NextResponse.json(
        {
          error: 'BillDesk API Error',
          status: billdeskResponse.status,
          details: errorData,
          raw_response: responseText, // Include raw response for debugging
        },
        { status: billdeskResponse.status }
      );
    }

    // If response is OK, it's expected to be a JWS
    try {
      // The secretKey used for signing should be the same for verifying BillDesk's response
      // BillDesk typically includes 'clientid' in the protected header of their response JWS.
      const { payload, protectedHeader } = await jwtVerify(
        responseText, // The JWS string from BillDesk
        secretKey,    // The same secretKey used for signing
        {
          algorithms: ['HS256'], // Specify expected algorithm for security
          // You might also need to specify an audience or issuer if BillDesk uses them
        }
      );

      // Log the decoded payload and header for inspection
      console.log('🔍 BillDesk Decoded Response Protected Header:', protectedHeader);
      console.log('🔍 BillDesk Decoded Response Payload:', payload);

      // Optional: Verify clientid in response header matches your clientid
      if (protectedHeader && protectedHeader.clientid && protectedHeader.clientid !== CLIENT_ID) {
        console.warn(
          `Warning: ClientID in BillDesk response header ('${protectedHeader.clientid}') does not match expected CLIENT_ID ('${CLIENT_ID}').`
        );
        // Depending on strictness, you might want to throw an error here
        // For now, we'll proceed but log a warning.
      }

      // The actual data from BillDesk is in the 'payload' object
    return NextResponse.json({
  billdesk_response: payload,
  jwt: jwtToken,  
});


    } catch (verificationError) {
      console.error('Error verifying or decoding BillDesk JWS response:', verificationError);
      console.error('Raw JWS response from BillDesk that failed verification:', responseText);
      return NextResponse.json(
        {
          error: 'Failed to process BillDesk response',
          details: verificationError.message,
          raw_response: responseText, // Include raw response for debugging
        },
        { status: 500 } // Internal server error because we couldn't process a successful response
      );
    }

  } catch (error) {
    console.error('Internal Server Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
