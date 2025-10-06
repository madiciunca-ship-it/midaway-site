// api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// raw body pt. verificarea semnăturii Stripe
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// semnează payload-ul cu HMAC-SHA256 (token valabil 48h)
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

      // token cu id-ul sesiunii + expirare 48h
      const exp = Date.now() + 48 * 60 * 60 * 1000;
      const token = signToken({ sid: session.id, email, exp });
      const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
      const downloadLink = `${SITE}/api/download?token=${encodeURIComponent(token)}`;

      // mailer (Gmail app password)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // resurse brand
      const logoUrl = `${SITE}/logo-midaway.png`; // public/logo-midaway.png
      const brand = {
        primary: "#2a9d8f",
        text: "#222",
        light: "#f7faf9",
      };

      // email branduit
      const html = `
  <div style="background:${brand.light};padding:28px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:${brand.text}">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e9f3f1">
      <tr>
        <td style="padding:20px 24px;background:#fff;border-bottom:1px solid #eef5f3">
          <img src="${logoUrl}" alt="Midaway" height="28" style="display:inline-block;vertical-align:middle" />
        </td>
      </tr>
      <tr>
        <td style="padding:28px 24px 8px 24px">
          <h2 style="margin:0 0 8px 0;color:${brand.primary};font-size:22px">Mulțumim pentru comanda ta, ${name}!</h2>
          <p style="margin:0 0 14px 0">Plata a fost procesată cu succes.</p>
          <p style="margin:0 0 18px 0">Apasă butonul de mai jos pentru a descărca eBook-urile tale (PDF și/sau EPUB). Linkul este valabil 48 de ore.</p>
          <div style="margin:20px 0 26px 0">
            <a href="${downloadLink}"
               style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">
              📥 Descarcă eBook-urile
            </a>
          </div>
          <p style="margin:0;font-size:12px;color:#666">
            Dacă nu ai inițiat tu această comandă sau întâmpini probleme, răspunde acestui email și îți revenim în cel mai scurt timp.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;color:#889; font-size:12px;border-top:1px solid #eef5f3">
          ID sesiune: ${session.id}<br/>
          <a href="${SITE}" style="color:${brand.primary};text-decoration:none">${SITE.replace(/^https?:\/\//,'')}</a>
        </td>
      </tr>
    </table>
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
