// /api/admin/orders.mjs
import { readOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  try {
    // Acceptăm doar GET
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Token admin (identic cu ADMIN_DASH_TOKEN din Vercel)
    const token = (req.query?.token || "").trim();
    const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();
    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // Citim comenzile
    const orders = await readOrders();
    const list = Array.isArray(orders) ? orders : [];

    // sort desc după createdAt (fallback 0)
    const sorted = [...list].sort((a, b) => {
      const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
      const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
      return bb - aa;
    });

    const count = sorted.length;
    const hasOrderNo = sorted.some(o => o?.orderNo);
    const hasCourierFee = sorted.some(o => typeof o?.courierFee === "number");
    const lastUpdated =
      count > 0 ? new Date(sorted[0]?.createdAt || Date.now()).toISOString() : null;

    console.log(`admin/orders → count: ${count}`);

    // Meta în HEADERE (UI-ul rămâne identic – primește array)
    res.setHeader("X-Orders-Count", String(count));
    res.setHeader("X-Orders-HasOrderNo", hasOrderNo ? "1" : "0");
    res.setHeader("X-Orders-HasCourierFee", hasCourierFee ? "1" : "0");
    if (lastUpdated) res.setHeader("X-Orders-LastUpdated", lastUpdated);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(JSON.stringify(sorted));
  } catch (e) {
    console.error("admin/orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
