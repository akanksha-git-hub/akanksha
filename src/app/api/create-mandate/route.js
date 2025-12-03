// app/api/create-mandate/route.js
import { SignJWT, importJWK, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import path from "path";

// ENV
const MERC_ID = process.env.BILLDESK_MERC_ID;
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;

// IMPORTANT — PG-SI Mandate Endpoint
const BILLDESK_MANDATE_ENDPOINT = process.env.BILLDESK_MANDATE_ENDPOINT;

// Firebase init
if (!getApps().length) {
  let serviceAccount;
  if (process.env.NODE_ENV === "production") {
    serviceAccount = JSON.parse(
      readFileSync("/var/www/next-prismic/akanksha-dev/secrets/firebaseServiceAccount.json", "utf8")
    );
  } else {
    const devPath = path.resolve(process.cwd(), "secrets", "firebaseServiceAccount.json");
    serviceAccount = JSON.parse(readFileSync(devPath, "utf8"));
  }
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

// ------------------------
// Date Helpers (IST)
// ------------------------
function getISTDate(offsetYears = 0) {
  const date = new Date();
  const ist = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  ist.setFullYear(ist.getFullYear() + offsetYears);
  return ist.toISOString().split("T")[0];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { stepC = {}, amount } = body;

    if (!amount) {
      return NextResponse.json({ error: "amount is required" }, { status: 400 });
    }

    const orderId = `AKANKSHA-MANDATE-${uuidv4().slice(0, 12).toUpperCase()}`;

    // Required IDs
    const customerRef = stepC.email || `anon-${orderId}`;
    const subscriptionRef = `SUB-${orderId}`;

    // Dates
    const startDate = getISTDate(0); // today IST
    const endDate = getISTDate(5);  // +5 years

    // Client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    let clientIpAddress = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";
    if (clientIpAddress.startsWith("::ffff:")) clientIpAddress = clientIpAddress.slice(7);

    // ------------------------
    // Build Payload (PG-SI Format)
    // ------------------------
    const jwsPayloadObject = {
      mercid: MERC_ID,

      // REQUIRED ROOT FIELDS — must match BillDesk sample
      customer_refid: customerRef,
      subscription_refid: subscriptionRef,
      subscription_desc: "Akanksha Mandate",

      currency: "356",
      amount: Number(amount).toFixed(2),

      frequency: "adho",
      amount_type: "max",
      debit_day: "2", // ignored for adho, but required by API
      recurrence_rule: "after",

      start_date: startDate,
      end_date: endDate,

      customer: {
        first_name: stepC.first_name || "N/A",
        last_name: stepC.last_name || "N/A",
        mobile: stepC.number || "9999999999",
        mobile_alt: stepC.number || "9999999999",
        email: stepC.email || "test@example.com",
        email_alt: stepC.email || "test@example.com",
      },

      device: {
        init_channel: "internet",
        ip: clientIpAddress,
        user_agent: body.user_agent || "Unknown",
        accept_header: "text/html",
      },

      ru: `${process.env.APP_URL}/api/billdesk-payment-return`,
    };

    console.log("🧾 Sending Mandate Payload:\n", JSON.stringify(jwsPayloadObject, null, 2));

    // Save pending Firestore entry
    await db.collection("dev_mandates")
      .doc(orderId)
      .set({
        status: "pending",
        orderid: orderId,
        subscription_refid: subscriptionRef,
        customer_refid: customerRef,
        amount: jwsPayloadObject.amount,
        start_date: startDate,
        end_date: endDate,
        raw_request: body,
        raw_payload_sent: jwsPayloadObject,
        createdAt: new Date().toISOString(),
      });

    // ------------------------
    // Sign JWS
    // ------------------------
    const jwk = { kty: "oct", k: Buffer.from(RAW_SECRET).toString("base64url") };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    // ------------------------
    // POST to BillDesk Mandate API
    // ------------------------
    const billdeskResponse = await fetch(BILLDESK_MANDATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        Accept: "application/jose",
      },
      body: jwtToken,
    });

    const responseText = await billdeskResponse.text();
    console.log("📩 Raw BillDesk Response:", responseText);

    if (!billdeskResponse.ok) {
      console.log("❌ BillDesk Error:", responseText);
      return NextResponse.json(
        {
          error: "BillDesk Mandate Error",
          status: billdeskResponse.status,
          raw: responseText,
        },
        { status: 400 }
      );
    }

    const { payload } = await jwtVerify(responseText, secretKey);
    console.log("📨 Decoded Mandate Response:", JSON.stringify(payload, null, 2));

    const redirectLink = payload?.links?.find(
      (l) => l.rel === "redirect" && l.method === "POST"
    );

    if (!redirectLink) {
      return NextResponse.json(
        { error: "Missing redirect info", response: payload },
        { status: 500 }
      );
    }

    return NextResponse.json({
      redirect_url: redirectLink.href,
      parameters: redirectLink.parameters,
      mandate_order_id: orderId,
    });

  } catch (err) {
    console.error("🔥 Internal Error (mandate):", err);
    return NextResponse.json(
      { error: "Internal Error", details: err.message },
      { status: 500 }
    );
  }
}
