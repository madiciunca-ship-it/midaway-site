// /api/create-checkout-session.mjs
import Stripe from "stripe";
import { BOOKS } from "../src/data/books.js";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
const stripe = new Stripe(STRIPE_KEY);

// taxe curier configurabile per monedă (fallback-uri sensibile)
const COURIER_FEE_RON = Number(process.env.COURIER_FEE_RON ?? 20);
const COURIER_FEE_EUR = Number(process.env.COURIER_FEE_EUR ?? 10);

// Construim ALLOWED_KEYS din books.js (ex: "o-zi-ro:PDF")
const ALLOWED_KEYS = new Set();
const BOOK_MAP = new Map();

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

const isService = (it) =>
  String(it?.format || it?.fulfillment || "").toUpperCase() === "SERVICE";

const isPaperbackFmt = (fmt) => String(fmt || "").toUpperCase() === "PAPERBACK";

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

    // Curățăm coșul:
    //  - Servicii → acceptate direct (nu există în BOOKS).
    //  - Cărți:
    //      - PAPERBACK → permis mereu.
    //      - PDF/EPUB/AUDIOBOOK → doar dacă avem fișiere => ALLOWED_KEYS.
    const cleaned = [];
    const rejected = [];

    for (const it of items) {
      const rawId = String(it.id || "");
      const fmt = String(it.format || "").toUpperCase();

      // 1) Servicii (SERVICE) – includem direct
      if (isService(it)) {
        cleaned.push({
          ...it,
          _kind: "service",
          _currency: String(it.currency || "RON").toUpperCase(),
        });
        continue;
      }

      // 2) Produse carte (există în BOOKS)
      const book = BOOK_MAP.get(rawId);
      if (!book) {
        rejected.push(`${rawId}:${fmt}`);
        continue;
      }

      if (isPaperbackFmt(fmt)) {
        cleaned.push({
          ...it,
          _kind: "book",
          _book: book,
          _fileKey: `${rawId}:${fmt}`,
        });
        continue;
      }

      if (ALLOWED_KEYS.has(`${rawId}:${fmt}`)) {
        cleaned.push({
          ...it,
          _kind: "book",
          _book: book,
          _fileKey: `${rawId}:${fmt}`,
        });
      } else {
        rejected.push(`${rawId}:${fmt}`);
      }
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

    // ✅ Monedă unică în tot coșul:
    //  - pentru cărți folosim book.currency
    //  - pentru servicii folosim item.currency
    const currencies = [
      ...new Set(
        cleaned.map((it) =>
          it._kind === "service"
            ? String(it._currency || "RON").toUpperCase()
            : String(it._book?.currency || "RON").toUpperCase()
        )
      ),
    ];

    if (currencies.length > 1) {
      res.statusCode = 409;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Finalizează separat comenzile pentru RON (RO) și EUR (EN).",
        })
      );
    }

    const currency = (currencies[0] || "RON").toLowerCase();

    // ✅ Construim line_items Stripe (cărți + servicii)
    const line_items = cleaned.map((it) => {
      const qty = Math.max(1, Number(it.qty) || 1);
      const unitAmount = Math.round(Number(it.price || 0) * 100);

      if (it._kind === "service") {
        // SERVICIU
        return {
          price_data: {
            currency,
            unit_amount: unitAmount,
            product_data: {
              name: it.title || "Serviciu",
              metadata: {
                type: "service",
                id: it.id || "",
              },
            },
          },
          quantity: qty,
        };
      }

      // CARTE
      const fmt = String(it.format || "").toUpperCase();
      const book = it._book;

      return {
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: `${book.title} — ${fmt}`,
            metadata: {
              type: "book",
              id: book.id,
              format: fmt,
              fileKey: `${book.id}:${fmt}`, // pentru webhook/download
            },
          },
        },
        quantity: qty,
      };
    });

    // 🧾 Taxă curier — O SINGURĂ LINIE dacă există PAPERBACK
    const hasPaperback = cleaned.some(
      (it) => it._kind === "book" && isPaperbackFmt(it.format)
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      // HashRouter – păstrăm rutele ca la tine
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
    });

    console.log("✅ create-checkout-session OK:", session.id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: session.id, url: session.url }));
  } catch (err) {
    console.error("Stripe error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Stripe init failed" }));
  }
}
