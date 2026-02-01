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
    console.log("Preparing to save final transaction to Firestore...");

    const donationRecord = {
      transaction_id: verifiedPayload.transactionid,
      order_id: verifiedPayload.orderid,
      status: verifiedPayload.transaction_error_desc,
      amount: parseFloat(verifiedPayload.amount),
      payment_method: verifiedPayload.payment_method_type,
      bank_ref_no: verifiedPayload.bank_ref_no,
      transaction_date: new Date(
        verifiedPayload.transaction_date
      ).toISOString(),

      donor_name: verifiedPayload.additional_info.additional_info1,
      email: verifiedPayload.additional_info.additional_info3,
      mobile: verifiedPayload.additional_info.additional_info4,
      address: verifiedPayload.additional_info.additional_info5,
      state: verifiedPayload.additional_info.additional_info6,
      pan_number: verifiedPayload.additional_info.additional_info2,

      processedAt: new Date().toISOString(),
      raw_webhook_payload: verifiedPayload,
    };

    const docRef = await db
      .collection('dev_donations')
      .add(donationRecord);

    console.log(
      `✅ Successfully saved donation. Document ID: ${docRef.id}`
    );
  } catch (error) {
    console.error('❌ Error saving transaction:', error);
    throw error;
  }
}


// ======================================================
// ✅ MANDATES → dev_mandates
// ======================================================

// 1️⃣ Create PENDING mandate (before redirect to BillDesk)
export async function createPendingMandate({
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
      status: "pending", // pending | active | failed | cancelled

      donor: {
        name,
        email,
        phone,
        pan,
        address,
        state,
      },

      amount,
      frequency,

      billdesk: {
        mandate_id: null,
        subscription_refid: null,
      },

      created_at: now,
      updated_at: now,
    };

    const docRef = await db
      .collection("dev_mandates")
      .add(mandateRecord);

    console.log("✅ Pending mandate created:", docRef.id);

    // IMPORTANT: use this as subscription_refid
    return docRef.id;
  } catch (error) {
    console.error("❌ Failed to create pending mandate:", error);
    throw error;
  }
}


// 2️⃣ Activate mandate (Return URL / webhook)
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
          billdesk: {
            mandate_id,
            subscription_refid,
          },
          raw_payload,
          updated_at: now,
        },
        { merge: true }
      );

    console.log("✅ Mandate activated:", mandate_id);
  } catch (error) {
    console.error("❌ Failed to activate mandate:", error);
    throw error;
  }
}
