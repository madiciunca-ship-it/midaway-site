// /api/create-checkout-session.mjs
import Stripe from "stripe";
import { BOOKS } from "../src/data/books.js";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.ro";
const stripe = new Stripe(STRIPE_KEY);

// ─────────────────────────────────────────────────────────────────────────────
//  Config
// ─────────────────────────────────────────────────────────────────────────────
const COURIER_FEE_RON = Number(process.env.COURIER_FEE_RON ?? 20);
const COURIER_FEE_EUR = Number(process.env.COURIER_FEE_EUR ?? 10);

// Harta cărți + whitelist fișiere disponibile (ex: "carte-id:PDF")
const BOOK_MAP = new Map();
const ALLOWED_KEYS = new Set();
for (const b of BOOKS) {
  BOOK_MAP.set(b.id, b);
  if (b.files) {
    for (const k of Object.keys(b.files)) {
      const up = k.toUpperCase();
      if (b.availability?.[up]) ALLOWED_KEYS.add(`${b.id}:${up}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────
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

const isServiceItem = (it) =>
  String(it?.format || it?.fulfillment || "").toUpperCase() === "SERVICE" ||
  String(it?.id || "").startsWith("svc-");

const isPaperbackFmt = (fmt) => String(fmt || "").toUpperCase() === "PAPERBACK";

// Acceptă ambele forme de meta din front-end și normalizează pt. Stripe metadata
function buildSessionMeta(rawMeta) {
  if (!rawMeta || typeof rawMeta !== "object") return {};
  // Noua formă: { type:"company", name, taxId, ... }
  if (rawMeta.type === "company") {
    const safe = (v) =>
      typeof v === "string" ? v.slice(0, 240) : v ? String(v).slice(0, 240) : "";
    return {
      invoice_requested: "yes",
      company_name: safe(rawMeta.name),
      company_cui: safe(rawMeta.taxId),
      company_regcom: safe(rawMeta.reg || ""),
      company_address: safe(rawMeta.address || ""),
      company_city: safe(rawMeta.city || ""),
      company_state: safe(rawMeta.state || ""),
      company_country: safe(rawMeta.country || "RO"),
    };
  }
  // Vechi: { wantCompanyInvoice, company:{ name, cui, regCom, ... } }
  const c = rawMeta.company || {};
  const safe = (v) =>
    typeof v === "string" ? v.slice(0, 240) : v ? String(v).slice(0, 240) : "";
  return {
    invoice_requested: rawMeta.wantCompanyInvoice ? "yes" : "no",
    company_name: safe(c.name),
    company_cui: safe(c.cui),
    company_regcom: safe(c.regCom),
    company_address: safe(c.address),
    company_city: safe(c.city),
    company_state: safe(c.county),
    company_country: safe(c.country || "RO"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
//  Handler
// ─────────────────────────────────────────────────────────────────────────────
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
    const sessionMeta = buildSessionMeta(customerMeta);

    if (!Array.isArray(items) || items.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Empty cart" }));
    }

    // Curățăm coșul
    const cleaned = [];
    const rejected = [];

    for (const it of items) {
      const id = String(it.id || "");
      const fmt = String(it.format || "").toUpperCase();

      if (isServiceItem(it)) {
        cleaned.push({
          kind: "service",
          title: it.title || "Serviciu",
          unit_amount: Math.round(Number(it.price || 0) * 100),
          quantity: Math.max(1, Number(it.qty) || 1),
          currency: String(it.currency || "RON").toLowerCase(),
        });
        continue;
      }

      const book = BOOK_MAP.get(id);
      if (!book) {
        rejected.push(`${id}:${fmt}`);
        continue;
      }

      if (isPaperbackFmt(fmt)) {
        cleaned.push({
          kind: "book",
          book,
          format: fmt,
          unit_amount: Math.round(Number(it.price || 0) * 100),
          quantity: Math.max(1, Number(it.qty) || 1),
          currency: String(book.currency || "RON").toLowerCase(),
          fileKey: null,
        });
        continue;
      }

      const key = `${id}:${fmt}`;
      if (!ALLOWED_KEYS.has(key)) {
        rejected.push(key);
        continue;
      }

      cleaned.push({
        kind: "book",
        book,
        format: fmt,
        unit_amount: Math.round(Number(it.price || 0) * 100),
        quantity: Math.max(1, Number(it.qty) || 1),
        currency: String(book.currency || "RON").toLowerCase(),
        fileKey: key,
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

    // Monedă unică în tot coșul
    const currencies = [...new Set(cleaned.map((x) => x.currency.toUpperCase()))];
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
    const currency = currencies[0].toLowerCase();

    // Line items Stripe
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
      return {
        price_data: {
          currency,
          unit_amount: x.unit_amount,
          product_data: {
            name: `${x.book.title} — ${x.format}`,
            metadata: {
              type: "book",
              id: x.book.id,
              format: x.format,
              ...(x.fileKey ? { fileKey: x.fileKey } : {}),
            },
          },
        },
        quantity: x.quantity,
      };
    });

    // Taxă curier dacă există paperback
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

    // URL-uri corecte (BrowserRouter, fără #)
    const success_url = `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${SITE}/carti`;
    console.log("CHK urls:", { SITE, success_url, cancel_url });

    // Sesiune Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      metadata: sessionMeta,
      success_url,
      cancel_url,
      customer_creation: "always",
      billing_address_collection: "required",
      allow_promotion_codes: true,
      shipping_address_collection: hasPaperback
        ? {
            allowed_countries: [
              "RO", "DE", "FR", "IT", "ES", "NL", "GB", "AT", "BE", "IE",
            ],
          }
        : undefined,
  
  phone_number_collection: {
    enabled: true,
  },
    });

    console.log("✅ create-checkout-session OK:", session.id);
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
