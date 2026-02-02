// src/app/api/billdesk-webhook/route.js

import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

import {
  saveTransactionToDB,
  activateMandate,
} from '@/lib/database';

export async function POST(req) {
  try {
    // --------------------------------------------------
    // 1️⃣ Verify BillDesk webhook signature
    // --------------------------------------------------
     console.log("🚨 RAW WEBHOOK HITTTT (before verify)");
    const rawBody = await req.text();

    const secretKey = await importJWK(
      {
        kty: 'oct',
        k: Buffer.from(process.env.BILLDESK_SECRET).toString('base64url'),
      },
      'HS256'
    );

    const { payload } = await jwtVerify(rawBody, secretKey);
  
    console.log(
      '✅ BillDesk Webhook Verified Payload:\n',
      JSON.stringify(payload, null, 2)
    );

    // --------------------------------------------------
    // 2️⃣ ROUTING LOGIC (THIS IS THE FIX)
    // --------------------------------------------------

    /**
     * ✅ ONE-TIME PAYMENT (Money already received)
     * objectid = transaction
     * txn_process_type !== si
     */
    if (
      payload.objectid === 'transaction' &&
      payload.txn_process_type !== 'si'
    ) {
      console.log('💰 Detected ONE-TIME PAYMENT');
      await saveTransactionToDB(payload);
    }


    /**
     * ✅ MANDATE ACTIVATION (Permission approved)
     * objectid = mandate
     */
    else if (
      payload.objectid === 'mandate' &&
      payload.mandateid &&
      payload.subscription_refid
    ) {
      console.log('📜 Detected MANDATE ACTIVATION');

      await activateMandate({
        subscription_refid: payload.subscription_refid,
        mandate_id: payload.mandateid,
        raw_payload: payload,
      });
    }

    /**
     * ℹ️ Everything else (SI debits, retries, status pings, etc.)
     */
    else {
   

       console.log(
    '🔁  DEBIT Invoice WEBHOOK RECEIVED',
    JSON.stringify(payload, null, 2)
  );
    }

    // --------------------------------------------------
    // 3️⃣ Acknowledge webhook
    // --------------------------------------------------
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error('❌ Webhook processing failed:', err);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
