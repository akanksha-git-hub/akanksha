  // app/api/cron/debit-invoices/route.js
  // 🔐 Manual / cron-triggered debit runner for existing invoices

  import { getFirestore } from "firebase-admin/firestore";
  import { initializeApp, getApps, cert } from "firebase-admin/app";
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

  // ---------------- Config ----------------
  const CRON_SECRET = process.env.CRON_SECRET;
  const APP_URL = process.env.APP_URL;

  // ---------------- Handler ----------------
  export async function POST(req) {
    try {
      // 🔐 Auth guard
      const authHeader = req.headers.get("authorization");
      if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

     
   const nowIST = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
);
if (nowIST.getDate() !== 5) {
  return Response.json({
    success: true,
    message: "Not debit day",
  });
}

const year = nowIST.getFullYear();
const month = String(nowIST.getMonth() + 1).padStart(2, "0");
const day = String(nowIST.getDate()).padStart(2, "0");

const today = `${year}-${month}-${day}`;


      // 🔎 Find unpaid invoices due today
      const invoicesSnap = await db
        .collection("invoices")
        .where("status", "==", "unpaid")
        .where("debit_date", "==", today)
        .get();

      if (invoicesSnap.empty) {
        return Response.json({
          success: true,
          message: "No invoices due today",
        });
      }

      const results = [];

      for (const doc of invoicesSnap.docs) {
        const invoice = doc.data();
        const invoiceId = doc.id;

        // 🚫 Skip if already attempted
        if (invoice.debit_attempted) {
          console.log(`⏩ Skipping ${invoiceId} — already attempted`);
          continue;
        }

        // 🚫 Validate mandate status
        if (invoice.mandateid) {
          const mandateSnap = await db
            .collection("mandates")
            .where("mandate_id", "==", invoice.mandateid)
            .limit(1)
            .get();

          if (!mandateSnap.empty) {
            const mandate = mandateSnap.docs[0].data();
            if (mandate.status !== "active") {
              console.log(
                `⏩ Skipping ${invoiceId} — mandate ${invoice.mandateid} is ${mandate.status}`
              );
              continue;
            }
          }
        }

        //  payload
      const payload = {

  invoiceid: invoice.billdesk_invoice_id,
  mandateid: invoice.mandateid,
  subscription_refid: invoice.subscription_refid,

  
  amount: invoice.amount,

customer_refid: invoice.raw_response?.customer_refid,
  
  additional_info: {
    additional_info1: invoice.donor?.address || "",
    additional_info2: invoice.donor?.pan || "",
    additional_info3: invoice.donor?.email || "",
    additional_info4: invoice.donor?.phone || "",
     additional_info5: invoice.donor?.name || "",
  },


  device: {
    init_channel: "internet",
    ip: "127.0.0.1",
    user_agent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },

  
  payment: {
    payment_method_type: invoice.payment?.payment_method_type,
    ...(invoice.payment?.payment_method_type === "card" && {
      card: {
        cardaccountid: invoice.payment?.card?.cardaccountid,
        card_end: invoice.payment?.card?.card_end,
      },
    }),
  },
};


        console.log("➡️ Triggering debit:", payload);

        // 🔁 Call internal debit API
        const res = await fetch(
          `${APP_URL}/api/create-order-from-invoice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const resJson = await res.json();

        // 📝 Mark invoice as attempted (IMPORTANT)
        await db
          .collection("invoices")
          .doc(invoiceId)
          .set(
            {
              debit_attempted: true,
              debit_attempted_at: new Date().toISOString(),
              last_debit_response: resJson,
            },
            { merge: true }
          );

        results.push({
          invoiceid: invoiceId,
          http_status: res.status,
          response: resJson,
        });
      }

      return Response.json({ success: true, results });
    } catch (err) {
      console.error("❌ Debit cron failed:", err);
      return Response.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }
