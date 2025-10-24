// /api/admin/orders.mjs
import { readOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  try {
    // Acceptăm doar GET ca să nu existe confuzii
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Token admin (trebuie să fie IDENTIC cu ADMIN_DASH_TOKEN din Vercel)
    const token = (req.query?.token || "").trim();
    const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();
    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // Citim comenzile din Blob, garantăm un ARRAY
    const raw = await readOrders();
    const list = Array.isArray(raw) ? raw : [];

    // sort desc după createdAt (fallback 0)
    const sorted = [...list].sort((a, b) => {
      const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
      const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
      return bb - aa;
    });

    // Headere utile + NO-CACHE (evităm răspunsuri vechi din CDN)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // IMPORTANT: trimitem DOAR array (nu {orders:[]})
    return res.status(200).send(JSON.stringify(sorted));
  } catch (e) {
    console.error("admin/orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
