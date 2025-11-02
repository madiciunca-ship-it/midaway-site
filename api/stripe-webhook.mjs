// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { appendOrder } from "./_orders-store.mjs";

// ───────────────── EMAIL BUILDER RO+EN ─────────────────
function buildEmailHTML({
  orderId,
  name,
  total,
  currency,
  downloadsUrl,
  items,
}) {
  const hasPaperback = items.some(i => i.type === "book" && i.format === "PAPERBACK");
  const hasService   = items.some(i => i.type === "service");

  const servicesList = items
    .filter(i => i.type === "service")
    .map(i => `• ${i.name}`)
    .join("<br/>");

  const helloRO = name ? `Mulțumim, <strong>${name}</strong>!` : "Mulțumim!";
  const helloEN = name ? `Thank you, <strong>${name}</strong>!` : "Thank you!";

  const SITE = process.env.SITE_URL || "https://midaway.vercel.app";

  const notePaperRO = hasPaperback
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #e6f0e6;border-radius:10px;background:#f7fffa;color:#184a2c">
         Comanda ta include și produse fizice (Paperback). Te contactăm în 24–48h cu detalii de livrare.
       </div>`
    : "";

  const notePaperEN = hasPaperback
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #e6f0e6;border-radius:10px;background:#f7fffa;color:#184a2c">
         Your order includes physical items (Paperback). We will contact you in 24–48h with delivery details.
       </div>`
    : "";

  const noteSvcRO = hasService
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #fff0cc;border-radius:10px;background:#fffbea;color:#5c4b00">
         Ai comandat servicii editoriale. Programarea & prestarea se fac în baza termenilor agreați.
         Politica de anulare: <a href="${SITE}/#/politica-anulare" style="color:#7a5b00" target="_blank" rel="noopener">vezi aici</a>.
         ${servicesList ? `<div style="margin-top:8px">${servicesList}</div>` : ""}
       </div>`
    : "";

  const noteSvcEN = hasService
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #fff0cc;border-radius:10px;background:#fffbea;color:#5c4b00">
         You have ordered editorial services. Scheduling & delivery are done under agreed terms.
         Cancellation policy: <a href="${SITE}/#/politica-anulare" style="color:#7a5b00" target="_blank" rel="noopener">see here</a>.
         ${servicesList ? `<div style="margin-top:8px">${servicesList}</div>` : ""}
       </div>`
    : "";

  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#0f172a">
    <h1 style="color:#199473;margin:0 0 8px 0">Comanda ta Midaway #${orderId} este confirmată ✅</h1>
    <div style="margin-bottom:10px">Total: <strong>${total} ${currency}</strong></div>
    <p style="margin:12px 0">${helloRO} Plata a fost procesată cu succes. Linkul tău de descărcare este valabil 48 de ore.</p>

    <a href="${downloadsUrl}"
       style="display:inline-block;background:#199473;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:700;margin:8px 0">
       📥 Descarcă eBook-urile
    </a>

    ${notePaperRO}
    ${noteSvcRO}

    <hr style="border:none;height:1px;background:#eee;margin:24px 0"/>

    <h2 style="color:#199473;margin:0 0 8px 0">Your Midaway order #${orderId} is confirmed ✅</h2>
    <div style="margin-bottom:10px">Total: <strong>${total} ${currency}</strong></div>
    <p style="margin:12px 0">${helloEN} Your payment was processed successfully. Your download link is valid for 48 hours.</p>

    <a href="${downloadsUrl}"
       style="display:inline-block;background:#199473;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:700;margin:8px 0">
       📥 Download your eBooks
    </a>

    ${notePaperEN}
    ${noteSvcEN}

    <p style="margin-top:18px;color:#334155;font-size:14px">
      Dacă nu ai inițiat această comandă, scrie-ne: <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>.
    </p>
  </div>`;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// citește raw body (necesar pentru verificarea semnăturii Stripe)
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// semnăm tokenul de download (valabil 48h)
function signToken(payloadObj) {
  const body = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

// număr comandă simplu și lizibil: MID-YYYYMMDD-XXXXXX
function genOrderNo(sessionId) {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const tail = String(sessionId || "").slice(-6).toUpperCase();
  return `MID-${y}${m}${day}-${tail}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  let event;
  try {
    const raw = await readRawBody(req);
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Semnătură Stripe invalidă:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ———————————————————————————————————————————
  // 1) COMANDĂ FINALIZATĂ
  // ———————————————————————————————————————————
  if (event.type === "checkout.session.completed") {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["customer_details"] }
      );

      const email = session.customer_details?.email || null;
      const name = session.customer_details?.name || "Client";
      if (!email) {
        console.warn("❗ Lipsă email client – nu pot trimite confirmarea.");
        return res.json({ received: true });
      }

      // citim o singură dată line items
      const li = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      // items pentru log + metadate (fileKey/format/type)
      const items =
        (li?.data || []).map((it) => {
          const meta = it?.price?.product?.metadata || {};
          const type = meta?.type || null; // ex: "courier_fee" / "service"
          return {
            description: it.description,
            quantity: it.quantity,
            amount_total: (it.amount_total || 0) / 100,
            currency:
              it.currency?.toUpperCase() ||
              session.currency?.toUpperCase() ||
              "RON",
            fileKey: meta?.fileKey || null,
            format: meta?.format ? String(meta.format).toUpperCase() : null,
            type, // courier_fee / service / null (book)
            name: it?.price?.product?.name || it.description || "Produs",
          };
        }) || [];

      const hasPaperback = items.some((it) => it.format === "PAPERBACK");
      const hasDownloads = items.some((it) => !!it.fileKey);

      // sumăm separat taxa de curier (dacă există)
      const courierFee = items
        .filter((it) => it.type === "courier_fee")
        .reduce((s, it) => s + Number(it.amount_total || 0), 0);

      // chei pentru descărcare (doar digitale)
      let keys = items.map((it) => it.fileKey).filter(Boolean);
      keys = [...new Set(keys)].sort();

      const total_amount = (session.amount_total || 0) / 100;
      const currency =
        (session.currency || items[0]?.currency || "RON").toUpperCase();

      // listă unică de formate (ignoram liniile fără format, ex: courier_fee)
      const formatsList = Array.from(
        new Set(items.map((it) => it.format).filter(Boolean))
      );

      // țara clientului (dacă e disponibilă)
      const country =
        (session.customer_details?.address?.country || "")
          .toUpperCase() || null;

      // număr de comandă
      const orderNo = genOrderNo(session.id);

      // LOG în mini-dashboard (Blob/JSON)
      try {
        const order = {
          id: session.id,
          orderNo,                 // 👈 nou
          createdAt: Date.now(),
          email,
          name,
          amount: total_amount,
          currency,
          items,
          hasDownloads,
          hasPaperback,
          courierFee,              // 👈 nou (sumă)
          status: "paid",
          country,                 // ex: "RO", "DE"
          formats: formatsList,    // ex: ["PDF","PAPERBACK"]
        };
        await appendOrder(order);
        console.log("🗂️ Order logged:", order.orderNo, order.id);
      } catch (e) {
        console.error("❌ Failed to append order:", e);
      }

      // Token de descărcare (dacă există fișiere)
      const exp = Date.now() + 48 * 60 * 60 * 1000; // 48h
      const token = signToken({ sid: session.id, email, keys, exp });

      const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
      const downloadPage = `${SITE}/api/download?token=${encodeURIComponent(
        token
      )}`;

      // ✉️ Email (bilingv + servicii + paperback)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      // pregătim item-urile pentru builder (book/service/courier_fee)
      const itemsForEmail = items.map((it) => {
        let t = "book";
        if (it.type === "service") t = "service";
        if (it.type === "courier_fee") t = "courier_fee";
        return {
          type: t,
          name: it.name || it.description || "Produs",
          format: it.format || null,
        };
      });

      const html = buildEmailHTML({
        orderId: orderNo,
        name,
        total: total_amount,
        currency,
        downloadsUrl: downloadPage,
        items: itemsForEmail,
      });

      await transporter.sendMail({
        from: `"Midaway" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Midaway • Confirmare comanda #${orderNo}`,
        html,
      });

      console.log(
        "✅ Email trimis către:",
        email,
        "| orderNo:",
        orderNo,
        "| hasPaperback:",
        hasPaperback
      );
    } catch (err) {
      console.error("Eroare procesare checkout.session.completed:", err);
    }
  }

  // ———————————————————————————————————————————
  // 2) CARD RESPINS (payment_intent.payment_failed)
  // ———————————————————————————————————————————
  if (event.type === "payment_intent.payment_failed") {
    try {
      const pi = event.data.object;
      const last = pi?.charges?.data?.[0] || {};
      const email = last?.billing_details?.email || null;
      const name = last?.billing_details?.name || null;
      const currency = (pi?.currency || "").toUpperCase();
      const amount = (pi?.amount || 0) / 100;
      const reason = pi?.last_payment_error?.message || "Payment failed";
      const country =
        (last?.billing_details?.address?.country || "").toUpperCase() || null;

      await appendOrder({
        id: pi.id,
        orderNo: genOrderNo(pi.id),
        createdAt: Date.now(),
        email,
        name,
        amount,
        currency,
        items: [],
        hasDownloads: false,
        hasPaperback: false,
        status: "failed",
        failureReason: reason,
        country,
        formats: [],
        courierFee: 0,
      });

      console.log("🟥 payment_failed logged:", pi.id, reason);
    } catch (e) {
      console.error("payment_failed append error:", e);
    }
  }

  // ———————————————————————————————————————————
  // 3) SESIUNE EXPIRATĂ / ABANDONATĂ
  // ———————————————————————————————————————————
  if (event.type === "checkout.session.expired") {
    try {
      const s = event.data.object;
      await appendOrder({
        id: s.id,
        orderNo: genOrderNo(s.id),
        createdAt: Date.now(),
        email: s.customer_details?.email || null,
        name: s.customer_details?.name || null,
        amount: (s.amount_total || 0) / 100,
        currency: (s.currency || "").toUpperCase(),
        items: [],
        hasDownloads: false,
        hasPaperback: false,
        status: "expired",
        country:
          (s.customer_details?.address?.country || "").toUpperCase() || null,
        formats: [],
        courierFee: 0,
      });
      console.log("🟨 session expired logged:", s.id);
    } catch (e) {
      console.error("session.expired append error:", e);
    }
  }

  // răspuns standard pentru Stripe
  res.json({ received: true });
}
