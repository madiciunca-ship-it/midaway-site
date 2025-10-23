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
    const list = Array.isArray(orders) ? orders : [];
    const count = list.length;

    // log clar în consola Vercel
    console.log(`admin/orders → count: ${count}`);

    // determinăm dacă există câmpuri noi
    const hasOrderNo = list.some((o) => o?.orderNo);
    const hasCourierFee = list.some((o) => typeof o?.courierFee === "number");

    // sortăm desc dacă nu sunt deja
    const sorted = [...list].sort((a, b) => {
      const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
      const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
      return bb - aa;
    });

    // optional, trimitem și meta info
    const payload = {
      meta: {
        count,
        hasOrderNo,
        hasCourierFee,
        lastUpdated: count > 0 ? new Date(sorted[0].createdAt || Date.now()).toISOString() : null,
      },
      orders: sorted,
    };

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(JSON.stringify(payload, null, 2));
  } catch (e) {
    console.error("admin/orders ERROR:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
