// api/create-checkout-session.mjs
import Stripe from "stripe";

// env + fallback-uri sigure
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
const CURRENCY = (process.env.CURRENCY || "EUR").toLowerCase();

const stripe = new Stripe(STRIPE_KEY);

// utilitar: citește body-ul în runtime Node (Vercel)
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

    const line_items = items.map((item) => ({
      price_data: {
        currency: CURRENCY,
        unit_amount: Math.round(Number(item.price) * 100), // 45 -> 4500
        product_data: {
          name: `${item.title} — ${String(item.format || "").toUpperCase()}${
            item.lang ? `/${String(item.lang).toUpperCase()}` : ""
          }`,
          metadata: {
            id: item.id || "",
            format: item.format || "",
            lang: item.lang || ""
          }
        }
      },
      quantity: Number(item.qty) || 1
    }));

    const hasPaperback = items.some(
      (it) => (it.format || "").toLowerCase() === "paperback"
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${SITE}/#/thanks`,
      cancel_url: `${SITE}/#/checkout`,
      billing_address_collection: "auto",
      shipping_address_collection: hasPaperback
        ? { allowed_countries: ["RO","DE","FR","IT","ES","NL","GB","AT","BE","IE"] }
        : undefined
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
