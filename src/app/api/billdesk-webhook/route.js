// src/app/api/billdesk-webhook/route.js

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';
// Import our new database function
import { saveTransactionToDB } from '../../../lib/database';
import { getFirestore } from "firebase-admin/firestore";

// Firestore reference
const db = getFirestore();
async function updateInvoiceStatus(invoiceid, auth_status, transactionid, transaction_error_code, transaction_error_desc) {
  if (!invoiceid) return;

  const statusCode = auth_status || transaction_error_code;
const status = statusCode === "0300" ? "paid" : "failed";


  await db.collection("dev_invoices").doc(invoiceid).set(
    {
      status,       
      invoice_error_message: transaction_error_desc || null,                       
      paidOn: status === "paid" ? new Date().toISOString() : null,
      lastTransactionId: transactionid || null,
      updatedAt: new Date().toISOString(),
    },
    { merge: true } // only update these fields
  );

  console.log(`📌 Invoice ${invoiceid} marked as ${status}(statusCode=${statusCode})`);
}

export async function POST(req) {
  try {
    // --- Verification (your existing, working code) ---
    const rawBody = await req.text();
    const secretKey = await importJWK(
      {
        kty: "oct", 
        k: Buffer.from(process.env.BILLDESK_SECRET).toString("base64url"),
      },
      "HS256"
    );
    const { payload } = await jwtVerify(rawBody, secretKey);
    console.log("✅ BillDesk Webhook Verified Payload:");
      console.log(JSON.stringify(payload, null, 2));

    

    // --- Save to Database  ---


    await saveTransactionToDB(payload);
      if (payload.objectid === "transaction" && payload.txn_process_type === "si") {
      await updateInvoiceStatus(
    payload.invoiceid,
    payload.auth_status,
    payload.transactionid,
    payload.transaction_error_code,
    payload.transaction_error_desc
  );
    }

    // --- Send Success Response ---
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("❌ Webhook processing or database save failed:", err.message);
    // It's important to return an error so BillDesk knows it failed
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}