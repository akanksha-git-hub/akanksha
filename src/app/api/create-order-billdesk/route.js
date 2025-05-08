import { SignJWT, importJWK } from 'jose';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Ensure these are EXACTLY what BillDesk UAT provided
const CLIENT_ID = 'bdskuaty'; // Your Client ID for JWS Header
const MERC_ID = 'BDSKUATY';   // Your Merchant ID for Payload
const RAW_SECRET = 'G3eAmyVkAzKp8jFq0fqPEqxF4agynvtJ'; // Your HMAC Secret

// UAT Endpoint from Docs Page 8
const BILLDESK_ENDPOINT = 'https://uat1.billdesk.com/u2/payments/ve1_2/orders/create';
// Production: https://api.billdesk.com/payments/ve1_2/orders/create

function generateEpochTimestampString() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateTraceId() {
  // YYYYMMDDHHMMSS + short random string. Max 35 chars.
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
    const { amount = '299.00', user_agent = 'Unknown Browser' } = body; // Provide a default if UA is missing

    // It's better to get the IP at the edge or via request headers if possible
    // but for server-side, this is a common approach.
    // Ensure your Digital Ocean server can make outbound requests to ipify.
    let ipAddress = '127.0.0.1'; // Default IP
    try {
        const ipRes = await fetch('https://api.ipify.org/?format=json');
        if (ipRes.ok) {
            const ipData = await ipRes.json();
            ipAddress = ipData.ip;
        } else {
            console.warn('Failed to fetch IP address from ipify, using default.');
        }
    } catch (ipError) {
        console.error('Error fetching IP address:', ipError);
        console.warn('Using default IP address.');
    }


    const orderId = `AKANKSHA-${uuidv4().slice(0, 12).toUpperCase()}`; // Make it a bit longer for uniqueness
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId(); // Ensure this is unique within the day
    const orderDate = new Date().toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ

    // Payload for JWS
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      amount: amount.toString(), // Ensure amount is a string
      order_date: orderDate,     // Format: YYYY-MM-DDThh:mm:ssTZD (ISOString is fine)
      currency: '356',           // INR
      ru: 'https://akanksha.org/', // Your whitelisted Return URL
      additional_info: {         // As per example on Page 5
        additional_info1: 'Details1',
        additional_info2: 'Details2',
      },
      itemcode: 'DIRECT',        // Default as per doc Page 7
      device: {
        init_channel: 'internet',
        ip: ipAddress,
        user_agent: user_agent,
        accept_header: 'text/html', // Simpler, as per BillDesk example on Page 5
        // --- Fields from page 5 example for device object ---
        // "fingerprintid":"61b12c18b5d0cf901be34a23ca64bb19", // Example value, generate if you can
        // "browser_tz":"-330", // Example value
        // "browser_color_depth":"32", // Example value
        // "browser_java_enabled":"false", // Example value
        // "browser_screen_height":"601", // Example value
        // "browser_screen_width":"657", // Example value
        // "browser_language":"en-US", // Example value
        // "browser_javascript_enabled":"true" // Example value
      },
    };
    console.log('Constructed JWS Payload:', JSON.stringify(jwsPayloadObject, null, 2));


    // HMAC key as JWK
    const jwk = {
      kty: 'oct',
      k: Buffer.from(RAW_SECRET).toString('base64url'), // secret key converted to base64url
      // alg: 'HS256' // alg in JWK is optional if specified in importJWK or sign function
    };
    const secretKey = await importJWK(jwk, 'HS256');

    // Sign using the JWS Payload Object
    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({
        alg: 'HS256',
        clientid: CLIENT_ID, // Your clientid from BillDesk
      })
      .sign(secretKey);

    console.log('Generated JWS Token:', jwtToken);
    console.log('BD-Traceid:', bdTraceid);
    console.log('BD-Timestamp:', bdTimestamp);

    const billdeskResponse = await fetch(BILLDESK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jose', // CRITICAL
        Accept: 'application/jose',         // CRITICAL
        'BD-Traceid': bdTraceid,
        'BD-Timestamp': bdTimestamp,
        // NO 'Authorization: EWY ...' header
      },
      body: jwtToken, // CRITICAL: Send the JWS token string directly
    });

    const responseText = await billdeskResponse.text(); // Read as text first for debugging
    console.log('BillDesk Raw Response Status:', billdeskResponse.status);
    console.log('BillDesk Raw Response Text:', responseText);

    if (!billdeskResponse.ok) {
      // Attempt to parse as JSON if it's an error object from BillDesk
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      return NextResponse.json(
        {
          error: 'BillDesk API Error',
          status: billdeskResponse.status,
          details: errorData,
        },
        { status: billdeskResponse.status }
      );
    }

    // If response is OK and expected to be JWS (though for create order it's usually JSON)
    // The Create Order API *response* is JSON, not JWS, as per doc page 8-10.
    const result = JSON.parse(responseText);
    console.log('📥 BillDesk Parsed Response:', JSON.stringify(result, null, 2));

    return NextResponse.json({ billdesk_response: result });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}