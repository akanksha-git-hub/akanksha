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
const BILLDESK_MANDATE_ENDPOINT = process.env.BILLDESK_MANDATE_ENDPOINT;
const APP_URL = process.env.APP_URL;

// Firebase init
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

  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

// ------------------------
// IST Date Helper
// ------------------------
function getISTDate(offsetYears = 0) {
  const now = new Date();
  const ist = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  ist.setFullYear(ist.getFullYear() + offsetYears);
  return ist.toISOString().split("T")[0];
}

// Helper to clean name
const cleanName = (str) => {
  if (!str) return "NA";
  return str.replace(/[^a-zA-Z0-9]/g, "");
};

// ------------------------
// POST Handler
// ------------------------
export async function POST(req) {
  try {
    const body = await req.json();
    const { stepC = {}, amount, user_agent = "Unknown Browser" } = body;

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    // IDs
    const orderId = `AKANKSHA-MANDATE-${uuidv4()
      .replace(/-/g, "")
      .slice(0, 12)
      .toUpperCase()}`;

    const customerRefid = stepC.email || `cust-${orderId}`;
    const subscriptionRefid = `SUB-${orderId}`;

    // Dates
    const start_date = getISTDate(0);
    const end_date = getISTDate(5);
    const order_date = new Date().toISOString().split(".")[0] + "Z";

    // Client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    let clientIpAddress =
      forwarded?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    if (clientIpAddress.startsWith("::ffff:")) {
      clientIpAddress = clientIpAddress.slice(7);
    }

    // BillDesk headers
    const BD_Timestamp = Math.floor(Date.now() / 1000).toString();
    const BD_Traceid = `${Date.now()}-${uuidv4()
      .slice(0, 8)
      .toUpperCase()}`;

    // Mandate payload
    const jwsPayloadObject = {
      mercid: MERC_ID,
      orderid: orderId,
      order_date,
      customer_refid: customerRefid,
      subscription_refid: subscriptionRefid,
      subscription_desc: "Akanksha Mandate",
      frequency: "adho",
      amount_type: "max",
      recurrence_rule: "after",
      debit_day: "6",
      start_date,
      end_date,
      currency: "356",
      amount: Number(amount).toFixed(2),

      customer: {
        first_name: cleanName(stepC.first_name).slice(0, 50) || "N/A",
        last_name: cleanName(stepC.last_name).slice(0, 50) || "N/A",
        mobile: stepC.number || "9999999999",
        mobile_alt: stepC.number || "9999999999",
        email: stepC.email || "test@example.com",
        email_alt: stepC.email || "test@example.com",
      },

      device: {
        init_channel: "internet",
        ip: clientIpAddress,
        user_agent,
        accept_header: "text/html",
      },

      ru: `${APP_URL}/api/billdesk-payment-return`,
    };

    console.log(
      "🧾 PG-SI Mandate Payload:",
      JSON.stringify(jwsPayloadObject, null, 2)
    );

    // Sign JWS
    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };

    const secretKey = await importJWK(jwk, "HS256");

    const jwtToken = await new SignJWT(jwsPayloadObject)
      .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
      .sign(secretKey);

    // Call BillDesk
    const bdRes = await fetch(BILLDESK_MANDATE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/jose",
        "Content-Type": "application/jose",
        "BD-Traceid": BD_Traceid,
        "BD-Timestamp": BD_Timestamp,
      },
      body: jwtToken,
      cache: "no-store",
    });

    const responseText = await bdRes.text();
    console.log("📩 Raw BillDesk Response:", responseText);

    if (!bdRes.ok) {
      return NextResponse.json(
        { error: "BillDesk Mandate Error", raw: responseText },
        { status: 400 }
      );
    }

    const { payload } = await jwtVerify(responseText, secretKey);
    console.log(
  "🔓 DECODED BILLDESK RESPONSE (MANDATE):",
  JSON.stringify(payload, null, 2)
);


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
    console.error("🔥 Internal Error:", err);
    return NextResponse.json(
      { error: "Internal Error", details: err.message },
      { status: 500 }
    );
  }
}
