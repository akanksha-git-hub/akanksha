// app/api/create-mandate/route.js
import { SignJWT, importJWK, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import path from "path";

// ENV
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const BILLDESK_MANDATE_ENDPOINT = process.env.BILLDESK_MANDATE_ENDPOINT;
const APP_URL = process.env.APP_URL;

// --- FIREBASE INIT ---
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

// Helpers
function generateEpochTimestampString() {
  return Math.floor(Date.now() / 1000).toString();
}
function generateTraceId() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const dateTimePart =
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());
  return `${dateTimePart}${uuidv4().slice(0, 8).toUpperCase()}`;
}
function toENCA(d) {
  return d.toISOString().split("T")[0];
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      stepC = {},
      amount,
      user_agent = "Unknown Browser",
      payment_method_type = null,
      frequency = "ADHO",
      debit_day = "1",
      amount_type = "max",
      subscription_refid = null,
    } = body;

    if (!amount) {
      return NextResponse.json({ error: "amount is required" }, { status: 400 });
    }

    // IP detection
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    let clientIpAddress = "127.0.0.1";
    if (forwarded) clientIpAddress = forwarded.split(",")[0].trim();
    else if (realIp) clientIpAddress = realIp.trim();
    if (clientIpAddress.startsWith("::ffff:")) {
      clientIpAddress = clientIpAddress.substring(7);
    }

    // Order + timestamp
    const orderId = `AKANKSHA-MANDATE-${uuidv4().slice(0, 12).toUpperCase()}`;
    const bdTimestamp = generateEpochTimestampString();
    const bdTraceid = generateTraceId();
    const orderDate = new Date().toISOString().split(".")[0] + "Z";

    console.log("🪵 Incoming create-mandate request body:", JSON.stringify(body, null, 2));

    // Compute safe start_date (today + 2 days)
    const now = new Date();
    const dStart = new Date(now);
    dStart.setDate(dStart.getDate() + 2);
    const safeStart = toENCA(dStart);

    // Compute safe end_date (5 years after start)
    const dEnd = new Date(safeStart);
    dEnd.setFullYear(dEnd.getFullYear() + 5);
    const safeEnd = toENCA(dEnd);

    // Build unique customer reference
    const customerRef = stepC?.email || `cust-${orderId}`;
    const subscriptionRef = subscription_refid || `SUB-${orderId}`;

    // Build final payload matching EXACT BillDesk spec
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,

      // REQUIRED AT ROOT (from BillDesk docs)
      customer_refid: customerRef,
      subscription_refid: subscriptionRef,
      subscription_desc: "Akanksha Mandate",

      // Mandate-level fields at root level
      currency: "356",
      frequency: frequency.toUpperCase(),
      amount_type,
      amount: Number(amount).toFixed(2),
      start_date: safeStart,
      end_date: safeEnd,
      recurrence_rule: "after",
      debit_day,

      ru: `${APP_URL}/api/billdesk-payment-return`,

      customer: {
        first_name: stepC.first_name || "NA",
        last_name: stepC.last_name || "NA",
        mobile: stepC.number || "0000000000",
        email: stepC.email || "donor@akanksha.org",
      },

      device: {
        init_channel: "internet",
        ip: clientIpAddress,
        user_agent,
        accept_header: "text/html",
      },

      // Mandate object (BillDesk duplicates fields)
      mandate: {
        mercid: MERC_ID,
        amount: Number(amount).toFixed(2),
        currency: "356",
        start_date: safeStart,
        end_date: safeEnd,
        frequency: frequency.toUpperCase(),
        amount_type,
        debit_day,
        subscription_desc: "Akanksha Mandate",
        subscription_refid: subscriptionRef,
        customer_refid: customerRef,
        recurrence_rule: "after",
      },
    };

    console.log("🧾 Sending Mandate Payload to BillDesk:\n", JSON.stringify(jwsPayloadObject, null, 2));

    // Save pending mandate record
    await db.collection("dev_mandates").doc(orderId).set({
      status: "pending",
      orderid: orderId,
      amount: Number(amount).toFixed(2),
      start_date: safeStart,
      end_date: safeEnd,
      frequency: frequency.toUpperCase(),
      subscription_refid: subscriptionRef,
      customer_refid: customerRef,
      raw_request: body,
      raw_payload_sent: jwsPayloadObject,
      createdAt: new Date().toISOString(),
    });

    // JWT signing
    const jwk = { kty: "oct", k: Buffer.from(RAW_SECRET).toString("base64url") };
    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    const billdeskResponse = await fetch(BILLDESK_MANDATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/jose",
        Accept: "application/jose",
        "BD-Traceid": bdTraceid,
        "BD-Timestamp": bdTimestamp,
      },
      body: jwtToken,
    });

    const responseText = await billdeskResponse.text();
    console.log(" Raw BillDesk Response (JWS):", responseText);

    // Error from BillDesk
    if (!billdeskResponse.ok) {
      let decodedError = null;

      try {
        const decoded = await jwtVerify(responseText, secretKey, { algorithms: ["HS256"] });
        decodedError = decoded.payload;
        console.error("❌ BillDesk Mandate ERROR DECODED:", JSON.stringify(decodedError, null, 2));
      } catch (err) {
        console.warn("⚠ Could not decode BillDesk error JWS:", err.message);
      }

      return NextResponse.json(
        {
          error: "BillDesk API Error (mandate create)",
          status: billdeskResponse.status,
          decoded_error: decodedError,
          raw_response: responseText,
        },
        { status: billdeskResponse.status }
      );
    }

    // Success → decode and find redirect link
    const { payload } = await jwtVerify(responseText, secretKey, { algorithms: ["HS256"] });
    console.log("📨 Decoded Mandate Payload:", JSON.stringify(payload, null, 2));

    const redirectLink = payload?.links?.find(
      (link) => link.rel === "redirect" && link.method === "POST"
    );

    if (!redirectLink) {
      return NextResponse.json(
        { error: "Missing redirect info", details: payload },
        { status: 500 }
      );
    }

    return NextResponse.json({
      redirect_url: redirectLink.href,
      parameters: redirectLink.parameters,
      mandate_order_id: orderId,
    });
  } catch (err) {
    console.error("🚨 Internal Error (create-mandate):", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
