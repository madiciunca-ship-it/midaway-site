import { clearOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const token = (req.query?.token || "").trim();
    const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();
    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ok = await clearOrders();
    if (!ok) throw new Error("Clear failed");

    return res.json({ ok: true, cleared: true });
  } catch (e) {
    console.error("clear-orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
