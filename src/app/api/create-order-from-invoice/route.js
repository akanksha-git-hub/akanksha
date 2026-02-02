// src/app/api/create-order-from-invoice/route.js

import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";

// ---------------- ENV ----------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const APP_URL = process.env.APP_URL;

// SI Debit Endpoint for Invoice-based flows
const BILLDESK_SI_ENDPOINT = "https://uat1.billdesk.com/u2/pgsi/ve1_2/transactions/create";

// ---------------- Helpers ----------------
function generateEpochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

/**
 * BillDesk Order IDs MUST be <= 20 characters.
 */
function generateOrderId() {
  const ts = Date.now().toString().slice(-10);
  const rand = Math.floor(1000 + Math.random() * 9000); 
  return `S${ts}${rand}`;
}

function generateTraceId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // donor should contain: { name, email, phone }
    const { invoiceid, mandateid, subscription_refid, amount, donor } = body;

    // Validate minimum required fields
    if (!invoiceid || !mandateid || !subscription_refid) {
      return NextResponse.json(
        { success: false, error: "Missing required linkage fields (invoiceid, mandateid, or sub_refid)" },
        { status: 400 }
      );
    }

    const orderDate = new Date().toISOString().split('.')[0] + 'Z';
    
    // We must use the email that was originally used to create the mandate
    const customerEmail = donor?.email || "anonymous@donor.com";

    // 🏗️ Build exact payload from BillDesk "Subsequent Charge" Documentation
    const payload = {
      mercid: MERC_ID,
      orderid: generateOrderId(),
      order_date: orderDate,
      amount: Number(amount).toFixed(2),
      currency: "356",
      ru: `${APP_URL}/api/billdesk-webhook`,
      itemcode: "DIRECT",

      // 💳 SI Process Flags (Mandatory for Recurring)
      txn_process_type: "si",
      authentication_type: "3ds2",
      "3ds_parameter": "merchant",
      payment_method_type: "card",

      // 🔗 Linkage IDs
      // Note: 'invoice_id' with underscore is standard for this specific SI endpoint
      invoice_id: invoiceid, 
      mandateid: mandateid,
      subscription_refid: subscription_refid,
      customer_refid: customerEmail, // Some environments require this at root level too

      // 👤 Customer Details (Must match Mandate record)
      customer: {
        first_name: donor?.name?.split(' ')[0] || "Donor",
        last_name: donor?.name?.split(' ').slice(1).join(' ') || "User",
        mobile: donor?.phone || "9999999999",
        email: customerEmail,
      },

      // 📱 Device block (Required for Fraud/Audit)
      device: {
        init_channel: "internet",
        ip: "127.0.0.1",
        user_agent: "AkankshaServer/1.0",
        browser_javascript_enabled: "true",
        accept_header: "text/html"
      }
    };

    console.log(`➡️ Attempting SI Debit for: ${customerEmail} | Amt: ${payload.amount}`);
    console.log("📦 Payload:", JSON.stringify(payload, null, 2));

    // 🔐 JWS Signing
    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    // 📡 Call BillDesk
    const res = await fetch(BILLDESK_SI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        "Accept": "application/jose",
        "BD-Timestamp": generateEpochTimestamp(),
        "BD-Traceid": generateTraceId(),
      },
      body: jwtToken,
      cache: 'no-store'
    });

    const resText = await res.text();

    // Error handling for non-JWS responses (500 errors)
    if (!resText.includes('.')) {
        console.error("❌ BillDesk API rejected request with raw error:", resText);
        return NextResponse.json({ 
            success: false, 
            error: "GNAPE0001 - BillDesk Server Error", 
            raw: resText 
        }, { status: 500 });
    }

    // 🔓 Verify & Decode BillDesk response
    const { payload: decoded } = await jwtVerify(resText, secretKey);
    
    console.log("✅ BillDesk Response Decoded:", JSON.stringify(decoded, null, 2));

    // Return the response to the cron runner
    return NextResponse.json({
      success: decoded.status !== 500,
      auth_status: decoded.auth_status, // 0300 = Success
      billdesk_order_id: decoded.orderid,
      details: decoded,
    });

  } catch (err) {
    console.error("🚨 SI Debit Internal Failure:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}