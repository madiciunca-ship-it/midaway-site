// /api/orders.mjs
import { readOrders, clearOrders } from "./_orders-store.mjs";

const ADMIN_TOKEN = process.env.ADMIN_DASH_TOKEN || "dev-admin-token";

function isAuthed(req) {
  const q = req.query || {};
  const auth = req.headers?.authorization || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  return (q.token && q.token === ADMIN_TOKEN) || (bearer && bearer === ADMIN_TOKEN);
}

export default async function handler(req, res) {
  if (!isAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const list = await readOrders();
    res.status(200).json({ orders: list });
    return;
  }

  if (req.method === "DELETE") {
    await clearOrders();
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
