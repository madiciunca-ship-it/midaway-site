// /api/stripe-webhook.mjs
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { appendOrder, orderExists } from "./_orders-store.mjs";

// ───────────────── EMAIL BUILDER RO+EN ─────────────────
function buildEmailHTML({
  orderId,
  name,
  total,
  currency,
  downloadsUrl,
  items,
  hasDownloads,
}) {
  const hasPaperback = items.some(
    (i) => i.type === "book" && i.format === "PAPERBACK"
  );
  const hasService = items.some((i) => i.type === "service");

  const servicesList = items
    .filter((i) => i.type === "service")
    .map((i) => `• ${i.name}`)
    .join("<br/>");

  const helloRO = name ? `Mulțumim, <strong>${name}</strong>!` : "Mulțumim!";
  const helloEN = name ? `Thank you, <strong>${name}</strong>!` : "Thank you!";

  const SITE = process.env.SITE_URL || "https://midaway.ro";

  const notePaperRO = hasPaperback
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #e6f0e6;border-radius:10px;background:#f7fffa;color:#184a2c">
         Comanda ta include și produse fizice (Paperback). Te contactăm în 24–48h cu detalii de livrare.
       </div>`
    : "";

  const notePaperEN = hasPaperback
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #e6f0e6;border-radius:10px;background:#f7fffa;color:#184a2c">
         Your order includes physical items (Paperback). We will contact you in 24–48h with delivery details.
       </div>`
    : "";

  const noteSvcRO = hasService
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #fff0cc;border-radius:10px;background:#fffbea;color:#5c4b00">
         Ai comandat servicii editoriale. Programarea & prestarea se fac în baza termenilor agreați.
         <div style="margin-top:6px">Te contactăm în 24–48h pentru programare.</div>
         Politica de anulare: <a href="${SITE}/#/politica-anulare" style="color:#7a5b00" target="_blank" rel="noopener">vezi aici</a>.
         ${servicesList ? `<div style="margin-top:8px">${servicesList}</div>` : ""}
       </div>`
    : "";

  const noteSvcEN = hasService
    ? `<div style="margin-top:12px;padding:12px;border:1px solid #fff0cc;border-radius:10px;background:#fffbea;color:#5c4b00">
         You have ordered editorial services. Scheduling & delivery are done under agreed terms.
         <div style="margin-top:6px">We’ll contact you within 24–48h to schedule.</div>
         Cancellation policy: <a href="${SITE}/#/politica-anulare" style="color:#7a5b00" target="_blank" rel="noopener">see here</a>.
         ${servicesList ? `<div style="margin-top:8px">${servicesList}</div>` : ""}
       </div>`
    : "";

  const listRO = items
    .map((i) => `<li>${i.name}${i.format ? ` (${i.format})` : ""}</li>`)
    .join("");
  const listEN = listRO;

  const textRO = hasDownloads
    ? `${helloRO} Plata a fost procesată cu succes. Linkul tău de descărcare este valabil 48 de ore.`
    : `${helloRO} Plata a fost procesată cu succes.`;

  const textEN = hasDownloads
    ? `${helloEN} Your payment was processed successfully. Your download link is valid for 48 hours.`
    : `${helloEN} Your payment was processed successfully.`;

  const dlBtnRO = hasDownloads
    ? `<a href="${downloadsUrl}" style="display:inline-block;background:#199473;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:700;margin:8px 0">📥 Descarcă eBook-urile</a>`
    : "";

  const dlBtnEN = hasDownloads
    ? `<a href="${downloadsUrl}" style="display:inline-block;background:#199473;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:700;margin:8px 0">📥 Download your eBooks</a>`
    : "";

  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#0f172a">
    <h1 style="color:#199473;margin:0 0 8px 0">Comanda ta Midaway #${orderId} este confirmată ✅</h1>
    <div style="margin-bottom:10px">Total: <strong>${total} ${currency}</strong></div>
    <p style="margin:12px 0">${textRO}</p>
    ${dlBtnRO}
    <div style="margin:12px 0 4px 0; font-weight:700">Sumar produse</div>
    <ul style="margin:6px 0 10px 18px; padding:0">${listRO}</ul>
    ${notePaperRO}${noteSvcRO}
    <hr style="border:none;height:1px;background:#eee;margin:24px 0"/>
    <h2 style="color:#199473;margin:0 0 8px 0">Your Midaway order #${orderId} is confirmed ✅</h2>
    <div style="margin-bottom:10px">Total: <strong>${total} ${currency}</strong></div>
    <p style="margin:12px 0">${textEN}</p>
    ${dlBtnEN}
    <div style="margin:12px 0 4px 0; font-weight:700">Order summary</div>
    <ul style="margin:6px 0 10px 18px; padding:0">${listEN}</ul>
    ${notePaperEN}${noteSvcEN}
  </div>`;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function signToken(payloadObj) {
  const body = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

function genOrderNo(sessionId) {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const tail = String(sessionId || "").slice(-6).toUpperCase();
  return `MID-${y}${m}${day}-${tail}`;
}

const isDigitalFormat = (fmt) => {
  const F = String(fmt || "").toUpperCase();
  return F === "PDF" || F === "EPUB" || F === "AUDIOBOOK";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  console.log("➡️ stripe-webhook HIT", new Date().toISOString());

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

  console.log("📬 Event:", event.type);

  // ───────────────── CHECKOUT COMPLETED ─────────────────
  if (event.type === "checkout.session.completed") {
    // Idempotency guard – oprește dublurile Stripe
    try {
      const sessionId = event.data.object.id;
      if (await orderExists(sessionId)) {
        console.log(
          "🔁 duplicate checkout.session.completed — already processed:",
          sessionId
        );
        return res.json({ received: true });
      }
    } catch (e) {
      console.warn("idempotency check failed, continuing defensively:", e?.message || e);
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["customer_details"] }
      );

      const email = session.customer_details?.email || null;
      const name = session.customer_details?.name || "Client";
      const phone =
        session.customer_details?.phone ||
        session.customer_details?.shipping?.phone ||
        null;

const addrStr = [
  addr.line1,
  addr.line2,
  addr.postal_code,
  addr.city,
  addr.state,
  countryCode,
].filter(Boolean).join(", ");
      
      if (!email) {
        console.warn("❗ Lipsă email client – nu pot trimite confirmarea.");
        return res.json({ received: true });
      }

      // — adresa Stripe — o singură sursă
      const addr = session.customer_details?.address || {};
      const countryCode = (addr.country || "").toUpperCase() || null;

      // Line items
      const li = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      const items =
        (li?.data || []).map((it) => {
          const meta = it?.price?.product?.metadata || {};
          const rawFormat = meta?.format ? String(meta.format).toUpperCase() : null;
          const pname = it?.price?.product?.name || it.description || "Produs";
          const metaType = meta?.type || null;

          let fileKey = meta?.fileKey || null;
          if (
            metaType === "courier_fee" ||
            metaType === "service" ||
            rawFormat === "PAPERBACK" ||
            !isDigitalFormat(rawFormat)
          ) {
            fileKey = null;
          }

          let type = "book";
          if (metaType === "courier_fee") type = "courier_fee";
          else if (metaType === "service") type = "service";

          return {
            description: it.description,
            quantity: it.quantity,
            amount_total: (it.amount_total || 0) / 100,
            currency:
              it.currency?.toUpperCase() ||
              session.currency?.toUpperCase() ||
              "RON",
            fileKey,
            format: rawFormat,
            type,
            name: pname,
          };
        }) || [];

      const hasPaperback = items.some((it) => it.format === "PAPERBACK");
      const keys = Array.from(new Set(items.map((it) => it.fileKey).filter(Boolean)));
      const hasDownloads = keys.length > 0;

      const courierFee = items
        .filter((it) => it.type === "courier_fee")
        .reduce((s, it) => s + Number(it.amount_total || 0), 0);

      const total_amount = (session.amount_total || 0) / 100;
      const currency =
        (session.currency || items[0]?.currency || "RON").toUpperCase();

      const formatsList = Array.from(
        new Set(items.map((it) => it.format).filter(Boolean))
      );

      const orderNo = genOrderNo(session.id);

      // metadata companie
      const md = session.metadata || {};
      const companyMeta = {
        requested: md.invoice_requested === "yes",
        name: md.company_name || "",
        cui: md.company_cui || "",
        regCom: md.company_regcom || "",
        vatPayer: md.company_vat_payer === "yes",
        address: md.company_address || "",
        city: md.company_city || "",
        county: md.company_county || "",
        country: (md.company_country || countryCode || "RO").toUpperCase(),
      };

      // ───────────────── LOG IN ORDERS (o singură structură coerentă) ─────────────────
      let orderForLog = null;
      try {
        const order = {
          id: session.id,
          orderNo,
          createdAt: Date.now(),
          email,
          name,
          phone, 

          amount: total_amount,
          currency,

          items,
          hasDownloads,
          hasPaperback,
          courierFee,

          status: "paid",

          // adresă completă pentru FGO + emailuri
          country: countryCode, // ex. "RO"
          address: {
            line1: addr.line1 || null,
            line2: addr.line2 || null,
            city: addr.city || null,
            state: addr.state || null,          // judet/region (FGO: Client[Judet])
            postal_code: addr.postal_code || null,
            country: countryCode || null,
          },

          // alias util
          county: addr.state || null,

          formats: formatsList,
          company: companyMeta,
        };

        orderForLog = order;
        await appendOrder(order);
        console.log("🗂️ Order logged:", order.orderNo, order.id);
      } catch (e) {
        console.error("❌ Failed to append order:", e);
      }

      /* FGO INVOICE (non-blocking, după ce orderForLog a fost setat) */
      try {
        let createFgoInvoice = null;
        try {
          const mod = await import("./invoice-fgo.mjs");
          createFgoInvoice = mod?.createFgoInvoice;
        } catch (e) {
          console.warn("ℹ️ FGO module not found. Skipping FGO invoice.");
        }

        if (createFgoInvoice && orderForLog) {
          const fgo = await createFgoInvoice({
            order: orderForLog,
            email,
            company: companyMeta,
          });

          console.log("🧾 FGO result:", fgo);

          // email scurt cu detalii factură → client + admin
          try {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            });

            const toClient = {
              from: `"Midaway" <${process.env.EMAIL_USER}>`,
              to: email,
              replyTo: process.env.ADMIN_EMAIL,
              subject: `Factura fiscala – Comanda #${orderNo}`,
              html: [
                `<p>Bună, ${name || ""}. Factura fiscală pentru comanda <strong>#${orderNo}</strong> a fost emisă.</p>`,
                fgo?.number
                  ? `<p><strong>Număr:</strong> ${fgo.number}${fgo.series ? ` / ${fgo.series}` : ""}</p>`
                  : "",
                fgo?.pdfUrl
                  ? `<p>Poți descărca factura în format PDF de <a href="${fgo.pdfUrl}" target="_blank">aici</a>.</p>`
                  : `<p>Factura a fost trimisă automat de sistemul FGO pe emailul tău.</p>`,
              ].join(""),
            };

            const toAdmin = {
              from: `"Midaway" <${process.env.EMAIL_USER}>`,
              to: process.env.ADMIN_EMAIL,
              subject: `📄 FGO • Factură emisă #${orderNo}${fgo?.number ? ` • ${fgo.number}` : ""}`,
              text: [
                `Order: ${orderNo}`,
                `Client: ${name} <${email}>`,
                fgo?.number ? `Nr factură: ${fgo.number}${fgo.series ? ` / ${fgo.series}` : ""}` : "",
                fgo?.pdfUrl ? `PDF: ${fgo.pdfUrl}` : "PDF: -",
              ].join("\n"),
            };

            await Promise.all([
              transporter.sendMail(toClient),
              transporter.sendMail(toAdmin),
            ]);

            console.log("✉️ FGO invoice emails sent to client & admin.");
          } catch (e) {
            console.error("❌ Email after FGO invoice failed:", e);
          }
        }
      } catch (e) {
        console.error("🧾 FGO call failed (non-blocking):", e?.message || e);
      }

      // token descărcare (dacă există fișiere)
      const exp = Date.now() + 48 * 60 * 60 * 1000; // 48h
      const token = signToken({ sid: session.id, email, keys, exp });

      const SITE = process.env.SITE_URL || "https://midaway.ro";
      const downloadPage = `${SITE}/api/download?token=${encodeURIComponent(token)}`;

      // ——— e-mailuri ———
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const itemsForEmail = items.map((it) => ({
          type: it.type,
          name: it.name || it.description || "Produs",
          format: it.format || null,
          quantity: it.quantity || 1,
        }));

        const html = buildEmailHTML({
          orderId: orderNo,
          name,
          total: total_amount,
          currency,
          downloadsUrl: downloadPage,
          items: itemsForEmail,
          hasDownloads,
        });

        // 1) Mail către client
        await transporter.sendMail({
          from: `"Midaway" <${process.env.EMAIL_USER}>`,
          to: email,
          replyTo: process.env.ADMIN_EMAIL,
          subject: `Midaway • Confirmare comanda #${orderNo}`,
          html,
        });
        console.log("✅ Email client OK:", email, "| orderNo:", orderNo);

        // 2) Mail scurt către admin (sumar text) — non-blocking
        try {
          const itemsSummary = itemsForEmail
            .map((it) => `• ${it.name}${it.format ? ` (${it.format})` : ""} ×${it.quantity}`)
            .join("\n");

          const adminResp = await transporter.sendMail({
            from: `"Midaway" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🧾 Comandă nouă #${orderNo} • ${total_amount} ${currency}`,
            text: [
              `Order: ${orderNo}`,
              `Client: ${name} <${email}>`,
              `Telefon: ${phone || "-"}`,   
              `Total: ${total_amount} ${currency}`,
              `Țară: ${countryCode || "-"}`,
              `Descărcări: ${hasDownloads ? "DA" : "nu"}`,
              `Paperback: ${hasPaperback ? "DA" : "nu"}`,
              "",
              "Produse:",
              itemsSummary || "-",
            ].join("\n"),
          });

          console.log("📬 Admin email OK:", process.env.ADMIN_EMAIL, "| accepted:", adminResp.accepted);
        } catch (e) {
          console.error("❌ Admin email failed:", e);
        }
      } catch (e) {
        console.error("❌ Email block failed:", e);
      }
    } catch (err) {
      console.error("Eroare procesare checkout.session.completed:", err);
    }
  }

  // ───────────────── PAYMENT FAILED ─────────────────
  if (event.type === "payment_intent.payment_failed") {
    try {
      const pi = event.data.object;
      const last = pi?.charges?.data?.[0] || {};
      const email = last?.billing_details?.email || null;
      const name = last?.billing_details?.name || null;
      const phone = last?.billing_details?.phone || null;
      const currency = (pi?.currency || "").toUpperCase();
      const amount = (pi?.amount || 0) / 100;
      const reason = pi?.last_payment_error?.message || "Payment failed";
      const countryCode =
        (last?.billing_details?.address?.country || "").toUpperCase() || null;
      

      await appendOrder({
        id: pi.id,
        orderNo: genOrderNo(pi.id),
        createdAt: Date.now(),
        email,
        name,
        phone,
        amount,
        currency,
        items: [],
        hasDownloads: false,
        hasPaperback: false,
        status: "failed",
        failureReason: reason,
        country: countryCode,
        formats: [],
        courierFee: 0,
      });

      console.log("🟥 payment_failed logged:", pi.id, reason);
    } catch (e) {
      console.error("payment_failed append error:", e);
    }
  }

  // ───────────────── SESSION EXPIRED ─────────────────
  if (event.type === "checkout.session.expired") {
    try {
      const s = event.data.object;
      await appendOrder({
        id: s.id,
        orderNo: genOrderNo(s.id),
        createdAt: Date.now(),
        email: s.customer_details?.email || null,
        name: s.customer_details?.name || null,
        phone: s.customer_details?.phone || null,
        
        amount: (s.amount_total || 0) / 100,
        currency: (s.currency || "").toUpperCase(),
        items: [],
        hasDownloads: false,
        hasPaperback: false,
        status: "expired",
        country:
          (s.customer_details?.address?.country || "").toUpperCase() || null,
        formats: [],
        courierFee: 0,
      });
      console.log("🟨 session expired logged:", s.id);
    } catch (e) {
      console.error("session.expired append error:", e);
    }
  }

  res.json({ received: true });
}
