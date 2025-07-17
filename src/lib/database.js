// src/lib/database.js

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';

// --- Firebase Initialization ---
// This handles both your production server and local development
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === 'production') {
    // The path you use on your secure production server
    serviceAccount = JSON.parse(readFileSync("/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json", "utf8"));
  } else {
    // A path for local development (assumes 'secrets' folder is in your project root)
    const devPath = path.resolve(process.cwd(), 'secrets', 'firebaseServiceAccount.json');
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// --- The function that SAVES the final transaction data ---
export async function saveTransactionToDB(verifiedPayload) {
  try {
    console.log("Preparing to save final transaction to Firestore...");

    // 1. Map the fields from the payload to a clean database record
    const donationRecord = {
      // Transaction Details
      transaction_id: verifiedPayload.transactionid,
      order_id: verifiedPayload.orderid,
      status: verifiedPayload.transaction_error_desc, // "Transaction Successful"
      amount: parseFloat(verifiedPayload.amount),
      payment_method: verifiedPayload.payment_method_type,
      bank_ref_no: verifiedPayload.bank_ref_no,
      transaction_date: new Date(verifiedPayload.transaction_date).toISOString(),

      // Donor Details from 'additional_info' and 'customer'
      donor_name: verifiedPayload.additional_info.additional_info3, // "Sumesh P"
      email: verifiedPayload.customer.email,
      mobile: verifiedPayload.customer.mobile,
      city: verifiedPayload.additional_info.additional_info5, // "Bengaluru"
      state: verifiedPayload.additional_info.additional_info9, // "Haryana"
      pincode: verifiedPayload.additional_info.additional_info7, // "695008"
      pan_number: verifiedPayload.additional_info.additional_info8, // "KGNOS5223Q"
      
      // Timestamps and Raw Data for auditing
      processedAt: new Date().toISOString(),
      raw_webhook_payload: verifiedPayload,
    };
    
    // 2. Add the new document to the 'donations' collection
    const docRef = await db.collection('donations').add(donationRecord);

    console.log(`✅ Successfully saved donation to Firestore. Document ID: ${docRef.id}`);
    
  } catch (error) {
    console.error('❌ Error saving transaction to Firestore:', error);
    // Re-throw the error so the main webhook function knows something went wrong
    throw error;
  }
}