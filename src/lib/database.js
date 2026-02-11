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
    const devPath = path.resolve(
      process.cwd(),
      'secrets',
      'firebaseServiceAccount.json'
    );
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }

  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();


// ======================================================
// ✅ ONE-TIME PAYMENTS → dev_donations
// ======================================================
export async function saveTransactionToDB(verifiedPayload) {
  try {
    const donationRecord = {
      transaction_id: verifiedPayload.transactionid,
      order_id: verifiedPayload.orderid,
      status: verifiedPayload.transaction_error_desc,
      amount: parseFloat(verifiedPayload.amount),
      payment_method: verifiedPayload.payment_method_type,
      bank_ref_no: verifiedPayload.bank_ref_no,
      transaction_date: verifiedPayload.transaction_date || null,

      donor_name: verifiedPayload.additional_info.additional_info1,
      email: verifiedPayload.additional_info.additional_info3,
      mobile: verifiedPayload.additional_info.additional_info4,
      address: verifiedPayload.additional_info.additional_info5,
      state: verifiedPayload.additional_info.additional_info6,
      pan_number: verifiedPayload.additional_info.additional_info2,

      processedAt: new Date().toISOString(),
      raw_webhook_payload: verifiedPayload,
    };

    await db.collection('dev_donations').add(donationRecord);

  } catch (error) {
    console.error('❌ Error saving transaction:', error);
    throw error;
  }
}


// ======================================================
// ✅ MANDATES → dev_mandates
// ======================================================

export async function createPendingMandate({
  subscription_refid,
  name,
  email,
  phone,
  pan,
  address,
  state,
  amount,
  frequency,
}) {
  try {
    const now = new Date().toISOString();

    const mandateRecord = {
      status: "pending",
      donor: { name, email, phone, pan, address, state },
      amount,
      frequency,
      billdesk: {
        mandate_id: null,
        subscription_refid,
      },
      created_at: now,
      updated_at: now,
    };

    await db
      .collection("dev_mandates")
      .doc(subscription_refid)
      .set(mandateRecord);

    return subscription_refid;
  } catch (error) {
    console.error("❌ Failed to create pending mandate:", error);
    throw error;
  }
}

export async function activateMandate({
  subscription_refid,
  mandate_id,
  raw_payload = null,
}) {
  try {
    const now = new Date().toISOString();

    await db
      .collection("dev_mandates")
      .doc(subscription_refid)
      .set(
        {
          status: "active",
          billdesk: { mandate_id, subscription_refid },
          raw_payload,
          updated_at: now,
        },
        { merge: true }
      );
  } catch (error) {
    console.error("❌ Failed to activate mandate:", error);
    throw error;
  }
}


// ======================================================
// ✅ MARK INVOICE AS PAID (SI SUCCESS) + SAFE DONATION CREATE
// ======================================================
export async function markInvoicePaidFromWebhook(payload) {
  try {
    // 1️⃣ Validate success
    const isSuccess =
      payload.auth_status === '0300' &&
      payload.transaction_error_code === 'TRS0000';

    if (!isSuccess) return;

    // 2️⃣ Fetch invoice
    const invoiceSnap = await db
      .collection('dev_invoices')
      .where('billdesk_invoice_id', '==', payload.invoiceid)
      .limit(1)
      .get();

    if (invoiceSnap.empty) return;

    const invoiceDoc = invoiceSnap.docs[0];
    const invoiceId = invoiceDoc.id;
    const invoiceData = invoiceDoc.data();

    // 3️⃣ Mark invoice as paid if needed
    if (invoiceData.status !== 'paid') {
      await db.collection('dev_invoices').doc(invoiceId).set(
        {
          status: 'paid',
          paid_at: payload.transaction_date,
          transactionid: payload.transactionid,
          auth_status: payload.auth_status,
          bank_ref_no: payload.bank_ref_no || null,
          payment_method_type: payload.payment_method_type || null,
          webhook_received_at: new Date().toISOString(),
          last_webhook_payload: payload,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    // 4️⃣ Check if donation with same transaction_id already exists
    const existingDonation = await db
      .collection('dev_donations')
      .where('transaction_id', '==', payload.transactionid)
      .limit(1)
      .get();

    if (!existingDonation.empty) {
      console.log(`ℹ️ Donation already exists for transaction ${payload.transactionid}`);
      return;
    }

    // 5️⃣ Create donation record
    const donationRecord = {
      source: 'recurring',
      invoice_id: invoiceId,
      subscription_refid: invoiceData.subscription_refid,
      transaction_id: payload.transactionid,
      order_id: payload.orderid,
      amount: parseFloat(payload.amount),
      payment_method: payload.payment_method_type || null,
      bank_ref_no: payload.bank_ref_no || null,
      transaction_date: payload.transaction_date,
      donor_name: invoiceData.donor?.name || null,
      email: invoiceData.donor?.email || null,
      mobile: invoiceData.donor?.phone || null,
      address: invoiceData.donor?.address || null,
      state: invoiceData.donor?.state || null,
      pan_number: invoiceData.donor?.pan || null,
      cycleKey: invoiceData.cycleKey,
      processedAt: new Date().toISOString(),
      raw_webhook_payload: payload,
    };

    await db.collection('dev_donations').add(donationRecord);

    // 6️⃣ Mark invoice as donation_created
    await db.collection('dev_invoices').doc(invoiceId).set(
      {
        donation_created: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

  } catch (error) {
    console.error('❌ Error processing recurring payment:', error);
    throw error;
  }
}
