import { NextResponse } from "next/server";
import { SignJWT, importJWK, jwtVerify } from "jose";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import path from "path";

// ---------------- Firebase Init ----------------
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

// ---------------- ENV ----------------
const CLIENT_ID = process.env.BILLDESK_CLIENT_ID;
const MERC_ID = process.env.BILLDESK_MERC_ID;
const RAW_SECRET = process.env.BILLDESK_SECRET;
const CRON_SECRET = process.env.CRON_SECRET;

const BILLDESK_MANDATE_STATUS_ENDPOINT =
  "https://uat1.billdesk.com/u2/pgsi/ve1_2/mandates/get";

// ---------------- Helpers ----------------
function generateEpochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateTraceId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// ---------------- POST (cron) ----------------
export async function POST(req) {
  try {
    // 🔐 Auth Guard
    const auth = req.headers.get("authorization");
    if (!auth || auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔎 Fetch active mandates
    const mandatesSnap = await db
      .collection("dev_mandates")
      .where("status", "==", "active")
      .get();

    if (mandatesSnap.empty) {
      return NextResponse.json({
        success: true,
        message: "No active mandates",
      });
    }

    const jwk = {
      kty: "oct",
      k: Buffer.from(RAW_SECRET).toString("base64url"),
    };

    const secretKey = await importJWK(jwk, "HS256");

    const results = [];

    for (const doc of mandatesSnap.docs) {
      const mandate = doc.data();
      const subscription_refid = doc.id;
      const mandate_id = mandate.billdesk?.mandate_id;

      if (!mandate_id) continue;

      try {
        const payload = {
          mercid: MERC_ID,
          mandateid: mandate_id,
        };

        const jwtToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256", clientid: CLIENT_ID })
          .sign(secretKey);

        const res = await fetch(BILLDESK_MANDATE_STATUS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/jose",
            Accept: "application/jose",
            "BD-Timestamp": generateEpochTimestamp(),
            "BD-Traceid": generateTraceId(),
          },
          body: jwtToken,
        });

        const resText = await res.text();

        // 🔴 Handle HTTP error or non-JWS response
        if (!res.ok || !resText.includes(".")) {
          console.error(
            "BillDesk error response:",
            res.status,
            resText
          );

          await db.collection("dev_mandates").doc(subscription_refid).set(
            {
              status: "invalid", // internal lifecycle status
              billdesk_status: res.status, // store HTTP code
              reconciliation_checked_at: new Date().toISOString(),
              last_status_payload: {
                status: res.status,
                raw_response: resText,
              },
            },
            { merge: true }
          );

          results.push({
            subscription_refid,
            mandate_id,
            billdesk_status: res.status,
          });

          continue;
        }

        // 🟢 Valid JWS response
        const { payload: decoded } = await jwtVerify(
          resText,
          secretKey
        );

        const billdeskStatus = decoded.status;

        await db.collection("dev_mandates").doc(subscription_refid).set(
          {
            status: billdeskStatus, // active / cancelled / suspended etc.
            billdesk_status: billdeskStatus,
            reconciliation_checked_at: new Date().toISOString(),
            last_status_payload: decoded,
          },
          { merge: true }
        );

        results.push({
          subscription_refid,
          mandate_id,
          billdesk_status: billdeskStatus,
        });

      } catch (mandateError) {
        console.error(
          `Error reconciling mandate ${mandate_id}:`,
          mandateError
        );

        await db.collection("dev_mandates").doc(subscription_refid).set(
          {
            status: "error",
            billdesk_status: 500,
            reconciliation_checked_at: new Date().toISOString(),
            last_status_payload: {
              error: mandateError.message,
            },
          },
          { merge: true }
        );

        results.push({
          subscription_refid,
          mandate_id,
          billdesk_status: 500,
        });
      }
    }

    // ✅ Return AFTER processing all mandates
    return NextResponse.json({ success: true, results });

  } catch (err) {
    console.error("❌ Mandate reconciliation failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
