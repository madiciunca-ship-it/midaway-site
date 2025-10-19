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

    // Citim comenzile din Blob
    const orders = await readOrders();
    const count = Array.isArray(orders) ? orders.length : 0;
    console.log("admin/orders → count:", count);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(JSON.stringify(orders || []));
  } catch (e) {
    console.error("admin/orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
