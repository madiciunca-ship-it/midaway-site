// /api/create-checkout-session.mjs
// Creează o sesiune Stripe Checkout pe baza coșului primit din frontend.
// Coșul așteptat: [{ id, title, format, lang, price, qty, image? }]
//
// Important pentru livrarea de fișiere:
//  - pentru fiecare line_item adăugăm metadata.fileKey = `${FORMAT}/${LANG}`
//  - în webhook (checkout.session.completed) vei ști exact ce s-a plătit
//  - în /api/download vei valida tokenul și vei servi exact fișierele cumpărate

import Stripe from "stripe";

// --- Config & helpers -------------------------------------------------------

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// extrage în siguranță o valoare string din input
function asStr(v, d = "") {
  return (v ?? d).toString();
}

// transformă lei/euro în bani/cent (integer)
function toMinorUnits(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return 0;
  // round la 2 zecimale, apoi *100
  return Math.round(Math.round(n * 100) /* ev. floating imprecision */);
}

// sanitize currency (ISO 4217, lowercase pt. Stripe)
function safeCurrency() {
  const cur = asStr(process.env.CURRENCY || "RON").trim().toLowerCase();
  // Stripe cere coduri ISO 4217 valide; fallback „ron”
  return ["ron", "eur", "usd", "gbp"].includes(cur) ? cur : "ron";
}

// compune fileKey din format/lang
function buildFileKey(format, lang) {
  const f = asStr(format).toUpperCase().trim();
  const l = asStr(lang).toUpperCase().trim();
  return l ? `${f}/${l}` : f; // ex: "PDF/RO" sau doar "PDF"
}

// --- Handler ----------------------------------------------------------------

export default async function handler(req, res) {
  // Acceptăm doar POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // În unele medii, body poate fi deja obiect; în altele string
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // Așteptăm: { cart: [...], customerEmail?: string, clientRef?: string }
    const cart = Array.isArray(body.cart) ? body.cart : [];
    const customerEmail = asStr(body.customerEmail || ""); // opțional, dacă îl colectezi înainte de checkout
    const clientRef = asStr(body.clientRef || "");         // opțional, pentru corelare internă

    if (!cart.length) {
      res.status(400).json({ error: "Coșul de cumpărături este gol." });
      return;
    }

    const currency = safeCurrency();
    const SITE = asStr(process.env.SITE_URL || "https://midaway.vercel.app");

    // Construim line_items pentru Stripe
    const line_items = cart.map((item, idx) => {
      const id = asStr(item.id || idx);
      const title = asStr(item.title || "Produs");
      const format = asStr(item.format || "").toUpperCase();
      const lang = asStr(item.lang || "").toUpperCase();
      const qty = Math.max(1, Number(item.qty || 1));
      const unit_amount = toMinorUnits(item.price || 0); // în bani/cent
      const image = asStr(item.image || ""); // opțional (poți trimite cover-ul cărții)

      // cheia pentru livrare
      const fileKey = buildFileKey(format, lang);

      const name = lang ? `${title} — ${format}/${lang}` : `${title} — ${format}`;

      const product_data = {
        name,
        metadata: {
          bookId: id,
          format,
          lang,
          fileKey,   // <— va fi folosit ulterior la livrare
          site: "midaway",
        },
      };

      // atașăm imaginea dacă e disponibilă (Stripe va valida URL absolut)
      if (image.startsWith("http")) {
        product_data.images = [image];
      }

      return {
        quantity: qty,
        price_data: {
          currency,
          unit_amount,
          product_data,
        },
      };
    });

    // Sesiunea Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${SITE}/#/thanks`,
      cancel_url: `${SITE}/#/checkout`,

      // dacă ai colectat email-ul deja (de la formă), îl poți precompleta
      customer_email: customerEmail || undefined,

      // cont de client dacă e necesar
      customer_creation: "if_required",

      // pentru produse digitale nu avem nevoie de adrese
      billing_address_collection: "auto",
      shipping_address_collection: undefined,

      // taxă/TVA – închise deocamdată
      automatic_tax: { enabled: false },

      // coduri promo – off; poți porni oricând
      allow_promotion_codes: false,

      // referință utilă în rapoarte interne
      client_reference_id: clientRef || undefined,

      // metadata globală a sesiunii
      metadata: {
        origin: "midaway-site",
        currency,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Create Checkout Session error:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea sesiunii." });
  }
}
