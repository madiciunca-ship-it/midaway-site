// /api/admin/debug-blob.mjs
export default async function handler(req, res) {
    const token = (req.query?.token || "").trim();
    const ADMIN = (process.env.ADMIN_DASH_TOKEN || "").trim();
    if (!token || token !== ADMIN) {
      return res.status(401).json({ error: "unauthorized" });
    }
  
    const FILE = "orders.json";
    const PUBLIC = `https://blob.vercel-storage.com/${FILE}`;
  
    const out = { public: {}, token: {} };
  
    try {
      const r = await fetch(PUBLIC, { cache: "no-store" });
      out.public.status = r.status;
      out.public.statusText = r.statusText;
      out.public.ok = r.ok;
      if (r.ok) {
        const txt = await r.text();
        out.public.length = txt.length;
        out.public.preview = txt.slice(0, 120);
      }
    } catch (e) {
      out.public.error = String(e);
    }
  
    try {
      const r2 = await fetch(PUBLIC, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      out.token.status = r2.status;
      out.token.statusText = r2.statusText;
      out.token.ok = r2.ok;
      if (r2.ok) {
        const txt2 = await r2.text();
        out.token.length = txt2.length;
        out.token.preview = txt2.slice(0, 120);
      }
    } catch (e) {
      out.token.error = String(e);
    }
  
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify(out, null, 2));
  }
  