// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Citește RAW body (obligatoriu pentru verificarea semnăturii Stripe)
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// Semnează payload-ul (HMAC-SHA256). Tokenul va conține sid + email + exp.
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
        { expand: ["line_items.data.price.product", "customer_details"] }
      );

      const email = session.customer_details?.email;
      const name = session.customer_details?.name || "Client";

      if (!email) {
        console.warn("❗ Lipsă email client – nu pot trimite confirmarea.");
        return res.json({ received: true });
      }

      // Token cu expirare 48h
      const exp = Date.now() + 48 * 60 * 60 * 1000;
      const token = signToken({ sid: session.id, email, exp });

      const base = process.env.SITE_URL || "https://midaway.vercel.app";
      const downloadLink = `${base}/api/download?token=${encodeURIComponent(
        token
      )}`;

      // Mailer (Gmail App Password)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email cu CTA către linkul unic
      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6">
          <h2 style="color:#2a9d8f;margin:0 0 8px">Mulțumim pentru comanda ta, ${name}!</h2>
          <p>Plata a fost procesată cu succes.</p>
          <p style="margin:22px 0">
            <a href="${downloadLink}" style="background:#2a9d8f;color:#fff;padding:12px 16px;border-radius:10px;text-decoration:none;font-weight:700;display:inline-block">
              📥 Descarcă eBook-urile
            </a>
          </p>
          <p style="color:#555"><small>Linkul este valabil 48 de ore.</small></p>
          <hr/>
          <p style="font-size:12px;color:#888;margin-top:12px">ID sesiune: ${session.id}</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Midaway" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Comanda ta Midaway este confirmată ✅",
        html,
      });

      console.log("✅ Email de livrare trimis către:", email);
    } catch (err) {
      console.error("Eroare procesare checkout.session.completed:", err);
    }
  }

  res.json({ received: true });
}
