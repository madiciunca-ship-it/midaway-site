// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";

// inițializare Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// funcție pentru a citi corpul "raw" (necesar pt. semnătura Stripe)
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// mapăm formatele la linkurile reale (actualizează tu mai târziu)
const DOWNLOADS = {
  "PDF/RO": "https://exemplu.link/downloads/pdf-ro",
  "PDF/EN": "https://exemplu.link/downloads/pdf-en",
  "EPUB/RO": "https://exemplu.link/downloads/epub-ro",
  "EPUB/EN": "https://exemplu.link/downloads/epub-en",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const raw = await readRawBody(req);
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
      const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items.data.price.product", "customer_details"],
      });

      const email = session.customer_details?.email;
      const name = session.customer_details?.name || "Client";
      const items = session.line_items?.data || [];

      // trimite email doar dacă avem adresa
      if (!email) {
        console.warn("❗ Lipsă email client – nu pot trimite confirmarea.");
        return res.json({ received: true });
      }

      // pregătim linkurile pentru fiecare produs digital
      const lines = items.map((item) => {
        const title = item.price?.product?.name || item.description;
        const amount = (item.amount_total / 100).toFixed(2);
        const cur = (item.currency || "eur").toUpperCase();
        const upper = title.toUpperCase();
        let link = null;

        if (upper.includes("PDF") && upper.includes("RO")) link = DOWNLOADS["PDF/RO"];
        else if (upper.includes("PDF") && upper.includes("EN")) link = DOWNLOADS["PDF/EN"];
        else if (upper.includes("EPUB") && upper.includes("RO")) link = DOWNLOADS["EPUB/RO"];
        else if (upper.includes("EPUB") && upper.includes("EN")) link = DOWNLOADS["EPUB/EN"];

        return {
          title,
          amount,
          cur,
          qty: item.quantity || 1,
          link,
        };
      });

      // configurăm nodemailer (Gmail App Password)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // compunem emailul
      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6">
          <h2 style="color:#2a9d8f">Mulțumim pentru comanda ta, ${name}!</h2>
          <p>Plata a fost procesată cu succes. Mai jos găsești detaliile:</p>
          <ul>
            ${lines
              .map(
                (l) => `
                <li>
                  <strong>${l.title}</strong> × ${l.qty} — ${l.amount} ${l.cur}<br/>
                  ${
                    l.link
                      ? `<a href="${l.link}" target="_blank">📥 Descarcă eBook</a>`
                      : `<em>Cartea va fi livrată fizic.</em>`
                  }
                </li>`
              )
              .join("")}
          </ul>
          <p style="margin-top:20px">Poți reveni oricând pe site: <a href="${process.env.SITE_URL}">${process.env.SITE_URL}</a></p>
          <hr/>
          <p style="font-size:12px;color:#888">ID sesiune: ${session.id}</p>
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
