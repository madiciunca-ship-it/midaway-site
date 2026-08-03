// /api/admin/orders.mjs
import nodemailer from "nodemailer";

import { readOrders } from "../../src/server/_orders-store.mjs";

import {
  readEventOrders,
  updateEventOrder,
} from "../../src/server/_event-orders-store.mjs";

const SITE = (
  process.env.SITE_URL || "https://midaway.ro"
).replace(/\/+$/, "");

function normalizeEventOrder(order) {
  const currency = String(
    order?.currency || "RON"
  ).toUpperCase();

  return {
    ...order,

    channel: "event",

    country:
      order?.country ||
      order?.address?.country ||
      "",

    courierFee: 0,
    hasDownloads: false,

    authors: Array.isArray(order?.authors)
      ? order.authors
      : [],

    tags: Array.isArray(order?.tags)
      ? order.tags
      : ["Gaudeamus"],

    items: (order?.items || []).map((item) => {
      const quantity = Number(
        item?.quantity || 1
      );

      const lineTotal = Number(
        item?.lineTotal ??
          item?.amount_total ??
          Number(item?.unitPrice || 0) * quantity
      );

      return {
        ...item,

        description:
          item?.description ||
          item?.title ||
          "Carte Midaway",

        quantity,

        amount_total: lineTotal,
        currency,

        format:
          item?.format ||
          "PAPERBACK",

        type:
          item?.type ||
          "event_book",
      };
    }),
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readJsonBody(req) {
  if (
    req.body &&
    typeof req.body === "object" &&
    !Buffer.isBuffer(req.body)
  ) {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");

  return text
    ? JSON.parse(text)
    : {};
}

function buildPickupEmail({
  name,
  orderNo,
  pickedUpAt,
}) {
  const dateText = new Date(
    Number(pickedUpAt)
  ).toLocaleString("ro-RO", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
    <div style="
      font-family:Arial,sans-serif;
      max-width:680px;
      margin:auto;
      color:#2b2b2b;
      line-height:1.6;
    ">
      <div style="
        background:#8b2c34;
        color:#fff;
        padding:18px 20px;
        border-radius:14px 14px 0 0;
      ">
        <h1 style="margin:0;font-size:24px">
          Comanda ta a fost predată 📚
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
          Mulțumim,
          <strong>${escapeHtml(
            name || "cititorule"
          )}</strong>!
        </p>

        <p>
          Comanda
          <strong>${escapeHtml(orderNo)}</strong>
          a fost predată și este acum finalizată.
        </p>

        <div style="
          margin:18px 0;
          padding:14px 16px;
          border-radius:12px;
          background:#e9f7f1;
          border:1px solid #cdeee2;
        ">
          <strong>Data predării:</strong>
          ${escapeHtml(dateText)}
        </div>

        <p>
          Îți mulțumim că ai ales Midaway și îți dorim
          lectură frumoasă!
        </p>

        <p>
          Ne-ar bucura să ne spui, când vei termina lectura,
          cum ți s-a părut cartea.
        </p>

        <p>
          Pentru noutăți, apariții editoriale și evenimente,
          te poți înscrie la newsletterul Midaway:
        </p>

        <p>
          <a
            href="${SITE}/newsletter"
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
            Înscrie-te la newsletter
          </a>
        </p>

        <p style="color:#666;font-size:14px">
          Noutățile Midaway sunt disponibile oricând și pe
          <a href="${SITE}" style="color:#8b2c34">
            midaway.ro
          </a>.
        </p>
      </div>
    </div>
  `;
}

async function sendPickupEmail(order) {
  if (
    !order?.email ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS
  ) {
    return {
      sent: false,
      reason: "missing_email_configuration",
    };
  }

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  await transporter.sendMail({
    from: `"Midaway" <${process.env.EMAIL_USER}>`,
    to: order.email,
    replyTo: process.env.ADMIN_EMAIL,

    subject:
      `Midaway • Comanda ${order.orderNo} a fost predată`,

    html: buildPickupEmail({
      name: order.name,
      orderNo: order.orderNo,
      pickedUpAt: order.pickedUpAt,
    }),
  });

  return {
    sent: true,
  };
}

export default async function handler(req, res) {
  try {
    const token = String(
      req.query?.token || ""
    ).trim();

    const ADMIN = String(
      process.env.ADMIN_DASH_TOKEN || ""
    ).trim();

    if (
      !token ||
      !ADMIN ||
      token !== ADMIN
    ) {
      return res.status(401).json({
        error: "unauthorized",
      });
    }

    res.setHeader(
      "Cache-Control",
      "no-store, max-age=0"
    );

    // ─────────────────────────────────────────────
    // GET — listează comenzile
    // ─────────────────────────────────────────────
    if (req.method === "GET") {
      const source = String(
        req.query?.source || "online"
      ).toLowerCase();

      let raw;

      if (source === "event") {
        raw = await readEventOrders();
      } else {
        raw = await readOrders();
      }

      const list = Array.isArray(raw)
        ? raw
        : [];

      const normalized =
        source === "event"
          ? list.map(normalizeEventOrder)
          : list;

      const sorted = [...normalized].sort(
        (a, b) => {
          const aa =
            typeof a?.createdAt === "number"
              ? a.createdAt
              : 0;

          const bb =
            typeof b?.createdAt === "number"
              ? b.createdAt
              : 0;

          return bb - aa;
        }
      );

      res.setHeader(
        "Content-Type",
        "application/json; charset=utf-8"
      );

      return res
        .status(200)
        .send(JSON.stringify(sorted));
    }

    // ─────────────────────────────────────────────
    // POST — marchează comanda ca predată
    // ─────────────────────────────────────────────
    if (req.method === "POST") {
      const body = await readJsonBody(req);

      const action = String(
        body?.action || ""
      ).trim();

      const orderId = String(
        body?.orderId ||
          body?.orderNo ||
          ""
      ).trim();

      if (action !== "mark_collected") {
        return res.status(400).json({
          error: "invalid_action",
        });
      }

      if (!orderId) {
        return res.status(400).json({
          error: "missing_order_id",
        });
      }

      const eventOrders =
        await readEventOrders();

      const found = (
        Array.isArray(eventOrders)
          ? eventOrders
          : []
      ).find(
        (order) =>
          String(order?.id) === orderId ||
          String(order?.orderNo) === orderId
      );

      if (!found) {
        return res.status(404).json({
          error: "order_not_found",
        });
      }

      if (
        found.status !== "paid" &&
        found.paymentStatus !== "paid"
      ) {
        return res.status(409).json({
          error: "order_not_paid",
        });
      }

      if (
        found.pickupStatus === "collected" ||
        found.pickupStatus === "picked_up"
      ) {
        return res.status(409).json({
          error: "already_collected",
          order: normalizeEventOrder(found),
        });
      }

      const pickedUpAt = Date.now();

      const updated =
        await updateEventOrder(found.id, {
          pickupStatus: "collected",
          pickedUpAt,
          pickedUpBy: "Midaway stand",
        });

      let emailSent = false;

      try {
        const emailResult =
          await sendPickupEmail(updated);

        emailSent =
          emailResult?.sent === true;

        console.log(
          "✉️ Pickup confirmation email:",
          updated.orderNo,
          emailSent ? "sent" : "not sent"
        );
      } catch (emailError) {
        console.error(
          "❌ Pickup email failed:",
          emailError?.message ||
            emailError
        );
      }

      return res.status(200).json({
        ok: true,
        emailSent,
        order: normalizeEventOrder(updated),
      });
    }

    res.setHeader(
      "Allow",
      "GET, POST"
    );

    return res.status(405).json({
      error: "Method Not Allowed",
    });
  } catch (error) {
    console.error(
      "admin/orders ERROR:",
      error
    );

    return res.status(500).json({
      error: "server_error",
    });
  }
}