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
  try {
    console.log("Preparing to save final transaction to Firestore...");

    // Decide how to handle status
    let status = verifiedPayload.transaction_error_desc || null; // default for one-time
    let status_message = null;

    if (verifiedPayload.txn_process_type === "si") {
      // Normalize for recurring debit
      const statusCode = verifiedPayload.auth_status || verifiedPayload.transaction_error_code;
      status = statusCode === "0300" ? "paid" : "failed";
      status_message = verifiedPayload.transaction_error_desc || null;
    }

    const donationRecord = {
      // Transaction Details
      transaction_id: verifiedPayload.transactionid,
      order_id: verifiedPayload.orderid || null,
      invoice_id: verifiedPayload.invoiceid || null,
      mandate_id: verifiedPayload.mandateid || null,
      subscription_refid: verifiedPayload.subscription_refid || null,

      status, // one-time = BillDesk message, recurring = paid/failed
      status_message, // only set for recurring

      amount: verifiedPayload.amount ? parseFloat(verifiedPayload.amount) : null,
      payment_method: verifiedPayload.payment_method_type || null,
      bank_ref_no: verifiedPayload.bank_ref_no || null,
      transaction_date: verifiedPayload.transaction_date
        ? new Date(verifiedPayload.transaction_date).toISOString()
        : null,

      // Donor Details
      donor_name: verifiedPayload?.additional_info?.additional_info3 || null,
      email: verifiedPayload?.customer?.email || null,
      mobile: verifiedPayload?.customer?.mobile || null,
      city: verifiedPayload?.additional_info?.additional_info5 || null,
      state: verifiedPayload?.additional_info?.additional_info9 || null,
      pincode: verifiedPayload?.additional_info?.additional_info7 || null,
      pan_number: verifiedPayload?.additional_info?.additional_info8 || null,

      // Meta
      processedAt: new Date().toISOString(),
      raw_webhook_payload: verifiedPayload,
    };

    const docRef = await db.collection('dev_donations').add(donationRecord);
    console.log(`✅ Saved donation to Firestore. Document ID: ${docRef.id}`);

    // Save mandate details if present
    if (verifiedPayload.mandate) {
      const mandate = verifiedPayload.mandate;

      const mandateRecord = {
        mandate_id: mandate.mandateid || null,
        subscription_refid: mandate.subscription_refid || null,
        customer_refid: mandate.customer_refid || null,
        donor_email: verifiedPayload?.customer?.email || null,
        donor_mobile: verifiedPayload?.customer?.mobile || null,
        donor_name: verifiedPayload?.additional_info?.additional_info3 || null,
        amount: verifiedPayload.amount ? parseFloat(verifiedPayload.amount) : null,
        frequency: mandate.frequency || null,
        status: mandate.status || null,
        start_date: mandate.start_date || null,
        end_date: mandate.end_date || null,
        first_transaction_id: verifiedPayload.transactionid || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        raw_payload: verifiedPayload,
      };

      await db.collection("dev_mandates").add(mandateRecord);
      console.log(`✅ Saved mandate to Firestore for mandate_id=${mandate.mandateid}`);
    }
  } catch (error) {
    console.error("❌ Error saving transaction to Firestore:", error);
    throw error;
  }
}
