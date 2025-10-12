// /api/create-checkout-session.mjs
import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
const CURRENCY = (process.env.CURRENCY || "EUR").toLowerCase();

const stripe = new Stripe(STRIPE_KEY);

// ✅ normalizăm id-urile din UI în cele folosite la livrare/download
function normalizeId(raw) {
  const s = String(raw || "");
  if (s === "2") return "vietnam";
  if (s.startsWith("o-zi-de-care-sa-ti-amintesti")) return "o-zi";
  return s;
}

// 🔒 cheile de formate/limbi care AU fișier încărcat (oglindă cu /api/download.mjs)
const ALLOWED_KEYS = new Set([
  // O zi de care să-ți amintești — doar RO
  "o-zi:PDF/RO",
  "o-zi:EPUB/RO",

  // Vietnam — RO + EN
  "vietnam:PDF/RO",
  "vietnam:EPUB/RO",
  "vietnam:PDF/EN",
  "vietnam:EPUB/EN",
]);

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

// helper pt. cheie unică (bookId:FORMAT/LANG) – folosește id normalizat
function buildNormFileKey(rawId, format, lang) {
  const fmt = String(format || "").toUpperCase();
  const lng = String(lang || "").toUpperCase();
  const normId = normalizeId(rawId);
  return normId && fmt ? `${normId}:${fmt}${lng ? `/${lng}` : ""}` : "";
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

    // ✅ filtrăm coșul la server – doar formatele care AU fișier
    const cleaned = [];
    const rejected = [];

    for (const it of items) {
      const rawId = String(it.id || "");
      const fmt = String(it.format || "").toUpperCase();
      const lng = String(it.lang || "").toUpperCase();

      const fileKeyNorm = buildNormFileKey(rawId, fmt, lng);

      if (ALLOWED_KEYS.has(fileKeyNorm)) {
        cleaned.push({ ...it, _fileKey: fileKeyNorm });
      } else {
        rejected.push(fileKeyNorm || `${rawId}:${fmt}${lng ? `/${lng}` : ""}`);
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

    // ✅ Stripe line items DOAR din coșul filtrat
    const line_items = cleaned.map((it) => {
      const rawId = String(it.id || "");
      const normId = normalizeId(rawId);
      const fmt = String(it.format || "").toUpperCase();
      const lng = String(it.lang || "").toUpperCase();
      const qty = Number(it.qty) || 1;

      const fileKey = `${normId}:${fmt}${lng ? `/${lng}` : ""}`;

      return {
        price_data: {
          currency: CURRENCY,
          unit_amount: Math.round(Number(it.price) * 100),
          product_data: {
            name: `${it.title} — ${fmt}${lng ? `/${lng}` : ""}`,
            metadata: {
              id: rawId,       // ce a trimis UI (pentru debugging)
              normId,          // ce folosim la livrare
              format: it.format || "",
              lang: it.lang || "",
              fileKey,         // pentru webhook + download
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
