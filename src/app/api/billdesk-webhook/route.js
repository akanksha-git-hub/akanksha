import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

export async function POST(req) {
  try {
    const rawBody = await req.text();

    const secretKey = await importJWK(
      {
        kty: "oct",
        k: Buffer.from(process.env.BILLDESK_SECRET).toString("base64url"),
      },
      "HS256"
    );

    const { payload, protectedHeader } = await jwtVerify(rawBody, secretKey, {
      algorithms: ["HS256"],
    });

    console.log("✅ BillDesk Webhook Verified Payload:", payload);

    // TODO: Save this to database or update payment record
    // Example:
    // await db.updateOrder(payload.orderid, { status: payload.status, ... });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: 'Invalid signature or malformed request' }, { status: 400 });
  }
}
