// src/app/api/create-order-from-invoice/route.js

import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";

const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL;

const BILLDESK_SI_ENDPOINT = "https://uat1.billdesk.com/u2/pgsi/ve1_2/transactions/create";

function generateOrderId() {
  const ts = Date.now().toString().slice(-10);
  const rand = Math.floor(1000 + Math.random() * 9000); 
  return `S${ts}${rand}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { invoiceid, mandateid, subscription_refid, amount, donor } = body;

    // 🛑 FIX 1: Ensure order_date is EXACTLY NOW (UTC)
    // Sending a future date (like 2026) will cause a 500 error.
    const orderDate = new Date().toISOString().split('.')[0] + 'Z';

    const payload = {
      mercid: MERC_ID,
      orderid: generateOrderId(),
      order_date: orderDate,
      amount: Number(amount).toFixed(2),
      currency: "356",
      ru: `${APP_URL}/api/billdesk-webhook`,
      itemcode: "DIRECT",

      txn_process_type: "si",
      authentication_type: "3ds2",
      "3ds_parameter": "merchant",
      payment_method_type: "card",

      invoice_id: invoiceid, 
      mandateid: mandateid,
      subscription_refid: subscription_refid,
      customer_refid: donor?.email || "anonymous@donor.com",

      customer: {
        first_name: donor?.name?.split(' ')[0] || "Donor",
        last_name: donor?.name?.split(' ').slice(1).join(' ') || "User",
        mobile: donor?.phone || "9999999999",
        email: donor?.email || "test@example.com",
      },

      // 🛑 FIX 2: Add additional_info block.
      // Most BillDesk accounts require these to match the "One-Time" setup.
      additional_info: {
        additional_info1: donor?.name || 'N/A',
        additional_info2: donor?.pan || 'N/A',
        additional_info3: donor?.email || 'N/A',
        additional_info4: donor?.phone || 'N/A',
        additional_info5: donor?.address || 'N/A',
        additional_info6: donor?.state || 'N/A',
        additional_info7: 'RECURRING_DEBIT',
      },

      device: {
        init_channel: "internet",
        ip: "127.0.0.1",
        user_agent: "AkankshaServer/1.0",
        browser_javascript_enabled: "true",
        accept_header: "text/html"
      }
    };

    console.log("🚀 Attempting SI Debit with Corrected Date and Info...");

    const jwk = { kty: "oct", k: Buffer.from(RAW_SECRET).toString("base64url") };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    const res = await fetch(BILLDESK_SI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        "Accept": "application/jose",
        "BD-Timestamp": Math.floor(Date.now() / 1000).toString(),
        "BD-Traceid": `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      },
      body: jwtToken,
      cache: 'no-store'
    });

    const resText = await res.text();

    if (!resText.includes('.')) {
        return NextResponse.json({ success: false, error: "Raw Gateway Error", raw: resText }, { status: 500 });
    }

    const { payload: decoded } = await jwtVerify(resText, secretKey);
    console.log("✅ BillDesk Response:", JSON.stringify(decoded, null, 2));

    return NextResponse.json({
      success: decoded.status !== 500,
      auth_status: decoded.auth_status,
      details: decoded,
    });

  } catch (err) {
    console.error("🚨 SI Debit Exception:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}