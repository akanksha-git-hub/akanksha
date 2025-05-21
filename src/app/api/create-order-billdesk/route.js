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
    console.log('Reading request body from frontend');
    const body = await req.json();
    const { amount = '299.00', user_agent = 'Unknown Browser' } = body;
    console.log('Request body:', body);

    console.log('Fetching public IP');
    let ipAddress = '127.0.0.1';
    try {
      const ipRes = await fetch('https://api.ipify.org/?format=json');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
        console.log('Public IP fetched:', ipAddress);
      } else {
        console.warn('Could not fetch IP from ipify. Using default.');
      }
    } catch (ipError) {
      console.error('Error fetching IP address:', ipError);
      console.warn('Using default IP address.');
    }

    console.log('Generating IDs and timestamps');
    const orderId = `AKANKSHA-${uuidv4().slice(0, 12).toUpperCase()}`;
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();
    const orderDate = new Date().toISOString();
    console.log('Order ID:', orderId);
    console.log('BD-Timestamp:', bdTimestamp);
    console.log('BD-Traceid:', bdTraceid);
    console.log('Order Date (ISO):', orderDate);

    console.log('Building BillDesk payload');
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      amount: amount.toString(),
      order_date: orderDate,
      currency: '356',
      ru: 'https://akanksha.org/',
      additional_info: {
        additional_info1: 'Details1',
        additional_info2: 'Details2',
      },
      itemcode: 'DIRECT',
      device: {
        init_channel: 'internet',
        ip: ipAddress,
        user_agent: user_agent,
        accept_header: 'text/html',
      },
    };
    console.log('Constructed JWS Payload:', JSON.stringify(jwsPayloadObject, null, 2));

    console.log('Converting HMAC secret to JWK format');
    const jwk = {
      kty: 'oct',
      k: Buffer.from(RAW_SECRET).toString('base64url'),
    };
    const secretKey = await importJWK(jwk, 'HS256');
    console.log('JWK generated');

    console.log('Signing the payload');
    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({
        alg: 'HS256',
        clientid: CLIENT_ID,
      })
      .sign(secretKey);
    console.log('Signed JWT token:', jwtToken);

    console.log('Sending request to BillDesk');
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
    console.log('BillDesk response status:', billdeskResponse.status);
    console.log('BillDesk raw response:', responseText);

    if (!billdeskResponse.ok) {
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

    console.log('Parsing BillDesk response');
    const result = JSON.parse(responseText);
    console.log('Parsed BillDesk response:', JSON.stringify(result, null, 2));

    console.log('Returning result to frontend');
    return NextResponse.json({ billdesk_response: result });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
