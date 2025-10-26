// /api/admin/orders.mjs
import { readOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const token = (req.query?.token || "").trim();
    const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();
    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // Citește și garantează array
    const raw = await readOrders();
    const list = Array.isArray(raw) ? raw : [];

    // sort desc după createdAt
    const sorted = [...list].sort((a, b) => {
      const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
      const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
      return bb - aa;
    });

    // headere și NO-CACHE
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");

    // ⬅️ IMPORTANT: trimitem DOAR array, nu {orders:[]}
    return res.status(200).send(JSON.stringify(sorted));
  } catch (e) {
    console.error("admin/orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
