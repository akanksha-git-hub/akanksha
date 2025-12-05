// src/lib/database.js

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import path from "path";

// --- Firebase Initialization ---
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === "production") {
    serviceAccount = JSON.parse(
      readFileSync(
        "/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json",
        "utf8"
      )
    );
  } else {
    const devPath = path.resolve(
      process.cwd(),
      "secrets",
      "firebaseServiceAccount.json"
    );
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// ---------------------------
// Helper: Get Mandate Details
// ---------------------------
async function getMandate(mandateId) {
  if (!mandateId) return null;

  const snap = await db
    .collection("dev_mandates")
    .where("mandate_id", "==", mandateId)
    .limit(1)
    .get();

  if (snap.empty) return null;

  return snap.docs[0].data();
}

// ---------------------------
// Save Transaction to DB
// ---------------------------
export async function saveTransactionToDB(verifiedPayload) {
  const isMandate = verifiedPayload.objectid === "mandate";
  const isDebit = verifiedPayload.txn_process_type === "si";

  try {
    console.log("Preparing to save transaction to Firestore...");

    // -------------------------
    // STATUS HANDLING
    // -------------------------
    let status = null;
    let status_message = null;

    if (isMandate) {
      status = verifiedPayload.status ?? null;
      status_message = verifiedPayload.verification_error_desc ?? null;
    } else if (isDebit) {
      const code =
        verifiedPayload.auth_status ||
        verifiedPayload.transaction_error_code;
      status = code === "0300" ? "paid" : "failed";
      status_message = verifiedPayload.transaction_error_desc ?? null;
    } else {
      status = verifiedPayload.transaction_error_desc ?? null;
      status_message = verifiedPayload.transaction_error_desc ?? null;
    }

    // -------------------------
    // DONOR FIELDS (Webhook → Mandate fallback)
    // -------------------------
    let donor_name =
      verifiedPayload?.additional_info?.additional_info3 ?? null;
    let email = verifiedPayload?.customer?.email ?? null;
    let mobile = verifiedPayload?.customer?.mobile ?? null;

    let city =
      verifiedPayload?.additional_info?.additional_info5 ?? null;
    let state =
      verifiedPayload?.additional_info?.additional_info9 ?? null;
    let pincode =
      verifiedPayload?.additional_info?.additional_info7 ?? null;
    let pan_number =
      verifiedPayload?.additional_info?.additional_info8 ?? null;

    // Fallback to mandate for SI debit (BillDesk sends no donor details)
    if (isDebit || !donor_name || !email || !mobile) {
      const md = await getMandate(verifiedPayload.mandateid);

      if (md) {
        donor_name = donor_name || md.donor_name || null;
        email = email || md.donor_email || null;
        mobile = mobile || md.donor_mobile || null;

        city = city || md.city || null;
        state = state || md.state || null;
        pincode = pincode || md.pincode || null;
        pan_number = pan_number || md.pan_number || null;
      }
    }

    // -------------------------
    // SAVE DONATION (NOT FOR MANDATE WEBHOOK)
    // -------------------------
    if (!isMandate) {
      const donationRecord = {
        transaction_id: verifiedPayload.transactionid ?? null,
        order_id: verifiedPayload.orderid ?? null,
        invoice_id: verifiedPayload.invoiceid ?? null,

        mandate_id: verifiedPayload.mandateid ?? null,
        subscription_refid: verifiedPayload.subscription_refid ?? null,

        status,
        status_message,

        amount: verifiedPayload.amount
          ? parseFloat(verifiedPayload.amount)
          : null,
        payment_method: verifiedPayload.payment_method_type ?? null,
        bank_ref_no: verifiedPayload.bank_ref_no ?? null,

        transaction_date: verifiedPayload.transaction_date
          ? new Date(
              verifiedPayload.transaction_date
            ).toISOString()
          : null,

        // FINAL DONOR FIELDS
        donor_name,
        email,
        mobile,
        city,
        state,
        pincode,
        pan_number,

        processedAt: new Date().toISOString(),
        raw_webhook_payload: verifiedPayload,
      };

      Object.keys(donationRecord).forEach(
        (key) =>
          donationRecord[key] === undefined &&
          (donationRecord[key] = null)
      );

      await db.collection("dev_donations").add(donationRecord);
      console.log("✅ Donation saved.");
    }

    // -------------------------
    // SAVE MANDATE (MANDATE WEBHOOK ONLY)
    // -------------------------
    if (isMandate) {
      const mandateRecord = {
        mandate_id: verifiedPayload.mandateid ?? null,
        subscription_refid:
          verifiedPayload.subscription_refid ?? null,
        customer_refid: verifiedPayload.customer_refid ?? null,

        donor_email: verifiedPayload?.customer?.email ?? null,
        donor_mobile: verifiedPayload?.customer?.mobile ?? null,
        donor_name:
          verifiedPayload?.additional_info?.additional_info3 ??
          null,

        amount: verifiedPayload.amount
          ? parseFloat(verifiedPayload.amount)
          : null,
        frequency: verifiedPayload.frequency ?? null,

        status: verifiedPayload.status ?? null,
        start_date: verifiedPayload.start_date ?? null,
        end_date: verifiedPayload.end_date ?? null,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        raw_payload: verifiedPayload,
      };

      Object.keys(mandateRecord).forEach(
        (key) =>
          mandateRecord[key] === undefined &&
          (mandateRecord[key] = null)
      );

      await db.collection("dev_mandates").add(mandateRecord);
      console.log(
        `✅ Mandate saved: ${verifiedPayload.mandateid}`
      );
    }
  } catch (err) {
    console.error("❌ Firestore Save Error:", err);
    throw err;
  }
}
