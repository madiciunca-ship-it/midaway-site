// /api/create-checkout-session.mjs
import Stripe from "stripe";
import { BOOKS } from "../src/data/books.js";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
const stripe = new Stripe(STRIPE_KEY);

// Construim ALLOWED_KEYS din books.js (ex: "o-zi-ro:PDF")
const ALLOWED_KEYS = new Set();
const BOOK_MAP = new Map();

for (const book of BOOKS) {
  BOOK_MAP.set(book.id, book);
  if (book.files) {
    for (const fmt of Object.keys(book.files)) {
      if (book.availability?.[fmt]) {
        ALLOWED_KEYS.add(`${book.id}:${fmt.toUpperCase()}`);
      }
    }
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }

  try {
    if (!STRIPE_KEY) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }));
    }

    const { items = [] } = await readBody(req);
    if (!Array.isArray(items) || items.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Empty cart" }));
    }

    // ✅ filtrăm coșul doar la fișiere valide
    const cleaned = [];
    const rejected = [];

    for (const it of items) {
      const rawId = String(it.id || "");
      const fmt = String(it.format || "").toUpperCase();
      const fileKey = `${rawId}:${fmt}`;
      const book = BOOK_MAP.get(rawId);

      if (book && ALLOWED_KEYS.has(fileKey)) {
        cleaned.push({ ...it, _book: book, _fileKey: fileKey });
      } else {
        rejected.push(fileKey);
      }
    }

    if (cleaned.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Momentan nu sunt disponibile fișiere pentru produsele selectate.",
          rejected,
        })
      );
    }

    // ✅ verificăm monedă unică în tot coșul
    const currencies = [...new Set(cleaned.map((it) => it._book.currency))];
    if (currencies.length > 1) {
      res.statusCode = 409;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Finalizează separat comenzile pentru RON (RO) și EUR (EN).",
        })
      );
    }

    const currency = currencies[0].toLowerCase();

    // ✅ Stripe line_items
    const line_items = cleaned.map((it) => {
      const fmt = String(it.format || "").toUpperCase();
      const qty = Number(it.qty) || 1;
      const book = it._book;

      return {
        price_data: {
          currency,
          unit_amount: Math.round(Number(it.price) * 100),
          product_data: {
            name: `${book.title} — ${fmt}`,
            metadata: {
              id: book.id,
              format: fmt,
              fileKey: `${book.id}:${fmt}`,
            },
          },
        },
        quantity: qty,
      };
    });

    const hasPaperback = cleaned.some(
      (it) => String(it.format || "").toLowerCase() === "paperback"
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${SITE}/#/thanks`,
      cancel_url: `${SITE}/#/checkout`,
      billing_address_collection: "auto",
      shipping_address_collection: hasPaperback
        ? { allowed_countries: ["RO", "DE", "FR", "IT", "ES", "NL", "GB", "AT", "BE", "IE"] }
        : undefined,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ url: session.url }));
  } catch (err) {
    console.error("Stripe error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Stripe init failed" }));
  }
}
