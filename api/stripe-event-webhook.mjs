// /api/stripe-event-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

import {
  appendEventOrder,
  eventOrderExists,
} from "./_event-orders-store.mjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const SITE = (process.env.SITE_URL || "https://midaway.ro").replace(/\/+$/, "");

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

function genEventOrderNo(sessionId) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const tail = String(sessionId || "")
    .slice(-6)
    .toUpperCase();

  return `GAU-${year}${month}${day}-${tail}`;
}

function createPickupToken() {
  return crypto.randomBytes(32).toString("base64url");
}

function hashPickupToken(token) {
  return crypto
    .createHash("sha256")
    .update(String(token || ""))
    .digest("hex");
}

function formatAddress(address = {}) {
  return [
    address.line1,
    address.line2,
    address.postal_code,
    address.city,
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildClientEmail({
  orderNo,
  name,
  items,
  amount,
  currency,
  pickupUrl,
}) {
  const rows = items
    .map(
      (item) => `
        <li style="margin-bottom:8px">
          <strong>${escapeHtml(item.title)}</strong>
          × ${item.quantity}
          — ${item.lineTotal} ${escapeHtml(currency)}
        </li>
      `
    )
    .join("");

  return `
    <div style="
      font-family:Arial,sans-serif;
      max-width:680px;
      margin:auto;
      color:#2b2b2b;
      line-height:1.6;
    ">
      <div style="
        background:#2a9d8f;
        color:#fff;
        padding:18px 20px;
        border-radius:14px 14px 0 0;
      ">
        <h1 style="margin:0;font-size:24px">
          Plata a fost confirmată ✅
        </h1>
      </div>

      <div style="
        border:1px solid #e7e7e7;
        border-top:0;
        padding:20px;
        border-radius:0 0 14px 14px;
        background:#fffef9;
      ">
        <p>
          Mulțumim, <strong>${escapeHtml(name || "cititorule")}</strong>!
        </p>

        <p>
          Comanda ta pentru Gaudeamus Sibiu a fost înregistrată.
        </p>

        <p style="font-size:18px">
          Număr comandă:
          <strong>${escapeHtml(orderNo)}</strong>
        </p>

        <ul style="padding-left:20px">
          ${rows}
        </ul>

        <p style="font-size:18px">
          Total achitat:
          <strong>${amount} ${escapeHtml(currency)}</strong>
        </p>

        <div style="
          margin:20px 0;
          padding:16px;
          border-radius:12px;
          background:#e8f8f5;
          border:1px solid #7dc9bf;
        ">
          Prezintă confirmarea comenzii la standul Midaway pentru
          ridicarea cărților.
        </div>

        <p>
          <a
            href="${pickupUrl}"
            style="
              display:inline-block;
              padding:12px 18px;
              border-radius:10px;
              background:#2a9d8f;
              color:#fff;
              text-decoration:none;
              font-weight:700;
            "
          >
            Deschide confirmarea pentru ridicare
          </a>
        </p>

        <p style="color:#666;font-size:14px">
          Factura fiscală va fi emisă ulterior și trimisă la adresa
          de email folosită pentru această comandă.
        </p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    return res.end("Method Not Allowed");
  }

  let event;

  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_EVENT_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(
      "❌ Event webhook signature invalid:",
      error?.message || error
    );

    res.statusCode = 400;
    return res.end(`Webhook Error: ${error?.message || "Invalid signature"}`);
  }

  console.log("🎪 Stripe event webhook:", event.type);

  // Ignorăm tot ce nu ține de sistemul de evenimente.
  const objectChannel = String(
    event?.data?.object?.metadata?.channel || ""
  ).toLowerCase();

  if (objectChannel !== "event") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return res.end(
      JSON.stringify({
        received: true,
        skipped: "not_event_order",
      })
    );
  }

  if (event.type !== "checkout.session.completed") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return res.end(
      JSON.stringify({
        received: true,
        ignoredType: event.type,
      })
    );
  }

  try {
    const eventSession = event.data.object;
    const sessionId = eventSession.id;

    // Stripe poate retrimite același webhook.
    if (await eventOrderExists(sessionId)) {
      console.log("🔁 Event order already processed:", sessionId);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      return res.end(
        JSON.stringify({
          received: true,
          duplicate: true,
        })
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "customer",
        "customer_details",
        "payment_intent",
      ],
    });

    if (session.payment_status !== "paid") {
      console.warn(
        "⚠️ Event checkout completed, but payment is not paid:",
        session.id,
        session.payment_status
      );

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      return res.end(
        JSON.stringify({
          received: true,
          skipped: "payment_not_paid",
        })
      );
    }

    const customer = session.customer_details || {};

    const email = customer.email || session.customer_email || "";
    const name = customer.name || "Client";
    const phone = customer.phone || "";
    const address = customer.address || {};

    if (!email || !name || !phone) {
      console.warn("⚠️ Event order missing customer data:", {
        email: Boolean(email),
        name: Boolean(name),
        phone: Boolean(phone),
      });
    }

    const lineItemsResponse =
      await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ["data.price.product"],
      });

    const items = (lineItemsResponse.data || []).map((lineItem) => {
      const product = lineItem?.price?.product || {};
      const metadata = product?.metadata || {};

      const quantity = Number(lineItem.quantity || 1);
      const lineTotal = Number(lineItem.amount_total || 0) / 100;
      const unitPrice =
        quantity > 0
          ? lineTotal / quantity
          : 0;

      return {
        bookId: metadata.bookId || "",
        title:
          product.name ||
          lineItem.description ||
          "Carte Midaway",

        quantity,
        unitPrice,
        lineTotal,
      };
    });

    const totalQuantity = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    const amount = Number(session.amount_total || 0) / 100;
    const currency = String(session.currency || "RON").toUpperCase();

    const orderNo = genEventOrderNo(session.id);

    const pickupToken = createPickupToken();
    const pickupTokenHash = hashPickupToken(pickupToken);

    const pickupUrl =
      `${SITE}/ridicare-comanda` +
      `?token=${encodeURIComponent(pickupToken)}`;

    const order = {
      id: session.id,
      orderNo,

      channel: "event",
      eventId:
        session.metadata?.eventId ||
        "gaudeamus-sibiu-2026",

      createdAt: Date.now(),
      paidAt: Date.now(),

      status: "paid",
      paymentStatus: "paid",

      pickupStatus: "pending",
      pickedUpAt: null,
      pickedUpBy: null,

      invoiceStatus: "pending",

      email,
      name,
      phone,

      customer: {
        name,
        email,
        phone,
      },

      country:
        String(address.country || "").toUpperCase() ||
        null,

      address: {
        line1: address.line1 || null,
        line2: address.line2 || null,
        city: address.city || null,
        state: address.state || null,
        postal_code: address.postal_code || null,
        country:
          String(address.country || "").toUpperCase() ||
          null,
      },

      addressText: formatAddress(address),

      items,
      totalQuantity,

      amount,
      currency,

      pickupToken,
      pickupTokenHash,

      stripePaymentIntent:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id || null,
    };

    // Salvează numai în event-orders.json.
    await appendEventOrder(order);

    console.log("✅ Event order saved:", orderNo);

    // Emailuri
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const clientHtml = buildClientEmail({
        orderNo,
        name,
        items,
        amount,
        currency,
        pickupUrl,
      });

      const itemsSummary = items
        .map(
          (item) =>
            `• ${item.title} ×${item.quantity} — ${item.lineTotal} ${currency}`
        )
        .join("\n");

      await transporter.sendMail({
        from: `"Midaway" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: process.env.ADMIN_EMAIL,

        subject:
          `Gaudeamus Sibiu • Comanda ${orderNo} confirmată`,

        html: clientHtml,
      });

      await transporter.sendMail({
        from: `"Midaway" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,

        subject:
          `🎪 Comandă Gaudeamus ${orderNo} • ${amount} ${currency}`,

        text: [
          `Comandă: ${orderNo}`,
          `Status: PLĂTITĂ`,
          `Predare: NEPREDATĂ`,
          "",
          `Client: ${name}`,
          `Email: ${email}`,
          `Telefon: ${phone || "-"}`,
          `Adresă facturare: ${formatAddress(address) || "-"}`,
          "",
          `Cantitate totală: ${totalQuantity}`,
          `Total: ${amount} ${currency}`,
          "",
          "Cărți:",
          itemsSummary || "-",
          "",
          `Confirmare ridicare: ${pickupUrl}`,
          "",
          "Factura: de emis ulterior manual.",
        ].join("\n"),
      });

      console.log("✉️ Event emails sent:", orderNo);
    } catch (emailError) {
      // Comanda rămâne salvată chiar dacă emailul eșuează.
      console.error(
        "❌ Event email failed:",
        emailError?.message || emailError
      );
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return res.end(
      JSON.stringify({
        received: true,
        orderNo,
      })
    );
  } catch (error) {
    console.error(
      "❌ Event checkout processing failed:",
      error
    );

    // Răspuns 500 → Stripe va retrimite webhook-ul.
    res.statusCode = 500;

    return res.end(
      "Event checkout processing failed"
    );
  }
}