// src/lib/database.js

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';

// --- Firebase Initialization ---
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === 'production') {
    serviceAccount = JSON.parse(
      readFileSync(
        "/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json",
        "utf8"
      )
    );
  } else {
    const devPath = path.resolve(process.cwd(), 'secrets', 'firebaseServiceAccount.json');
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();


// --- Save transaction to Firestore ---
export async function saveTransactionToDB(verifiedPayload) {
  const isMandate = verifiedPayload.objectid === "mandate";
  const isDebit = verifiedPayload.txn_process_type === "si"; // recurring debit

  try {
    console.log("Preparing to save final transaction to Firestore...");

    // -----------------------------------
    // STATUS HANDLING
    // -----------------------------------
    let status = null;
    let status_message = null;

    if (isMandate) {
      // Mandate creation webhook
      status = verifiedPayload.status ?? null;
      status_message = verifiedPayload.verification_error_desc ?? null;
    } 
    else if (isDebit) {
      // Recurring debit webhook
      const statusCode = verifiedPayload.auth_status || verifiedPayload.transaction_error_code;
      status = statusCode === "0300" ? "paid" : "failed";
      status_message = verifiedPayload.transaction_error_desc ?? null;
    } 
    else {
      // One-time payment webhook
      status = verifiedPayload.transaction_error_desc ?? null;
      status_message = verifiedPayload.transaction_error_desc ?? null;
    }

    // -----------------------------------
    // DONATION RECORD (Firestore-safe)
    // -----------------------------------
    const donationRecord = {
      // Transaction Details
      transaction_id: isMandate ? null : verifiedPayload.transactionid ?? null,
      order_id: verifiedPayload.orderid ?? null,
      invoice_id: verifiedPayload.invoiceid ?? null,

      mandate_id: verifiedPayload.mandateid ?? null,
      subscription_refid: verifiedPayload.subscription_refid ?? null,

      status,
      status_message,

      amount: verifiedPayload.amount ? parseFloat(verifiedPayload.amount) : null,
      payment_method: verifiedPayload.payment_method_type ?? null,
      bank_ref_no: verifiedPayload.bank_ref_no ?? null,

      transaction_date: verifiedPayload.transaction_date
        ? new Date(verifiedPayload.transaction_date).toISOString()
        : null,

      // Donor Details (only exist for one-time payments)
      donor_name: verifiedPayload?.additional_info?.additional_info3 ?? null,
      email: verifiedPayload?.customer?.email ?? null,
      mobile: verifiedPayload?.customer?.mobile ?? null,
      city: verifiedPayload?.additional_info?.additional_info5 ?? null,
      state: verifiedPayload?.additional_info?.additional_info9 ?? null,
      pincode: verifiedPayload?.additional_info?.additional_info7 ?? null,
      pan_number: verifiedPayload?.additional_info?.additional_info8 ?? null,

      // Meta
      processedAt: new Date().toISOString(),
      raw_webhook_payload: verifiedPayload,
    };

    // Remove undefined values to prevent Firestore errors
    Object.keys(donationRecord).forEach(
      (key) => donationRecord[key] === undefined && (donationRecord[key] = null)
    );

    const docRef = await db.collection("dev_donations").add(donationRecord);
    console.log(`✅ Saved donation to Firestore. Document ID: ${docRef.id}`);

    // -----------------------------------
    // SAVE MANDATE DETAILS (Mandate Flow Only)
    // -----------------------------------
    if (isMandate) {
      const mandateRecord = {
        mandate_id: verifiedPayload.mandateid ?? null,
        subscription_refid: verifiedPayload.subscription_refid ?? null,
        customer_refid: verifiedPayload.customer_refid ?? null,

        donor_email: verifiedPayload?.customer?.email ?? null,
        donor_mobile: verifiedPayload?.customer?.mobile ?? null,
        donor_name: verifiedPayload?.additional_info?.additional_info3 ?? null,

        amount: verifiedPayload.amount ? parseFloat(verifiedPayload.amount) : null,
        frequency: verifiedPayload.frequency ?? null,

        status: verifiedPayload.status ?? null,
        start_date: verifiedPayload.start_date ?? null,
        end_date: verifiedPayload.end_date ?? null,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        raw_payload: verifiedPayload,
      };

      // Firestore-safe removal of undefined fields
      Object.keys(mandateRecord).forEach(
        (key) => mandateRecord[key] === undefined && (mandateRecord[key] = null)
      );

      await db.collection("dev_mandates").add(mandateRecord);
      console.log(`✅ Saved mandate to Firestore for mandate_id=${verifiedPayload.mandateid}`);
    }

  } catch (error) {
    console.error("❌ Error saving transaction to Firestore:", error);
    throw error;
  }
}
