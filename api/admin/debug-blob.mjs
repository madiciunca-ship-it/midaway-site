// /api/admin/debug-blob.mjs
import { readOrders } from "../_orders-store.mjs";

export default async function handler(req, res) {
  const token = (req.query?.token || "").trim();
  const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();

  if (!token || !ADMIN || token !== ADMIN) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const base = (process.env.BLOB_PUBLIC_BASE || "").replace(/\/+$/, "");
  const url = base ? `${base}/orders.json` : null;

  try {
    let preview = null, status = null;

    if (url) {
      const r = await fetch(url, { cache: "no-store" });
      status = r.status;
      if (r.ok) {
        try {
          preview = await r.json();
        } catch {
          preview = await r.text();
        }
      } else {
        preview = await r.text();
      }
    }

    return res.json({
      BLOB_PUBLIC_BASE: base || "(nesetat)",
      readUrl: url || "(fără URL până nu setezi BLOB_PUBLIC_BASE)",
      status,
      preview,
      counted: Array.isArray(preview) ? preview.length : undefined,
    });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
