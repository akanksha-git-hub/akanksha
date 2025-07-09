// src/lib/database.js

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// --- Simplified Firebase Initialization ---
// This block will now run the same way in every environment.
if (!getApps().length) {
  try {
    // It will ALWAYS look for the file at this exact, absolute path.
    const serviceAccountPath = "/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json";
    
    console.log(`Attempting to read Firebase credentials from: ${serviceAccountPath}`);
    
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log("Firebase Admin connection initialized successfully.");

  } catch (error) {
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("!!! FAILED TO INITIALIZE FIREBASE ADMIN SDK !!!");
    console.error("!!! Could not read or parse the service account file. !!!");
    console.error(`!!! Make sure the file exists at: /var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json !!!`);
    console.error("!!! Error Details:", error.message);
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // Throwing the error is important so the app doesn't continue in a broken state.
    throw new Error("Could not initialize Firebase Admin. Check server logs.");
  }
}

const db = getFirestore();

// --- The function that SAVES the final transaction data ---
// (This part remains exactly the same)
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
      transaction_date: new Date(verifiedPayload.transaction_date),
      donor_name: verifiedPayload.additional_info.additional_info3,
      email: verifiedPayload.customer.email,
      mobile: verifiedPayload.customer.mobile,
      city: verifiedPayload.additional_info.additional_info5,
      state: verifiedPayload.additional_info.additional_info9,
      pincode: verifiedPayload.additional_info.additional_info7,
      pan_number: verifiedPayload.additional_info.additional_info8,
      processedAt: new Date(),
      raw_webhook_payload: verifiedPayload,
    };
    
    const docRef = await db.collection('donations').add(donationRecord);
    console.log(`✅ Successfully saved donation to Firestore. Document ID: ${docRef.id}`);
    
  } catch (error) {
    console.error('❌ Error saving transaction to Firestore:', error);
    throw error;
  }
}