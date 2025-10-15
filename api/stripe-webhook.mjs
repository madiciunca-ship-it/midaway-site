// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

  if (event.type === "checkout.session.completed") {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["customer_details"] }
      );

      const email = session.customer_details?.email;
      const name = session.customer_details?.name || "Client";
      if (!email) {
        console.warn("❗ Lipsă email client – nu pot trimite confirmarea.");
        return res.json({ received: true });
      }

      // 🔎 CITIM ÎNTOTDEAUNA line items → știm sigur dacă avem Paperback și ce eBooks există
      const li = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      // fileKeys (doar pentru digitale)
      let keys =
        li?.data
          ?.map((it) => it?.price?.product?.metadata?.fileKey)
          ?.filter(Boolean) || [];

      // detectăm dacă există Paperback în comandă
      const formats =
        li?.data
          ?.map((it) => it?.price?.product?.metadata?.format?.toUpperCase())
          ?.filter(Boolean) || [];
      const hasPaperback = formats.some((f) => f === "PAPERBACK");

      // Eliminăm duplicate, sortăm pentru consistență
      keys = [...new Set(keys)].sort();

      const exp = Date.now() + 48 * 60 * 60 * 1000; // 48h
      const token = signToken({ sid: session.id, email, keys, exp });

      const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
      const downloadPage = `${SITE}/api/download?token=${encodeURIComponent(
        token
      )}`;

      // ✉️ configurăm email-ul
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const hasDownloads = keys && keys.length > 0;

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
                    Mulțumim pentru comanda ta, ${name.toLowerCase()}!
                  </h1>
                  <p style="margin:0 0 16px 0;font-size:16px;color:#333;">
                    Plata a fost procesată cu succes.
                    ${hasDownloads ? "Linkul tău de descărcare este valabil 48 de ore." : "Am înregistrat comanda ta pentru produsele fizice."}
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

      console.log("✅ Email trimis către:", email, "| keys:", keys, "| hasPaperback:", hasPaperback);
    } catch (err) {
      console.error("Eroare procesare checkout.session.completed:", err);
    }
  }

  res.json({ received: true });
}
