import { SignJWT, importJWK } from 'jose';
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
    } catch {
      console.warn('Using fallback IP');
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
      ru: 'https://akanksha.org/',
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
    console.log('🔍 Final JWS Payload:\n', JSON.stringify(jwsPayloadObject, null, 2));

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

      return NextResponse.json(
        {
          error: 'BillDesk API Error',
          status: billdeskResponse.status,
          details: errorData,
        },
        { status: billdeskResponse.status }
      );
    }

    const result = JSON.parse(responseText);
    return NextResponse.json({ billdesk_response: result });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
