// /api/admin/orders.mjs
import { readOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  const token = req.query?.token || "";
  if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const orders = await readOrders();
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).send(JSON.stringify(orders));
}
