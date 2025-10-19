// /api/admin/debug-blob.mjs
export default async function handler(req, res) {
    try {
      const FILE = "orders.json";
      const BLOB_BASE = "https://blob.vercel-storage.com";
      const r = await fetch(`${BLOB_BASE}/${FILE}`, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
        cache: "no-store",
      });
  
      const text = await r.text().catch(() => "");
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).send(JSON.stringify({
        ok: r.ok,
        status: r.status,
        statusText: r.statusText,
        length: (text || "").length,
        preview: (text || "").slice(0, 200)
      }, null, 2));
    } catch (e) {
      res.status(500).json({ error: String(e?.message || e) });
    }
  }
  