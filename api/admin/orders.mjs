// /api/admin/orders.mjs
import { readOrders } from "../../src/server/_orders-store.mjs";
import { readEventOrders } from "../../src/server/_event-orders-store.mjs";

function normalizeEventOrder(order) {
  const currency = String(order?.currency || "RON").toUpperCase();

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
      const quantity = Number(item?.quantity || 1);

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

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");

      return res.status(405).json({
        error: "Method Not Allowed",
      });
    }

    const token = String(req.query?.token || "").trim();

    const ADMIN = String(
      process.env.ADMIN_DASH_TOKEN || ""
    ).trim();

    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).json({
        error: "unauthorized",
      });
    }

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

    const sorted = [...normalized].sort((a, b) => {
      const aa =
        typeof a?.createdAt === "number"
          ? a.createdAt
          : 0;

      const bb =
        typeof b?.createdAt === "number"
          ? b.createdAt
          : 0;

      return bb - aa;
    });

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "no-store, max-age=0"
    );

    return res
      .status(200)
      .send(JSON.stringify(sorted));
  } catch (error) {
    console.error("admin/orders ERROR:", error);

    return res.status(500).json({
      error: "server_error",
    });
  }
}