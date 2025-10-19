// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { appendOrder } from "./_orders-store.mjs";

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

      // items pentru log (mini-dashboard)
      const items =
        (li?.data || []).map((it) => ({
          description: it.description,
          quantity: it.quantity,
          amount_total: (it.amount_total || 0) / 100,
          currency:
            it.currency?.toUpperCase() ||
            session.currency?.toUpperCase() ||
            "RON",
          fileKey: it?.price?.product?.metadata?.fileKey || null,
          format:
            it?.price?.product?.metadata?.format?.toUpperCase() || null,
        })) || [];

      // chei pentru descărcare (doar digitale)
      let keys = items.map((it) => it.fileKey).filter(Boolean);
      const hasPaperback = items.some((it) => it.format === "PAPERBACK");
      keys = [...new Set(keys)].sort();

      const total_amount = (session.amount_total || 0) / 100;
      const currency =
        (session.currency || items[0]?.currency || "RON").toUpperCase();

      // listă unică de formate (pentru filtrare/raport)
      const formatsList = Array.from(
        new Set(items.map((it) => it.format).filter(Boolean))
      );

      // țara clientului (dacă e disponibilă)
      const country =
        (session.customer_details?.address?.country || "")
          .toUpperCase() || null;

      // LOG în mini-dashboard (Blob)
      try {
        const order = {
          id: session.id,
          createdAt: Date.now(),
          email,
          name,
          amount: total_amount,
          currency,
          items,
          hasDownloads: keys.length > 0,
          hasPaperback,
          status: "paid",
          country,       // ex: "RO", "DE"
          formats: formatsList, // ex: ["PDF", "EPUB"] sau ["PAPERBACK"]
        };
        await appendOrder(order);
        console.log("🗂️ Order logged:", order.id);
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

      // ✉️ Email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const hasDownloads = keys.length > 0;

      const downloadBlock = hasDownloads
        ? `
          <div style="margin:22px 0">
            <a href="${downloadPage}" style="display:inline-block;background:#2a9d8f;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:700">
              📥 Descarcă eBook-urile
            </a>
          </div>`
        : "";

      const paperbackNote = hasPaperback
        ? `
          <div style="margin:12px 0 0 0;padding:12px 14px;border-radius:10px;background:#f6f8f9;border:1px solid #e8ecef;color:#444;">
            Comanda ta include și produse fizice (Paperback). Te contactăm în 24–48h cu detalii de livrare.
          </div>`
        : "";

      const html = `
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8f9;padding:24px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.06)">
              <tr>
                <td align="center" style="padding:22px;background:#e8f4f2;">
                  <img src="${SITE}/logo-midaway.png" width="64" height="64" alt="Midaway" style="display:block;border-radius:12px;border:1px solid #dfe9e7" />
                </td>
              </tr>
              <tr>
                <td style="padding:28px">
                  <h1 style="margin:0 0 8px 0;color:#2a9d8f;font-size:24px;line-height:1.3">
                    Mulțumim pentru comanda ta, ${String(name || "")
                      .toLowerCase()
                      .trim()}!
                  </h1>
                  <p style="margin:0 0 16px 0;font-size:16px;color:#333;">
                    Plata a fost procesată cu succes.
                    ${
                      hasDownloads
                        ? "Linkul tău de descărcare este valabil 48 de ore."
                        : "Am înregistrat comanda ta pentru produsele fizice."
                    }
                  </p>
                  ${downloadBlock}
                  ${paperbackNote}
                  <p style="margin:12px 0 0 0;color:#6a6a6a;font-size:12px">
                    Dacă nu ai inițiat această comandă, scrie-ne: <a href="mailto:contact@midaway.ro" style="color:#2a9d8f;text-decoration:none">contact@midaway.ro</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px">
                  © 2025 MIDAWAY • <a href="${SITE}" style="color:#2a9d8f;text-decoration:none">midaway.vercel.app</a>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>`;

      await transporter.sendMail({
        from: `"Midaway" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Comanda ta Midaway este confirmată ✅",
        html,
      });

      console.log(
        "✅ Email trimis către:",
        email,
        "| keys:",
        keys,
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
        formats: [], // nu avem formate când plata eșuează înainte de checkout complet
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
      });
      console.log("🟨 session expired logged:", s.id);
    } catch (e) {
      console.error("session.expired append error:", e);
    }
  }

  // răspuns standard pentru Stripe
  res.json({ received: true });
}
