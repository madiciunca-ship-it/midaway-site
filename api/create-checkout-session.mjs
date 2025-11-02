// /api/create-checkout-session.mjs
import Stripe from "stripe";
import { BOOKS } from "../src/data/books.js";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
const stripe = new Stripe(STRIPE_KEY);

// taxe curier configurabile per monedă (fallback-uri sensibile)
const COURIER_FEE_RON = Number(process.env.COURIER_FEE_RON ?? 20);
const COURIER_FEE_EUR = Number(process.env.COURIER_FEE_EUR ?? 10);

// map rapid pentru cărți + whitelist fișiere disponibile
const BOOK_MAP = new Map();
const ALLOWED_KEYS = new Set();
for (const book of BOOKS) {
  BOOK_MAP.set(book.id, book);
  if (book.files) {
    for (const fmt of Object.keys(book.files)) {
      const up = String(fmt).toUpperCase();
      if (book.availability?.[up]) {
        ALLOWED_KEYS.add(`${book.id}:${up}`);
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

    const { items = [], customerMeta = null } = await readBody(req);

    if (!Array.isArray(items) || items.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Empty cart" }));
    }

    // Construim o listă „curățată”: cărți valide + servicii
    const cleaned = [];
    const rejected = [];

    for (const it of items) {
      const rawId = String(it.id || "");
      const fmt = String(it.format || "").toUpperCase();
      const fulf = String(it.fulfillment || it.type || "").toLowerCase();

      // 1) Servicii → acceptăm direct
      if (fmt === "SERVICE" || fulf === "service" || rawId.startsWith("svc-")) {
        cleaned.push({
          kind: "service",
          title: it.title || "Serviciu editorial",
          currency: String(it.currency || "RON").toLowerCase(),
          unit_amount: Math.round(Number(it.price) * 100),
          quantity: Number(it.qty) || 1,
        });
        continue;
      }

      // 2) Cărți → verificăm fișiere pentru PDF/EPUB (PAPERBACK trece mereu)
      const book = BOOK_MAP.get(rawId);
      if (!book) {
        rejected.push(`${rawId}:${fmt}`);
        continue;
      }

      if (fmt === "PAPERBACK") {
        cleaned.push({
          kind: "book",
          book,
          format: fmt,
          currency: String(book.currency || "RON").toLowerCase(),
          unit_amount: Math.round(Number(it.price) * 100),
          quantity: Number(it.qty) || 1,
        });
        continue;
      }

      const fileKey = `${rawId}:${fmt}`;
      if (!ALLOWED_KEYS.has(fileKey)) {
        rejected.push(fileKey);
        continue;
      }

      cleaned.push({
        kind: "book",
        book,
        format: fmt,
        fileKey,
        currency: String(book.currency || "RON").toLowerCase(),
        unit_amount: Math.round(Number(it.price) * 100),
        quantity: Number(it.qty) || 1,
      });
    }

    if (cleaned.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error:
            "Momentan nu sunt disponibile fișiere pentru produsele selectate.",
          rejected,
        })
      );
    }

    // Monetă unică în tot coșul
    // – pentru cărți: din BOOKS
    // – pentru servicii: din item.currency (fallback RON)
    const currencies = [...new Set(cleaned.map((x) => x.currency))];
    if (currencies.length > 1) {
      res.statusCode = 409;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Finalizează separat comenzile pentru RON (RO) și EUR (EN).",
          currencies,
        })
      );
    }
    const currency = currencies[0];

    // Stripe line_items
    const line_items = cleaned.map((x) => {
      if (x.kind === "service") {
        return {
          price_data: {
            currency,
            unit_amount: x.unit_amount,
            product_data: {
              name: x.title,
              metadata: { type: "service" },
            },
          },
          quantity: x.quantity,
        };
      }
      // book
      return {
        price_data: {
          currency,
          unit_amount: x.unit_amount,
          product_data: {
            name: `${x.book.title} — ${x.format}`,
            metadata: {
              id: x.book.id,
              format: x.format,
              ...(x.fileKey ? { fileKey: x.fileKey } : {}),
            },
          },
        },
        quantity: x.quantity,
      };
    });

    // Taxă curier — dacă există PAPERBACK
    const hasPaperback = cleaned.some(
      (x) => x.kind === "book" && x.format === "PAPERBACK"
    );
    if (hasPaperback) {
      const fee =
        currency === "ron"
          ? Math.round(COURIER_FEE_RON * 100)
          : Math.round(COURIER_FEE_EUR * 100);
      line_items.push({
        price_data: {
          currency,
          unit_amount: fee,
          product_data: {
            name: "Taxă curier",
            metadata: { type: "courier_fee" },
          },
        },
        quantity: 1,
      });
    }

    // Construim metadata pt. sesiune (utile în webhook)
    const sessionMetadata = {};
    if (customerMeta && customerMeta.type === "company") {
      sessionMetadata.company = JSON.stringify({
        name: customerMeta.name,
        taxId: customerMeta.taxId,
        reg: customerMeta.reg || "",
        address: customerMeta.address || "",
        city: customerMeta.city || "",
        state: customerMeta.state || "",
        country: customerMeta.country || "RO",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      // HashRouter
      success_url: `${SITE}/#/thanks`,
      cancel_url: `${SITE}/#/checkout`,

      customer_creation: "always",
      billing_address_collection: "required",
      allow_promotion_codes: true,

      shipping_address_collection: hasPaperback
        ? {
            allowed_countries: [
              "RO",
              "DE",
              "FR",
              "IT",
              "ES",
              "NL",
              "GB",
              "AT",
              "BE",
              "IE",
            ],
          }
        : undefined,

      metadata: sessionMetadata,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: session.id, url: session.url }));
  } catch (err) {
    console.error("create-checkout-session error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error:
          err?.message ||
          "A apărut o eroare la inițierea plății (server-side).",
      })
    );
  }
}
