import { NextResponse } from 'next/server';
import { SignJWT, importJWK, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import path from 'path';

// Firebase init (reuse from database.js if possible)
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === 'production') {
    serviceAccount = JSON.parse(readFileSync("/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json", "utf8"));
  } else {
    const devPath = path.resolve(process.cwd(), 'secrets', 'firebaseServiceAccount.json');
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

// Config
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const BILLDESK_ENDPOINT = 'https://uat1.billdesk.com/u2/pgsi/ve1_2/invoice/create'; // <-- set this in .env

function generateInvoiceNumber() {
  return `INV-${uuidv4().slice(0, 12).toUpperCase()}`;
}

function generateDisplayNumber() {
  return `DISP-${Math.floor(1000 + Math.random() * 9000)}`; // 4-digit display no.
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { mandateid, subscription_refid, customer_refid, amount, description, debit_date, duedate } = body;

    // Build invoice payload
    const invoice_number = generateInvoiceNumber();
    const invoice_display_number = generateDisplayNumber();
    const invoice_date = new Date().toISOString().split("T")[0]; // today's date
    const due_date = duedate || debit_date; // BillDesk needs both

    const payloadObj = {
      mercid: MERC_ID,
      customer_refid,
      subscription_refid,
      invoice_number,
      invoice_display_number,
      invoice_date,
      duedate: due_date,
      debit_date,
      amount: Number(amount).toFixed(2),
      net_amount: Number(amount).toFixed(2),
      currency: "356",
      mandateid,
      description: description || "Akanksha Monthly Donation"
    };

    console.log("🧾 Invoice payload:", JSON.stringify(payloadObj, null, 2));

    // Sign payload
    const jwk = { kty: "oct", k: Buffer.from(RAW_SECRET).toString("base64url") };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(payloadObj)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    // Send request to BillDesk
    const res = await fetch(BILLDESK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        Accept: "application/jose",
      },
      body: jwtToken,
    });

    const resText = await res.text();

    // Decode response
    const { payload: decoded } = await jwtVerify(resText, secretKey);
    console.log("✅ Invoice response:", JSON.stringify(decoded, null, 2));

    // Save to Firestore
    const invoiceRecord = {
      ...payloadObj,
      status: decoded.status || "unpaid",
      invoice_id: decoded.invoice_id,
      createdon: decoded.createdon,
      verification_error_code: decoded.verification_error_code,
      verification_error_desc: decoded.verification_error_desc,
      raw_response: decoded,
      createdAt: new Date().toISOString(),
    };

    await db.collection("dev_invoices").doc(invoice_number).set(invoiceRecord);

    return NextResponse.json({ success: true, data: invoiceRecord });
  } catch (err) {
    console.error("❌ Error creating invoice:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
